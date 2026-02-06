# Serena Documentation Manager Plugin

AI-powered documentation management with Serena integration.

## Features

- **Automatic Documentation Organization**: `/document-knowledge` command automatically categorizes and stores project knowledge
- **Structured Documentation**: ADRs, domain knowledge, security policies, and more
- **Serena Integration**: Seamless integration with Serena MCP for AI-assisted development
- **Git Hooks**: Automatic updates on documentation changes
- **GitHub Actions**: Weekly reminders and PR validation

## Installation

### From Claude Code Marketplace

1. Open Claude Code
2. Go to Settings > Plugins
3. Search for "serena-docs"
4. Click Install

### Manual Installation

1. Clone this repository
2. Copy the plugin to your Claude Code plugins directory
3. Enable the plugin in Settings

## Quick Start

### 1. Initialize Serena in your project

```
/serena:init
```

### 2. Run Serena onboarding

```
Serenaのオンボーディングを実行してください
```

### 3. Set up symbolic links

```bash
npm run serena:setup
```

### 4. Start documenting

```
/document-knowledge [your knowledge]
```

## Commands

| Command | Description |
|---------|-------------|
| `/document-knowledge [info]` | Store project knowledge in appropriate documentation files |
| `/serena:init` | Initialize Serena documentation system in the project |
| `/docs:index` | Generate documentation index |

## Skills

| Skill | Description |
|-------|-------------|
| `document-knowledge` | Organize and store project knowledge |
| `serena-setup` | Set up Serena documentation system |

## Agents

| Agent | Description |
|-------|-------------|
| `docs-organizer` | Organize and manage project documentation |

## Directory Structure

```
docs/
├── adr/              # Architecture Decision Records (immutable)
├── domain/           # Domain knowledge (mutable)
│   ├── ubiquitous_language.md
│   ├── domain_invariants.md
│   └── business_rules.md
├── security/         # Security policies
├── operations/       # Operations documentation
├── development/      # Development guidelines
└── integration/      # Integration documentation
```

## Configuration

### Plugin Settings

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `docsDirectory` | string | `docs` | Directory for documentation files |
| `maxFileLines` | number | `100` | Maximum lines per documentation file |
| `enableAutoIndex` | boolean | `true` | Automatically generate documentation index |
| `enableGitHooks` | boolean | `true` | Set up Git hooks for automatic updates |

## License

MIT
