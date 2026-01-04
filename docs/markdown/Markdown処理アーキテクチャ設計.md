# Markdown処理アーキテクチャ設計

## 概要

Markdownファイルのパース処理とUI構築ロジックを分離し、保守性と拡張性を向上させるためのアーキテクチャ設計書。

## 現状の問題点

### 1. 処理の混在
- **パース処理**（rehypeプラグイン）と**UI構築**（スタイルクラス）が同じファイルに混在
- `[slug].astro`に直接スタイルクラスが記述されている
- 設定が複数の場所に散在している

### 2. 保守性の課題
- スタイル変更時に複数ファイルを修正する必要がある
- 新しいマークダウン要素の追加が困難
- テストが困難

### 3. 再利用性の欠如
- 他のページで同じマークダウン表示を使い回せない
- 設定の共有ができない

---

## 提案アーキテクチャ

### レイヤー構造

```
┌─────────────────────────────────────┐
│   Presentation Layer (UI)           │
│   - MarkdownRenderer.astro          │
│   - MarkdownContent.astro           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Configuration Layer                │
│   - markdown-config.ts              │
│   - markdown-styles.ts              │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Processing Layer                   │
│   - markdown-processor.ts           │
│   - rehype plugins (既存)           │
└─────────────────────────────────────┘
              ↓
┌─────────────────────────────────────┐
│   Data Layer                         │
│   - Markdown files                   │
│   - Frontmatter                      │
└─────────────────────────────────────┘
```

---

## 1. Processing Layer（処理層）

### 1.1 役割
- Markdownファイルのパース
- AST（Abstract Syntax Tree）の変換
- データ構造への変換

### 1.2 実装

#### `src/lib/markdown/markdown-processor.ts`

```typescript
/**
 * Markdown処理のエントリーポイント
 * パース処理と変換処理を統合
 */

import type { MarkdownProcessorConfig } from './markdown-config';

export interface ProcessedMarkdown {
  content: string; // HTML文字列
  headings: Array<{ depth: number; slug: string; text: string }>;
  metadata: Record<string, any>;
}

/**
 * Markdownファイルを処理する
 * 
 * @param markdownContent - マークダウンの生テキスト
 * @param config - 処理設定
 * @returns 処理済みのMarkdownデータ
 */
export async function processMarkdown(
  markdownContent: string,
  config: MarkdownProcessorConfig
): Promise<ProcessedMarkdown> {
  // AstroのMarkdown処理を利用
  // 実際の実装はAstroの内部APIを使用
  // ここではインターフェースのみ定義
  throw new Error('Not implemented - use Astro.glob() and getHeadings()');
}

/**
 * Rehypeプラグインの設定を取得
 */
export function getRehypePlugins() {
  // astro.config.mjsから分離
  return [
    'rehypeSlug',
    'rehypeHeadingId',
    'rehypeToggleableHeading',
    'rehypeToggleableCode',
    'rehypeBlogLink',
  ];
}
```

**注意**: AstroのMarkdown処理はビルド時に実行されるため、この層は主に設定の管理とプラグインの整理に使用。

---

## 2. Configuration Layer（設定層）

### 2.1 役割
- スタイルクラスの定義
- 設定オプションの管理
- テーマ設定

### 2.2 実装

#### `src/lib/markdown/markdown-config.ts`

```typescript
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
    syntaxHighlight: boolean;
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
    links: 'prose-a:text-primary prose-a:no-underline hover:prose-a:underline',
    code: 'prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[\'\'] prose-code:after:content-[\'\']',
    blockquote: 'prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground',
    lists: 'prose-ul:text-foreground prose-ol:text-foreground prose-li:text-foreground prose-li:marker:text-primary',
    tables: '', // 今後追加
    images: 'prose-img:rounded-lg prose-img:shadow-lg',
    horizontalRule: '', // 今後追加
  },
};
```

#### `src/lib/markdown/markdown-styles.ts`

```typescript
/**
 * Markdownスタイルの生成と管理
 */

import type { MarkdownStyleConfig } from './markdown-config';
import { defaultStyleConfig } from './markdown-config';

/**
 * スタイルクラス文字列を生成
 */
export function generateMarkdownStyles(
  config: MarkdownStyleConfig = defaultStyleConfig
): string {
  const classes = [
    config.baseClasses,
    config.darkMode ? 'dark:prose-invert' : '',
    config.elementStyles.headings,
    config.elementStyles.paragraphs,
    config.elementStyles.links,
    config.elementStyles.code,
    config.elementStyles.blockquote,
    config.elementStyles.lists,
    config.elementStyles.tables,
    config.elementStyles.images,
    config.elementStyles.horizontalRule,
  ]
    .filter(Boolean)
    .join(' ');

  return classes;
}

/**
 * カスタムスタイル設定をマージ
 */
export function mergeStyleConfig(
  base: MarkdownStyleConfig,
  overrides: Partial<MarkdownStyleConfig>
): MarkdownStyleConfig {
  return {
    ...base,
    ...overrides,
    elementStyles: {
      ...base.elementStyles,
      ...overrides.elementStyles,
    },
  };
}
```

