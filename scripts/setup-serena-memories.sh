#!/bin/bash
# Serenaメモリ層へのシンボリックリンク設定スクリプト

set -e

PROJECT_DIR="/Users/toshikimatsukuma/Documents/astro-blog"
SERENA_MEMORIES_DIR="$PROJECT_DIR/.serena/memories"
DOCS_DOMAIN_DIR="$PROJECT_DIR/docs/domain"
DOCS_ADR_DIR="$PROJECT_DIR/docs/adr"

cd "$PROJECT_DIR" || exit 1

# .serena/memories/ディレクトリが存在するか確認
if [ ! -d "$SERENA_MEMORIES_DIR" ]; then
    echo "Error: .serena/memories/ directory does not exist."
    echo "Please run Serena onboarding first by asking AI: 'Serenaのオンボーディングを実行してください'"
    exit 1
fi

echo "Setting up symbolic links in .serena/memories/..."

# ドメイン知識のシンボリックリンク
for file in ubiquitous_language.md domain_invariants.md business_rules.md error_handling_strategy.md; do
    if [ -f "$DOCS_DOMAIN_DIR/$file" ]; then
        ln -sf "../../docs/domain/$file" "$SERENA_MEMORIES_DIR/$file"
        echo "✓ Linked $file"
    fi
done

# セキュリティ関連のシンボリックリンク
DOCS_SECURITY_DIR="$PROJECT_DIR/docs/security"
for file in security_policy.md privacy_compliance.md audit_requirements.md; do
    if [ -f "$DOCS_SECURITY_DIR/$file" ]; then
        ln -sf "../../docs/security/$file" "$SERENA_MEMORIES_DIR/$file"
        echo "✓ Linked $file"
    fi
done

# 運用関連のシンボリックリンク
DOCS_OPERATIONS_DIR="$PROJECT_DIR/docs/operations"
for file in performance_requirements.md deployment_process.md backup_disaster_recovery.md troubleshooting_guide.md; do
    if [ -f "$DOCS_OPERATIONS_DIR/$file" ]; then
        ln -sf "../../docs/operations/$file" "$SERENA_MEMORIES_DIR/$file"
        echo "✓ Linked $file"
    fi
done

# 開発関連のシンボリックリンク
DOCS_DEVELOPMENT_DIR="$PROJECT_DIR/docs/development"
for file in code_generation_rules.md test_strategy.md code_review_criteria.md release_process.md git_workflow.md; do
    if [ -f "$DOCS_DEVELOPMENT_DIR/$file" ]; then
        ln -sf "../../docs/development/$file" "$SERENA_MEMORIES_DIR/$file"
        echo "✓ Linked $file"
    fi
done

# 統合関連のシンボリックリンク
DOCS_INTEGRATION_DIR="$PROJECT_DIR/docs/integration"
for file in external_dependencies.md third_party_apis.md data_migration_policy.md; do
    if [ -f "$DOCS_INTEGRATION_DIR/$file" ]; then
        ln -sf "../../docs/integration/$file" "$SERENA_MEMORIES_DIR/$file"
        echo "✓ Linked $file"
    fi
done

# ADRのシンボリックリンク（READMEのみ）
if [ -f "$DOCS_ADR_DIR/README.md" ]; then
    ln -sf "../../docs/adr/README.md" "$SERENA_MEMORIES_DIR/adr_index.md"
    echo "✓ Linked adr_index.md"
fi

echo ""
echo "Symbolic links setup complete!"
echo "Memory files are now accessible to Serena via .serena/memories/"
