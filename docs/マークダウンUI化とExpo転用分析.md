# マークダウンUI化とExpo転用分析

**作成日**: 2026-01-03
**目的**: 現在のAstroブログのマークダウン処理・スタイリング箇所を特定し、Expo/React Native転用の可能性を評価

---

## 目次

1. [現在のマークダウンUI化の仕組み](#現在のマークダウンui化の仕組み)
2. [主要コンポーネント](#主要コンポーネント)
3. [スタイリング箇所](#スタイリング箇所)
4. [Expo/React Native転用可能性](#exporeact-native転用可能性)
5. [推奨アプローチ](#推奨アプローチ)

---

## 現在のマークダウンUI化の仕組み

### 処理フロー

```
マークダウンファイル (.md)
    ↓
Astro Content Collections (型定義・バリデーション)
    ↓
Remark Plugins (マークダウン AST 処理)
    ├─ remarkTaskList (タスクリスト対応)
    ↓
Rehype Plugins (HTML AST 処理) ← **ここでReact UI化**
    ├─ rehypeSlug (見出しにID追加)
    ├─ rehypeHeadingId (カスタムID処理)
    ├─ rehypeToggleableHeading (トグル可能な見出し)
    ├─ rehypeToggleableCode (トグル可能なコードブロック)
    └─ rehypeBlogLink (記事間の自動リンク)
    ↓
Astro Expressive Code (シンタックスハイライト)
    ↓
HTML + React Islands (インタラクティブ部分)
    ├─ HeadingLinkIcon.tsx (見出しリンクアイコン)
    ├─ ToggleableCodeBlock.tsx (コードブロックトグル)
    └─ ToggleableHeading.tsx (見出しトグル)
    ↓
CSS (Tailwind + globals.css) ← **ここでスタイリング**
    ↓
最終HTML
```

---

## 主要コンポーネント

### 1. Rehypeプラグイン（サーバーサイド処理）

#### `src/lib/rehype-blog-link.mjs`
**役割**: 記事タイトルやエイリアスを自動的にリンク化

**処理内容**:
- `src/content/blog/`内のすべてのマークダウンを読み取り
- タイトルとaliasesから用語辞書を構築
- テキストノード内の用語を自動的に`<a>`タグに変換
- 自己参照は除外

**キーポイント**:
- **Node.js依存**: `fs`、`path`を使用（ブラウザ・React Native不可）
- **ビルド時実行**: サーバーサイドのみ

**Expo転用**: ❌ **不可**（Node.js API依存）

---

#### `src/lib/rehype-toggleable-code.mjs`
**役割**: コードブロックをトグル可能にするラッパーを追加

**処理内容**:
- `<pre>`タグや`<figure class="expressive-code">`を検出
- `div.toggleable-code-block`でラップ
- `button`要素を追加（「もっと見る」ボタン）
- `data-toggleable-code`属性を付与

**Expo転用**: ⚠️ **条件付き可能**
- 構造変換ロジックは転用可能
- React NativeではHTML要素が使えないため、View/Textに置き換え必要

---

#### `src/lib/rehype-heading-id.mjs`
**役割**: 見出しにカスタムIDを追加

**Expo転用**: ✅ **可能**（ロジックのみ転用）

---

#### `src/lib/rehype-toggleable-heading.mjs`
**役割**: H1見出しをトグル可能にする

**Expo転用**: ⚠️ **条件付き可能**

---

### 2. Reactコンポーネント（クライアントサイド）

#### `src/components/HeadingLinkIcon.tsx`
**役割**: 見出しにリンクアイコンを動的に追加

**処理内容**:
```typescript
useEffect(() => {
  // DOM操作: h1-h6にリンクアイコンを挿入
  const headings = document.querySelectorAll('h1[id], h2[id], ...');
  headings.forEach(heading => {
    // SVGアイコンボタンを作成
    const iconButton = document.createElement('button');
    // クリックでURLコピー
    iconButton.addEventListener('click', async (e) => {
      await navigator.clipboard.writeText(url);
    });
    heading.insertBefore(iconButton, heading.firstChild);
  });
}, []);
```

**依存**: DOM API (`document`, `navigator.clipboard`)

**Expo転用**: ❌ **不可**（DOM API依存）
- React Nativeには`document`や`navigator`がない
- 代替: コンポーネント設計を変更し、見出しをReactコンポーネント化

---

#### `src/components/ToggleableCodeBlock.tsx`
**役割**: コードブロックの展開/折りたたみ機能

**処理内容**:
```typescript
useEffect(() => {
  // DOM操作: data-toggleable-code属性を持つ要素を探す
  const blocks = document.querySelectorAll('[data-toggleable-code]');
  blocks.forEach(block => {
    const pre = block.querySelector('pre');
    const button = block.querySelector('button');
    // スタイル操作
    codeBlock.style.maxHeight = `${previewHeight}px`;
    codeBlock.style.overflow = 'hidden';
    // クリックでトグル
    button.onclick = () => { /* トグル処理 */ };
  });
}, []);
```

**依存**: DOM API、CSS (`maxHeight`, `overflow`)

**Expo転用**: ❌ **直接は不可**
- DOM操作が前提
- React NativeではAnimatedやLayoutAnimationを使う必要あり

---

#### `src/components/BlogCard.tsx`
**役割**: ブログカードのUI

**処理内容**:
```tsx
<Card className="hover:shadow-lg ...">
  <CardHeader>
    <Badge>{tag}</Badge>
    <CardTitle>{title}</CardTitle>
  </CardHeader>
  <CardContent>
    <Calendar />, <Clock /> icons
  </CardContent>
</Card>
```

**依存**:
- shadcn/ui（Radix UI + Tailwind CSS）
- lucide-react（アイコン）

**Expo転用**: ⚠️ **条件付き可能**
- UIロジックは転用可能
- shadcn/uiはWeb専用 → React Native Paperなどに置き換え
- lucide-reactは使える（React Native対応）

---

### 3. スタイリング

#### `src/styles/globals.css`

**主要スタイル**:

##### a. 見出し（H1-H6）
```css
.prose h1 {
  font-size: 2.25rem !important; /* 36px */
  line-height: 1.2 !important;
  margin-top: 2rem !important;
  margin-bottom: 1.5rem !important;
  font-weight: 700 !important;
  display: flex !important;
  align-items: center !important;
  gap: 0.5rem !important;
}
/* H2-H6も同様 */
```

**Expo転用**: ✅ **可能**
- StyleSheetに変換可能
```javascript
const styles = StyleSheet.create({
  h1: {
    fontSize: 36,
    lineHeight: 43, // 1.2 * 36
    marginTop: 32,
    marginBottom: 24,
    fontWeight: '700',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  }
});
```

---

##### b. リスト（ul, ol, li）
```css
.prose ul {
  list-style-type: disc !important;
  margin-top: 1.25em !important;
  padding-left: 1.625em !important;
}
.prose ol {
  list-style-type: decimal !important;
}
```

**Expo転用**: ⚠️ **部分的に可能**
- `list-style-type`は直接使えない
- 代替: カスタムコンポーネントで実装
```jsx
<View style={styles.ul}>
  <View style={styles.li}>
    <Text>• </Text>
    <Text>{item}</Text>
  </View>
</View>
```

---

##### c. テーブル
```css
.prose table {
  width: 100% !important;
  border-collapse: collapse !important;
}
.prose thead th {
  font-weight: 600 !important;
  padding: 0.5714286em !important;
}
```

**Expo転用**: ⚠️ **要ライブラリ**
- React Nativeには`<table>`がない
- 代替: react-native-table-component

---

##### d. コードブロック
```css
.prose pre {
  padding: 1.5rem;
  border-radius: 0.5rem;
}
.prose code {
  background-color: hsl(var(--muted));
  padding: 0.2em 0.4em;
  border-radius: 0.25rem;
}
```

**Expo転用**: ✅ **可能**
- StyleSheetで再現可能
- シンタックスハイライトは別途ライブラリ必要

---

##### e. 引用（blockquote）
```css
.prose blockquote {
  border-left-width: 4px;
  border-left-color: hsl(var(--primary));
  padding-left: 1rem;
  color: hsl(var(--muted-foreground));
}
```

**Expo転用**: ✅ **可能**

---

##### f. 水平線（hr）
```css
.prose hr {
  border-color: hsl(var(--border));
  border-top-width: 1px;
  margin-top: 3em;
}
```

**Expo転用**: ✅ **可能**
```jsx
<View style={{
  borderTopWidth: 1,
  borderTopColor: '#e5e7eb',
  marginTop: 48
}} />
```

---

##### g. 削除線（del）
```css
.prose del {
  text-decoration: line-through;
  opacity: 0.8;
}
```

**Expo転用**: ✅ **可能**
```jsx
<Text style={{ textDecorationLine: 'line-through', opacity: 0.8 }}>
  削除されたテキスト
</Text>
```

---

##### h. タスクリスト
```css
.prose input[type="checkbox"] {
  margin-right: 0.5em;
  accent-color: hsl(var(--primary));
}
```

**Expo転用**: ⚠️ **要ライブラリ**
- `<input type="checkbox">`は使えない
- 代替: expo-checkbox

---

## Expo/React Native転用可能性

### 総合評価

| コンポーネント/機能 | 転用難易度 | 転用可能性 | 備考 |
|-------------------|-----------|----------|------|
| **Rehypeプラグイン** | 🔴 高 | ❌ 不可 | Node.js依存、ビルド時処理 |
| **HeadingLinkIcon** | 🔴 高 | ❌ 不可 | DOM API依存 |
| **ToggleableCodeBlock** | 🟡 中 | ⚠️ 部分可 | DOM操作を排除し再設計必要 |
| **BlogCard** | 🟢 低 | ✅ 可能 | UIライブラリを置き換えるだけ |
| **基本スタイル** | 🟢 低 | ✅ 可能 | StyleSheetに変換可能 |
| **リスト** | 🟡 中 | ⚠️ 部分可 | カスタムコンポーネント必要 |
| **テーブル** | 🟡 中 | ⚠️ 部分可 | ライブラリ使用推奨 |
| **コードハイライト** | 🟡 中 | ⚠️ 部分可 | 別ライブラリ必要 |

### 転用不可な理由

#### 1. アーキテクチャの違い

**Web（Astro）**:
```
マークダウン → Rehype(Node.js) → HTML → React Islands → ブラウザ
```

**Expo/React Native**:
```
マークダウン → ??? → React Nativeコンポーネント → モバイルアプリ
```

**問題点**:
- Rehypeプラグインは**ビルド時**に実行（Node.js）
- React Nativeは**ランタイム**でマークダウンを処理する必要がある

#### 2. DOM APIへの依存

Web版は以下のAPIに依存:
- `document.querySelector`
- `element.createElement`
- `element.addEventListener`
- `navigator.clipboard`
- `window.getComputedStyle`

React Nativeには**これらが存在しない**。

#### 3. CSS vs StyleSheet

**Web**: Tailwind CSS + グローバルCSS
**React Native**: StyleSheet API（制約あり）

サポートされないCSS:
- `list-style-type`
- `border-collapse`
- `::before`, `::after`
- 多くのセレクタ（`:hover`, `:focus`等）

---

## 推奨アプローチ

### オプション1: react-native-markdown-display（推奨）

**概要**: React Native用のマークダウンレンダラー

**利点**:
- ✅ すぐに使える
- ✅ カスタマイズ可能
- ✅ シンタックスハイライト対応

**実装例**:
```tsx
import Markdown from 'react-native-markdown-display';

const markdownStyle = {
  heading1: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 32,
    marginBottom: 24,
  },
  code_inline: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  fence: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderRadius: 8,
  },
  // globals.cssのスタイルをここに移植
};

function BlogPost({ content }) {
  return (
    <Markdown style={markdownStyle}>
      {content}
    </Markdown>
  );
}
```

**globals.cssからの移植**:
```javascript
// src/styles/globals.css → React Native StyleSheet
const markdownStyles = {
  // .prose h1
  heading1: {
    fontSize: 36,
    lineHeight: 43,
    marginTop: 32,
    marginBottom: 24,
    fontWeight: '700',
  },

  // .prose h2
  heading2: {
    fontSize: 30,
    lineHeight: 39,
    marginTop: 28,
    marginBottom: 20,
    fontWeight: '700',
  },

  // .prose p
  body: {
    fontSize: 16,
    lineHeight: 28,
    marginBottom: 16,
  },

  // .prose blockquote
  blockquote: {
    borderLeftWidth: 4,
    borderLeftColor: '#3b82f6',
    paddingLeft: 16,
    color: '#6b7280',
  },

  // .prose code
  code_inline: {
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    fontFamily: 'monospace',
  },

  // .prose pre
  fence: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderRadius: 8,
    marginTop: 24,
    marginBottom: 24,
  },

  // .prose ul
  bullet_list: {
    marginTop: 20,
    marginBottom: 20,
    paddingLeft: 26,
  },

  // .prose li
  list_item: {
    marginTop: 8,
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 25.6,
  },

  // .prose hr
  hr: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    marginTop: 48,
    marginBottom: 48,
  },

  // .prose del
  deleted: {
    textDecorationLine: 'line-through',
    opacity: 0.8,
  },

  // .prose table (基本)
  table: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginTop: 32,
    marginBottom: 32,
  },

  th: {
    fontWeight: '600',
    padding: 12,
    backgroundColor: '#f9fafb',
  },

  td: {
    padding: 12,
  },
};
```

**インストール**:
```bash
npm install react-native-markdown-display
```

**カスタムレンダリング**（高度な機能）:
```tsx
import Markdown, { MarkdownIt } from 'react-native-markdown-display';

// カスタムルール追加
const md = MarkdownIt({ typographer: true });

// ブログリンク（rehype-blog-linkの代替）
md.use(require('markdown-it-task-lists'));

function BlogPost({ content }) {
  return (
    <Markdown
      style={markdownStyles}
      markdownit={md}
    >
      {content}
    </Markdown>
  );
}
```

---

### オプション2: カスタムレンダラー（高度）

**概要**: 自分でマークダウンパーサーとレンダラーを実装

**ライブラリ**:
- `remark`: マークダウンパーサー
- `remark-react`: ReactコンポーネントにレンダリングSteps:

1. **remarkでAST生成**
```typescript
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkReact from 'remark-react';

const processor = unified()
  .use(remarkParse)
  .use(remarkReact, {
    createElement: React.createElement,
    components: {
      h1: CustomH1,
      p: CustomParagraph,
      code: CustomCode,
      // ... カスタムコンポーネント
    },
  });

const result = processor.processSync(markdownContent);
```

2. **カスタムコンポーネント定義**
```tsx
// H1コンポーネント（見出しリンク機能付き）
function CustomH1({ children, id }) {
  const copyLink = () => {
    // Expoのクリップボード
    Clipboard.setString(`myapp://blog/${slug}#${id}`);
  };

  return (
    <View style={styles.h1Container}>
      <TouchableOpacity onPress={copyLink}>
        <LinkIcon />
      </TouchableOpacity>
      <Text style={styles.h1}>{children}</Text>
    </View>
  );
}

// コードブロック（トグル機能付き）
function CustomCode({ children, className }) {
  const [expanded, setExpanded] = useState(false);
  const language = className?.replace('language-', '');

  return (
    <View style={styles.codeBlock}>
      <SyntaxHighlighter
        language={language}
        style={darkTheme}
      >
        {children}
      </SyntaxHighlighter>
      {children.split('\n').length > 10 && (
        <TouchableOpacity onPress={() => setExpanded(!expanded)}>
          <Text>{expanded ? '折りたたむ' : 'もっと見る'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
```

3. **スタイル適用**
```typescript
const styles = StyleSheet.create({
  h1Container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  h1: {
    fontSize: 36,
    lineHeight: 43,
    fontWeight: '700',
    marginTop: 32,
    marginBottom: 24,
  },
  codeBlock: {
    backgroundColor: '#1f2937',
    padding: 24,
    borderRadius: 8,
    marginVertical: 24,
  },
  // globals.cssから移植したスタイル
});
```

**利点**:
- 完全なコントロール
- Web版と同じ機能を実装可能

**欠点**:
- 実装コストが高い
- メンテナンスが必要

---

### オプション3: ハイブリッド（おすすめ）

**戦略**:
1. 基本的なマークダウン → react-native-markdown-display
2. 高度な機能 → カスタムコンポーネント

**実装**:
```tsx
import Markdown from 'react-native-markdown-display';

// カスタムコンポーネント
const rules = {
  // 見出しにリンクアイコン追加
  heading1: (node, children) => (
    <CustomHeading level={1}>
      {children}
    </CustomHeading>
  ),

  // コードブロックにトグル機能
  fence: (node, children) => (
    <ToggleableCode code={node.content} language={node.sourceInfo} />
  ),

  // ブログリンク（自動リンク）
  text: (node) => {
    const linkedText = autolinkBlogPosts(node.content);
    return <Text>{linkedText}</Text>;
  },
};

function BlogPost({ content }) {
  return (
    <Markdown
      style={markdownStyles}
      rules={rules}
    >
      {content}
    </Markdown>
  );
}
```

---

## 具体的な移植手順

### ステップ1: 基本セットアップ

```bash
# Expoプロジェクト作成
npx create-expo-app my-blog-app
cd my-blog-app

# 必要なパッケージインストール
npm install react-native-markdown-display
npm install react-native-syntax-highlighter
npm install @expo/vector-icons
```

### ステップ2: スタイル移植

`src/styles/markdownStyles.ts`を作成:
```typescript
import { StyleSheet } from 'react-native';

export const markdownStyles = StyleSheet.create({
  // globals.cssから移植
  heading1: {
    fontSize: 36,
    lineHeight: 43,
    marginTop: 32,
    marginBottom: 24,
    fontWeight: '700',
  },
  // ... 他のスタイル
});
```

### ステップ3: マークダウンコンポーネント作成

`components/MarkdownRenderer.tsx`:
```typescript
import React from 'react';
import Markdown from 'react-native-markdown-display';
import { markdownStyles } from '../styles/markdownStyles';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <Markdown style={markdownStyles}>
      {content}
    </Markdown>
  );
}
```

### ステップ4: ブログ記事画面

`screens/BlogPostScreen.tsx`:
```typescript
import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { MarkdownRenderer } from '../components/MarkdownRenderer';

export function BlogPostScreen({ route }) {
  const { post } = route.params;

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>{post.title}</Text>
        <Text style={styles.date}>{post.date}</Text>
        <MarkdownRenderer content={post.content} />
      </View>
    </ScrollView>
  );
}
```

### ステップ5: データフェッチ

**オプションA**: 静的データ（JSON化）
```typescript
// scripts/export-posts.ts（Astroプロジェクトで実行）
import fs from 'fs';
import path from 'path';

const posts = await Astro.glob('../content/blog/*.md');
const exportData = posts.map(post => ({
  slug: post.frontmatter.slug,
  title: post.frontmatter.title,
  content: post.compiledContent(), // マークダウンのまま
  date: post.frontmatter.date,
}));

fs.writeFileSync(
  'public/posts.json',
  JSON.stringify(exportData, null, 2)
);
```

**オプションB**: API経由
```typescript
// Expo app
async function fetchPost(slug: string) {
  const response = await fetch(`https://yourblog.com/api/posts/${slug}`);
  return response.json();
}
```

---

## まとめ

### ✅ 転用可能な部分

1. **スタイル（globals.css）**
   - 95%転用可能
   - StyleSheetに変換するだけ

2. **UIロジック（BlogCard等）**
   - 80%転用可能
   - UIライブラリを置き換え

3. **マークダウン構造**
   - 100%互換
   - react-native-markdown-displayで対応

### ❌ 転用不可な部分

1. **Rehypeプラグイン**
   - Node.js依存
   - ビルド時処理

2. **DOM操作コンポーネント**
   - HeadingLinkIcon
   - ToggleableCodeBlock

3. **Web専用API**
   - `document.*`
   - `navigator.clipboard`

### 🎯 推奨戦略

**短期（MVP）**:
- react-native-markdown-display使用
- globals.cssをmarkdownStylesに移植
- 基本的なマークダウン表示のみ

**中期（機能追加）**:
- カスタムコンポーネント追加
  - 見出しリンク
  - コードトグル
- ブログ記事の自動リンク（簡易版）

**長期（完全移植）**:
- remarkベースのカスタムレンダラー
- Web版と同等の機能
- オフライン対応

---

## 次のステップ

1. **Expoプロジェクト作成**
2. **react-native-markdown-displayのセットアップ**
3. **globals.cssスタイルの移植**
4. **テスト用マークダウンでレンダリング確認**
5. **カスタム機能の追加検討**

必要なら、具体的な実装サポートも可能です！
