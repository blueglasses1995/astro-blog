# /serena:init Command

プロジェクトにSerenaのドキュメント管理システムをセットアップするコマンドです。

## 使用方法

```
/serena:init
```

## 説明

このコマンドは、プロジェクトにSerenaのドキュメント管理システムを自動的にセットアップします。

## 実行内容

1. **ディレクトリ構造の作成**
   - `docs/adr/`
   - `docs/domain/`
   - `docs/security/`
   - `docs/operations/`
   - `docs/development/`
   - `docs/integration/`

2. **設定ファイルのコピー**
   - `.claude/skills/document-knowledge.md`
   - `.claude/commands/document-knowledge.md`

3. **スクリプトのコピー**
   - `scripts/setup-serena-memories.sh`
   - `scripts/generate-docs-index.js`

4. **Git hooksの設定**
   - `.git/hooks/pre-commit`にSerenaフックを追加

5. **GitHub Actionsの設定**
   - `docs-validation.yml`
   - `serena-weekly-update.yml`

6. **package.jsonの更新**
   - `serena:setup`スクリプトを追加
   - `docs:index`スクリプトを追加

7. **.gitignoreの更新**
   - `.serena/`を追加

## 次のステップ

セットアップ完了後：

1. Serenaのオンボーディングを実行
   ```
   Serenaのオンボーディングを実行してください
   ```

2. シンボリックリンクの設定
   ```bash
   npm run serena:setup
   ```

3. ドキュメント管理を開始
   ```
   /document-knowledge [残したい情報]
   ```
