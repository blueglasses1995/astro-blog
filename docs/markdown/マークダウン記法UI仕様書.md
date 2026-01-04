# マークダウン記法UI仕様書

## 概要

このドキュメントは、Astroブログプロジェクトにおけるマークダウン記法のUI実装仕様を定義します。
標準的なマークダウン記法を網羅的にリストアップし、実装状況を明記します。

**記号の説明:**
- ✅ **実装済み**: 完全に実装され、正しく表示される
- ⚠️ **部分実装**: 一部実装されているが、改善の余地がある
- ❌ **未実装**: 実装されていない、または正しく表示されない

---

## 1. 基本テキスト要素

### 1.1 見出し (Headings)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `# H1` | レベル1見出し | ✅ 実装済み | カスタムスタイル適用済み |
| `## H2` | レベル2見出し | ✅ 実装済み | カスタムスタイル適用済み |
| `### H3` | レベル3見出し | ✅ 実装済み | カスタムスタイル適用済み |
| `#### H4` | レベル4見出し | ⚠️ 部分実装 | スタイルが不足している可能性 |
| `##### H5` | レベル5見出し | ⚠️ 部分実装 | スタイルが不足している可能性 |
| `###### H6` | レベル6見出し | ⚠️ 部分実装 | スタイルが不足している可能性 |

**実装詳細:**
- H1-H3: カスタムスタイル適用（`src/styles/globals.css`）
- 見出しリンクアイコン機能あり
- Toggleable Heading機能あり（H1のみ）

### 1.2 段落 (Paragraphs)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| 通常のテキスト | 段落 | ✅ 実装済み | カスタムスタイル適用済み |
| 空行で区切る | 段落の区切り | ✅ 実装済み | 正しく動作 |

**実装詳細:**
- 行間: `line-height: 1.75`
- マージン: `margin-bottom: 1rem`

### 1.3 強調 (Emphasis)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `*italic*` または `_italic_` | イタリック | ⚠️ 部分実装 | スタイル確認必要 |
| `**bold**` または `__bold__` | 太字 | ✅ 実装済み | `prose-strong`適用済み |
| `***bold italic***` | 太字+イタリック | ⚠️ 部分実装 | スタイル確認必要 |
| `~~strikethrough~~` | 取り消し線 | ❌ 未実装 | スタイル未定義 |

---

## 2. リスト (Lists)

### 2.1 順序なしリスト (Unordered Lists)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `- Item` | ハイフン記法 | ❌ **未実装** | **問題: 箇条書きが表示されない** |
| `* Item` | アスタリスク記法 | ❌ **未実装** | **問題: 箇条書きが表示されない** |
| `+ Item` | プラス記法 | ❌ **未実装** | **問題: 箇条書きが表示されない** |
| ネストされたリスト | インデントで階層化 | ❌ **未実装** | **問題: ネストが表示されない** |

**現在の実装:**
- `prose-ul`, `prose-ol`, `prose-li`クラスは定義されているが、`@tailwindcss/typography`が未インストールのため機能していない
- リストマーカーのスタイルが適用されていない

**必要な実装:**
1. `@tailwindcss/typography`プラグインのインストール
2. `tailwind.config.mjs`にプラグインの追加
3. リストのスタイル確認とカスタマイズ

### 2.2 順序付きリスト (Ordered Lists)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `1. Item` | 数字記法 | ❌ **未実装** | **問題: 番号が表示されない** |
| `1) Item` | 括弧記法 | ❌ **未実装** | **問題: 番号が表示されない** |
| ネストされたリスト | インデントで階層化 | ❌ **未実装** | **問題: ネストが表示されない** |

**現在の実装:**
- `prose-ol`クラスは定義されているが機能していない

### 2.3 タスクリスト (Task Lists)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `- [ ] 未完了タスク` | チェックボックス（未完了） | ❌ 未実装 | GitHub Flavored Markdown |
| `- [x] 完了タスク` | チェックボックス（完了） | ❌ 未実装 | GitHub Flavored Markdown |

**必要な実装:**
- `remark-task-list`プラグインの追加
- チェックボックスのスタイリング

### 2.4 定義リスト (Definition Lists)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `Term: Definition` | 定義リスト | ❌ 未実装 | CommonMark拡張 |

---

## 3. リンク (Links)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `[text](url)` | インラインリンク | ✅ 実装済み | `prose-a`適用済み |
| `[text](url "title")` | タイトル付きリンク | ✅ 実装済み | タイトル属性対応 |
| `[text][ref]` | 参照リンク | ⚠️ 部分実装 | 参照定義の確認必要 |
| `<https://example.com>` | 自動リンク | ⚠️ 部分実装 | 確認必要 |
| `[text]: url` | 参照定義 | ⚠️ 部分実装 | 確認必要 |

