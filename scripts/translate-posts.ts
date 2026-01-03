/**
 * ブログ記事を多言語に翻訳するスクリプト
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { translateMarkdown } from '../src/lib/ai-translator';

const SOURCE_DIR = path.join(process.cwd(), 'src/content/blog');
const TRANSLATIONS_DIR = path.join(process.cwd(), 'src/content/blog/translations');
const METADATA_DIR = path.join(process.cwd(), 'src/data/blog-metadata');
const DEFAULT_SOURCE_LOCALE = process.env.SOURCE_LOCALE || 'ja';
const ALL_LOCALES = (process.env.TARGET_LOCALES || 'en,zh,th,de,fr,es').split(',').filter(Boolean);
const SUPPORTED_LOCALES = [DEFAULT_SOURCE_LOCALE, ...ALL_LOCALES].filter((v, i, a) => a.indexOf(v) === i);
const AI_PROVIDER = (process.env.AI_PROVIDER || 'openai') as 'openai' | 'anthropic' | 'gemini';

function getMissingApiKey(provider: typeof AI_PROVIDER): string | null {
	switch (provider) {
		case 'openai':
			return process.env.OPENAI_API_KEY ? null : 'OPENAI_API_KEY';
		case 'anthropic':
			return process.env.ANTHROPIC_API_KEY ? null : 'ANTHROPIC_API_KEY';
		case 'gemini':
			return process.env.GEMINI_API_KEY ? null : 'GEMINI_API_KEY';
		default:
			return null;
	}
}

/**
 * 読了時間を計算（文字数から）
 */
function calculateReadTime(text: string, locale: string): string {
	// 言語ごとの平均読書速度（文字/分）
	const readingSpeeds: Record<string, number> = {
		ja: 400, // 日本語
		en: 200, // 英語
		zh: 300, // 中国語
		th: 250, // タイ語
		de: 200, // ドイツ語
		fr: 200, // フランス語
		es: 200, // スペイン語
	};

	const speed = readingSpeeds[locale] || 200;
	const charCount = text.replace(/\s/g, '').length;
	const minutes = Math.ceil(charCount / speed);

	// 言語ごとの表示形式
	const timeLabels: Record<string, { [key: number]: string; default: string }> = {
		ja: { 1: '1分', default: `${minutes}分` },
		en: { 1: '1 min', default: `${minutes} min` },
		zh: { 1: '1分钟', default: `${minutes}分钟` },
		th: { 1: '1 นาที', default: `${minutes} นาที` },
		de: { 1: '1 Min.', default: `${minutes} Min.` },
		fr: { 1: '1 min', default: `${minutes} min` },
		es: { 1: '1 min', default: `${minutes} min` },
	};

	const labels = timeLabels[locale] || timeLabels.en;
	return labels[minutes] || labels.default;
}

/**
 * メタデータファイルからソース言語を取得
 */
function getSourceLocaleFromMetadata(slug: string): string | null {
	const metadataPath = path.join(METADATA_DIR, `${slug}.json`);
	if (!fs.existsSync(metadataPath)) {
		return null;
	}
	
	try {
		const metadata = JSON.parse(fs.readFileSync(metadataPath, 'utf-8'));
		return metadata.sourceLocale || null;
	} catch (error) {
		console.warn(`Warning: Could not read metadata for ${slug}:`, error);
		return null;
	}
}

/**
 * マークダウンファイルを翻訳
 */
async function translatePost(
	filePath: string,
	sourceLocale: string,
	targetLocale: string
): Promise<{ success: boolean; error?: string }> {
	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		const { data: frontmatter, content: markdownContent } = matter(content);

		// スラッグを取得
		const filename = path.basename(filePath);
		const slug = frontmatter.slug || filename.replace(/\.md$/, '');

		// ソース言語とターゲット言語が同じ場合はスキップ
		if (sourceLocale === targetLocale) {
			return { success: true };
		}

		console.log(`  Translating from ${sourceLocale} to ${targetLocale}...`);

		// 翻訳実行
		const { translatedFrontmatter, translatedContent } = await translateMarkdown(
			frontmatter,
			markdownContent,
			{
				provider: AI_PROVIDER,
				sourceLocale,
				targetLocale,
				preserveMarkdown: true,
			}
		);

		// 読了時間を計算
		const readTime = calculateReadTime(translatedContent, targetLocale);
		translatedFrontmatter.readTime = readTime;

		// 翻訳されたマークダウンファイルを作成
		const translatedMarkdown = matter.stringify(translatedContent, translatedFrontmatter);

		// 翻訳ファイルを保存
		const outputPath = path.join(TRANSLATIONS_DIR, `${slug}.${targetLocale}.md`);
		fs.writeFileSync(outputPath, translatedMarkdown, 'utf-8');

		return { success: true };
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : String(error);
		return { success: false, error: errorMessage };
	}
}

/**
 * メイン処理
 */
async function main() {
	console.log('🌍 Starting blog post translation...\n');
	console.log(`Supported locales: ${SUPPORTED_LOCALES.join(', ')}`);
	console.log(`AI Provider: ${AI_PROVIDER}\n`);

	const missingKey = getMissingApiKey(AI_PROVIDER);
	if (missingKey) {
		console.log(`⏭️  Skipping translation: ${missingKey} is not set`);
		console.log('   Translation files will not be generated in this run.');
		console.log('   To enable translation, set the env var and rerun `npm run translate`.\n');
		return;
	}

	// メタデータディレクトリが存在するか確認
	if (!fs.existsSync(METADATA_DIR)) {
		console.error('❌ Metadata directory not found. Please run "npm run preprocess" first.');
		process.exit(1);
	}

	// 翻訳ディレクトリを作成
	if (!fs.existsSync(TRANSLATIONS_DIR)) {
		fs.mkdirSync(TRANSLATIONS_DIR, { recursive: true });
		console.log(`✅ Created translations directory: ${TRANSLATIONS_DIR}\n`);
	}

	// ソースディレクトリ内のマークダウンファイルを取得
	const files = fs.readdirSync(SOURCE_DIR)
		.filter(file => file.endsWith('.md') && !file.startsWith('.'));

	if (files.length === 0) {
		console.log('⚠️  No markdown files found in source directory');
		return;
	}

	console.log(`Found ${files.length} markdown file(s)\n`);

	let totalSuccess = 0;
	let totalErrors = 0;

	for (const file of files) {
		const filePath = path.join(SOURCE_DIR, file);
		const filename = path.basename(filePath);
		const slug = filename.replace(/\.md$/, '');
		
		// メタデータからソース言語を取得
		const sourceLocale = getSourceLocaleFromMetadata(slug) || DEFAULT_SOURCE_LOCALE;
		
		// ソース言語以外のすべての言語に翻訳
		const targetLocales = SUPPORTED_LOCALES.filter(locale => locale !== sourceLocale);
		
		console.log(`📄 Processing: ${file} (source: ${sourceLocale})`);
		console.log(`  Target locales: ${targetLocales.join(', ')}`);

		for (const targetLocale of targetLocales) {
			const result = await translatePost(filePath, sourceLocale, targetLocale);

			if (result.success) {
				totalSuccess++;
				console.log(`    ✅ ${targetLocale}`);
			} else {
				totalErrors++;
				console.log(`    ❌ ${targetLocale}: ${result.error}`);
			}

			// APIレート制限を避けるため、少し待機
			await new Promise(resolve => setTimeout(resolve, 1000));
		}

		console.log('');
	}

	console.log(`\n✨ Done! Success: ${totalSuccess}, Errors: ${totalErrors}`);
}

main().catch(console.error);
