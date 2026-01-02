/**
 * マークダウン内の画像に対してaltテキストを生成するスクリプト
 */

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { generateImageAltText, addAltTextToMarkdown } from '../src/lib/image-alt-generator';

const SOURCE_DIR = path.join(process.cwd(), 'src/content/blog');
const TRANSLATIONS_DIR = path.join(process.cwd(), 'src/content/blog/translations');
const SOURCE_LOCALE = process.env.SOURCE_LOCALE || 'ja';
const TARGET_LOCALES = (process.env.TARGET_LOCALES || 'en,zh,th,de,fr,es').split(',').filter(Boolean);

/**
 * マークダウンから画像URLを抽出
 */
function extractImageUrls(markdown: string): string[] {
	const urls: string[] = [];
	
	// ![alt](url) パターン
	const markdownImages = markdown.matchAll(/!\[([^\]]*)\]\(([^)]+)\)/g);
	for (const match of markdownImages) {
		urls.push(match[2]);
	}
	
	// <img src="url"> パターン
	const htmlImages = markdown.matchAll(/<img[^>]+src=["']([^"']+)["'][^>]*>/gi);
	for (const match of htmlImages) {
		urls.push(match[1]);
	}
	
	return [...new Set(urls)]; // 重複を除去
}

/**
 * ファイルを処理
 */
async function processFile(filePath: string, locale: string): Promise<boolean> {
	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		const { data: frontmatter, content: markdownContent } = matter(content);
		
		const imageUrls = extractImageUrls(markdownContent);
		
		if (imageUrls.length === 0) {
			return true; // 画像がない場合はスキップ
		}
		
		console.log(`  Found ${imageUrls.length} image(s)`);
		
		const imageAltMap: Record<string, string> = {};
		
		// 各画像に対してaltテキストを生成
		for (const imageUrl of imageUrls) {
			// 相対パスの場合は絶対URLに変換（実際のドメインが必要）
			const fullUrl = imageUrl.startsWith('http') 
				? imageUrl 
				: `https://example.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
			
			try {
				const altText = await generateImageAltText(fullUrl, {
					locale,
					context: frontmatter.title || '',
				});
				
				if (altText) {
					imageAltMap[imageUrl] = altText;
					console.log(`    ✅ ${imageUrl}: ${altText.substring(0, 50)}...`);
				}
			} catch (error) {
				console.warn(`    ⚠️  Failed to generate alt for ${imageUrl}:`, error);
			}
			
			// APIレート制限を避けるため、少し待機
			await new Promise(resolve => setTimeout(resolve, 1000));
		}
		
		// マークダウンにaltテキストを追加
		const updatedMarkdown = addAltTextToMarkdown(markdownContent, imageAltMap);
		const updatedContent = matter.stringify(updatedMarkdown, frontmatter);
		
		// ファイルを保存
		fs.writeFileSync(filePath, updatedContent, 'utf-8');
		
		return true;
	} catch (error) {
		console.error(`Error processing ${filePath}:`, error);
		return false;
	}
}

/**
 * メイン処理
 */
async function main() {
	console.log('🖼️  Starting image alt text generation...\n');
	
	// ソースファイルを処理
	const sourceFiles = fs.readdirSync(SOURCE_DIR)
		.filter(file => file.endsWith('.md') && !file.startsWith('.'));
	
	console.log(`Processing ${sourceFiles.length} source file(s)...\n`);
	
	for (const file of sourceFiles) {
		const filePath = path.join(SOURCE_DIR, file);
		console.log(`📄 ${file}`);
		await processFile(filePath, SOURCE_LOCALE);
		console.log('');
	}
	
	// 翻訳ファイルを処理
	if (fs.existsSync(TRANSLATIONS_DIR)) {
		const translationFiles = fs.readdirSync(TRANSLATIONS_DIR)
			.filter(file => file.endsWith('.md'));
		
		console.log(`Processing ${translationFiles.length} translation file(s)...\n`);
		
		for (const file of translationFiles) {
			const filePath = path.join(TRANSLATIONS_DIR, file);
			// ファイル名からロケールを抽出: slug.locale.md
			const localeMatch = file.match(/\.([a-z]{2})\.md$/);
			const locale = localeMatch ? localeMatch[1] : SOURCE_LOCALE;
			
			console.log(`📄 ${file} (${locale})`);
			await processFile(filePath, locale);
			console.log('');
		}
	}
	
	console.log('✨ Done!');
}

main().catch(console.error);
