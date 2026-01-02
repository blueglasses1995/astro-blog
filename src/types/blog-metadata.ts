/**
 * 言語非依存のブログ記事メタデータ
 */
export interface BlogMetadata {
	/** 記事のスラッグ（言語非依存） */
	slug: string;
	/** タグ（言語非依存） */
	tags: string[];
	/** カテゴリー（言語非依存） */
	category?: string;
	/** 著者情報 */
	author?: string;
	/** 公開日 */
	pubDate: string;
	/** 更新日 */
	updatedDate?: string;
	/** ヒーロー画像 */
	heroImage?: string;
	/** エイリアス（自動リンク用） */
	aliases?: string[];
	/** 関連記事のスラッグリスト */
	relatedPosts?: string[];
	/** ソース言語（元の記事の言語） */
	sourceLocale: string;
	/** 対応している翻訳言語 */
	availableLocales: string[];
}
