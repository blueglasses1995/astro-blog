# Suggested Commands

## Development
```bash
npm run dev          # Start dev server (clears cache first), http://localhost:4321
npm run start        # Start dev server (without cache clear)
npm run preview      # Preview production build
```

## Build & Deploy
```bash
npm run build        # Full build (preprocess + translate + related + astro build + postbuild)
npm run deploy       # Build + deploy to Cloudflare Pages
```

## Content Processing
```bash
npm run preprocess   # Preprocess blog posts (tsx scripts/preprocess-blog.ts)
npm run translate    # Translate posts (tsx scripts/translate-posts.ts)
npm run related      # Generate related posts (tsx scripts/generate-related-posts.ts)
npm run image-alt    # Generate image alt text (tsx scripts/generate-image-alt.ts)
```

## Testing
```bash
npx playwright test              # Run all e2e tests
npx playwright test e2e/home.spec.ts  # Run specific test file
npx playwright test --project=chromium  # Run on specific browser
```

## Issue Tracking (Beads CLI)
```bash
bd list              # List open issues
bd ready             # Find available work
bd show <id>         # View issue details
bd update <id> -s in_progress   # Claim work
bd update <id> -s closed        # Close issue (NOT "done")
bd close <id>        # Complete work
bd sync              # Sync with git
```

## Utilities
```bash
npm run sync-mcp     # Sync MCP config
npm run docs:index   # Generate docs index
```

## System (macOS/Darwin)
```bash
git status           # Check git state
git log --oneline -10  # Recent commits
```
