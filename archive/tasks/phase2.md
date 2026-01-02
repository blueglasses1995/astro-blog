# 🧱 ローカル開発環境（Dev Container）

### ゴール

VSCode上で完全に再現可能な開発環境を構築し、
**Docker Compose でローカル開発環境を統一すること。**

---

## 🐳 ステップ1：Docker Compose基盤

### 手順

| タスク | 作業内容                           | コマンド・ファイル                            | DoD（確認方法）                                   |
| ---- | ------------------------------ | ------------------------------------ | ------------------------------------------- |
| 1️⃣  | docker-compose.yml作成           | backend + frontend + db の3サービス構成   | `docker-compose config` でvalidation成功      |
| 2️⃣  | PostgreSQL (Docker)設定         | RDSと同構成のローカルDB                    | `docker-compose up db` でPostgreSQL起動      |
| 3️⃣  | backend サービス（Hono.js）         | ホットリロード対応の開発環境                     | `curl localhost:3000/health` でレスポンス確認    |
| 4️⃣  | frontend サービス（Vite）          | React + Viteの開発サーバー                | `curl localhost:5173` でVite開発サーバー確認      |
| 5️⃣  | ネットワーク疎通確認                     | frontend → backend API通信             | フロントエンドからAPIコール成功                          |

---

## 📦 ステップ2：Dev Container設定

### 構成内容

* .devcontainer/devcontainer.json
* VSCode拡張機能の自動インストール  
* 開発に必要なツールの事前セットアップ
* PostgreSQL接続設定

### コード例

```json
// .devcontainer/devcontainer.json
{
  "name": "tech-blog-dev",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "backend",
  "workspaceFolder": "/workspace",
  "extensions": [
    "eamodio.gitlens",
    "ms-azuretools.vscode-docker",
    "github.vscode-github-actions",
    "formulahendry.code-runner",
    "bradlc.vscode-tailwindcss",
    "esbenp.prettier-vscode"
  ],
  "settings": {
    "terminal.integrated.defaultProfile.linux": "zsh"
  },
  "postCreateCommand": "npm install"
}
```

### DoD（確認）

| 項目            | 方法                            | 期待結果                         |
| ------------- | ----------------------------- | -------------------------- |
| Dev Container起動 | VSCode Remote Containers拡張使用 | コンテナ内でVSCodeが開く            |
| 拡張機能自動インストール  | 拡張機能一覧確認                      | 指定した拡張機能がすべてインストール済み       |
| データベース接続      | コンテナ内からpsqlコマンド実行            | PostgreSQLに接続できる           |
| ホットリロード       | コード修正 → 自動反映確認               | backend/frontendが自動で再起動    |

---

## 🔧 ステップ3：開発ツール統合

### 構成内容

* GitLens / GitKraken（Git可視化）
* Console Ninja（リアルタイムログ）
* 環境変数管理（.env.local）
* npm scriptsの統一

### タスク一覧

| タスク | 作業内容                           | ファイル                        | DoD（確認方法）                  |
| ---- | ------------------------------ | --------------------------- | -------------------------- |
| 1️⃣  | GitLens設定                     | .vscode/settings.json       | コミット履歴がVSCode内で表示される      |
| 2️⃣  | 環境変数テンプレート作成                 | .env.example                | 必要な環境変数がドキュメント化されている     |
| 3️⃣  | npm scripts統一                 | package.json (root)         | `npm run dev` で全サービス起動     |
| 4️⃣  | Prettier/ESLint設定             | .prettierrc, .eslintrc.js   | `npm run lint` でコードチェック成功  |
| 5️⃣  | TypeScript設定                  | tsconfig.json               | 型チェックがエラーなく通る            |

---

## 🎯 ステップ4：データベース初期化

### 構成内容

* マイグレーションファイル
* シードデータ
* Kyselyセットアップ
* 開発用データ投入

### コード例

```typescript
// backend/src/db/migrations/001_initial.ts
import { Kysely } from 'kysely'

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createTable('posts')
    .addColumn('id', 'serial', (col) => col.primaryKey())
    .addColumn('title', 'varchar(255)', (col) => col.notNull())
    .addColumn('content', 'text')
    .addColumn('language', 'varchar(10)', (col) => col.notNull().defaultTo('ja'))
    .addColumn('created_at', 'timestamp', (col) => col.defaultTo('now()'))
    .execute()
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropTable('posts').execute()
}
```

### DoD（確認）

| 項目       | 方法                                     | 期待結果                    |
| -------- | -------------------------------------- | ----------------------- |
| マイグレーション | `npm run migrate` コマンド実行               | テーブルが正しく作成される           |
| Kysely接続 | TypeScriptからクエリ実行                     | 型安全なクエリが動作する            |
| シードデータ   | `npm run seed` でサンプルデータ投入             | 開発用のサンプル記事が挿入される        |
| API接続    | `GET /api/v1/posts` エンドポイントへのリクエスト | JSON形式でデータが返る          |

---

## ✅ ステップ5：DoD総まとめ

| 項目                           | チェック方法                              | 状態 |
| ---------------------------- | ----------------------------------- | -- |
| Docker Composeで全サービス起動       | `docker-compose up -d`              | ✅  |
| Dev Container環境で開発可能         | VSCode Remote Containers            | ✅  |
| フロントエンド→バックエンドAPI通信         | ブラウザでフロントアクセス、API呼び出し確認           | ✅  |
| PostgreSQL接続・クエリ実行          | Kyselyを使った型安全なデータベース操作             | ✅  |
| Git履歴可視化（GitLens）           | コミット履歴とブランチがVSCode内で確認できる         | ✅  |
| ホットリロード動作                    | コード変更 → 自動反映確認                     | ✅  |

---

## 📘 推奨ディレクトリ構造

```bash
.devcontainer/
├── devcontainer.json
└── Dockerfile (optional)

backend/
├── src/
├── package.json
├── tsconfig.json
└── .env.example

frontend/
├── src/
├── package.json
├── vite.config.ts
└── .env.example

docker-compose.yml
.env.example
```
