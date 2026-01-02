# 🧭 全体戦略：ハローワールドから本番までのロードマップ（改訂版）

## フェーズ0：戦略の軸

| 優先度 | 分野                        | 目的                                                         |
| --- | ------------------------- | ---------------------------------------------------------- |
| ⭐️  | **インフラ**                  | Terraform + ECS + RDS(PostgreSQL) で“本番環境に Hello World”を出す。 |
| 2   | **バックエンド環境基盤**            | Dev Container + テスト・デバッグ環境を完備。                             |
| 3   | **フロントエンド**               | Vite + React の最小構成。見た目は後回し。                                |
| 4   | **API管理 / Observability** | OpenAPI, Apidog, Stoplight, Prism, Datadog は後から。           |

---

## 🏗 フェーズ1：インフラ基盤の構築（Hello World を本番に出す）

> 🎯 ゴール：
> ECS 上で `https://yourdomain.com/` に “Hello World” を表示。
> バックエンドは Hono、フロントは Vite（静的ビルド）。

### ステップ構成

| ステップ | 内容                                                                                      |
| ---- | --------------------------------------------------------------------------------------- |
| 1️⃣  | **Terraform 基盤作成**：VPC, Subnet, Security Group, ECS Cluster, ECR, ALB, Route53（ドメイン設定）。 |
| 2️⃣  | **Docker Compose (ローカル)**：backend（Hono）+ frontend（Vite）を2サービス構成に。                       |
| 3️⃣  | **GitHub Actions**：Dockerビルド＆ECRプッシュ、自動デプロイ。                                            |
| 4️⃣  | **ECS タスク定義 & Terraform連携**：デプロイをIaC化。                                                  |
| 5️⃣  | **RDS(PostgreSQL)**：まだ接続不要。Terraformで構築だけしておく。                                          |

📦 **得られるもの**

* Terraformワークフロー（plan/apply）
* Docker → ECS → ALB のフロー理解
* CI/CD の最小ライン（GitHub Actions）

---

## 🧱 フェーズ2：ローカル開発環境（Dev Container）

> 🎯 ゴール：VSCode上で完全に再現可能な開発環境。

### 構成要素

| 要素                      | 目的                                      |
| ----------------------- | --------------------------------------- |
| **Dev Container**       | VSCode Remote Containersを使い、開発環境をコンテナ化。 |
| **PostgreSQL (Docker)** | RDSと同構成のローカルDBを用意。                      |
| **GitLens / GitKraken** | コミット可視化・履歴確認の効率化。                       |
| **Console Ninja**       | VSCode内でリアルタイムログ確認。                     |

🧰 **Dev Container 構成例**

```json
// .devcontainer/devcontainer.json
{
  "name": "tech-blog-dev",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "backend",
  "workspaceFolder": "/workspace",
  "extensions": [
    "eamodio.gitlens",
    "WallabyJs.wallaby-vscode",
    "formulahendry.code-runner",
    "ms-azuretools.vscode-docker",
    "github.vscode-github-actions"
  ]
}
```

---

## 🧪 フェーズ3：デバッグ効率化（テストと実行支援）

> 🎯 ゴール：テスト・デバッグを極限まで効率化。
> まだAPI仕様やDBは不要。

### 実装順

| 順序  | ツール                     | 内容                            |
| --- | ----------------------- | ----------------------------- |
| 1️⃣ | **Vitest**              | 単体テスト環境を構築（Honoやユーティリティ関数対象）。 |
| 2️⃣ | **Quokka.js**           | コード片を即実行して動作確認（学習＋デバッグ）。      |
| 3️⃣ | **Wallaby.js**          | リアルタイムでテスト結果を表示（開発スピードUP）。    |
| 4️⃣ | **Console Ninja**       | APIレスポンスをVSCode内で可視化。         |
| 5️⃣ | **GitLens / GitKraken** | コミット粒度を小さく保ち、再現性維持。           |

📦 **結果**

* 「1行修正 → 即テスト・即結果」サイクルが完成。
* OpenAPI導入前に、内部ロジックの信頼性を担保。

---

## 📚 フェーズ4：API可視化・モック・監視の導入（後半）

> 🎯 ゴール：開発効率 + 観測性を高める。
> コアAPIが動き出してから導入。

| 順序  | ツール                  | 内容                                 |
| --- | -------------------- | ---------------------------------- |
| 1️⃣ | **Stoplight Studio** | API設計とドキュメント。Zodと整合を取る。            |
| 2️⃣ | **Apidog**           | テストや共有用にAPI仕様をブラウザで管理。             |
| 3️⃣ | **Prism**            | モックサーバーでフロント開発と並行進行。               |
| 4️⃣ | **Datadog**          | ECS・アプリログ・APMを一元監視。Terraformで設定管理。 |

---

## 🌐 フェーズ5：本格的なアプリ開発へ

> この時点で「デプロイ・開発・監視」がすべて自動化済み。

ここからは：

* OpenAPI + orval 導入
* RDS 実運用開始
* ChromaDB / Python 検索エンジン
* shadcn/ui / Lexical のUI強化
  と進めていく。

---

# 📅 実行順まとめ（段階別）

| フェーズ | ゴール              | 主な技術                                   |
| ---- | ---------------- | -------------------------------------- |
| 1    | Hello Worldを本番表示 | Terraform, ECS, Docker, Vite, Hono     |
| 2    | ローカル開発環境整備       | Dev Container, GitLens, GitKraken      |
| 3    | テスト・デバッグ効率化      | Vitest, Wallaby, Quokka, Console Ninja |
| 4    | API管理と監視         | Stoplight, Apidog, Prism, Datadog      |
| 5    | 本格開発・拡張          | OpenAPI, Orval, ChromaDB, shadcn/ui    |
