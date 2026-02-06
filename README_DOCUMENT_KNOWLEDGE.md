# Document Knowledge コマンドの使い方

## 概要

`/document-knowledge`コマンドを使用すると、プロジェクト知識を適切なドキュメントファイルに自動的に格納できます。

## 使用方法

```
/document-knowledge [残したい情報]
```

## 例

### ADRの作成
```
/document-knowledge Astroを採用した理由は、SSGが必要でReactとの統合が重要だったから。Next.jsやGatsbyも検討したが、パフォーマンスと開発体験のバランスが良かった。
```

### 用語集の追加
```
/document-knowledge このプロジェクトでは「ブログ記事」のことを「Post」と呼び、「Blog」は記事の集合を表す。
```

### ビジネスルールの追加
```
/document-knowledge ブログ記事は公開後30分以内であればキャンセル可能。
```

## ディレクトリ構造

ドキュメントは以下のディレクトリに自動的に分類されます：

- `docs/adr/` - Architecture Decision Records（イミュータブル）
- `docs/domain/` - ドメイン知識（ミュータブル）
- `docs/security/` - セキュリティ関連（ミュータブル）
- `docs/operations/` - 運用関連（ミュータブル）
- `docs/development/` - 開発関連（ミュータブル）
- `docs/integration/` - 統合関連（ミュータブル）

詳細は`.claude/skills/document-knowledge.md`を参照してください。
