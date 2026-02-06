# Code Style & Conventions

## TypeScript
- Strict mode (`"extends": "astro/tsconfigs/strict"`)
- JSX: `react-jsx` import source
- Path alias: `@/*` → `./src/*`
- Interfaces for component props (e.g., `interface BlogCardProps { ... }`)
- Export types from `src/types/index.ts`

## React Components
- Functional components with TypeScript interfaces for props
- Files: PascalCase `.tsx` (e.g., `BlogCard.tsx`, `ThemeToggle.tsx`)
- Located in `src/components/` with subdirectories:
  - `ui/` - shadcn/ui base components (button, card, badge, etc.)
  - `animations/` - Framer Motion wrappers (FadeIn, SlideIn, StaggerChildren)
  - `3d/` - Three.js components
  - `markdown/` - Markdown rendering components

## Astro Pages
- File-based routing in `src/pages/`
- Locale routing: `src/pages/[locale]/` for non-default locales
- Default locale (ja) pages at root: `src/pages/index.astro`, etc.
- Layouts in `src/layouts/Layout.astro`

## Styling
- Tailwind CSS with shadcn/ui design system
- Colors use HSL CSS variables: `bg-background` → `hsl(var(--background))`
- CSS variables defined in `src/styles/globals.css`
  - `:root` for light mode, `.dark` for dark mode
- Dark mode: class-based (`darkMode: ["class"]`)
- Typography plugin for prose content
- `tailwindcss-animate` for animation utilities

## Comments
- Japanese comments are common throughout the codebase
- Code comments explain "why" not "what"

## Naming
- Components: PascalCase
- Files: PascalCase for components, camelCase for utilities
- CSS: Tailwind utility classes, kebab-case for custom classes
- Types/Interfaces: PascalCase
