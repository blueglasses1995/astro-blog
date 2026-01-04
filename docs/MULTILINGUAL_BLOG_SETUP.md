# 多言語ブログ自動化システム

このシステムは、ビルド時に生成AIを使用してブログ記事を多言語化し、関連記事を自動生成する機能を提供します。

## 機能

- **メタデータ分離**: 言語非依存のメタデータ（タグ、カテゴリー、関連記事など）を共通ファイルで管理
- **AI翻訳**: OpenAI、Anthropic、Google Geminiを使用した自動翻訳
- **関連記事自動生成**: タグとカテゴリーの一致度に基づいて関連記事を自動計算
- **SEO最適化**: メタディスクリプション、hreflangタグ、構造化データの自動生成
- **画像altテキスト生成**: AIを使用して画像のaltテキストを自動生成
- **読了時間の自動計算**: 各言語の文字数から読了時間を自動計算

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`.env`ファイルを作成し、以下の変数を設定：

```env
# AI Provider Configuration
AI_PROVIDER=openai
# Options: openai, anthropic, gemini

# API Keys (set at least one based on AI_PROVIDER)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here

# Source and Target Locales
SOURCE_LOCALE=ja
TARGET_LOCALES=en,zh,th,de,fr,es

# Related Posts Configuration
MAX_RELATED_POSTS=5

# GitHub Repository URL (optional)
PUBLIC_GITHUB_REPO_URL=https://github.com/yourusername/astro-blog

# Site URL for SEO (optional)
PUBLIC_SITE_URL=https://yourdomain.com
```

### 3. ファイル構造

記事を`src/content/blog/`に配置します。例：

```
src/content/blog/
├── my-article.md          # 元の記事（ソース言語）
├── metadata/               # 自動生成されるメタデータ
│   └── my-article.json
└── translations/           # 自動生成される翻訳
    ├── my-article.en.md
    ├── my-article.zh.md
    └── my-article.th.md
```

## 使用方法

### 基本的なワークフロー

1. **記事を書く**: `src/content/blog/`にマークダウンファイルを作成
2. **メタデータを抽出**: 
```bash
npm run preprocess
```

3. **翻訳を生成**:
```bash
npm run translate
```

4. **関連記事を生成**:
```bash
npm run related
```

5. **ビルド**: すべてのステップが自動実行されます
```bash
npm run build
```

### 個別のスクリプト

- `npm run preprocess`: メタデータを抽出して`metadata/`に保存
- `npm run translate`: 記事を各言語に翻訳して`translations/`に保存
- `npm run related`: 関連記事を計算してメタデータに追加
- `npm run image-alt`: 画像のaltテキストを生成（オプション）

## 記事の書き方

### フロントマター

```markdown
---
title: "記事のタイトル"
description: "記事の説明"
date: "2024-01-01"
updatedDate: "2024-01-15"
tags: ["tag1", "tag2"]
category: "カテゴリー"
author: "著者名"
slug: "article-slug"
---
```

### メタデータの自動管理

以下のフィールドは言語非依存のメタデータとして`metadata/{slug}.json`に保存されます：

- `tags`: タグリスト
- `category`: カテゴリー
- `author`: 著者
- `pubDate`: 公開日
- `updatedDate`: 更新日
- `relatedPosts`: 関連記事のスラッグリスト（自動生成）

以下のフィールドは各言語の翻訳ファイルに保存されます：

- `title`: 翻訳されたタイトル
- `description`: 翻訳された説明
- `content`: 翻訳された本文
- `readTime`: 計算された読了時間

## 関連記事

関連記事は以下の基準で自動計算されます：

- **タグの一致度** (60%の重み)
- **カテゴリーの一致度** (40%の重み)

関連記事はブログ記事ページの下部に自動表示されます。

## SEO機能

以下のSEO機能が自動的に適用されます：

- **メタディスクリプション**: タイトルと説明から最適な長さで生成
- **hreflangタグ**: 多言語対応のための言語タグ
- **構造化データ**: JSON-LD形式の構造化データ
- **Open Graph / Twitter Card**: ソーシャルメディア用のメタタグ

## トラブルシューティング

### 翻訳が生成されない

- APIキーが正しく設定されているか確認
- 環境変数`AI_PROVIDER`が正しく設定されているか確認
- APIのレート制限に達していないか確認

### 関連記事が表示されない

- `npm run related`を実行して関連記事を生成
- メタデータファイルが正しく生成されているか確認
- タグやカテゴリーが設定されているか確認

### ビルドエラー

- `npm run preprocess`を先に実行
- メタデータファイルが存在するか確認
- 翻訳ファイルが存在するか確認

## カスタマイズ

### 翻訳プロバイダーの変更

`.env`ファイルで`AI_PROVIDER`を変更：

```env
AI_PROVIDER=anthropic  # または gemini
```

### 対象言語の変更

`.env`ファイルで`TARGET_LOCALES`を変更：

```env
TARGET_LOCALES=en,zh,th,de,fr,es
```

### 関連記事の最大数を変更

`.env`ファイルで`MAX_RELATED_POSTS`を変更：

```env
MAX_RELATED_POSTS=10
```

## 注意事項

- AI APIの使用にはコストがかかります
- 翻訳の品質はAIプロバイダーによって異なります
- 大量の記事を翻訳する場合は、APIレート制限に注意してください
- 生成された翻訳は必ず確認・編集することを推奨します
