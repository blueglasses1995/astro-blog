# Project Overview

## Purpose
Personal tech blog and portfolio website with multi-language support (7 locales).

## Tech Stack
- **Framework**: Astro 4 (hybrid SSR mode)
- **UI**: React 18 + TypeScript (strict)
- **Styling**: Tailwind CSS 3 + shadcn/ui design system
- **Animations**: Framer Motion
- **3D**: Three.js / React Three Fiber
- **Deployment**: Cloudflare Pages (via Wrangler)
- **Node**: v20
- **Package manager**: npm

## Key Dependencies
- `astro-expressive-code` - Code block syntax highlighting
- `lucide-react` - Icons
- `date-fns` - Date formatting
- `class-variance-authority` + `clsx` + `tailwind-merge` - shadcn/ui utilities
- `@radix-ui/*` - Headless UI primitives (dialog, popover, select)
- `gray-matter` - Frontmatter parsing
- `resend` - Email sending (contact form)
- `@playwright/test` - E2E testing

## i18n
- 7 locales: ja (default), en, zh, th, de, fr, es
- Default locale (ja) has no URL prefix
- Translations in `src/i18n/translations/*.json`
- Type: `SupportedLocale` in `src/types/index.ts`

## Content
- Blog posts in `src/content/blog/` using Astro Content Collections
- 3 collections: `blog`, `blogSource`, `blogTranslation`
- Custom rehype/remark plugins for markdown processing
