# Agent Instructions

This project uses **bd** (beads) for issue tracking. Run `bd onboard` to get started.

## Quick Reference

```bash
bd ready              # Find available work
bd show <id>          # View issue details
bd update <id> --status in_progress  # Claim work
bd close <id>         # Complete work
bd sync               # Sync with git
```

## Landing the Plane (Session Completion)

**When ending a work session**, you MUST complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create issues for anything that needs follow-up
2. **Run quality gates** (if code changed) - Tests, linters, builds
3. **Update issue status** - Close finished work, update in-progress items
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   bd sync
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Clean up** - Clear stashes, prune remote branches
6. **Verify** - All changes committed AND pushed
7. **Hand off** - Provide context for next session

**CRITICAL RULES:**
- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing - that leaves work stranded locally
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

Use 'bd' for task tracking

## Cursor Cloud specific instructions

### Project overview

Astro 4 portfolio/blog site (TypeScript, React islands, TailwindCSS) deployed to Cloudflare Pages. No database, no Docker. Content is file-based Markdown in `src/content/blog/`.

### Node version

Requires **Node.js 20** (per `.node-version`). The update script handles this via nvm.

### Key commands

| Task | Command |
|------|---------|
| Install deps | `npm install` |
| Dev server | `npm run dev` (port 4321) |
| TypeScript check | `npx astro check` |
| E2E tests (chromium) | `npx playwright test --project=chromium` |
| E2E tests (all) | `npx playwright test` |
| Install Playwright browsers | `npx playwright install --with-deps chromium` |

### Dev server notes

- `npm run dev` clears `.astro`, `node_modules/.vite`, and `dist` before starting (see `package.json` `dev` script).
- The Playwright config (`playwright.config.ts`) auto-starts the dev server via `webServer`, so you don't need to start it manually before running E2E tests.
- No API keys are needed for basic development. AI chat returns 503 gracefully; contact form fails gracefully.

### Known issues

- `npx astro check` exits with code 1 due to 9 pre-existing TS errors (implicit `any` types in blog slug pages, null assignment in related posts). These are not regressions.
- Some E2E tests (~8 of 16) fail due to stale selectors that don't match the current UI. This is a pre-existing condition.

### No linter config

There is no ESLint, Biome, or Prettier configuration. The only lint-style check available is `npx astro check` (TypeScript diagnostics).