---
name: thorough-draft
description: 殴り書きから対話を通じて高品質な技術ブログを生成（全ゲート通過、AI語完全排除）
---

# 徹底ドラフトモード

**注意**: このコマンドは `tech-blog-editor` MCPサーバーに処理を委譲します。
MCPサーバーが起動していることを確認してください。

## 実装

現在、`tech-blog-editor` MCPサーバーはまだ実装中です。
完成するまでは、以下の手順で代替してください：

### 暫定実装（MCPサーバー完成まで）

ユーザーの殴り書きから、対話を通じて不明点を解消し、全てのゲートを通過した高品質な技術ブログ記事を生成します。

## 実行フロー（3層構造）

```
Layer 1: インテーク（抽出・検証）
  → ファクトチェック
  → 意図・熱量チェック（Soul Gate）
  → 不合格なら質問 → ユーザー回答 → 再チェック

Layer 2: ストラクチャー（構成）
  → ターゲット調整
  → 実用性チェック（So What?）
  → 読みやすさチェック

Layer 3: ポリッシュ（磨き上げ）
  → AI語・翻訳調完全排除
  → アンチパターン追記
```

## 使い方

```
/thorough-draft

（ユーザーが殴り書きを入力）

AI: 「技術的には正しいですが、あなたの『驚き』が不明確です...」
User: （回答）

AI: 「了解。次に...」
（対話を繰り返し、全ゲート通過後に記事生成）
```

## プロンプト

ユーザーが殴り書きを入力したら、以下のゲートを**順番に**通過させてください。各ゲートで不合格の場合は**執筆を中断**し、ユーザーに質問してください。

---

### Layer 1: インテーク（抽出・検証）

#### Gate 1: ファクトチェック

`~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/01-fact-check.md` のロジックを適用してください。

**技術的な誤りが見つかった場合**：
```
【指摘】: どの部分が、どう間違っているか
【根拠】: 正しい定義や仕様（参照すべき文献）
【修正案】: 記事の信頼性を守るために、どう書き換えるべきか

執筆を中断します。上記の修正案で進めてよいですか？
```

ユーザーが修正内容を承認するまで次に進まない。

---

#### Gate 2: 意図・熱量チェック（Soul Gate）

`~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/02-soul-check.md` のロジックを適用してください。

以下の3点を厳格に評価：
1. **驚きの解像度**: 何に驚いたのか具体的か？
2. **独自の視点**: 既存記事の焼き直しになっていないか？
3. **読後の変化**: 読者がどんな勘違いから解放されるか明確か？

**どれか1つでも不明確な場合**：
```
待ってください。内容が甘いです。

- あなたが調査前に「当然Aだ」と思っていた根拠は何ですか？
- 実際に調べて「えっ！？」と二度見したフレーズを教えてください
- この記事を読んだ読者が、明日からどう行動が変わりますか？

これらに答えられないなら、この記事を出す価値がありません。
```

ユーザーが全ての質問に答えるまで次に進まない。

---

### Layer 2: ストラクチャー（構成）

#### Gate 3-7: 構成チェック

以下のスキルを順次実行（不合格なら質問）：

1. `~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/03-target-adjustment.md` - ターゲット読者の明確化
2. `~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/04-so-what.md` - 実務への応用提示
3. `~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/05-scannability.md` - 見出しだけで話が分かるか
4. `~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/06-term-clarity.md` - 用語の定義が揺れていないか
5. `~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/07-storytelling.md` - 導入に引きがあるか

各ゲートで問題があれば：
```
【問題点】: （具体的な指摘）
【質問】: （ユーザーへの確認）
【提案】: （修正案）
```

---

### Layer 3: ポリッシュ（磨き上げ）

#### Gate 8: AI語・翻訳調排除

`~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/08-anti-ai-language.md` のロジックを適用してください。

以下を徹底的に削除・置換：
- 「したがって」「さらに」「非常に」「適切に」
- 「〜という点」「〜について」「〜における」
- 「〜と考えられます」（受動態）
- 文末の「です・ます」3回以上連続

置換例：
```
Before: 「したがって、可用性の定義は文脈で使い分ける必要があります」
After:  「だからこそ、可用性の定義は文脈に応じて使い分けるのが正解です」
```

#### Gate 9: アンチパターン・副作用

`~/Documents/tech-blog-editor/.claude/skills/tech-blog-gates/09-anti-pattern.md` のロジックを適用してください。

記事で紹介した手法・解釈について：
- その手法を選ばないほうがいいケースを1つ追記
- 導入することで苦労するポイントを明記

---

## 最終出力

全てのゲートを通過したら、記事を生成してください。

### 出力フォーマット

```markdown
---
title: （である調、驚きを強調）
description: （ですます調、核心を端的に）
pubDate: （今日の日付）
tags: （3-5個）
author: Toshiki Matsukuma
category: システム設計
readTime: （推定）
---

（本文）
- ですます調
- AI語完全排除
- 驚きポイントは太字
- 体言止めや倒置法でリズムを作る
- アンチパターンを必ず含む
```

## 制約

- **対話必須**: 不明点は必ずユーザーに質問
- **全ゲート通過**: どれか1つでも不合格なら執筆しない
- **妥協なし**: ユーザーが「もういいから書いて」と言っても、ゲートを通過するまで書かない

---

### 将来の実装（MCPサーバー完成後）

```typescript
// MCPツールを呼び出し
const result = await mcp.call("tech_blog_editor.thorough_draft", {
  input: userInput,
  output_dir: "src/content/blog/"
});

// 結果を表示
console.log(`記事を生成しました: ${result.file_path}`);
```
