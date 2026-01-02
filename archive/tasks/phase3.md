# 🧪 デバッグ効率化（テストと実行支援）

### ゴール

テストとデバッグを極限まで効率化し、
**「1行修正 → 即テスト・即結果」サイクルを完成させること。**

---

## 🧪 ステップ1：Vitest単体テスト環境

### 手順

| タスク | 作業内容                           | コマンド・ファイル                            | DoD（確認方法）                                   |
| ---- | ------------------------------ | ------------------------------------ | ------------------------------------------- |
| 1️⃣  | Vitestインストールと設定              | `npm install -D vitest`              | `npm run test` でテスト実行成功                   |
| 2️⃣  | テスト設定ファイル作成                  | `vitest.config.ts`                   | 設定ファイルでカバレッジ・ウォッチモード有効化               |
| 3️⃣  | ユーティリティ関数のテスト作成              | `src/**/*.test.ts`                   | 基本的な関数のテストが通る                             |
| 4️⃣  | Honoエンドポイントのテスト              | `src/routes/**/*.test.ts`            | APIエンドポイントのテストが通る                         |
| 5️⃣  | ウォッチモード動作確認                  | `npm run test:watch`                 | ファイル変更時に自動でテスト実行される                       |

---

## 🚀 ステップ2：Quokka.js（即実行環境）

### 構成内容

* コード片の即実行環境
* 学習用サンドボックス
* API仕様の動作確認
* データ変換ロジックの実験

### 設定例

```javascript
// .quokka/config.json
{
  "pro": true,
  "plugins": ["jsdom-quokka-plugin"],
  "jsdom": {
    "file": "./test/jsdom.html"
  }
}
```

### DoD（確認）

| 項目            | 方法                            | 期待結果                         |
| ------------- | ----------------------------- | -------------------------- |
| Quokka.js動作   | Ctrl+Shift+P → "Quokka Start" | JavaScriptコードがリアルタイム実行される |
| TypeScript対応  | .tsファイルでQuokka実行            | TypeScriptコードが実行される        |
| npm package使用 | importを使ったライブラリテスト           | 外部ライブラリが正しく動作する          |
| 実行結果表示      | コード右側にインライン結果表示             | 変数の値がリアルタイムで表示される        |

---

## ⚡ ステップ3：Wallaby.js（ライブテスト）

### 構成内容

* リアルタイムテスト結果表示
* カバレッジの可視化
* テスト失敗箇所の即座特定
* VSCode内での統合表示

### 設定ファイル

```javascript
// wallaby.js
module.exports = function (wallaby) {
  return {
    files: [
      'src/**/*.ts',
      '!src/**/*.test.ts'
    ],
    tests: [
      'src/**/*.test.ts'
    ],
    env: {
      type: 'node'
    },
    testFramework: 'vitest'
  }
}
```

### DoD（確認）

| 項目       | 方法                                     | 期待結果                    |
| -------- | -------------------------------------- | ----------------------- |
| Wallaby起動 | VSCode Command Palette → "Wallaby Start" | テスト結果がリアルタイム表示される     |
| カバレッジ表示  | エディタでカバレッジハイライト確認                    | 緑/赤でカバー状況が可視化される      |
| 失敗箇所特定   | テスト失敗時の即座エラー表示                       | 失敗したテストと原因が即座に分かる     |
| パフォーマンス  | 大量のテストファイルでの動作確認                     | 高速でテスト結果が更新される        |

---

## 🖥 ステップ4：Console Ninja（実行時デバッグ）

### 構成内容

* VSCode内でのリアルタイムログ表示
* APIレスポンスの可視化
* 変数値のインライン表示
* ブラウザデバッガーとの連携

### タスク一覧

| タスク | 作業内容                           | ファイル                        | DoD（確認方法）                  |
| ---- | ------------------------------ | --------------------------- | -------------------------- |
| 1️⃣  | Console Ninja拡張機能インストール      | VSCode Extensions           | 拡張機能が有効化されている            |
| 2️⃣  | フロントエンド（React）での動作確認        | console.logの可視化             | ブラウザコンソールがVSCode内に表示     |
| 3️⃣  | バックエンド（Hono）での動作確認          | APIログの可視化                  | サーバーログがVSCode内に表示        |
| 4️⃣  | リアルタイム変数表示                   | 実行中の変数値確認                 | 変数の値がコード横に表示される          |
| 5️⃣  | エラーハンドリング可視化                 | try-catchでのエラー内容表示        | エラー詳細がVSCode内で確認できる      |

---

## 🔧 ステップ5：GitLens/GitKraken統合

### 構成内容

* コミット粒度の最適化
* ブランチ戦略の可視化
* コード変更履歴の追跡
* チーム開発準備（将来用）

### 設定例

```json
// .vscode/settings.json
{
  "gitlens.views.repositories.files.layout": "tree",
  "gitlens.views.fileHistory.enabled": true,
  "gitlens.views.lineHistory.enabled": true,
  "gitlens.codeLens.authors.enabled": true,
  "gitlens.codeLens.recentChange.enabled": true,
  "gitlens.currentLine.enabled": true
}
```

### DoD（確認）

| 項目       | 方法                                     | 期待結果                    |
| -------- | -------------------------------------- | ----------------------- |
| コミット履歴表示 | GitLensパネルでリポジトリ履歴確認                 | コミット一覧とファイル変更が表示される     |
| インライン情報  | コード行にコミット情報とauthor表示                | 各行の最終更新者と日時が表示される      |
| ブランチ可視化  | GitKrakenでブランチツリー確認                  | ブランチの分岐・マージが可視化される      |
| 差分表示     | ファイル変更時の差分ハイライト                      | 変更箇所が色分けで表示される          |

---

## ✅ ステップ6：DoD総まとめ

| 項目                           | チェック方法                              | 状態 |
| ---------------------------- | ----------------------------------- | -- |
| Vitestでのテスト自動実行              | `npm run test:watch` でファイル変更検知テスト | ✅  |
| Quokka.jsでコード即実行             | JavaScriptファイルでQuokka起動・実行確認      | ✅  |
| Wallaby.jsでライブテスト結果表示        | VSCode内でリアルタイムテスト結果確認            | ✅  |
| Console Ninjaでデバッグ情報表示       | フロント・バックエンドログがVSCode内で表示        | ✅  |
| GitLensでコミット履歴可視化            | コード変更履歴とauthor情報が表示             | ✅  |
| 開発効率化ワークフロー完成               | 1行修正→即テスト→即結果のサイクル実現           | ✅  |

---

## 📘 推奨ツール設定

```bash
.vscode/
├── settings.json      # GitLens、Console Ninja設定
├── extensions.json    # 推奨拡張機能リスト
└── tasks.json        # ビルド・テストタスク

backend/
├── vitest.config.ts   # Vitestテスト設定
├── wallaby.js        # Wallaby設定
└── .quokka/          # Quokka設定

frontend/
├── vitest.config.ts   # フロントエンドテスト設定
└── .quokka/          # Quokka設定
```
