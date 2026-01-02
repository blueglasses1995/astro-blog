/**
 * 関連記事を生成してメタデータファイルに追加するスクリプト
 */

import fs from 'node:fs';
import path from 'node:path';
import type { BlogMetadata } from '../src/types/blog-metadata';
import { getRelatedPostSlugs } from '../src/lib/related-posts';

const METADATA_DIR = path.join(process.cwd(), 'src/content/blog/metadata');
const MAX_RELATED_POSTS = parseInt(process.env.MAX_RELATED_POSTS || '5', 10);

/**
 * メタデータファイルを読み込む
 */
function loadMetadata(slug: string): BlogMetadata | null {
	const filePath = path.join(METADATA_DIR, `${slug}.json`);
	if (!fs.existsSync(filePath)) {
		return null;
	}

	try {
		const content = fs.readFileSync(filePath, 'utf-8');
		return JSON.parse(content) as BlogMetadata;
	} catch (error) {
		console.error(`Error loading metadata for ${slug}:`, error);
		return null;
	}
}

/**
 * メタデータファイルを保存
 */
function saveMetadata(metadata: BlogMetadata): void {
	const filePath = path.join(METADATA_DIR, `${metadata.slug}.json`);
	fs.writeFileSync(
		filePath,
		JSON.stringify(metadata, null, 2),
		'utf-8'
	);
}

/**
 * メイン処理
 */
function main() {
	console.log('🔗 Starting related posts generation...\n');

	if (!fs.existsSync(METADATA_DIR)) {
		console.error(`❌ Metadata directory not found: ${METADATA_DIR}`);
		console.log('💡 Run preprocess-blog.ts first to generate metadata files.');
		process.exit(1);
	}

	// すべてのメタデータファイルを読み込む
	const metadataFiles = fs.readdirSync(METADATA_DIR)
		.filter(file => file.endsWith('.json'));

	if (metadataFiles.length === 0) {
		console.log('⚠️  No metadata files found');
		return;
	}

	console.log(`Found ${metadataFiles.length} metadata file(s)\n`);

	const allMetadata: BlogMetadata[] = [];

	// メタデータを読み込む
	for (const file of metadataFiles) {
		const slug = file.replace('.json', '');
		const metadata = loadMetadata(slug);
		if (metadata) {
			allMetadata.push(metadata);
		}
	}

	if (allMetadata.length === 0) {
		console.log('⚠️  No valid metadata files found');
		return;
	}

	let processed = 0;
	let updated = 0;

	// 各記事に対して関連記事を計算
	for (const currentPost of allMetadata) {
		console.log(`📄 Processing: ${currentPost.slug}`);

		// 関連記事を計算
		const relatedSlugs = getRelatedPostSlugs(
			currentPost,
			allMetadata,
			MAX_RELATED_POSTS
		);

		if (relatedSlugs.length > 0) {
			// メタデータを更新
			currentPost.relatedPosts = relatedSlugs;
			saveMetadata(currentPost);

			console.log(`  ✅ Found ${relatedSlugs.length} related post(s):`);
			relatedSlugs.forEach(slug => {
				console.log(`     - ${slug}`);
			});
			updated++;
		} else {
			console.log(`  ℹ️  No related posts found`);
		}

		processed++;
		console.log('');
	}

	console.log(`✨ Done! Processed: ${processed}, Updated: ${updated}`);
}

main();
