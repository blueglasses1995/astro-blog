---
title: 'shadcn/uiとTailwindCSSでモダンなUIを構築'
description: 'shadcn/uiとTailwindCSSを使って、美しく再利用可能なUIコンポーネントを構築する方法を解説します。'
date: 2024-11-18
pubDate: 2024-11-18
updatedDate: 2024-11-20
readTime: '8分'
tags: ['shadcn-ui', 'TailwindCSS', 'デザインシステム']
slug: 'shadcn-ui-tailwind-setup'
author: 'Tech Blog 編集部'
category: 'デザインシステム'
---

## shadcn/uiとは？

shadcn/uiは、コピー&ペーストで使える高品質なReactコンポーネント集です。通常のコンポーネントライブラリとは異なり、コンポーネントのソースコードをプロジェクトに直接追加します。

### 特徴

- **所有権**: コードが自分のプロジェクトに含まれるため、完全にカスタマイズ可能
- **依存関係の軽減**: 必要なコンポーネントだけを追加
- **TailwindCSS**: ユーティリティファーストのスタイリング
- **アクセシビリティ**: Radix UIを基盤として構築
- **TypeScript**: 完全な型サポート

## TailwindCSSのセットアップ

### 1. インストール

```bash
npm install -D tailwindcss @astrojs/tailwind
npx astro add tailwind
```

### 2. 設定ファイル

```js
// tailwind.config.mjs
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
        // ... 他の色定義
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

### 3. グローバルCSS

```css
/* src/styles/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;
    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;
    /* ... 他のCSS変数 */
  }

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;
    /* ... ダークモードの色 */
  }
}
```

## shadcn/uiコンポーネントの追加

### ユーティリティ関数

```ts
// src/lib/utils.ts
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### Buttonコンポーネント

```tsx
// src/components/ui/button.tsx
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

### Cardコンポーネント

```tsx
// src/components/ui/card.tsx
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

// ... 他のカードコンポーネント

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
```

## 実際の使用例

### ブログカードの実装

```tsx
// src/components/BlogCard.tsx
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

### Astroページでの使用

```astro
---
import Layout from '../layouts/Layout.astro';
import { BlogCard } from '../components/BlogCard';

const posts = await Astro.glob('../content/blog/*.md');
---

<Layout title="ブログ">
  <div class="container mx-auto px-4 py-16">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
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
  </div>
</Layout>
```

## カスタマイズのヒント

### 1. カラーテーマの変更

CSS変数を変更することで、簡単にテーマをカスタマイズできます：

```css
:root {
  --primary: 200 100% 50%; /* 青系 */
  --primary: 340 75% 55%;  /* ピンク系 */
  --primary: 142 76% 36%;  /* 緑系 */
}
```

### 2. ボーダー半径の調整

```css
:root {
  --radius: 0.5rem; /* デフォルト */
  --radius: 0rem;   /* シャープなデザイン */
  --radius: 1rem;   /* より丸みを帯びたデザイン */
}
```

### 3. コンポーネントのバリアント追加

```tsx
const buttonVariants = cva(
  // ... base classes
  {
    variants: {
      variant: {
        // ... existing variants
        gradient: "bg-gradient-to-r from-purple-500 to-pink-500 text-white",
      },
    },
  }
)
```

## まとめ

shadcn/uiとTailwindCSSの組み合わせにより：

- 美しく一貫性のあるUI
- 完全にカスタマイズ可能
- 型安全な開発体験
- 優れたアクセシビリティ

コンポーネントのソースコードを所有できるため、プロジェクトの要件に合わせて自由にカスタマイズできるのが最大の魅力です。
