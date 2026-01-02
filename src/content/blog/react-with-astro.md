---
title: 'AstroでReactを使う方法'
description: 'AstroプロジェクトでReactコンポーネントを効果的に使用する方法を、実例とともに解説します。'
date: 2024-11-19
pubDate: 2024-11-19
updatedDate: 2024-11-21
readTime: '7分'
tags: ['Astro', 'React', 'フロントエンド']
slug: 'react-with-astro'
author: 'Tech Blog 編集部'
category: 'フロントエンド'
---

## なぜAstroとReact？

Astroは複数のUIフレームワークをサポートしていますが、その中でもReactは最も人気があります。既存のReactコンポーネントを再利用できるのは大きなメリットです。

## セットアップ

### 1. Reactインテグレーションの追加

```bash
npx astro add react
```

このコマンドで以下が自動的に設定されます：
- React関連パッケージのインストール
- `astro.config.mjs`の更新
- `tsconfig.json`の設定

### 2. 手動セットアップ

自動セットアップが使えない場合は、手動で設定できます：

```bash
npm install @astrojs/react react react-dom
```

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [react()],
});
```

## Reactコンポーネントの作成

### インタラクティブなコンポーネント

```tsx
// src/components/SearchBox.tsx
import { useState } from 'react';

interface SearchBoxProps {
  onSearch: (query: string) => void;
}

export function SearchBox({ onSearch }: SearchBoxProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="検索..."
        className="flex-1 px-4 py-2 border rounded"
      />
      <button type="submit" className="px-6 py-2 bg-blue-500 text-white rounded">
        検索
      </button>
    </form>
  );
}
```

### Astroページでの使用

```astro
---
// src/pages/search.astro
import Layout from '../layouts/Layout.astro';
import { SearchBox } from '../components/SearchBox';
---

<Layout title="検索">
  <div class="container mx-auto p-8">
    <h1>記事を検索</h1>

    <!-- client:loadで即座にハイドレーション -->
    <SearchBox client:load onSearch={(q) => console.log(q)} />
  </div>
</Layout>
```

## クライアントディレクティブの使い分け

### client:load
ページロード直後に必要な重要なコンポーネント（ナビゲーションメニューなど）に使用：

```astro
<Navigation client:load />
```

### client:idle
優先度の低いコンポーネント（チャットウィジェット、広告など）に使用：

```astro
<ChatWidget client:idle />
```

### client:visible
スクロールして表示されるコンポーネント（コメント欄、画像ギャラリーなど）に使用：

```astro
<CommentSection client:visible />
```

### client:media
レスポンシブなコンポーネント（モバイルメニューなど）に使用：

```astro
<MobileMenu client:media="(max-width: 768px)" />
```

## Propsの受け渡し

### 静的Props

```astro
---
const title = "記事タイトル";
const tags = ["React", "Astro"];
---

<ArticleCard
  client:idle
  title={title}
  tags={tags}
/>
```

### 関数Props（注意点）

関数をpropsとして渡す場合は、そのコンポーネントをハイドレーションする必要があります：

```astro
<!-- ❌ これは動作しません -->
<Button onClick={() => console.log('click')} />

<!-- ✅ client:*ディレクティブが必要 -->
<Button client:idle onClick={() => console.log('click')} />
```

## 状態管理

### ローカル状態

単純な状態は`useState`で管理：

```tsx
import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);
  return (
    <button onClick={() => setCount(count + 1)}>
      カウント: {count}
    </button>
  );
}
```

### グローバル状態

複数のコンポーネント間で状態を共有する場合は、Zustandやnanostoresを使用：

```tsx
// store.ts
import { atom } from 'nanostores';

export const $cartItems = atom<string[]>([]);
```

```tsx
// CartButton.tsx
import { useStore } from '@nanostores/react';
import { $cartItems } from '../store';

export function CartButton() {
  const items = useStore($cartItems);
  return <button>カート ({items.length})</button>;
}
```

## パフォーマンス最適化

### 1. コンポーネントの遅延ロード

```astro
---
// 重いコンポーネントは遅延ロード
---

<HeavyChart client:visible />
```

### 2. 静的レンダリングの活用

インタラクティブでない部分はAstroコンポーネントで：

```astro
<!-- Astroコンポーネント（静的） -->
<article class="prose">
  <h1>{post.title}</h1>
  <div set:html={post.content} />
</article>

<!-- Reactコンポーネント（インタラクティブ） -->
<LikeButton client:visible postId={post.id} />
```

## まとめ

AstroとReactの組み合わせにより：

- 既存のReactコンポーネントを再利用
- 必要な部分だけJSを配信
- 高速なページロードを実現
- 優れたSEOを維持

アイランドアーキテクチャの思想を理解して、適切にクライアントディレクティブを使い分けることが重要です。
