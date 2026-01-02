/**
 * ブログ記事のメタデータを抽出して、言語非依存のメタデータファイルを生成するスクリプト
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import type { BlogMetadata } from '../src/types/blog-metadata';

const SOURCE_DIR = path.join(process.cwd(), 'src/content/blog');
const METADATA_DIR = path.join(process.cwd(), 'src/content/blog/metadata');
const DEFAULT_SOURCE_LOCALE = process.env.SOURCE_LOCALE || 'ja';
const ALL_LOCALES = (process.env.TARGET_LOCALES || 'en,zh,th,de,fr,es').split(',').filter(Boolean);
// すべてのサポート言語（ソース言語も含む）
const SUPPORTED_LOCALES = [DEFAULT_SOURCE_LOCALE, ...ALL_LOCALES].filter((v, i, a) => a.indexOf(v) === i);

/**
 * スラッグをファイル名から生成
 */
function getSlugFromFilename(filename: string): string {
	return filename.replace(/\.md$/, '');
}

/**
 * テキストの言語を検出（簡易版：フロントマターから、またはデフォルトを使用）
 */
function detectSourceLocale(
	frontmatter: any,
	content: string,
	filename: string
): string {
	// フロントマターに明示的に指定されている場合
	if (frontmatter.sourceLocale && SUPPORTED_LOCALES.includes(frontmatter.sourceLocale)) {
		return frontmatter.sourceLocale;
	}
	
	// フロントマターにlocaleが指定されている場合
	if (frontmatter.locale && SUPPORTED_LOCALES.includes(frontmatter.locale)) {
		return frontmatter.locale;
	}
	
	// デフォルトのソース言語を使用
	return DEFAULT_SOURCE_LOCALE;
}

/**
 * マークダウンファイルからメタデータを抽出
 */
function extractMetadata(filePath: string): BlogMetadata | null {
	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		const { data, content: markdownContent } = matter(content);
		const filename = path.basename(filePath);
		const slug = data.slug || getSlugFromFilename(filename);

		// 必須フィールドのチェック
		if (!data.title || !data.description) {
			console.warn(`⚠️  Skipping ${filename}: missing title or description`);
			return null;
		}

		// ソース言語を検出
		const sourceLocale = detectSourceLocale(data, markdownContent, filename);
		
		// ソース言語以外のすべての言語を対象言語として設定
		const targetLocales = SUPPORTED_LOCALES.filter(locale => locale !== sourceLocale);

		const metadata: BlogMetadata = {
			slug,
			tags: data.tags || [],
			category: data.category,
			author: data.author,
			pubDate: data.pubDate 
				? new Date(data.pubDate).toISOString() 
				: (data.date ? new Date(data.date).toISOString() : new Date().toISOString()),
			updatedDate: data.updatedDate 
				? new Date(data.updatedDate).toISOString() 
				: undefined,
			heroImage: data.heroImage,
			aliases: data.aliases || [],
			relatedPosts: [], // 後で関連記事生成スクリプトで追加
			sourceLocale,
			availableLocales: [sourceLocale, ...targetLocales],
		};

		return metadata;
	} catch (error) {
		console.error(`❌ Error processing ${filePath}:`, error);
		return null;
	}
}

/**
 * メイン処理
 */
function main() {
	console.log('📝 Starting blog metadata extraction...\n');

	// メタデータディレクトリを作成
	if (!fs.existsSync(METADATA_DIR)) {
		fs.mkdirSync(METADATA_DIR, { recursive: true });
		console.log(`✅ Created metadata directory: ${METADATA_DIR}`);
	}

	// ソースディレクトリ内のマークダウンファイルを取得
	const files = fs.readdirSync(SOURCE_DIR)
		.filter(file => file.endsWith('.md') && !file.startsWith('.'));

	if (files.length === 0) {
		console.log('⚠️  No markdown files found in source directory');
		return;
	}

	console.log(`Found ${files.length} markdown file(s)\n`);

	let processed = 0;
	let skipped = 0;

	for (const file of files) {
		const filePath = path.join(SOURCE_DIR, file);
		const metadata = extractMetadata(filePath);

		if (!metadata) {
			skipped++;
			continue;
		}

		// メタデータファイルを保存
		const metadataPath = path.join(METADATA_DIR, `${metadata.slug}.json`);
		fs.writeFileSync(
			metadataPath,
			JSON.stringify(metadata, null, 2),
			'utf-8'
		);

		console.log(`✅ Processed: ${file} -> ${metadata.slug}.json`);
		processed++;
	}

	console.log(`\n✨ Done! Processed: ${processed}, Skipped: ${skipped}`);
}

main();
