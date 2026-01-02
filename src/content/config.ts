import { defineCollection, z } from 'astro:content';

// 言語固有のコンテンツスキーマ（翻訳された記事）
const blogTranslation = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		readTime: z.string().optional(),
		// メタデータへの参照（slugでリンク）
		metadataSlug: z.string(),
	}),
});

// 元の記事（ソース言語）のスキーマ
const blogSource = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		// Transform string to Date object
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		// [NEW] Aliases for auto-linking
		aliases: z.array(z.string()).optional(),
		tags: z.array(z.string()).optional(),
		author: z.string().optional(),
		category: z.string().optional(),
		subcategory: z.string().optional(),
		readTime: z.string().optional(),
		// Allow date as fallback for pubDate if needed, or just let it pass
		date: z.coerce.date().optional(),
	}),
});

// 後方互換性のため、既存のblogコレクションも維持
const blog = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		updatedDate: z.coerce.date().optional(),
		heroImage: z.string().optional(),
		aliases: z.array(z.string()).optional(),
		tags: z.array(z.string()).optional(),
		author: z.string().optional(),
		category: z.string().optional(),
		subcategory: z.string().optional(),
		readTime: z.string().optional(),
		date: z.coerce.date().optional(),
	}),
});

export const collections = { 
	blog,
	blogSource,
	blogTranslation,
};
