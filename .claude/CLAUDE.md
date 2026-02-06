# Claude Code Configuration for Astro Blog Project

This project uses the following Claude Code plugins and capabilities:

## Enabled Plugins

### 1. Compound Engineering Plugin
- **Plugin ID**: `compound-engineering@every-marketplace`
- **Version**: 2.30.0
- **Components**: 29 Agents, 25 Commands, 16 Skills, 1 MCP Server

#### Available Agents

**Review Agents (15)**
- `agent-native-reviewer` - Verify features are agent-native (action + context parity)
- `architecture-strategist` - Analyze architectural decisions and compliance
- `code-simplicity-reviewer` - Final pass for simplicity and minimalism
- `data-integrity-guardian` - Database migrations and data integrity
- `data-migration-expert` - Validate ID mappings match production
- `deployment-verification-agent` - Create Go/No-Go deployment checklists
- `dhh-rails-reviewer` - Rails review from DHH's perspective
- `julik-frontend-races-reviewer` - Review JavaScript/Stimulus code for race conditions
- `kieran-rails-reviewer` - Rails code review with strict conventions
- `kieran-python-reviewer` - Python code review with strict conventions
- `kieran-typescript-reviewer` - TypeScript code review with strict conventions
- `pattern-recognition-specialist` - Analyze code for patterns and anti-patterns
- `performance-oracle` - Performance analysis and optimization
- `schema-drift-detector` - Detect unrelated schema.rb changes in PRs
- `security-sentinel` - Security audits and vulnerability assessments

**Research Agents (5)**
- `best-practices-researcher` - Gather external best practices and examples
- `framework-docs-researcher` - Research framework documentation and best practices
- `git-history-analyzer` - Analyze git history and code evolution
- `learnings-researcher` - Search institutional learnings for relevant past solutions
- `repo-research-analyst` - Research repository structure and conventions

**Design Agents (3)**
- `design-implementation-reviewer` - Verify UI implementations match Figma designs
- `design-iterator` - Iteratively refine UI through systematic design iterations
- `figma-design-sync` - Synchronize web implementations with Figma designs

**Workflow Agents (5)**
- `bug-reproduction-validator` - Systematically reproduce and validate bug reports
- `every-style-editor` - Edit content to conform to style guide
- `lint` - Run linting and code quality checks
- `pr-comment-resolver` - Address PR comments and implement fixes
- `spec-flow-analyzer` - Analyze user flows and identify gaps in specifications

**Docs Agents (1)**
- `ankane-readme-writer` - Create READMEs following Ankane-style template

#### Available Commands

**Workflow Commands** (use `workflows:` prefix)
- `/workflows:brainstorm` - Explore requirements and approaches before planning
- `/workflows:plan` - Create implementation plans
- `/workflows:review` - Run comprehensive code reviews
- `/workflows:work` - Execute work items systematically
- `/workflows:compound` - Document solved problems to compound team knowledge

**Utility Commands**
- `/lfg` - Full autonomous engineering workflow
- `/slfg` - Full autonomous workflow with swarm mode for parallel execution
- `/deepen-plan` - Enhance plans with parallel research agents for each section
- `/changelog` - Create engaging changelogs for recent merges
- `/create-agent-skill` - Create or edit Claude Code skills
- `/generate_command` - Generate new slash commands
- `/heal-skill` - Fix skill documentation issues
- `/plan_review` - Multi-agent plan review in parallel
- `/report-bug` - Report a bug in the plugin
- `/reproduce-bug` - Reproduce bugs using logs and console
- `/resolve_parallel` - Resolve TODO comments in parallel
- `/document-knowledge` - Store project knowledge in appropriate documentation files (uses `document-knowledge` skill)

#### Available Skills

- `agent-browser` - Browser automation capabilities
- `agent-native-architecture` - Agent-native development patterns
- `andrew-kane-gem-writer` - Ruby gem development patterns
- `brainstorming` - Design refinement through questions
- `compound-docs` - Documentation generation
- `create-agent-skills` - Skill creation workflow
- `dhh-rails-style` - Rails conventions from DHH's perspective
- `dspy-ruby` - Ruby DSPy patterns
- `document-knowledge` - Organize and store project knowledge in appropriate documentation files
- `every-style-editor` - Content style editing
- `file-todos` - File-based TODO management
- `frontend-design` - Frontend design patterns
- `gemini-imagegen` - Image generation with Gemini
- `git-worktree` - Git worktree management
- `orchestrating-swarms` - Parallel agent orchestration
- `rclone` - Rclone integration
- `skill-creator` - Skill creation tools

