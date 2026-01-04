# rehype-expressive-code 実装状況と不十分な部分

## 実装完了項目

### 1. astro-expressive-code のインストールと設定 ✅
- `astro-expressive-code` と `@expressive-code/plugin-collapsible-sections` をインストール
- `astro.config.mjs` に統合を追加
- `ec.config.mjs` を作成してコラプシブルセクションのプラグインを設定

### 2. 見出しと本文のスタイリング改善 ✅
- H1, H2, H3 それぞれに異なるフォントサイズを設定
- 見出し後のマージンを大きく設定
- 見出しと本文の行間を分離
- 本文段落の行間を適切に設定

**実装内容:**
- H1: `2.25rem` (36px), `margin-top: 2rem`, `margin-bottom: 1.5rem`
- H2: `1.875rem` (30px), `margin-top: 1.75rem`, `margin-bottom: 1.25rem`
- H3: `1.5rem` (24px), `margin-top: 1.5rem`, `margin-bottom: 1rem`
- 本文: `1rem` (16px), `line-height: 1.75`, `margin-bottom: 1rem`

### 3. コードブロックのパディング追加 ✅
- `prose pre` に適切なパディング（24px）を追加
- Expressive Code のスタイル調整

## rehype-expressive-code で実現できない機能

### 1. 見出し1（H1）のトグル機能 ❌

**問題点:**
- `rehype-expressive-code` はコードブロック専用のプラグインであり、見出しのトグル機能は提供していない
- 見出し1をクリックしてセクションを折りたたみ/展開する機能は実装されていない

**必要な実装:**
- カスタムRehypeプラグインを作成して見出し1とそのセクションをラップ
- クライアントサイドでトグル機能を実装するReactコンポーネントまたはVanilla JS

**実装方法:**
1. `src/lib/rehype-toggleable-heading.mjs` を作成
   - 見出し1（`<h1>`）要素を検出
   - 見出し1とその次のセクション（次の見出しまで）を`<div>`でラップ
   - データ属性（`data-toggleable-heading`）を追加
2. `src/components/ToggleableHeading.tsx` を作成
   - 見出し1をクリックでセクションを折りたたみ/展開
   - CSS transitionでアニメーション
   - 折りたたみ状態をアイコン（chevron）で表示

### 2. コードブロック全体のトグル機能 ❌

**問題点:**
- `@expressive-code/plugin-collapsible-sections` はコードブロック**内の特定行**を折りたたむ機能のみ提供
- コードブロック**全体**を折りたたみ/展開する機能は提供していない
- マークダウンで `collapse={1-5}` のように指定する必要があり、自動的にコードブロック全体を折りたたむ機能はない

**現在の機能:**
- コードブロック内の特定の行範囲を折りたたむ（例: `collapse={1-5, 12-14}`）
- 折りたたみ後は「X collapsed lines」というサマリーが表示される
- 展開後は再折りたたみ可能（`collapseStyle: 'collapsible-auto'` の場合）

**必要な実装:**
- コードブロック全体を自動的に折りたたみ（最初の3-5行のみ表示）
- 「もっと見る」ボタンで展開
- 「折りたたむ」ボタンで再び折りたたみ

**実装方法:**
1. `src/lib/rehype-toggleable-code.mjs` を作成
   - コードブロック（`<pre><code>`）要素を検出
   - コードブロックを`<div>`でラップ
   - データ属性（`data-toggleable-code`）を追加
   - デフォルトで折りたたみ状態のHTMLを生成（最初の3-5行のみ表示）
2. `src/components/ToggleableCodeBlock.tsx` を作成
   - デフォルトで折りたたみ（最初の3-5行のみ表示）
   - 「もっと見る」ボタンで展開
   - 「折りたたむ」ボタンで再び折りたたみ
   - CSS transitionでアニメーション

## 現在のコードブロック機能

### rehype-expressive-code で実現できること

1. **シンタックスハイライト**: 高精度なシンタックスハイライト
2. **コードブロック内の行折りたたみ**: マークダウンで `collapse={行番号}` を指定することで、コードブロック内の特定行を折りたたむ
3. **テーマ対応**: ダークモード/ライトモードの自動切り替え
4. **コードフレーム**: エディタ風やターミナル風のフレーム表示

### 使用例（マークダウン）

````markdown
```js collapse={1-5, 12-14} collapseStyle=collapsible-auto
// 1-5行目と12-14行目が折りたたまれる
import { someBoilerplateEngine } from '@example/some-boilerplate';
import { evenMoreBoilerplate } from '@example/even-more-boilerplate';
const engine = someBoilerplateEngine(evenMoreBoilerplate());

// 6-11行目は表示される
engine.doSomething(1, 2, 3, calcFn);

function calcFn() {
  // 12-14行目が折りたたまれる
  const a = 1;
  const b = 2;
  const c = a + b;

  // 15-20行目は表示される
  console.log(`Calculation result: ${a} + ${b} = ${c}`);
  return c;
}
```
````

## 追加実装が必要な項目

### 優先度: 高

1. **見出し1のトグル機能**
   - カスタムRehypeプラグイン: `rehype-toggleable-heading.mjs`
   - クライアントサイドコンポーネント: `ToggleableHeading.tsx`

2. **コードブロック全体のトグル機能**
   - カスタムRehypeプラグイン: `rehype-toggleable-code.mjs`
   - クライアントサイドコンポーネント: `ToggleableCodeBlock.tsx`

### 実装手順

1. Rehypeプラグインを作成してHTML構造を準備
2. クライアントサイドコンポーネントでトグル機能を実装
3. `astro.config.mjs` にRehypeプラグインを追加
4. `[slug].astro` でコンポーネントをマウント

## まとめ

`rehype-expressive-code` はコードブロックのシンタックスハイライトとコードブロック内の行折りたたみには優れていますが、以下の機能は提供していません：

- ❌ 見出し1のトグル機能
- ❌ コードブロック全体の自動折りたたみ機能

これらの機能を実現するには、カスタムRehypeプラグインとクライアントサイドコンポーネントの追加実装が必要です。
