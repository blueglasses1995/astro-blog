# /docs:index Command

ドキュメントインデックスを自動生成するコマンドです。

## 使用方法

```
/docs:index
```

## 説明

`docs/`ディレクトリ内のすべてのドキュメントを解析し、自動的にインデックス（`docs/README.md`）を生成します。

## 生成される内容

- カテゴリ別のドキュメント一覧
- ADR一覧
- タグ一覧
- 各ドキュメントのメタ情報
  - バージョン
  - 最終更新日
  - 関連ドキュメント

## 実行タイミング

- 新しいドキュメントを作成した後
- ドキュメントを更新した後
- `/document-knowledge`コマンド実行時（自動）

## 出力例

```markdown
# ドキュメントインデックス

## 概要
- 総ドキュメント数: 15
- カテゴリ数: 6

## Domain
- [ユビキタス言語の用語集](domain/ubiquitous_language.md)
  - バージョン: 1.0.0 | 最終更新: 2025-02-06

## ADR一覧
- [ADR-0001: Feature-based Frontend Architecture](adr/0001-feature-based-frontend-architecture.md)
```
