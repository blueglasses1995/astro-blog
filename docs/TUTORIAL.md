# Astro + React + shadcn/ui 技術ブログ構築ハンズオン

このチュートリアルでは、Astroのアイランドアーキテクチャを活用し、React、shadcn/ui、TailwindCSSを組み合わせた高速な技術ブログを構築する方法を学びます。

## 📚 目次

1. [はじめに](#はじめに)
2. [プロジェクトのセットアップ](#プロジェクトのセットアップ)
3. [Astroの基本](#astroの基本)
4. [TailwindCSSの設定](#tailwindcssの設定)
5. [shadcn/uiコンポーネントの追加](#shadcnuiコンポーネントの追加)
6. [Reactコンポーネントの作成](#reactコンポーネントの作成)
7. [ブログ機能の実装](#ブログ機能の実装)
8. [Cloudflare Pagesへのデプロイ](#cloudflare-pagesへのデプロイ)
9. [まとめ](#まとめ)

---

## はじめに

### このチュートリアルで学ぶこと

- ✅ Astroのアイランドアーキテクチャの理解
- ✅ ReactコンポーネントとAstroの統合
- ✅ TailwindCSSによるスタイリング
- ✅ shadcn/uiでモダンなUIコンポーネントの構築
- ✅ Markdownファイルによるブログコンテンツ管理
- ✅ Cloudflare Pagesへのデプロイ

### 前提知識

- HTML/CSS/JavaScriptの基本
- Reactの基礎知識
- ターミナル操作の基本

### 必要な環境

- Node.js 20以上
- npm または yarn
- テキストエディタ（VS Code推奨）
- Gitアカウント
- Cloudflareアカウント

---

## プロジェクトのセットアップ

### ステップ1: Astroプロジェクトの初期化

```bash
# 新規プロジェクトの作成
npm create astro@latest astro-blog

# プロジェクトディレクトリに移動
cd astro-blog
```

プロンプトでは以下を選択：
- Template: **Empty**
- TypeScript: **Yes (strict)**
- Install dependencies: **Yes**
- Git repository: **Yes**

### ステップ2: Reactインテグレーションの追加

```bash
npx astro add react
```

このコマンドは自動的に以下を実行します：
- React関連パッケージのインストール
- `astro.config.mjs`の更新
- `tsconfig.json`の設定

### ステップ3: TailwindCSSの追加

```bash
npx astro add tailwind
```

プロンプトで「Yes」を選択し、TailwindCSSの設定を完了します。

### ステップ4: 追加パッケージのインストール

```bash
npm install class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-slot tailwindcss-animate
```

これらは shadcn/ui コンポーネントに必要なパッケージです。

---

## Astroの基本

### アイランドアーキテクチャとは？

Astroのアイランドアーキテクチャは、静的なHTMLの「海」の中にインタラクティブな「島」（JavaScriptコンポーネント）を配置する設計パターンです。

```
┌─────────────────────────────────────┐
│                                     │
│         静的HTML（軽量）             │
│                                     │
│   ┌─────────────┐  ┌─────────────┐ │
│   │   Island 1  │  │   Island 2  │ │
│   │  (React JS) │  │  (React JS) │ │
│   └─────────────┘  └─────────────┘ │
│                                     │
│         静的HTML（軽量）             │
│                                     │
└─────────────────────────────────────┘
```

**メリット：**
- ⚡ 超高速なページロード
- 🎯 必要な部分だけにJavaScriptを使用
- 🔍 SEOに強い
- 📦 小さなバンドルサイズ

### クライアントディレクティブ

Astroでは、コンポーネントにディレクティブを付けて、いつJavaScriptをロードするか制御します：

```astro
<!-- ページロード時にすぐロード -->
<Counter client:load />

<!-- ブラウザがアイドル状態になったらロード -->
<ChatWidget client:idle />

<!-- 画面に表示されたらロード -->
<CommentSection client:visible />

<!-- メディアクエリに一致したらロード -->
<MobileMenu client:media="(max-width: 768px)" />

<!-- ディレクティブなし = 静的HTML（JSなし） -->
<Header />
```

### プロジェクト構造の理解

```
src/
├── components/          # 再利用可能なコンポーネント
│   ├── ui/             # shadcn/ui コンポーネント
│   └── BlogCard.tsx    # カスタムReactコンポーネント
├── content/            # Markdownコンテンツ
│   └── blog/          # ブログ記事
├── layouts/           # ページレイアウト
│   └── Layout.astro   # 基本レイアウト
├── pages/             # ルーティング（ファイルベース）
│   ├── index.astro    # / (ホームページ)
│   └── blog/
│       ├── index.astro      # /blog
│       └── [slug].astro     # /blog/:slug
├── styles/            # グローバルスタイル
│   └── globals.css
└── lib/              # ユーティリティ関数
    └── utils.ts
```

---

## TailwindCSSの設定

### ステップ1: Tailwind設定ファイルの更新

`tailwind.config.mjs`を以下のように更新します：

```js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
```

### ステップ2: グローバルCSSの作成

`src/styles/globals.css`を作成：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;
    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;
    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;
    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;
    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;
    --radius: 0.5rem;
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... ダークモードのカラー定義 */
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}
```

### ステップ3: tsconfig.jsonの更新

パスエイリアスを追加して、インポートを簡潔にします：

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

これにより、`../../components/ui/button`の代わりに`@/components/ui/button`と書けます。

---

## shadcn/uiコンポーネントの追加

### ステップ1: ユーティリティ関数の作成

`src/lib/utils.ts`を作成：

```ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

この関数は、Tailwindのクラス名を動的に結合・マージするためのユーティリティです。

### ステップ2: Buttonコンポーネントの作成

`src/components/ui/button.tsx`を作成：

```tsx
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
```

**ポイント：**
- `cva`: バリアントベースのクラス名生成
- `asChild`: ボタンのスタイルを他の要素（例：`<a>`）に適用
- `forwardRef`: Ref転送をサポート

### ステップ3: Cardコンポーネントの作成

`src/components/ui/card.tsx`を作成：

```tsx
import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg border bg-card text-card-foreground shadow-sm",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-2xl font-semibold leading-none tracking-tight", className)}
      {...props}
    />
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn("flex items-center p-6 pt-0", className)}
      {...props}
    />
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
```

### ステップ4: Badgeコンポーネントの作成

`src/components/ui/badge.tsx`を作成：

```tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
```

---

## Reactコンポーネントの作成

### BlogCardコンポーネント

`src/components/BlogCard.tsx`を作成：

```tsx
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, Clock } from 'lucide-react';

interface BlogCardProps {
  title: string;
  description: string;
  date: string;
  readTime: string;
  tags: string[];
  slug: string;
}

export function BlogCard({ title, description, date, readTime, tags, slug }: BlogCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex gap-2 mb-2 flex-wrap">
          {tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{readTime}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <a href={`/blog/${slug}`}>続きを読む</a>
        </Button>
      </CardFooter>
    </Card>
  );
}
```

**ポイント：**
- TypeScript型定義で props を型安全に
- `line-clamp-2`: 2行以上のテキストを省略
- `flex-grow`: CardContentを伸縮させてフッターを下に固定
- Lucideアイコンでビジュアルを強化

---

## ブログ機能の実装

### ステップ1: レイアウトの作成

`src/layouts/Layout.astro`を作成：

```astro
---
import '../styles/globals.css';

interface Props {
  title: string;
  description?: string;
}

const { title, description = 'Astro + React技術ブログ' } = Astro.props;
---

<!doctype html>
<html lang="ja">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content={description} />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>{title}</title>
  </head>
  <body>
    <div class="min-h-screen bg-background">
      <header class="border-b">
        <div class="container mx-auto px-4 py-6">
          <nav class="flex items-center justify-between">
            <a href="/" class="text-2xl font-bold text-foreground hover:text-primary transition-colors">
              Tech Blog
            </a>
            <div class="flex items-center gap-6">
              <a href="/" class="text-foreground hover:text-primary transition-colors">ホーム</a>
              <a href="/blog" class="text-foreground hover:text-primary transition-colors">ブログ</a>
            </div>
          </nav>
        </div>
      </header>
      <main>
        <slot />
      </main>
      <footer class="border-t mt-20">
        <div class="container mx-auto px-4 py-8">
          <p class="text-center text-muted-foreground">
            © 2024 Tech Blog. Built with Astro + React + TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  </body>
</html>
```

### ステップ2: ホームページの作成

`src/pages/index.astro`を作成：

```astro
---
import Layout from '../layouts/Layout.astro';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { BlogCard } from '../components/BlogCard';

// ブログ記事を取得（MDファイルから）
const posts = await Astro.glob('../content/blog/*.md');
const sortedPosts = posts.sort((a, b) =>
  new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
).slice(0, 3);
---

<Layout title="ホーム | Tech Blog">
  <section class="container mx-auto px-4 py-20">
    <div class="text-center max-w-3xl mx-auto">
      <h1 class="text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
        Astro + React 技術ブログ
      </h1>
      <p class="text-xl text-muted-foreground mb-8">
        アイランドアーキテクチャで構築された高速で軽量な技術ブログ
      </p>
      <div class="flex gap-4 justify-center">
        <Button asChild size="lg" client:idle>
          <a href="/blog">ブログを読む</a>
        </Button>
        <Button asChild variant="outline" size="lg" client:idle>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </Button>
      </div>
    </div>
  </section>

  <section class="container mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">使用技術</h2>
      <p class="text-muted-foreground">このブログで使用している技術スタック</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card client:idle>
        <CardHeader>
          <CardTitle>Astro</CardTitle>
          <CardDescription>静的サイトジェネレーター</CardDescription>
        </CardHeader>
        <CardContent>
          <p class="text-sm text-muted-foreground">
            高速でSEOに強い静的サイトを生成
          </p>
        </CardContent>
      </Card>
      <!-- ... 他のカード -->
    </div>
  </section>

  <section class="container mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold mb-4">最新の記事</h2>
      <p class="text-muted-foreground">最近投稿された記事をチェック</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedPosts.map((post) => (
        <BlogCard
          client:idle
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          date={post.frontmatter.date}
          readTime={post.frontmatter.readTime}
          tags={post.frontmatter.tags}
          slug={post.frontmatter.slug}
        />
      ))}
    </div>
  </section>
</Layout>
```

**重要なポイント：**

1. `Astro.glob()`: すべてのMDファイルを取得
2. `client:idle`: ブラウザがアイドル時にReactコンポーネントをハイドレーション
3. グリッドレイアウト: レスポンシブな記事カード表示

### ステップ3: ブログ一覧ページ

`src/pages/blog/index.astro`を作成：

```astro
---
import Layout from '../../layouts/Layout.astro';
import { BlogCard } from '../../components/BlogCard';

// すべてのブログ記事を取得
const posts = await Astro.glob('../../content/blog/*.md');
const sortedPosts = posts.sort((a, b) =>
  new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
);
---

<Layout title="ブログ | Tech Blog">
  <section class="container mx-auto px-4 py-16">
    <div class="text-center mb-12">
      <h1 class="text-4xl font-bold mb-4">ブログ記事</h1>
      <p class="text-muted-foreground">技術に関する記事を投稿しています</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sortedPosts.map((post) => (
        <BlogCard
          client:idle
          title={post.frontmatter.title}
          description={post.frontmatter.description}
          date={post.frontmatter.date}
          readTime={post.frontmatter.readTime}
          tags={post.frontmatter.tags}
          slug={post.frontmatter.slug}
        />
      ))}
    </div>
  </section>
</Layout>
```

### ステップ4: 動的ルート（個別記事ページ）

`src/pages/blog/[slug].astro`を作成：

```astro
---
import Layout from '../../layouts/Layout.astro';
import { Badge } from '../../components/ui/badge';
import { Calendar, Clock } from 'lucide-react';

export async function getStaticPaths() {
  const posts = await import.meta.glob('../../content/blog/*.md');
  const paths = await Promise.all(
    Object.entries(posts).map(async ([path, resolver]) => {
      const post = await resolver() as any;
      return {
        params: { slug: post.frontmatter.slug },
        props: { post },
      };
    })
  );
  return paths;
}

const { post } = Astro.props;
const { Content } = post;
const { title, description, date, readTime, tags, author } = post.frontmatter;
---

<Layout title={`${title} | Tech Blog`} description={description}>
  <article class="container mx-auto px-4 py-16 max-w-4xl">
    <header class="mb-8">
      <div class="flex gap-2 mb-4 flex-wrap">
        {tags.map((tag: string) => (
          <Badge client:idle variant="secondary">{tag}</Badge>
        ))}
      </div>
      <h1 class="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
      <p class="text-xl text-muted-foreground mb-6">{description}</p>
      <div class="flex items-center gap-6 text-sm text-muted-foreground border-t border-b py-4">
        <div class="flex items-center gap-2">
          <span class="font-medium">著者:</span>
          <span>{author}</span>
        </div>
        <div class="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          <span>{date}</span>
        </div>
        <div class="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>{readTime}</span>
        </div>
      </div>
    </header>
    <div class="prose prose-lg max-w-none dark:prose-invert">
      <Content />
    </div>
  </article>
</Layout>
```

**動的ルートの仕組み：**

1. `[slug].astro`: ファイル名の`[]`が動的パラメータを示す
2. `getStaticPaths()`: ビルド時にすべての可能なパスを生成
3. `import.meta.glob()`: すべてのMDファイルを動的インポート
4. `<Content />`: Markdownコンテンツをレンダリング

### ステップ5: ブログ記事の作成

`src/content/blog/first-post.md`を作成：

```markdown
---
title: 'Astroで技術ブログを始めよう'
description: 'Astroを使った技術ブログの始め方を解説します。'
date: '2024-11-20'
readTime: '5分'
tags: ['Astro', 'ブログ', '初心者向け']
slug: 'first-post'
author: 'あなたの名前'
---

## はじめに

Astroは、高速で軽量なWebサイトを構築するための...

### サブ見出し

本文をここに書きます。

```js
// コードブロックの例
console.log('Hello, Astro!');
```

- リスト項目1
- リスト項目2
- リスト項目3

**太字** や *イタリック* も使えます。
```

---

## Cloudflare Pagesへのデプロイ

### ステップ1: Gitリポジトリの作成

```bash
# Gitリポジトリの初期化（既に初期化済みの場合はスキップ）
git init

# すべてのファイルをステージング
git add .

# コミット
git commit -m "Initial commit: Astro blog setup"

# GitHubにプッシュ（事前にGitHubでリポジトリを作成）
git remote add origin https://github.com/yourusername/astro-blog.git
git branch -M main
git push -u origin main
```

### ステップ2: Cloudflare Pagesの設定

1. **Cloudflareダッシュボードにアクセス**
   - https://dash.cloudflare.com/ にログイン
   - 左サイドバーから「Pages」を選択

2. **新規プロジェクトの作成**
   - 「Create a project」ボタンをクリック
   - 「Connect to Git」を選択

3. **リポジトリの連携**
   - GitHubアカウントを連携
   - デプロイしたいリポジトリを選択
   - 「Begin setup」をクリック

4. **ビルド設定**
   ```
   Project name: astro-blog
   Production branch: main
   Framework preset: Astro
   Build command: npm run build
   Build output directory: dist
   ```

5. **環境変数（必要に応じて）**
   - 必要な環境変数があれば追加

6. **デプロイ**
   - 「Save and Deploy」をクリック
   - 初回ビルドが開始されます

### ステップ3: デプロイの確認

ビルドが完了すると、Cloudflareが提供するURLでサイトにアクセスできます：
- `https://astro-blog.pages.dev`（実際のURLは異なります）

### ステップ4: カスタムドメインの設定（オプション）

1. Cloudflare Pagesの設定画面で「Custom domains」を選択
2. 「Set up a custom domain」をクリック
3. 独自ドメインを入力して設定

### 継続的デプロイメント

GitHubリポジトリにプッシュすると、自動的にCloudflare Pagesがビルド・デプロイを実行します：

```bash
# 変更をコミット
git add .
git commit -m "Add new blog post"

# プッシュ
git push origin main

# Cloudflareが自動的にビルド・デプロイ
```

---

## まとめ

### 学んだこと

✅ **Astroのアイランドアーキテクチャ**
- 静的HTMLとインタラクティブなJavaScriptの最適な組み合わせ
- クライアントディレクティブによる細かい制御

✅ **ReactとAstroの統合**
- Reactコンポーネントの作成と使用
- propsの受け渡しとイベントハンドリング

✅ **TailwindCSSでのスタイリング**
- ユーティリティクラスによる迅速な開発
- カスタムテーマの設定

✅ **shadcn/uiコンポーネント**
- 再利用可能なUIコンポーネントの構築
- バリアントベースのデザインシステム

✅ **Markdownベースのブログ**
- frontmatterによるメタデータ管理
- 動的ルーティングの実装

✅ **Cloudflare Pagesへのデプロイ**
- GitHubとの連携
- 継続的デプロイメントの設定

### 次のステップ

このブログをさらに拡張するアイデア：

1. **検索機能の追加**
   - Fuseなどで全文検索を実装

2. **タグフィルタリング**
   - タグごとに記事を絞り込む機能

3. **ダークモード**
   - テーマ切り替え機能の追加

4. **コメントシステム**
   - Giscusなどでコメント機能を追加

5. **RSSフィード**
   - ブログのRSSフィードを生成

6. **OGP画像の自動生成**
   - 記事ごとにOGP画像を動的生成

7. **目次（TOC）**
   - 記事内の見出しから目次を自動生成

8. **関連記事の表示**
   - タグベースで関連記事を表示

9. **ページネーション**
   - ブログ一覧でページング機能を追加

10. **アナリティクス**
    - Google AnalyticsやPlausibleで分析

### 参考リンク

- [Astro公式ドキュメント](https://docs.astro.build/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [Cloudflare Pages](https://pages.cloudflare.com/)

---

お疲れ様でした！これで、モダンな技術スタックを使った高速な技術ブログが完成しました。🎉
