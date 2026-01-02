# 🌐 本格的なアプリ開発への移行

### ゴール

デプロイ・開発・監視が完全自動化された環境で、
**本格的な技術ブログ・知識基盤アプリケーションを開発すること。**

---

## 🔄 ステップ1：OpenAPI + orval導入

### 手順

| タスク | 作業内容                           | コマンド・ファイル                            | DoD（確認方法）                                   |
| ---- | ------------------------------ | ------------------------------------ | ------------------------------------------- |
| 1️⃣  | orvalインストールと設定               | `npm install -D orval`               | orval設定ファイルが作成されている                       |
| 2️⃣  | OpenAPI仕様書からTypeScript型生成      | `npx orval`                          | フロントエンド用API型定義が自動生成される                   |
| 3️⃣  | APIクライアント自動生成                | orval.config.js設定                   | API呼び出し関数が自動生成される                         |
| 4️⃣  | React側でのAPI型適用               | import生成されたAPI型                     | フロントエンドのAPI呼び出しが型安全になる                   |
| 5️⃣  | Zodスキーマとの整合性確認               | OpenAPI ↔ Zod ↔ TypeScript同期        | バックエンド・フロントエンドの型が完全に一致する                |

---

## 💾 ステップ2：RDS実運用開始

### 構成内容

* マイグレーション管理システム
* 本格的なデータモデル設計
* Kyselyでの型安全なクエリ
* バックアップ・復旧戦略

### データモデル例

```typescript
// backend/src/db/schema.ts
export interface Database {
  posts: {
    id: number
    title: string
    content: string
    language: 'ja' | 'en' | 'zh'
    slug: string
    published: boolean
    created_at: Date
    updated_at: Date
    author_id: number
  }
  
  categories: {
    id: number
    name: string
    slug: string
    language: 'ja' | 'en' | 'zh'
  }
  
  tags: {
    id: number
    name: string
    slug: string
  }
  
  post_tags: {
    post_id: number
    tag_id: number
  }
}
```

### DoD（確認）

| 項目            | 方法                            | 期待結果                         |
| ------------- | ----------------------------- | -------------------------- |
| RDS本格接続      | 本番用PostgreSQLへの接続確認          | ECS経由でRDSに接続できる           |
| マイグレーション管理   | `npm run migrate` でスキーマ更新     | データベーススキーマが正しく更新される      |
| Kysely型安全クエリ | TypeScriptでのデータベース操作          | コンパイル時に型エラーが検出される        |
| 多言語対応データ     | 日本語・英語・中国語のコンテンツ投入         | 各言語のデータが正しく保存・取得できる      |

---

## 🔍 ステップ3：ChromaDB / Python検索エンジン

### 構成内容

* ベクトル検索機能
* 知識グラフ構築
* 類似記事推薦
* セマンティック検索

### Python側実装例

```python
# search/src/search_engine.py
import chromadb
from chromadb.config import Settings

class TechBlogSearchEngine:
    def __init__(self):
        self.client = chromadb.Client(Settings(
            chroma_db_impl="duckdb+parquet",
            persist_directory="./chroma_db"
        ))
        self.collection = self.client.get_or_create_collection(
            name="tech_blog_posts"
        )
    
    def add_post(self, post_id: str, content: str, metadata: dict):
        self.collection.add(
            documents=[content],
            metadatas=[metadata],
            ids=[post_id]
        )
    
    def search_similar(self, query: str, limit: int = 5):
        results = self.collection.query(
            query_texts=[query],
            n_results=limit
        )
        return results
```

### DoD（確認）

| 項目       | 方法                                     | 期待結果                    |
| -------- | -------------------------------------- | ----------------------- |
| ChromaDB起動 | Docker ComposeでPython検索サービス起動        | ChromaDBが正常に動作する       |
| ベクトル化     | 記事コンテンツの埋め込みベクトル生成                 | テキストがベクトル形式で保存される     |
| 類似検索     | キーワード検索で関連記事を取得                    | セマンティック検索が動作する        |
| API連携    | HonoバックエンドからPython検索API呼び出し         | バックエンド経由で検索結果が取得できる   |

---

## 🎨 ステップ4：shadcn/ui + TailwindCSS強化

### 構成内容

* デザインシステム構築
* レスポンシブ対応
* ダークモード実装
* アクセシビリティ向上

### コンポーネント例

```tsx
// frontend/src/components/PostCard.tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface PostCardProps {
  post: {
    id: number
    title: string
    excerpt: string
    tags: string[]
    publishedAt: string
    language: 'ja' | 'en' | 'zh'
  }
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-2">{post.title}</CardTitle>
          <Badge variant="secondary">{post.language}</Badge>
        </div>
        <CardDescription className="text-sm text-muted-foreground">
          {post.publishedAt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-3 mb-4">{post.excerpt}</p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
```

