/**
 * 関連記事判定ライブラリ
 * タグ/カテゴリーの一致度計算とAIによる意味的類似度判定
 */

import type { BlogMetadata } from '../types/blog-metadata';

export interface RelatedPostScore {
	slug: string;
	score: number;
	reasons: string[];
}

interface RelatedPostsOptions {
	useAI?: boolean;
	maxResults?: number;
	minScore?: number;
}

/**
 * タグの一致度を計算
 */
function calculateTagSimilarity(
	tags1: string[],
	tags2: string[]
): { score: number; matchedTags: string[] } {
	if (tags1.length === 0 || tags2.length === 0) {
		return { score: 0, matchedTags: [] };
	}

	const set1 = new Set(tags1.map(t => t.toLowerCase()));
	const set2 = new Set(tags2.map(t => t.toLowerCase()));

	const matchedTags: string[] = [];
	for (const tag of set1) {
		if (set2.has(tag)) {
			matchedTags.push(tag);
		}
	}

	// Jaccard類似度
	const union = new Set([...set1, ...set2]);
	const intersection = new Set(matchedTags);
	const score = union.size > 0 ? intersection.size / union.size : 0;

	return { score, matchedTags };
}

/**
 * カテゴリーの一致度を計算
 */
function calculateCategorySimilarity(
	category1?: string,
	category2?: string
): number {
	if (!category1 || !category2) {
		return 0;
	}

	return category1.toLowerCase() === category2.toLowerCase() ? 1 : 0;
}

/**
 * AIを使用した意味的類似度判定（オプション）
 */
async function calculateAISimilarity(
	title1: string,
	description1: string,
	title2: string,
	description2: string
): Promise<number> {
	const apiKey = process.env.OPENAI_API_KEY || process.env.ANTHROPIC_API_KEY;
	if (!apiKey) {
		return 0; // AI APIキーがない場合は0を返す
	}

	try {
		const provider = process.env.AI_PROVIDER || 'openai';
		const prompt = `Rate the semantic similarity between these two blog posts on a scale of 0.0 to 1.0. Return only a number.

Post 1:
Title: ${title1}
Description: ${description1}

Post 2:
Title: ${title2}
Description: ${description2}

Similarity score (0.0-1.0):`;

		if (provider === 'openai') {
			const response = await fetch('https://api.openai.com/v1/chat/completions', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${apiKey}`,
				},
				body: JSON.stringify({
					model: 'gpt-4',
					messages: [
						{
							role: 'user',
							content: prompt,
						},
					],
					temperature: 0.3,
					max_tokens: 10,
				}),
			});

			if (response.ok) {
				const data = await response.json();
				const scoreText = data.choices[0]?.message?.content?.trim();
				const score = parseFloat(scoreText || '0');
				return isNaN(score) ? 0 : Math.max(0, Math.min(1, score));
			}
		}
	} catch (error) {
		console.warn('AI similarity calculation failed:', error);
	}

	return 0;
}

/**
 * 関連記事を計算
 */
export async function findRelatedPosts(
	currentPost: BlogMetadata,
	allPosts: BlogMetadata[],
	options: RelatedPostsOptions = {}
): Promise<RelatedPostScore[]> {
	const {
		useAI = false,
		maxResults = 5,
		minScore = 0.1,
	} = options;

	const scores: RelatedPostScore[] = [];

	for (const post of allPosts) {
		// 自分自身は除外
		if (post.slug === currentPost.slug) {
			continue;
		}

		const reasons: string[] = [];
		let totalScore = 0;

		// タグの一致度（重み: 0.4）
		const tagSimilarity = calculateTagSimilarity(
			currentPost.tags,
			post.tags
		);
		if (tagSimilarity.score > 0) {
			const tagScore = tagSimilarity.score * 0.4;
			totalScore += tagScore;
			if (tagSimilarity.matchedTags.length > 0) {
				reasons.push(
					`Shared tags: ${tagSimilarity.matchedTags.join(', ')}`
				);
			}
		}

		// カテゴリーの一致度（重み: 0.3）
		const categorySimilarity = calculateCategorySimilarity(
			currentPost.category,
			post.category
		);
		if (categorySimilarity > 0) {
			const categoryScore = categorySimilarity * 0.3;
			totalScore += categoryScore;
			reasons.push('Same category');
		}

		// AIによる意味的類似度（重み: 0.3、オプション）
		if (useAI) {
			// タイトルと説明を取得する必要があるため、メタデータからは取得できない
			// この場合は翻訳ファイルから取得する必要がある
			// 簡易版として、タグとカテゴリーのみで判定
		}

		// スコアが最小値以上の場合のみ追加
		if (totalScore >= minScore) {
			scores.push({
				slug: post.slug,
				score: totalScore,
				reasons,
			});
		}
	}

	// スコアでソート（降順）
	scores.sort((a, b) => b.score - a.score);

	// 最大結果数を返す
	return scores.slice(0, maxResults);
}

/**
 * 関連記事のスラッグリストを取得（簡易版）
 */
export function getRelatedPostSlugs(
	currentPost: BlogMetadata,
	allPosts: BlogMetadata[],
	maxResults: number = 5
): string[] {
	const scores = allPosts
		.filter(post => post.slug !== currentPost.slug)
		.map(post => {
			const tagSimilarity = calculateTagSimilarity(
				currentPost.tags,
				post.tags
			);
			const categorySimilarity = calculateCategorySimilarity(
				currentPost.category,
				post.category
			);

			const score = tagSimilarity.score * 0.6 + categorySimilarity * 0.4;

			return {
				slug: post.slug,
				score,
			};
		})
		.filter(item => item.score > 0)
		.sort((a, b) => b.score - a.score)
		.slice(0, maxResults)
		.map(item => item.slug);

	return scores;
}
