---
name: quick-draft
description: 殴り書きから技術ブログを即座に生成（MCPサーバー連携）
---

# クイックドラフトモード

**注意**: このコマンドは `tech-blog-editor` MCPサーバーに処理を委譲します。
MCPサーバーが起動していることを確認してください。

## 使い方

```
/quick-draft

（ユーザーが殴り書きを入力）
```

## 実装

現在、`tech-blog-editor` MCPサーバーはまだ実装中です。
完成するまでは、以下の手順で代替してください：

### 暫定実装（MCPサーバー完成まで）

1. **ファクトチェック**: `~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/01-fact-check.md` のロジックを適用
2. **AI語排除**: `~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/08-anti-ai-language.md` のロジックを適用
3. **記事生成**: 以下のフォーマットで出力

```markdown
---
title: （である調）
description: （ですます調）
pubDate: （今日の日付）
tags: （3-5個）
author: Toshiki Matsukuma
category: システム設計
readTime: （推定）
---

（本文: ですます調、AI語を排除）
```

### 将来の実装（MCPサーバー完成後）

```typescript
// MCPツールを呼び出し
const result = await mcp.call("tech_blog_editor.quick_draft", {
  input: userInput,
  output_dir: "src/content/blog/"
});

// 結果を表示
console.log(`記事を生成しました: ${result.file_path}`);
```
