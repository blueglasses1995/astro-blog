#!/bin/bash
# Serena週次更新リマインダースクリプト
# ローカルでcronジョブとして実行する場合に使用

PROJECT_DIR="/Users/toshikimatsukuma/Documents/astro-blog"
LOG_FILE="$PROJECT_DIR/.serena/update-reminder.log"

cd "$PROJECT_DIR" || exit 1

# ログディレクトリを作成
mkdir -p "$(dirname "$LOG_FILE")"

# リマインダーメッセージをログに記録
echo "[$(date '+%Y-%m-%d %H:%M:%S')] Serenaメモリの週次更新チェック" >> "$LOG_FILE"
echo "以下の変更があった場合は、.serena/memories/を更新してください:" >> "$LOG_FILE"
echo "- 新しいコード規約やベストプラクティスを発見した" >> "$LOG_FILE"
echo "- コマンドが変更・追加された" >> "$LOG_FILE"
echo "- アーキテクチャ変更があった" >> "$LOG_FILE"
echo "- ADR、用語集、ドメイン不変条件などのドキュメントを追加した" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

# macOSの通知を表示（オプション）
if command -v osascript &> /dev/null; then
  osascript -e 'display notification "Serenaメモリの週次更新チェックが必要です" with title "Serena Update Reminder"'
fi

echo "Serena更新リマインダーを記録しました: $LOG_FILE"
