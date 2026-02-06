# Task Completion Checklist

When a coding task is completed, follow these steps:

## 1. Verify Changes
- Ensure TypeScript has no errors (Astro check may crash - skip if so)
- Review changed files for correctness

## 2. Test
- Run `npx playwright test` for e2e tests if UI changed
- Manual check: `npm run dev` and verify in browser at http://localhost:4321

## 3. Build Check
- Run `npm run build` to verify production build succeeds
- Note: `astro check` is skipped in build (crashes), build still succeeds

## 4. Issue Tracking
- Update beads issues: `bd update <id> -s closed`
- Create new issues for remaining work: `bd create`

## 5. Git Workflow (per AGENTS.md)
- Stage and commit changes
- `git pull --rebase`
- `bd sync`
- `git push`
- Verify: `git status` shows "up to date with origin"

## Important Notes
- Work is NOT complete until `git push` succeeds
- Use `bd` commands for issue tracking (status: open, in_progress, closed)
- Never use `--no-verify` to skip hooks
