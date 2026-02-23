import { defineConfig, passthroughImageService } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';
import astroExpressiveCode from 'astro-expressive-code';
import rehypeSlug from 'rehype-slug';
import remarkTaskList from 'remark-task-list';
import { rehypeHeadingId } from './src/lib/rehype-heading-id.mjs';
import { rehypeBlogLink } from './src/lib/rehype-blog-link.mjs';
import { rehypeHeadingShift } from './src/lib/rehype-heading-shift.mjs';
import { rehypeToggleableHeading } from './src/lib/rehype-toggleable-heading.mjs';
import { rehypeToggleableCode } from './src/lib/rehype-toggleable-code.mjs';
import { rehypeExternalImages } from './src/lib/rehype-external-images.mjs';
import { rehypeTableScope } from './src/lib/rehype-table-scope.mjs';
import { defaultProcessorConfig } from './src/lib/markdown/markdown-config';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    astroExpressiveCode({
      // テーマ設定（ダークモード対応）
      themes: ['github-dark', 'github-light'],
      // デフォルトのスタイルを調整
      styleOverrides: {
        borderRadius: '0.5rem',
        codeFontSize: '0.875rem',
        codeLineHeight: '1.75',
      },
    }),
  ],
  markdown: {
    // Remarkプラグイン（パース前の処理）
    remarkPlugins: [
      remarkTaskList, // タスクリスト（- [ ]）のサポート
    ],
    // Rehypeプラグインの設定
    // 設定は src/lib/markdown/markdown-config.ts の defaultProcessorConfig を参照
    rehypePlugins: [
      // 設定に基づいてプラグインを追加
      // 注: Astroの設定ファイルでは動的な条件分岐が難しいため、
      // プラグインの有効/無効は defaultProcessorConfig を参照して手動で調整
      ...(defaultProcessorConfig.plugins.slug ? [rehypeSlug] : []),
      ...(defaultProcessorConfig.plugins.headingId ? [rehypeHeadingId] : []),
      rehypeHeadingShift, // H1→H2 シフト（テンプレートH1との重複防止、常に有効）
      ...(defaultProcessorConfig.plugins.toggleableHeading ? [rehypeToggleableHeading] : []),
      ...(defaultProcessorConfig.plugins.toggleableCode ? [rehypeToggleableCode] : []),
      ...(defaultProcessorConfig.plugins.blogLink ? [rehypeBlogLink] : []),
      // テーブルのscope属性を自動付与（アクセシビリティ向上）
      rehypeTableScope,
      // 外部画像を確実に表示するためのプラグイン（常に有効）
      rehypeExternalImages,
    ],
    // Astroのデフォルトシンタックスハイライトを無効化（Expressive Codeが処理するため）
    syntaxHighlight: defaultProcessorConfig.options.syntaxHighlight,
  },
  output: 'hybrid', // API routesを使用するためhybridモードに変更
  adapter: cloudflare({
    // Cloudflare では Astro の built-in Sharp image service が互換でないため passthrough を明示
    imageService: 'passthrough',
  }),
  // 画像最適化は行わず、<Image/> 等の利用だけ可能にする
  image: {
    service: passthroughImageService(),
  },
  i18n: {
    defaultLocale: 'ja',
    locales: ['ja', 'en', 'zh', 'th', 'de', 'fr', 'es'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
  vite: {
    ssr: {
      noExternal: [],
      external: ['node:fs', 'node:path'],
    },
  },
});

