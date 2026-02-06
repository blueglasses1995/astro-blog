# Serena Setup Skill

プロジェクトにSerenaのドキュメント管理システムをセットアップするスキルです。

## 目的

他のプロジェクトでSerenaのツールとフローを簡単にセットアップできるようにします。

## セットアップ内容

### 1. ディレクトリ構造の作成

```
docs/
├── adr/              # Architecture Decision Records
├── domain/           # ドメイン知識
├── security/         # セキュリティ関連
├── operations/       # 運用関連
├── development/      # 開発関連
└── integration/      # 統合関連
```

### 2. 必要なファイルの作成

- `.claude/skills/document-knowledge.md`
- `.claude/commands/document-knowledge.md`
- `scripts/setup-serena-memories.sh`
- `scripts/generate-docs-index.js`

### 3. Git hooksの設定

`.git/hooks/pre-commit`にSerenaフックを追加：
- ドキュメント変更時に自動的にシンボリックリンクを更新

### 4. GitHub Actionsの設定

- `docs-validation.yml` - PR時のドキュメントバリデーション
- `serena-weekly-update.yml` - 週次リマインダー

### 5. package.jsonの更新

以下のスクリプトを追加：
- `serena:setup` - シンボリックリンク設定
- `docs:index` - ドキュメントインデックス生成

## 実行手順

1. このスキルを実行してセットアップを開始
2. Serenaのオンボーディングを実行
3. `npm run serena:setup`を実行
4. `/document-knowledge`コマンドでドキュメント管理を開始

## 注意事項

- `.serena/`ディレクトリは`.gitignore`に追加
- Git hooksは手動で実行権限を付与する必要がある場合あり
- package.jsonがない場合は手動でスクリプトを追加