**実装詳細:**
- カスタムブログリンク機能あり（`rehype-blog-link.mjs`）
- ホバー時にアンダーライン表示

---

## 4. 画像 (Images)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `![alt](url)` | インライン画像 | ✅ 実装済み | `prose-img`適用済み |
| `![alt](url "title")` | タイトル付き画像 | ✅ 実装済み | タイトル属性対応 |
| `![alt][ref]` | 参照画像 | ⚠️ 部分実装 | 確認必要 |
| `![alt]: url` | 参照定義 | ⚠️ 部分実装 | 確認必要 |

**実装詳細:**
- 角丸: `rounded-lg`
- シャドウ: `shadow-lg`
- alt属性の自動生成機能あり（`generate-image-alt.ts`）

---

## 5. コード (Code)

### 5.1 インラインコード

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `` `code` `` | インラインコード | ✅ 実装済み | `prose-code`適用済み |

**実装詳細:**
- 背景色: `bg-muted`
- パディング: `px-1 py-0.5`
- 角丸: `rounded`

### 5.2 コードブロック

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| ` ```language` | フェンス記法（シンタックスハイライト） | ✅ 実装済み | `astro-expressive-code`使用 |
| ` ``` ` | フェンス記法（言語指定なし） | ✅ 実装済み | `astro-expressive-code`使用 |
| インデント記法 | 4スペースまたはタブ | ⚠️ 部分実装 | 確認必要 |

**実装詳細:**
- Expressive Code使用（`astro-expressive-code`）
- テーマ: `github-dark`, `github-light`
- Toggleable Code Block機能あり
- コピーボタン機能あり（Expressive Code標準機能）

---

## 6. 引用 (Blockquotes)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `> Quote` | ブロック引用 | ✅ 実装済み | `prose-blockquote`適用済み |
| `> > Nested` | ネストされた引用 | ⚠️ 部分実装 | スタイル確認必要 |

**実装詳細:**
- 左ボーダー: `border-l-primary`
- テキスト色: `text-muted-foreground`

---

## 7. 水平線 (Horizontal Rules)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `---` | 水平線 | ⚠️ 部分実装 | スタイル確認必要 |
| `***` | 水平線 | ⚠️ 部分実装 | スタイル確認必要 |
| `___` | 水平線 | ⚠️ 部分実装 | スタイル確認必要 |

**必要な実装:**
- `prose-hr`クラスのスタイル定義

---

## 8. テーブル (Tables)

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `\| Col1 \| Col2 \|` | 基本テーブル | ❌ **未実装** | **問題: テーブルが表示されない** |
| `\|:---:\|` | 中央揃え | ❌ **未実装** | GitHub Flavored Markdown |
| `\|:---\|` | 左揃え | ❌ **未実装** | GitHub Flavored Markdown |
| `\|---:\|` | 右揃え | ❌ **未実装** | GitHub Flavored Markdown |

**現在の実装:**
- テーブル用のスタイルが全く定義されていない
- `prose-table`, `prose-thead`, `prose-tbody`, `prose-tr`, `prose-th`, `prose-td`クラスが未定義

**必要な実装:**
1. `@tailwindcss/typography`プラグインのインストール（テーブルスタイル含む）
2. カスタムテーブルスタイルの追加
3. レスポンシブ対応（横スクロールなど）

---

## 9. その他の要素

### 9.1 改行

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| 末尾に2スペース | ハード改行 | ⚠️ 部分実装 | 確認必要 |
| 空行 | 段落区切り | ✅ 実装済み | 正しく動作 |

### 9.2 HTML要素

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `<br>` | 改行タグ | ⚠️ 部分実装 | 確認必要 |
| `<hr>` | 水平線タグ | ⚠️ 部分実装 | 確認必要 |
| その他のHTML | HTMLタグの直接記述 | ⚠️ 部分実装 | セキュリティ考慮必要 |

---

## 10. GitHub Flavored Markdown (GFM) 拡張

### 10.1 自動リンク

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `<https://example.com>` | URL自動リンク | ⚠️ 部分実装 | 確認必要 |
| `<email@example.com>` | メール自動リンク | ⚠️ 部分実装 | 確認必要 |

### 10.2 削除線

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `~~text~~` | 削除線 | ❌ 未実装 | スタイル未定義 |

### 10.3 絵文字

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| `:emoji:` | ショートコード | ❌ 未実装 | `remark-emoji`プラグイン必要 |
| 直接入力 | Unicode絵文字 | ✅ 実装済み | ブラウザ標準機能 |