### DoD（確認）

| 項目       | 方法                                     | 期待結果                    |
| -------- | -------------------------------------- | ----------------------- |
| shadcn/ui導入 | `npx shadcn-ui@latest init`            | UIコンポーネントライブラリが利用可能    |
| レスポンシブ対応 | モバイル・タブレット・デスクトップでの表示確認          | 全デバイスで適切に表示される        |
| ダークモード   | テーマ切り替え機能の実装                         | ライト・ダークモードが正常に動作する    |
| アクセシビリティ | キーボード操作・スクリーンリーダー対応確認              | WCAG 2.1 AA準拠の実装       |

---

## 📝 ステップ5：コンテンツ管理システム

### 構成内容

* マークダウン記事投稿API
* 画像アップロード機能
* 記事下書き・公開管理
* カテゴリ・タグ管理

### API実装例

```typescript
// backend/src/routes/posts.ts
import { Hono } from 'hono'
import { zValidator } from '@hono/zod-validator'
import { z } from 'zod'

const PostSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().min(1),
  language: z.enum(['ja', 'en', 'zh']),
  tags: z.array(z.string()).optional(),
  published: z.boolean().default(false)
})

const posts = new Hono()

posts.post('/', zValidator('json', PostSchema), async (c) => {
  const data = c.req.valid('json')
  
  // Kyselyでデータベース挿入
  const post = await db
    .insertInto('posts')
    .values({
      ...data,
      slug: generateSlug(data.title),
      created_at: new Date(),
      updated_at: new Date()
    })
    .returning(['id', 'title', 'slug'])
    .executeTakeFirstOrThrow()
  
  return c.json(post, 201)
})

export default posts
```

### DoD（確認）

| 項目       | 方法                                     | 期待결과                    |
| -------- | -------------------------------------- | ----------------------- |
| 記事投稿API  | POST /api/v1/posts での記事作成            | 記事が正常にデータベースに保存される    |
| マークダウン対応 | Markdown記法での記事作成・表示                 | マークダウンがHTMLに正しく変換される   |
| 画像アップロード | 記事内画像の投稿・表示機能                        | 画像が正常にアップロード・表示される    |
| 多言語投稿    | 日本語・英語・中国語での記事作成                   | 各言語の記事が正しく管理される       |

---

## ✅ ステップ6：DoD総まとめ

| 項目                           | チェック方法                              | 状態 |
| ---------------------------- | ----------------------------------- | -- |
| OpenAPI + orvalでの型安全API連携    | フロントエンドのAPI呼び出しが完全に型安全            | ✅  |
| RDS本格運用でのデータ永続化             | PostgreSQLでの記事・ユーザーデータ管理          | ✅  |
| ChromaDBセマンティック検索           | 類似記事推薦・知識グラフ機能の動作確認             | ✅  |
| shadcn/ui完全デザインシステム         | レスポンシブ・アクセシブルなUI実装               | ✅  |
| マークダウン記事投稿・管理システム           | 完全なCMS機能（投稿・編集・公開管理）             | ✅  |
| 本格的な技術ブログアプリケーション完成         | すべての機能が統合され、本番運用可能               | ✅  |

---

## 📘 最終ディレクトリ構造

```bash
tech-blog/
├── infra/                   # Terraform IaC
│   ├── main.tf
│   ├── vpc.tf
│   ├── ecs.tf
│   ├── rds.tf
│   └── datadog.tf
├── backend/                 # Hono.js API
│   ├── src/
│   │   ├── routes/
│   │   ├── db/
│   │   └── middleware/
│   ├── package.json
│   └── Dockerfile
├── frontend/                # React + Vite
│   ├── src/
│   │   ├── components/ui/   # shadcn/ui
│   │   ├── pages/
│   │   └── api/            # orval生成API型
│   ├── package.json
│   └── Dockerfile
├── search/                  # Python ChromaDB
│   ├── src/
│   │   └── search_engine.py
│   ├── requirements.txt
│   └── Dockerfile
├── api/
│   └── openapi/            # OpenAPI仕様書
├── .devcontainer/          # Dev Container設定
├── .github/
│   └── workflows/          # CI/CD パイプライン
└── docker-compose.yml      # ローカル開発環境
```

## 🎉 完成後の機能

- **技術ブログ**: マークダウン記事投稿・管理・表示
- **知識検索**: セマンティック検索・類似記事推薦
- **多言語対応**: 日本語・英語・中国語コンテンツ
- **レスポンシブUI**: モバイル・デスクトップ対応
- **インフラ自動化**: Terraform + ECS + RDS
- **観測性**: Datadog監視・ログ・APM
- **開発効率**: Dev Container + リアルタイムテスト
