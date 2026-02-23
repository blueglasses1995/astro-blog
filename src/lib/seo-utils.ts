/**
 * SEO最適化ユーティリティ
 */

const SITE_URL = import.meta.env.PUBLIC_SITE_URL || 'https://blog.toshikimatsukuma.com';
const SITE_NAME = 'Toshiki Matsukuma';

/**
 * メタディスクリプションを生成
 */
export function generateMetaDescription(
	title: string,
	description: string,
	maxLength: number = 160
): string {
	if (description && description.length <= maxLength) {
		return description;
	}

	const combined = `${title} - ${description}`;

	if (combined.length <= maxLength) {
		return combined;
	}

	const truncated = description.substring(0, maxLength - 3);
	return `${truncated}...`;
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
			? `${SITE_URL}/blog/${slug}`
			: `${SITE_URL}/${locale}/blog/${slug}`,
	}));
}

/**
 * 正規URL（canonical URL）を生成
 */
export function generateCanonicalUrl(pathname: string): string {
	// トレイリングスラッシュを正規化
	const normalized = pathname.endsWith('/') && pathname !== '/'
		? pathname.slice(0, -1)
		: pathname;
	return `${SITE_URL}${normalized}`;
}

/**
 * サイト名を取得
 */
export function getSiteName(): string {
	return SITE_NAME;
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
		publisher: {
			'@type': 'Person',
			name: SITE_NAME,
		},
	};
}
