# Codebase Structure

```
astro-blog/
├── src/
│   ├── components/        # React components
│   │   ├── ui/            # shadcn/ui base (button, card, badge, etc.)
│   │   ├── animations/    # Framer Motion (FadeIn, SlideIn, StaggerChildren)
│   │   ├── 3d/            # Three.js / R3F components
│   │   ├── markdown/      # Markdown rendering
│   │   ├── Hero.tsx        # Landing hero section
│   │   ├── Navigation.tsx  # Site navigation
│   │   ├── BlogCard.tsx    # Blog post card
│   │   ├── BlogFilterPanel.tsx  # Blog filtering
│   │   ├── ThemeToggle.tsx # Dark/light mode toggle
│   │   └── ...
│   ├── content/
│   │   ├── blog/          # Blog posts (Markdown/MDX)
│   │   └── config.ts      # Content Collections schema
│   ├── data/              # Static data files
│   ├── i18n/
│   │   ├── translations/  # Locale JSON files (ja, en, zh, th, de, fr, es)
│   │   ├── index.ts       # i18n exports
│   │   └── utils.ts       # Translation utilities
│   ├── layouts/
│   │   └── Layout.astro   # Main layout
│   ├── lib/
│   │   ├── markdown/      # Markdown processing config
│   │   ├── rehype-*.mjs   # Custom rehype plugins
│   │   ├── utils.ts       # General utilities
│   │   ├── seo-utils.ts   # SEO utilities
│   │   └── ai-translator.ts / related-posts.ts / image-alt-generator.ts
│   ├── pages/
│   │   ├── [locale]/      # Localized pages (non-default locales)
│   │   │   ├── blog/
│   │   │   ├── tags/
│   │   │   ├── categories/
│   │   │   ├── index.astro
│   │   │   ├── about.astro
│   │   │   ├── cv.astro
│   │   │   └── portfolio.astro
│   │   ├── api/           # API routes (send-email.ts)
│   │   ├── blog/ tags/ categories/  # Default locale (ja) pages
│   │   └── index.astro, about.astro, cv.astro, portfolio.astro
│   ├── styles/
│   │   └── globals.css    # Global styles, CSS variables, Tailwind
│   ├── types/
│   │   └── index.ts       # Shared TypeScript types
│   └── env.d.ts
├── public/                # Static assets
├── e2e/                   # Playwright e2e tests
├── scripts/               # Build/utility scripts (tsx, mjs, sh)
├── docs/                  # Documentation (gitignored)
├── astro.config.ts
├── tailwind.config.mjs
├── tsconfig.json
├── playwright.config.ts
├── package.json
└── AGENTS.md              # Agent workflow instructions
```