---

## 3. Presentation Layer（表示層）

### 3.1 役割
- UIコンポーネントの提供
- スタイルの適用
- インタラクティブ要素の統合

### 3.2 実装

#### `src/components/markdown/MarkdownRenderer.astro`

```astro
---
/**
 * Markdownコンテンツをレンダリングする汎用コンポーネント
 * 
 * 使用例:
 * ```astro
 * <MarkdownRenderer 
 *   content={Content}
 *   styleConfig={customConfig}
 * />
 * ```
 */

import { generateMarkdownStyles } from '../../lib/markdown/markdown-styles';
import type { MarkdownStyleConfig } from '../../lib/markdown/markdown-config';
import { defaultStyleConfig } from '../../lib/markdown/markdown-config';

interface Props {
  content: any; // AstroのContentコンポーネント
  styleConfig?: Partial<MarkdownStyleConfig>;
  className?: string;
}

const { content, styleConfig = {}, className = '' } = Astro.props;

// スタイル設定をマージ
const mergedConfig = {
  ...defaultStyleConfig,
  ...styleConfig,
  elementStyles: {
    ...defaultStyleConfig.elementStyles,
    ...styleConfig.elementStyles,
  },
};

// スタイルクラスを生成
const styleClasses = generateMarkdownStyles(mergedConfig);
---

<div class={`${styleClasses} ${className}`}>
  <slot name="content">
    {content && <content />}
  </slot>
</div>
```

#### `src/components/markdown/MarkdownContent.astro`

```astro
---
/**
 * ブログ記事用のMarkdownコンテンツコンポーネント
 * インタラクティブ要素（ToggleableHeading等）を含む
 */

import MarkdownRenderer from './MarkdownRenderer.astro';
import { ToggleableHeading } from '../ToggleableHeading';
import { ToggleableCodeBlock } from '../ToggleableCodeBlock';
import { HeadingLinkIcon } from '../HeadingLinkIcon';

interface Props {
  content: any;
  styleConfig?: Partial<MarkdownStyleConfig>;
}

const { content, styleConfig } = Astro.props;
---

<MarkdownRenderer content={content} styleConfig={styleConfig}>
  <slot name="content" />
</MarkdownRenderer>

<!-- インタラクティブ要素 -->
<ToggleableHeading client:load />
<ToggleableCodeBlock client:load previewLines={5} />
<HeadingLinkIcon client:load />
```

---

## 4. 統合実装

### 4.1 `[slug].astro`のリファクタリング

#### Before（現在）

```astro
<div class="prose prose-lg max-w-none dark:prose-invert
  prose-headings:font-bold prose-headings:text-foreground
  prose-p:text-foreground prose-p:leading-7
  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
  prose-strong:text-foreground prose-strong:font-semibold
  prose-code:text-primary prose-code:bg-muted prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-['']
  prose-pre:bg-muted prose-pre:border prose-pre:border-border
  prose-blockquote:border-l-primary prose-blockquote:text-muted-foreground
  prose-ul:text-foreground prose-ol:text-foreground
  prose-li:text-foreground prose-li:marker:text-primary
  prose-img:rounded-lg prose-img:shadow-lg
  ">
  <Content />
</div>
<!-- Toggleable components -->
<ToggleableHeading client:load />
<ToggleableCodeBlock client:load previewLines={5} />
<HeadingLinkIcon client:load />
```

#### After（リファクタリング後）

```astro
---
import MarkdownContent from '../../../components/markdown/MarkdownContent.astro';
---

<MarkdownContent content={Content} />
```

