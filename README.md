# Astro + React 技術ブログ

Astro、React、shadcn/ui、TailwindCSSを使用したモダンな技術ブログです。アイランドアーキテクチャを活用し、高速で軽量なブログを実現しています。

## 🚀 使用技術

- **[Astro](https://astro.build/)** - 静的サイトジェネレーター
- **[React](https://react.dev/)** - UIライブラリ
- **[TailwindCSS](https://tailwindcss.com/)** - ユーティリティファーストCSSフレームワーク
- **[shadcn/ui](https://ui.shadcn.com/)** - 再利用可能なUIコンポーネント
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - ホスティング

## 📁 プロジェクト構造

```
/
├── src/
│   ├── components/      # Reactコンポーネント
│   │   ├── ui/         # shadcn/uiコンポーネント
│   │   └── BlogCard.tsx
│   ├── content/        # ブログ記事（Markdown）
│   │   └── blog/
│   ├── layouts/        # Astroレイアウト
│   ├── pages/          # ルーティング
│   │   ├── index.astro
│   │   └── blog/
│   ├── styles/         # グローバルCSS
│   └── lib/           # ユーティリティ関数
├── public/            # 静的アセット
├── astro.config.mjs   # Astro設定
├── tailwind.config.mjs # Tailwind設定
└── package.json
```

## 🛠️ セットアップ

### 前提条件

- Node.js 20以上
- npm または yarn

### インストール

```bash
# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview
```

## 📝 ブログ記事の追加

新しいブログ記事は `src/content/blog/` ディレクトリにMarkdownファイルを追加します。

```markdown
---
title: '記事タイトル'
description: '記事の説明'
date: '2024-11-20'
readTime: '5分'
tags: ['タグ1', 'タグ2']
slug: 'article-slug'
author: '著者名'
---

記事の内容をここに書きます...
```

## 🚢 Cloudflare Pagesへのデプロイ

### 1. GitHubリポジトリと連携

1. Cloudflare Pagesのダッシュボードにアクセス
2. 「Create a project」をクリック
3. GitHubリポジトリを選択

### 2. ビルド設定

- **Framework preset**: Astro
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Node version**: 20

### 3. 環境変数（必要に応じて）

プロジェクトに環境変数が必要な場合は、Cloudflare Pagesの設定から追加します。

## 🎨 カスタマイズ

### カラーテーマの変更

`src/styles/globals.css` のCSS変数を変更してテーマをカスタマイズできます。

### 新しいUIコンポーネントの追加

shadcn/uiの他のコンポーネントをプロジェクトに追加する場合は、
[公式ドキュメント](https://ui.shadcn.com/docs/components)を参照してください。

## 📚 ドキュメント

詳細なハンズオン教材は `TUTORIAL.md` を参照してください。

## 📄 ライセンス

MIT
