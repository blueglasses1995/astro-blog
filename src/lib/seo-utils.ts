/**
 * SEO最適化ユーティリティ
 */

/**
 * メタディスクリプションを生成
 */
export function generateMetaDescription(
	title: string,
	description: string,
	maxLength: number = 160
): string {
	// タイトルと説明を組み合わせて最適なメタディスクリプションを生成
	const combined = `${title} - ${description}`;
	
	if (combined.length <= maxLength) {
		return combined;
	}
	
	// 最大長を超える場合は説明を切り詰める
	if (description.length <= maxLength - title.length - 3) {
		return `${title} - ${description}`;
	}
	
	// 説明を切り詰める
	const truncated = description.substring(0, maxLength - title.length - 3);
	return `${title} - ${truncated}...`;
}

/**
 * hreflangタグを生成（多言語対応）
 */
export function generateHreflangTags(
	slug: string,
	availableLocales: string[],
	defaultLocale: string
): Array<{ rel: string; hreflang: string; href: string }> {
	return availableLocales.map(locale => ({
		rel: 'alternate',
		hreflang: locale === defaultLocale ? 'x-default' : locale,
		href: locale === defaultLocale
			? `https://example.com/blog/${slug}` // 実際のドメインに置き換える
			: `https://example.com/${locale}/blog/${slug}`,
	}));
}

/**
 * 構造化データ（JSON-LD）を生成
 */
export function generateStructuredData(
	title: string,
	description: string,
	author: string,
	pubDate: string,
	updatedDate?: string
): object {
	return {
		'@context': 'https://schema.org',
		'@type': 'BlogPosting',
		headline: title,
		description: description,
		author: {
			'@type': 'Person',
			name: author,
		},
		datePublished: pubDate,
		dateModified: updatedDate || pubDate,
	};
}