### 10.4 自動リンク拡張

| 記法 | 説明 | 実装状況 | 備考 |
|------|------|----------|------|
| Issue/PR参照 | `#123` | ❌ 未実装 | カスタム実装必要 |

---

## 11. 実装優先度

### 高優先度（即座に実装すべき）

1. **リスト（箇条書き・番号付きリスト）** ❌
   - `@tailwindcss/typography`のインストール
   - リストスタイルの確認とカスタマイズ
   - ネストされたリストの対応

2. **テーブル** ❌
   - `@tailwindcss/typography`のインストール
   - テーブルスタイルの追加
   - レスポンシブ対応

### 中優先度（早期に実装すべき）

3. **削除線** ❌
   - `prose-del`または`prose-s`クラスのスタイル定義

4. **タスクリスト** ❌
   - `remark-task-list`プラグインの追加
   - チェックボックスのスタイリング

5. **水平線** ⚠️
   - `prose-hr`クラスのスタイル定義

### 低優先度（後回し可能）

6. **定義リスト** ❌
   - CommonMark拡張のサポート

7. **絵文字ショートコード** ❌
   - `remark-emoji`プラグインの追加

---

## 12. 実装手順

### ステップ1: @tailwindcss/typographyのインストール

```bash
npm install -D @tailwindcss/typography
```

### ステップ2: tailwind.config.mjsの更新

```javascript
plugins: [
  require("tailwindcss-animate"),
  require("@tailwindcss/typography"), // 追加
]
```

### ステップ3: カスタムスタイルの追加

`src/styles/globals.css`に以下を追加:

```css
/* リストのスタイル調整 */
.prose ul,
.prose ol {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-left: 1.625em;
}

.prose ul {
  list-style-type: disc;
}

.prose ol {
  list-style-type: decimal;
}

.prose li {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose li > p {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}

.prose li > :first-child {
  margin-top: 0;
}

.prose li > :last-child {
  margin-bottom: 0;
}

/* ネストされたリスト */
.prose ul ul,
.prose ol ol,
.prose ul ol,
.prose ol ul {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}

/* テーブルのスタイル */
.prose table {
  width: 100%;
  table-layout: auto;
  text-align: left;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
  border-collapse: collapse;
}

.prose thead {
  border-bottom-width: 1px;
  border-bottom-color: hsl(var(--border));
}

.prose thead th {
  color: hsl(var(--foreground));
  font-weight: 600;
  vertical-align: bottom;
  padding-right: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
}

.prose tbody tr {
  border-bottom-width: 1px;
  border-bottom-color: hsl(var(--border));
}

.prose tbody tr:last-child {
  border-bottom-width: 0;
}

.prose tbody td {
  vertical-align: baseline;
  padding-top: 0.5714286em;
  padding-right: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
}

/* テーブルのレスポンシブ対応 */
.prose {
  overflow-x: auto;
}

/* 水平線 */
.prose hr {
  border-color: hsl(var(--border));
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}

/* 削除線 */
.prose del {
  text-decoration: line-through;
  text-decoration-color: hsl(var(--muted-foreground));
}
```

### ステップ4: タスクリストの追加（オプション）

```bash
npm install remark-task-list
```

`astro.config.mjs`に追加:

```javascript
import remarkTaskList from 'remark-task-list';

markdown: {
  remarkPlugins: [remarkTaskList],
  // ...
}
```

---

## 13. テストケース

実装後、以下のマークダウンファイルでテスト:

```markdown
# テスト用マークダウン

## リストテスト

### 順序なしリスト
- 項目1
- 項目2
  - ネスト項目1
  - ネスト項目2
- 項目3

### 順序付きリスト
1. 最初の項目
2. 2番目の項目
   1. ネスト項目1
   2. ネスト項目2
3. 3番目の項目

## テーブルテスト

| 列1 | 列2 | 列3 |
|:---|:---:|---:|
| 左揃え | 中央揃え | 右揃え |
| データ1 | データ2 | データ3 |

## その他の要素

~~削除線テキスト~~

---

水平線のテスト

- [ ] 未完了タスク
- [x] 完了タスク
```

---

## 14. 参考資料

- [CommonMark仕様](https://commonmark.org/)
- [GitHub Flavored Markdown仕様](https://github.github.com/gfm/)
- [Tailwind Typography Plugin](https://tailwindcss.com/docs/plugins/typography)
- [Astro Markdownドキュメント](https://docs.astro.build/en/guides/markdown-content/)

---

## 更新履歴

- 2025-01-02: 初版作成
