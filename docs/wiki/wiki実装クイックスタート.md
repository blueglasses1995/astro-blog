# Wiki機能 実装クイックスタート

このドキュメントは、wiki機能をすぐに実装開始するための最短手順を提供します。

## 前提条件

- プロジェクトがセットアップ済み
- `pnpm` がインストール済み
- エディタが開いている

---

## 実装手順（コピペ用）

### Step 1: ディレクトリ作成

```bash
mkdir -p assets/wiki
mkdir -p scripts
mkdir -p src/domain/wiki
mkdir -p src/components/wiki
```

### Step 2: 依存関係のインストール

```bash
pnpm add gray-matter
pnpm add -D tsx @types/node
```

### Step 3: package.json にスクリプト追加

`package.json` の `scripts` セクションに以下を追加:

```json
{
  "scripts": {
    "build:wiki": "tsx scripts/build-wiki.ts",
    "prebuild": "pnpm build:wiki",
    "prestart": "pnpm build:wiki"
  }
}
```

### Step 4: .gitignore に追加

`.gitignore` に以下を追加:

```
# Wiki自動生成ファイル
src/domain/wiki/wikiData.ts
```

### Step 5: 型定義ファイルを作成

`src/domain/wiki/types.ts` を作成:

```typescript
/**
 * Wiki用語エントリ
 */
export type WikiEntry = {
  slug: string;
  title: string;
  aliases: string[];
  tags: string[];
  category?: string;
  content: string;
};

/**
 * 用語辞書（リンク自動化用）
 */
export type TermDictionary = Map<string, string>;

/**
 * リンク化されたテキストのトークン
 */
export type TextToken =
  | { type: 'text'; text: string }
  | { type: 'link'; text: string; slug: string };
```

### Step 6: ビルドスクリプトを作成

`scripts/build-wiki.ts` を作成（コード全文は `docs/impl/wiki機能詳細実装仕様.md` の Step 3 を参照）

### Step 7: リンク自動化ロジックを作成

`src/domain/wiki/linkify.ts` を作成（コード全文は詳細仕様の Step 4 を参照）

### Step 8: LinkableTextコンポーネントを作成

`src/components/wiki/LinkableText.tsx` を作成（コード全文は詳細仕様の Step 5 を参照）

### Step 9: WikiModalコンポーネントを作成

`src/components/wiki/WikiModal.tsx` を作成（コード全文は詳細仕様の Step 6 を参照）

### Step 10: 初期Wikiコンテンツを作成

以下のファイルを作成:

1. `assets/wiki/cash.md`
2. `assets/wiki/deposit.md`
3. `assets/wiki/accounts-receivable.md`
4. `assets/wiki/accounts-payable.md`
5. `assets/wiki/sales.md`
6. `assets/wiki/purchases.md`

各ファイルの内容は詳細仕様の Step 7 を参照。

### Step 11: ビルドスクリプトを実行

```bash
pnpm build:wiki
```

確認:

```bash
cat src/domain/wiki/wikiData.ts
```

### Step 12: QuestionA.tsx を修正

詳細仕様の Step 8 を参照して以下を修正:

1. `LinkableText` と `WikiModal` をインポート
2. Wiki状態管理のstate追加
3. `account.name` の表示を `LinkableText` に変更
4. `WikiModal` コンポーネントを追加

### Step 13: Explanation.tsx を修正

詳細仕様の Step 8 を参照して以下を修正:

1. `LinkableText` と `WikiModal` をインポート
2. Wiki状態管理のstate追加
3. `explanation` の表示を `LinkableText` に変更
4. `WikiModal` コンポーネントを追加

### Step 14: 動作確認

```bash
pnpm start
```

確認項目:

- [ ] クイズ画面で勘定科目がリンク化されている
- [ ] リンクをタップするとWikiモーダルが開く
- [ ] Wikiモーダル内のコンテンツが表示される
- [ ] Wikiモーダル内のリンクをタップして遷移できる
- [ ] 戻るボタンで前の用語に戻れる
- [ ] 閉じるボタンでモーダルが閉じる
- [ ] 解説画面でもリンクが機能する

---

## トラブルシューティング

### ビルドスクリプトが失敗する

```bash
# tsxがグローバルにない場合
pnpm add -D tsx

# 再実行
pnpm build:wiki
```

### wikiData.tsが生成されない

```bash
# ディレクトリを確認
ls -la assets/wiki/

# Markdownファイルがあるか確認
ls -la assets/wiki/*.md

# 手動実行してエラーを確認
pnpm tsx scripts/build-wiki.ts
```

### リンクが表示されない

1. `TERM_DICTIONARY` が正しく生成されているか確認:

```bash
grep "TERM_DICTIONARY" src/domain/wiki/wikiData.ts
```

2. `linkifyText()` が正しくインポートされているか確認

### モーダルが開かない

1. `WikiModal` のimportを確認
2. `showWiki` stateが正しく更新されているか確認
3. Console.logでデバッグ:

```typescript
const handleOpenWiki = (slug: string) => {
  console.log('[Wiki] Opening:', slug);
  setWikiSlug(slug);
  setShowWiki(true);
};
```

---

## 実装完了チェックリスト

実装が完了したら、以下をチェック:

- [ ] `pnpm build:wiki` が成功する
- [ ] `src/domain/wiki/wikiData.ts` が生成される
- [ ] QuestionA画面で用語がリンク化される
- [ ] リンクタップでWikiモーダルが開く
- [ ] Wikiモーダルでコンテンツが表示される
- [ ] Wikiモーダル内でリンク遷移できる
- [ ] 戻るボタンが機能する
- [ ] 閉じるボタンが機能する
- [ ] Explanation画面でもリンクが機能する
- [ ] ダークモードでも正しく表示される

---

## 次のアクション

v1.0が完了したら:

1. **コンテンツ追加**: 重要な用語を追加（10〜20個）
2. **デザイン調整**: ブランド定義に沿ったスタイリング
3. **パフォーマンス測定**: 大量のテキストでの動作確認
4. **ユーザーテスト**: 実際の学習フローでの使用感確認

v1.1で検討:

- Wiki内検索機能
- 用語一覧画面
- 閲覧履歴
- お気に入り機能

---

## 参考ドキュメント

- 詳細仕様: `docs/impl/wiki機能詳細実装仕様.md`
- 概要仕様: `docs/wiki機能実装仕様書.md`
- UX設計: `docs/UX設計.md`
- ブランド定義: `docs/ブランド定義.md`
