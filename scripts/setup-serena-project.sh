#!/bin/bash
# Serena Project Setup Script
# 他のプロジェクトでSerenaのツールとフローを簡単にセットアップするためのスクリプト

set -e

# 色の定義
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# プロジェクトルートを取得（スクリプトが実行されるプロジェクトのルート）
PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# このスクリプトが存在するプロジェクト（テンプレートプロジェクト）のルート
# スクリプトが他のプロジェクトにコピーされた場合でも動作するように
TEMPLATE_ROOT="$SCRIPT_DIR/.."

echo -e "${GREEN}🚀 Serena Project Setup${NC}"
echo "================================"
echo ""

# 1. docs/ディレクトリ構造の作成
echo -e "${YELLOW}📁 Creating docs/ directory structure...${NC}"
mkdir -p "$PROJECT_ROOT/docs/domain"
mkdir -p "$PROJECT_ROOT/docs/security"
mkdir -p "$PROJECT_ROOT/docs/operations"
mkdir -p "$PROJECT_ROOT/docs/development"
mkdir -p "$PROJECT_ROOT/docs/integration"
mkdir -p "$PROJECT_ROOT/docs/adr"

# ADR READMEの作成
if [ ! -f "$PROJECT_ROOT/docs/adr/README.md" ]; then
    cat > "$PROJECT_ROOT/docs/adr/README.md" << 'EOF'
# Architecture Decision Records (ADR)

このディレクトリには、プロジェクトの重要なアーキテクチャ決定を記録します。

## ADRの目的

- 判断の背景・経緯・理由を記録
- 将来の変更時に必要な文脈を保持
- チーム内での意思決定の透明性を確保

## ADRの形式

各ADRファイルは以下の形式に従います：

```markdown
# ADR-XXXX: [タイトル]

## 状況
[判断が必要になった背景]

## 決定
[採用したアーキテクチャ・技術]

## 理由
[なぜこの決定をしたのか]

## 代替案
[検討した他の選択肢と除外した理由]

## トレードオフ
[この決定による利点と制限事項]

## 将来の変更
[この判断を見直すべきタイミング]
```

## ADR一覧

現在、ADRはまだ作成されていません。重要なアーキテクチャ決定があった際に追加してください。
EOF
    echo "  ✓ Created docs/adr/README.md"
fi

# 2. .claude/ディレクトリの作成とファイルのコピー
echo -e "${YELLOW}📝 Setting up Claude configuration...${NC}"
mkdir -p "$PROJECT_ROOT/.claude/skills"
mkdir -p "$PROJECT_ROOT/.claude/commands"

# document-knowledgeスキルのコピー
SOURCE_SKILL="$TEMPLATE_ROOT/.claude/skills/document-knowledge.md"
if [ -f "$SOURCE_SKILL" ]; then
    cp "$SOURCE_SKILL" "$PROJECT_ROOT/.claude/skills/document-knowledge.md"
    echo "  ✓ Copied .claude/skills/document-knowledge.md"
elif [ -f "$PROJECT_ROOT/.claude/skills/document-knowledge.md" ]; then
    echo "  ℹ️  .claude/skills/document-knowledge.md already exists"
else
    echo -e "  ${YELLOW}⚠️  Warning: document-knowledge.md skill not found. Please copy manually from template project.${NC}"
fi

# document-knowledgeコマンドのコピー
SOURCE_CMD="$TEMPLATE_ROOT/.claude/commands/document-knowledge.md"
if [ -f "$SOURCE_CMD" ]; then
    cp "$SOURCE_CMD" "$PROJECT_ROOT/.claude/commands/document-knowledge.md"
    echo "  ✓ Copied .claude/commands/document-knowledge.md"
elif [ -f "$PROJECT_ROOT/.claude/commands/document-knowledge.md" ]; then
    echo "  ℹ️  .claude/commands/document-knowledge.md already exists"
else
    echo -e "  ${YELLOW}⚠️  Warning: document-knowledge.md command not found. Please copy manually from template project.${NC}"
fi

# 3. scripts/ディレクトリの作成とスクリプトのコピー
echo -e "${YELLOW}🔧 Setting up scripts...${NC}"
mkdir -p "$PROJECT_ROOT/scripts"

# setup-serena-memories.shのコピー
if [ -f "$SCRIPT_DIR/setup-serena-memories.sh" ]; then
    cp "$SCRIPT_DIR/setup-serena-memories.sh" "$PROJECT_ROOT/scripts/setup-serena-memories.sh"
    chmod +x "$PROJECT_ROOT/scripts/setup-serena-memories.sh"
    echo "  ✓ Copied scripts/setup-serena-memories.sh"
fi

# generate-docs-index.jsのコピー
if [ -f "$SCRIPT_DIR/generate-docs-index.js" ]; then
    cp "$SCRIPT_DIR/generate-docs-index.js" "$PROJECT_ROOT/scripts/generate-docs-index.js"
    chmod +x "$PROJECT_ROOT/scripts/generate-docs-index.js"
    echo "  ✓ Copied scripts/generate-docs-index.js"
fi