### 4.2 `astro.config.mjs`の整理

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import astroExpressiveCode from 'astro-expressive-code';
import rehypeSlug from 'rehype-slug';
import { rehypeHeadingId } from './src/lib/rehype-heading-id.mjs';
import { rehypeBlogLink } from './src/lib/rehype-blog-link.mjs';
import { rehypeToggleableHeading } from './src/lib/rehype-toggleable-heading.mjs';
import { rehypeToggleableCode } from './src/lib/rehype-toggleable-code.mjs';
import { defaultProcessorConfig } from './src/lib/markdown/markdown-config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    astroExpressiveCode({
      themes: ['github-dark', 'github-light'],
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontSize: '0.875rem',
        codeLineHeight: '1.75',
      },
    }),
  ],
  markdown: {
    rehypePlugins: [
      // 設定に基づいてプラグインを動的に追加
      ...(defaultProcessorConfig.plugins.slug ? [rehypeSlug] : []),
      ...(defaultProcessorConfig.plugins.headingId ? [rehypeHeadingId] : []),
      ...(defaultProcessorConfig.plugins.toggleableHeading ? [rehypeToggleableHeading] : []),
      ...(defaultProcessorConfig.plugins.toggleableCode ? [rehypeToggleableCode] : []),
      ...(defaultProcessorConfig.plugins.blogLink ? [rehypeBlogLink] : []),
    ],
    syntaxHighlight: defaultProcessorConfig.options.syntaxHighlight,
  },
  output: 'hybrid',
  adapter: cloudflare(),
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'zh', 'th', 'de', 'fr', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
```

---

## 5. ディレクトリ構造

```
src/
├── lib/
│   └── markdown/
│       ├── markdown-config.ts      # 設定定義
│       ├── markdown-styles.ts      # スタイル生成
│       └── markdown-processor.ts    # 処理ロジック（将来拡張用）
│
├── components/
│   └── markdown/
│       ├── MarkdownRenderer.astro   # 基本レンダラー
│       └── MarkdownContent.astro    # ブログ記事用（インタラクティブ要素含む）
│
└── pages/
    └── [locale]/
        └── blog/
            └── [slug].astro         # リファクタリング後
```

---

## 6. 実装手順

### Phase 1: 設定層の実装
1. `src/lib/markdown/markdown-config.ts`を作成
2. `src/lib/markdown/markdown-styles.ts`を作成
3. 既存のスタイルクラスを設定に移行

### Phase 2: 表示層の実装
1. `src/components/markdown/MarkdownRenderer.astro`を作成
2. `src/components/markdown/MarkdownContent.astro`を作成
3. スタイル生成ロジックをテスト

### Phase 3: 統合
1. `[slug].astro`をリファクタリング
2. `astro.config.mjs`を整理
3. 動作確認

### Phase 4: 拡張
1. 他のページでも使用可能にする
2. カスタムスタイル設定の追加
3. テストの追加

---

## 7. メリット

### 7.1 保守性の向上
- ✅ スタイル変更が一箇所で完結
- ✅ 設定の一元管理
- ✅ コードの重複削減

### 7.2 拡張性の向上
- ✅ 新しいマークダウン要素の追加が容易
- ✅ カスタムスタイルの適用が簡単
- ✅ プラグインの有効/無効を設定で制御

### 7.3 再利用性の向上
- ✅ 他のページでも同じコンポーネントを使用可能
- ✅ 設定の共有
- ✅ コンポーネントの再利用

### 7.4 テスト容易性
- ✅ 各レイヤーを独立してテスト可能
- ✅ モックの作成が容易
- ✅ 設定の検証が簡単

---

## 8. 将来の拡張案

### 8.1 テーマシステム
```typescript
export const markdownThemes = {
  default: defaultStyleConfig,
  minimal: { /* 最小限のスタイル */ },
  rich: { /* リッチなスタイル */ },
};
```

### 8.2 プラグインシステム
```typescript
interface MarkdownPlugin {
  name: string;
  process: (content: string) => string;
  styles?: string;
}
```

### 8.3 カスタム要素の追加
```typescript
// カスタム要素（例: アラートボックス）のサポート
export const customElements = {
  'alert': { component: AlertBox, styles: '...' },
  'callout': { component: Callout, styles: '...' },
};
```

---

## 9. 注意事項

### 9.1 Astroの制約
- Markdown処理はビルド時に実行される
- 動的なパース処理は制限される
- `Content`コンポーネントはAstroが自動生成

### 9.2 パフォーマンス
- 設定の読み込みはビルド時に最適化される
- スタイルクラスの生成は軽量
- クライアントサイドの処理は最小限に

### 9.3 互換性
- 既存のrehypeプラグインとの互換性を維持
- 既存のスタイルとの互換性を確認
- 段階的な移行を推奨

---

## 10. 参考実装例

### 10.1 シンプルな使用例

```astro
---
import MarkdownRenderer from '../../components/markdown/MarkdownRenderer.astro';
const { Content } = Astro.props;
---

<MarkdownRenderer content={Content} />
```

### 10.2 カスタムスタイルの適用

```astro
---
import MarkdownRenderer from '../../components/markdown/MarkdownRenderer.astro';
import { mergeStyleConfig, defaultStyleConfig } from '../../lib/markdown/markdown-config';

const customConfig = mergeStyleConfig(defaultStyleConfig, {
  elementStyles: {
    headings: 'prose-headings:text-blue-600',
  },
});
---

<MarkdownRenderer content={Content} styleConfig={customConfig} />
```

### 10.3 ブログ記事用（インタラクティブ要素含む）

```astro
---
import MarkdownContent from '../../components/markdown/MarkdownContent.astro';
---

<MarkdownContent content={Content} />
```

---

## 更新履歴

- 2025-01-02: 初版作成