### 2. Superpowers Plugin
- **Plugin ID**: `superpowers@claude-plugins-official`
- **Version**: 4.2.0
- **Description**: Complete software development workflow with composable skills

#### Available Skills

**Core Workflow Skills**
- `brainstorming` - Socratic design refinement before coding
- `using-git-worktrees` - Isolated workspace creation on new branches
- `writing-plans` - Detailed implementation plans (2-5 minute tasks)
- `subagent-driven-development` - Fresh subagent per task with two-stage review
- `executing-plans` - Batch execution with human checkpoints
- `test-driven-development` - RED-GREEN-REFACTOR cycle enforcement
- `requesting-code-review` - Pre-review checklist
- `receiving-code-review` - Responding to feedback
- `finishing-a-development-branch` - Merge/PR decision workflow

**Advanced Skills**
- `dispatching-parallel-agents` - Concurrent subagent workflows
- `systematic-debugging` - 4-phase root cause process
- `verification-before-completion` - Ensure fixes are actually working

**Meta Skills**
- `writing-skills` - Create new skills following best practices
- `using-superpowers` - Introduction to the skills system

### 3. Superpowers Developing for Claude Code
- **Plugin ID**: `superpowers-developing-for-claude-code@superpowers-marketplace`
- **Version**: 0.3.1
- **Description**: Development tools and examples for creating Claude Code plugins

## Usage Guidelines

### When to Use Which Plugin

**Use Compound Engineering for:**
- Code reviews and quality assurance
- Research and documentation
- Architecture analysis
- Performance optimization
- Security audits

**Use Superpowers for:**
- Feature planning and implementation
- Test-driven development
- Systematic debugging
- Parallel agent workflows
- Git worktree management

### Workflow Recommendations

1. **Starting a new feature**: Use `/workflows:brainstorm` or Superpowers `brainstorming` skill
2. **Creating a plan**: Use `/workflows:plan` or Superpowers `writing-plans` skill
3. **Code review**: Use `/workflows:review` or appropriate review agents
4. **Implementation**: Use Superpowers `subagent-driven-development` or `executing-plans`
5. **Debugging**: Use Superpowers `systematic-debugging` skill
6. **Testing**: Use Superpowers `test-driven-development` skill

## Project-Specific Instructions

This project is an Astro blog with:
- React components
- TypeScript
- Tailwind CSS
- Multi-language support (i18n)
- Cloudflare Pages deployment
- Beads issue tracking (bd commands)

When working on this project:
- Follow Astro best practices
- Maintain TypeScript type safety
- Use Tailwind for styling
- Test changes across all supported locales
- Use `bd` commands for issue tracking
- Follow the workflow in `AGENTS.md`

## Agent Selection Guidelines

- For TypeScript/React code reviews: Use `kieran-typescript-reviewer`
- For performance issues: Use `performance-oracle`
- For security concerns: Use `security-sentinel`
- For architecture decisions: Use `architecture-strategist`
- For frontend design: Use design agents from Compound Engineering
- For systematic debugging: Use Superpowers `systematic-debugging`
- For TDD: Use Superpowers `test-driven-development`

## Serena Memory Management

### Memory Update Rules

- **Update only when necessary**: Update `.serena/memories/` only when there are significant changes
- **Size limit**: Keep each memory file under 100 lines
- **Import details**: Use `@docs/` to import detailed information instead of expanding memory files
- **Update triggers**:
  - New code conventions or best practices discovered
  - Commands changed or added
  - Architecture changes
  - ADR, glossary, or domain invariants added

### Memory File Structure

- `.serena/memories/` contains project knowledge base
- Detailed documentation is in `docs/domain/` and `docs/adr/`
- Symbolic links connect `docs/` to `.serena/memories/` for AI access
- Never auto-expand memory files - keep them minimal

### Protected Files and Directories

**Never edit these automatically generated files:**
- `dist/` - Build output
- `.astro/` - Astro cache
- `node_modules/` - Dependencies
- `*.generated.ts` - Auto-generated TypeScript files

**Reference only (do not edit directly):**
- `openapi.yaml` - API specification source
- `src/content/config.ts` - Content Collections schema
- `docs/domain/domain_invariants.md` - Domain invariants
