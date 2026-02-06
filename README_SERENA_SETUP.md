# Serena Setup for Other Projects

このプロジェクトで構築したSerenaのツールとフローを、他のプロジェクトでも簡単にセットアップできます。

## クイックセットアップ

### 方法1: セットアップスクリプトを使用（推奨）

```bash
# 1. このプロジェクトからセットアップスクリプトをコピー
cp scripts/setup-serena-project.sh /path/to/your-project/scripts/

# 2. 必要なファイルをコピー（スクリプトが自動検出しますが、手動でも可能）
cp -r .claude /path/to/your-project/
cp scripts/setup-serena-memories.sh /path/to/your-project/scripts/
cp scripts/generate-docs-index.js /path/to/your-project/scripts/
cp -r .github/workflows/*.yml /path/to/your-project/.github/workflows/ 2>/dev/null || mkdir -p /path/to/your-project/.github/workflows && cp -r .github/workflows/*.yml /path/to/your-project/.github/workflows/

# 3. 他のプロジェクトで実行
cd /path/to/your-project
./scripts/setup-serena-project.sh
```

### 方法2: このプロジェクトから直接実行

```bash
# 他のプロジェクトのルートで実行
cd /path/to/your-project
bash /path/to/this-project/scripts/setup-serena-project.sh
```

## セットアップ後の手順

1. **Serenaのオンボーディング**
   ```
   Serenaのオンボーディングを実行してください
   ```

2. **シンボリックリンクの設定**
   ```bash
   npm run serena:setup
   ```

3. **ドキュメントの開始**
   ```
   /document-knowledge [残したい情報]
   ```

## セットアップスクリプトが行うこと

- ✅ `docs/`ディレクトリ構造の作成（adr, domain, security, operations, development, integration）
- ✅ `.claude/skills/document-knowledge.md`のコピー
- ✅ `.claude/commands/document-knowledge.md`のコピー
- ✅ `scripts/setup-serena-memories.sh`のコピー
- ✅ `scripts/generate-docs-index.js`のコピー
- ✅ `.git/hooks/pre-commit`へのSerenaフック追加
- ✅ `.github/workflows/`へのGitHub Actions追加
- ✅ `package.json`へのスクリプト追加（`serena:setup`, `docs:index`）
- ✅ `.gitignore`への`.serena/`追加

## 詳細なドキュメント

- [セットアップガイド](docs/SERENA_SETUP_GUIDE.md) - 詳細なセットアップ手順
- [ワークフロー](docs/SERENA_WORKFLOW.md) - Serenaの使用方法とフロー
- [改善提案](docs/SERENA_IMPROVEMENTS.md) - 改善案と実装状況

## 必要なファイル

セットアップスクリプトが自動的にコピーしますが、手動でコピーする場合は以下が必要です：

- `.claude/skills/document-knowledge.md`
- `.claude/commands/document-knowledge.md`
- `scripts/setup-serena-memories.sh`
- `scripts/generate-docs-index.js`
- `.github/workflows/docs-validation.yml`
- `.github/workflows/serena-weekly-update.yml`

## トラブルシューティング

### スクリプトが実行できない

```bash
chmod +x scripts/setup-serena-project.sh
```

### ファイルが見つからない

セットアップスクリプトは、このプロジェクト（テンプレートプロジェクト）からファイルをコピーしようとします。ファイルが見つからない場合は、手動でコピーしてください。

### package.jsonがない

Node.jsプロジェクトでない場合、`package.json`を手動で作成するか、スクリプトを直接実行してください。

## ライセンス

このセットアップスクリプトとドキュメントは、プロジェクトのライセンスに従います。
