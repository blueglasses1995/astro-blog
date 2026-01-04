# Portfolio & Tech Blog with Astro + React

Astro、React、Framer Motion、React Three Fiber、shadcn/ui、TailwindCSSを使用したモダンなポートフォリオ & 技術ブログです。アイランドアーキテクチャと最新のアニメーション技術を活用し、印象的でパフォーマンスの高いサイトを実現しています。

## ✨ 特徴

### 🎭 インタラクティブなUI
- **Framer Motion** による滑らかなアニメーション
- **React Three Fiber** による3D背景効果
- スクロールベースのアニメーション
- ホバーエフェクトとトランジション

### 📄 充実したページ構成
- **ホーム**: 3D要素を含む印象的なヒーローセクション
- **私について**: タイムライン形式の職歴とスキルチャート
- **ポートフォリオ**: フィルター機能付きプロジェクト一覧
- **CV/履歴書**: PDF出力対応の履歴書ページ
- **ブログ**: Markdown形式の技術記事

### 🚀 パフォーマンス
- アイランドアーキテクチャによる最適化
- 必要な部分だけJavaScriptをロード
- 高速な静的サイト生成
- SEOフレンドリー

## 🛠️ 使用技術

### コアテクノロジー
- **[Astro](https://astro.build/)** - 静的サイトジェネレーター
- **[React](https://react.dev/)** - UIライブラリ
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全な開発

### アニメーション & 3D
- **[Framer Motion](https://www.framer.com/motion/)** - アニメーションライブラリ
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)** - React用Three.js
- **[@react-three/drei](https://github.com/pmndrs/drei)** - R3Fヘルパーライブラリ

### スタイリング
- **[TailwindCSS](https://tailwindcss.com/)** - ユーティリティファーストCSS
- **[shadcn/ui](https://ui.shadcn.com/)** - 再利用可能なUIコンポーネント

### デプロイ
- **[Cloudflare Pages](https://pages.cloudflare.com/)** - ホスティング

## 📁 プロジェクト構造

```
/
├── src/
│   ├── components/          # Reactコンポーネント
│   │   ├── ui/             # shadcn/uiコンポーネント
│   │   ├── animations/     # アニメーション用コンポーネント
│   │   ├── 3d/            # Three.jsコンポーネント
│   │   ├── Hero.tsx       # ヒーローセクション
│   │   ├── ProjectCard.tsx
│   │   ├── SkillCard.tsx
│   │   ├── TimelineItem.tsx
│   │   └── Navigation.tsx
│   ├── content/            # Markdownコンテンツ
│   │   └── blog/          # ブログ記事
│   ├── data/              # 静的データ
│   │   └── profile.ts     # プロフィール、スキル、プロジェクトデータ
│   ├── layouts/           # Astroレイアウト
│   ├── pages/             # ルーティング
│   │   ├── index.astro        # ホーム
│   │   ├── about.astro        # 私について
│   │   ├── portfolio.astro    # ポートフォリオ
│   │   ├── cv.astro          # CV/履歴書
│   │   └── blog/             # ブログページ
│   ├── styles/            # グローバルCSS
│   ├── types/            # TypeScript型定義
│   └── lib/             # ユーティリティ関数
├── public/              # 静的アセット
├── astro.config.mjs     # Astro設定
├── tailwind.config.mjs  # Tailwind設定
├── tsconfig.json        # TypeScript設定
└── package.json
```

## 🚀 セットアップ

### 前提条件

- Node.js 20以上
- npm または yarn

### インストール

```bash
# リポジトリのクローン
git clone <repository-url>
cd astro-blog

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env
# .envファイルを編集して、Resend APIキーを設定してください

# 開発サーバーの起動
npm run dev

# 本番ビルド
npm run build

# プレビュー
npm run preview
```

### メール送信機能の設定

このプロジェクトでは、[Resend](https://resend.com/)を使用してメール送信機能を実装しています。

#### 1. Resendアカウントの作成

1. [Resend](https://resend.com/)にアクセスしてアカウントを作成
2. ダッシュボードからAPIキーを取得（無料プランで月3,000通まで送信可能）

#### 2. 環境変数の設定

プロジェクトルートに`.env`ファイルを作成し、以下の環境変数を設定：

```env
# Resend API Key
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx

# Contact Email (Optional)
# お問い合わせフォームの送信先メールアドレス
# 設定しない場合は、src/data/profile.tsのemailが使用されます
CONTACT_EMAIL=your.email@example.com
```

#### 3. Cloudflare Pagesでのデプロイ

Cloudflare Pagesでデプロイする場合、環境変数を設定：

1. Cloudflare Pagesのダッシュボードにアクセス
2. プロジェクトの「Settings」→「Environment Variables」に移動
3. 以下の環境変数を追加：
   - `RESEND_API_KEY`: ResendのAPIキー
   - `CONTACT_EMAIL`: お問い合わせフォームの送信先（任意）

**重要**: AstroのAPI routesを使用するため、`astro.config.mjs`の`output`設定を確認してください。Cloudflare PagesでAPI routesを使用する場合は、`output: 'server'`または`output: 'hybrid'`に設定する必要があります。

## 🎨 カスタマイズ

### プロフィール情報の編集

`src/data/profile.ts` を編集して、あなたの情報を追加：

```typescript
export const profile: ProfileData = {
  name: 'あなたの名前',
  title: 'あなたの肩書き',
  bio: '自己紹介文',
  email: 'your.email@example.com',
  // ...
};
```

### スキルの追加

```typescript
export const skills: Skill[] = [
  { name: 'React', level: 95, category: 'frontend' },
  // 新しいスキルを追加
];
```

### プロジェクトの追加

```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'プロジェクト名',
    description: '説明',
    image: '/projects/image.jpg',
    tags: ['React', 'TypeScript'],
    demoUrl: 'https://demo.com',
    githubUrl: 'https://github.com/...',
    featured: true,
  },
];
```

### ブログ記事の追加

`src/content/blog/` に新しい`.md`ファイルを作成：

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

### カラーテーマの変更

`src/styles/globals.css` のCSS変数を変更：

```css
:root {
  --primary: 222.2 47.4% 11.2%;  /* プライマリーカラー */
  --secondary: 210 40% 96.1%;    /* セカンダリーカラー */
  /* ... */
}
```

## 🚢 Cloudflare Pagesへのデプロイ

### 1. GitHubリポジトリと連携

1. [Cloudflare Pages](https://pages.cloudflare.com/) にアクセス
2. 「Create a project」をクリック
3. GitHubリポジトリを選択

### 2. ビルド設定

```
Framework preset: Astro
Build command: npm run build
Build output directory: dist
Node version: 20
```

**注意**: Cloudflare Pagesには「Deploy command」の設定項目はありません。`Build command`を実行すると、自動的にビルド出力がデプロイされます。

### 3. デプロイ

設定を保存すると、自動的にビルド & デプロイが開始されます。
以降、GitHubにプッシュするたびに自動デプロイされます。

---

### コマンドラインからのデプロイ（Wrangler CLI）

GUIではなく、コマンドラインから直接デプロイすることも可能です。

#### ステップ1: Wrangler CLIのインストール

```bash
npm install -D wrangler
```

または、グローバルにインストール：

```bash
npm install -g wrangler
```

#### ステップ2: Cloudflareにログイン

```bash
npx wrangler login
```

ブラウザが開き、Cloudflareアカウントでログインします。

#### ステップ3: プロジェクト名の確認

Cloudflare Pagesのダッシュボードで、既存のプロジェクト名を確認します。

#### ステップ4: デプロイ

```bash
# ビルドとデプロイを一度に実行
npm run build
npx wrangler pages deploy dist --project-name=YOUR_PROJECT_NAME
```

または、`package.json`に追加された`deploy`スクリプトを使用：

```bash
# プロジェクト名をpackage.jsonで設定済みの場合
npm run deploy
```

**注意**: 
- `YOUR_PROJECT_NAME`は、Cloudflare Pagesで設定したプロジェクト名に置き換えてください。
- `package.json`の`deploy`スクリプト内の`--project-name=astro-blog`も、実際のプロジェクト名に合わせて変更してください。

## 🎯 主要機能の説明

### アイランドアーキテクチャ

Astroのアイランドアーキテクチャにより、必要な部分だけにJavaScriptを配信：

```astro
<!-- 画面に表示されたらロード -->
<ProjectCard client:visible project={project} />

<!-- ブラウザがアイドル時にロード -->
<Hero client:idle />

<!-- すぐにロード -->
<Navigation client:load />
```

### 3D背景エフェクト

React Three Fiberを使用した3D要素：

```tsx
<FloatingShapes client:load />
```

### アニメーション

Framer Motionによる滑らかなアニメーション：

```tsx
<FadeIn client:load>
  <h1>コンテンツ</h1>
</FadeIn>

<SlideIn direction="left" delay={0.2}>
  <p>テキスト</p>
</SlideIn>
```

### フィルタリング機能

ポートフォリオページのインタラクティブなフィルター：

```tsx
<PortfolioFilter client:load projects={projects} />
```

### PDF出力

CVページはブラウザの印刷機能でPDF出力可能：

```tsx
<Button onClick="window.print()">PDFとしてダウンロード</Button>
```

## 📚 ドキュメント

詳細なハンズオン教材は `TUTORIAL.md` を参照してください。

## 🔧 トラブルシューティング

### ビルドエラー

```bash
# node_modulesを削除して再インストール
rm -rf node_modules package-lock.json
npm install
```

### 型エラー

```bash
# TypeScriptチェック
npm run astro check
```

## 📝 ライセンス

MIT

## 🙏 謝辞

このプロジェクトは以下の素晴らしいオープンソースプロジェクトを使用しています：

- [Astro](https://astro.build/)
- [React](https://react.dev/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
