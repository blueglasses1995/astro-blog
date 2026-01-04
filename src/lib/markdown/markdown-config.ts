/**
 * Markdown処理の設定を管理
 */

export interface MarkdownProcessorConfig {
  // Rehypeプラグインの有効/無効
  plugins: {
    slug: boolean;
    headingId: boolean;
    toggleableHeading: boolean;
    toggleableCode: boolean;
    blogLink: boolean;
  };
  
  // その他のオプション
  options: {
    // Astroの `markdown.syntaxHighlight` に合わせる
    // - false: Astroの内蔵ハイライトを無効化（Expressive Code等で処理）
    // - "shiki" / "prism": Astroの内蔵ハイライトを使用
    syntaxHighlight: false | 'shiki' | 'prism';
    expressiveCode: boolean;
  };
}

export interface MarkdownStyleConfig {
  // 基本スタイル
  baseClasses: string;
  
  // 要素別スタイル
  elementStyles: {
    headings: string;
    paragraphs: string;
    links: string;
    code: string;
    blockquote: string;
    lists: string;
    tables: string;
    images: string;
    horizontalRule: string;
  };
  
  // ダークモード対応
  darkMode: boolean;
}

/**
 * デフォルト設定
 */
export const defaultProcessorConfig: MarkdownProcessorConfig = {
  plugins: {
    slug: true,
    headingId: true,
    toggleableHeading: true,
    toggleableCode: true,
    blogLink: true,
  },
  options: {
    syntaxHighlight: false, // Expressive Code使用
    expressiveCode: true,
  },
};

/**
 * デフォルトスタイル設定
 */
export const defaultStyleConfig: MarkdownStyleConfig = {
  baseClasses: 'prose prose-lg max-w-none',
  darkMode: true,
  elementStyles: {
    headings: 'prose-headings:font-bold prose-headings:text-foreground',
    paragraphs: 'prose-p:text-foreground prose-p:leading-7',
    links: 'prose-a:text-primary prose-a:underline prose-a:transition-all prose-a:duration-200 hover:prose-a:opacity-80 hover:prose-a:underline-offset-2',
    code: 'prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[\'\'] prose-code:after:content-[\'\']',
    blockquote: 'prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground',
    lists: 'prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-li:marker:text-primary',
    tables: 'prose-table:w-full prose-table:my-8 prose-thead:border-b prose-thead:border-border prose-th:text-foreground prose-th:font-semibold prose-tbody:tr:border-b prose-tbody:tr:border-border prose-td:text-foreground',
    images: 'prose-img:rounded-lg prose-img:shadow-lg',
    horizontalRule: 'prose-hr:border-border prose-hr:my-8',
  },
};