# 4. Git hooksの設定
echo -e "${YELLOW}🪝 Setting up Git hooks...${NC}"
if [ -d "$PROJECT_ROOT/.git/hooks" ]; then
    if [ ! -f "$PROJECT_ROOT/.git/hooks/pre-commit" ] || ! grep -q "serena:setup" "$PROJECT_ROOT/.git/hooks/pre-commit" 2>/dev/null; then
        cat >> "$PROJECT_ROOT/.git/hooks/pre-commit" << 'EOF'

# Serena: Auto-update memory links on documentation changes
changed_files=$(git diff --cached --name-only --diff-filter=ACMR | grep -E '^docs/(domain|security|operations|development|integration|adr)/.*\.md$')

if [ -n "$changed_files" ]; then
    echo "Documentation files changed. Updating Serena memory links..."
    
    if [ -d ".serena/memories" ]; then
        npm run serena:setup 2>/dev/null || ./scripts/setup-serena-memories.sh
        echo "✓ Serena memory links updated"
    fi
fi
EOF
        chmod +x "$PROJECT_ROOT/.git/hooks/pre-commit"
        echo "  ✓ Added Serena hook to .git/hooks/pre-commit"
    else
        echo "  ℹ️  Serena hook already exists in .git/hooks/pre-commit"
    fi
else
    echo -e "  ${YELLOW}⚠️  Warning: .git/hooks directory not found. Git hooks not set up.${NC}"
fi

# 5. GitHub Actionsの設定
echo -e "${YELLOW}⚙️  Setting up GitHub Actions...${NC}"
mkdir -p "$PROJECT_ROOT/.github/workflows"

# docs-validation.ymlのコピー
SOURCE_VALIDATION="$TEMPLATE_ROOT/.github/workflows/docs-validation.yml"
if [ -f "$SOURCE_VALIDATION" ]; then
    cp "$SOURCE_VALIDATION" "$PROJECT_ROOT/.github/workflows/docs-validation.yml"
    echo "  ✓ Copied .github/workflows/docs-validation.yml"
fi

# serena-weekly-update.ymlのコピー
SOURCE_WEEKLY="$TEMPLATE_ROOT/.github/workflows/serena-weekly-update.yml"
if [ -f "$SOURCE_WEEKLY" ]; then
    cp "$SOURCE_WEEKLY" "$PROJECT_ROOT/.github/workflows/serena-weekly-update.yml"
    echo "  ✓ Copied .github/workflows/serena-weekly-update.yml"
fi

# 6. package.jsonへのスクリプト追加
echo -e "${YELLOW}📦 Updating package.json...${NC}"
if [ -f "$PROJECT_ROOT/package.json" ]; then
    # Node.jsでpackage.jsonを更新
    node << EOF
const fs = require('fs');
const path = require('path');

const packageJsonPath = '$PROJECT_ROOT/package.json';
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// スクリプトを追加（既に存在する場合はスキップ）
if (!packageJson.scripts) {
    packageJson.scripts = {};
}

const scriptsToAdd = {
    'serena:setup': 'bash scripts/setup-serena-memories.sh',
    'docs:index': 'node scripts/generate-docs-index.js'
};

let added = false;
for (const [key, value] of Object.entries(scriptsToAdd)) {
    if (!packageJson.scripts[key]) {
        packageJson.scripts[key] = value;
        added = true;
        console.log(\`  ✓ Added script: \${key}\`);
    } else {
        console.log(\`  ℹ️  Script already exists: \${key}\`);
    }
}

if (added) {
    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\\n');
    console.log('  ✓ Updated package.json');
} else {
    console.log('  ℹ️  No changes needed in package.json');
}
EOF
else
    echo -e "  ${YELLOW}⚠️  Warning: package.json not found. Please add scripts manually:${NC}"
    echo "    \"serena:setup\": \"bash scripts/setup-serena-memories.sh\","
    echo "    \"docs:index\": \"node scripts/generate-docs-index.js\""
fi

# 7. .gitignoreへの.serena/追加
echo -e "${YELLOW}🚫 Updating .gitignore...${NC}"
if [ -f "$PROJECT_ROOT/.gitignore" ]; then
    if ! grep -q "^\.serena/" "$PROJECT_ROOT/.gitignore" && ! grep -q "^\.serena$" "$PROJECT_ROOT/.gitignore"; then
        echo "" >> "$PROJECT_ROOT/.gitignore"
        echo "# Serena" >> "$PROJECT_ROOT/.gitignore"
        echo ".serena/" >> "$PROJECT_ROOT/.gitignore"
        echo "  ✓ Added .serena/ to .gitignore"
    else
        echo "  ℹ️  .serena/ already in .gitignore"
    fi
else
    cat > "$PROJECT_ROOT/.gitignore" << 'EOF'
# Serena
.serena/
EOF
    echo "  ✓ Created .gitignore with .serena/"
fi

# 8. セットアップ完了メッセージ
echo ""
echo -e "${GREEN}✅ Setup complete!${NC}"
echo ""
echo "Next steps:"
echo "  1. Run Serena onboarding: Ask AI to run 'Serenaのオンボーディングを実行してください'"
echo "  2. After onboarding, run: npm run serena:setup"
echo "  3. Start documenting: Use /document-knowledge command"
echo ""
echo "For more information, see:"
echo "  - docs/SERENA_WORKFLOW.md (if exists)"
echo "  - docs/SERENA_IMPROVEMENTS.md (if exists)"
echo ""
