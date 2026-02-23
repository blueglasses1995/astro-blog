---
draft: true
title: 'マークダウン記法完全ガイド'
description: 'マークダウンのすべての記法を網羅したサンプル記事です。見出し、リスト、コードブロック、テーブル、引用など、すべての記法を確認できます。'
date: 2024-12-01
pubDate: 2024-12-01
updatedDate: 2024-12-01
readTime: '10分'
tags: ['マークダウン', 'サンプル', 'ドキュメント']
slug: 'markdown-syntax-showcase'
author: 'tosh.sh'
category: 'ドキュメント'
---

# マークダウン記法完全ガイド

この記事では、マークダウンのすべての記法を網羅的に紹介します。各セクションで異なる記法を確認できます。

## 見出しレベル

### H3見出し

#### H4見出し

##### H5見出し

###### H6見出し

## テキストの強調

通常のテキストです。

**太字（Bold）** のテキストです。

*斜体（Italic）* のテキストです。

***太字と斜体（Bold Italic）*** のテキストです。

~~取り消し線（Strikethrough）~~ のテキストです。

## インラインコードとコードブロック

インラインコードは `const example = "hello"` のように記述します。

複数行のコードブロック（JavaScript）：

```javascript
function greet(name) {
  console.log(`Hello, ${name}!`);
  return `Welcome, ${name}`;
}

const message = greet('World');
console.log(message);
```

複数行のコードブロック（Python）：

```python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")
```

複数行のコードブロック（TypeScript）：

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

const users: User[] = [
  { id: 1, name: 'Alice', email: 'alice@example.com' },
  { id: 2, name: 'Bob', email: 'bob@example.com' }
];

function findUser(id: number): User | undefined {
  return users.find(user => user.id === id);
}
```

言語指定なしのコードブロック：

```
これは言語指定のないコードブロックです。
シンタックスハイライトは適用されません。
```

## リスト

### 順序なしリスト

- 項目1
- 項目2
- 項目3
  - ネストされた項目1
  - ネストされた項目2
    - さらにネストされた項目
- 項目4

### 順序付きリスト

1. 最初の項目
2. 2番目の項目
3. 3番目の項目
   1. ネストされた順序付き項目1
   2. ネストされた順序付き項目2
4. 4番目の項目

### 混合リスト

1. 順序付き項目1
   - ネストされた順序なし項目
   - 別のネストされた項目
2. 順序付き項目2
   - さらにネスト
     - 深いネスト

### チェックボックスリスト

- [x] 完了したタスク
- [x] 別の完了したタスク
- [ ] 未完了のタスク
- [ ] もう一つの未完了タスク

## リンク

[通常のリンク](https://example.com)

[タイトル付きリンク](https://example.com "これはタイトルです")

参照形式のリンク：[参照リンク][ref1]

[ref1]: https://example.com "参照リンクのタイトル"

自動リンク：<https://example.com>

メールリンク：<email@example.com>

## 画像

![代替テキスト](https://via.placeholder.com/800x400 "画像のタイトル")

参照形式の画像：![参照画像][image-ref]

[image-ref]: https://via.placeholder.com/400x200 "参照画像のタイトル"

## 引用

> これは引用ブロックです。
> 複数行にわたる引用も可能です。
> 
> 空行を挟むこともできます。
> 
> > ネストされた引用も可能です。

## 水平線

---

上記が水平線です。以下のようにも記述できます：

***

___

## テーブル

### 基本的なテーブル

| 列1 | 列2 | 列3 |
|-----|-----|-----|
| データ1 | データ2 | データ3 |
| データ4 | データ5 | データ6 |

### 配置指定付きテーブル

| 左揃え | 中央揃え | 右揃え |
|:-------|:--------:|-------:|
| 左 | 中央 | 右 |
| テキスト | テキスト | テキスト |
| 長いテキストの例 | 中央揃えのテキスト | 右揃えのテキスト |

### 複雑なテーブル

| 機能 | 説明 | 対応状況 |
|:-----|:-----|:--------:|
| マークダウン | 基本的な記法 | ✅ 対応 |
| コードブロック | シンタックスハイライト | ✅ 対応 |
| テーブル | 複雑なレイアウト | ✅ 対応 |
| 数式 | LaTeX記法 | ⚠️ 一部対応 |

## エスケープ

特殊文字をエスケープするには、バックスラッシュを使用します：

\*これはアスタリスクです\*

\# これはハッシュ記号です

\[これは角括弧です\]

## HTMLタグ

マークダウン内でHTMLタグも使用できます：

<div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
これはHTMLのdivタグで囲まれたテキストです。
</div>

<kbd>Ctrl</kbd> + <kbd>C</kbd> でコピーできます。

<mark>ハイライトされたテキスト</mark>

<small>小さなテキスト</small>

<sub>下付き文字</sub> と <sup>上付き文字</sup>

## 改行と段落

これは段落です。同じ段落内では改行は無視されます。

これは別の段落です。空行を挟むことで新しい段落になります。

この行の末尾に2つのスペースを入れると、  
強制的に改行されます。

## その他の記法

### タスクリスト（GitHub風）

- [x] 完了したタスク1
- [x] 完了したタスク2
- [ ] 未完了のタスク1
- [ ] 未完了のタスク2

### 定義リスト（一部のマークダウン実装で対応）

用語1
: 用語1の定義

用語2
: 用語2の定義
: 用語2の別の定義

## コードブロックのバリエーション

### JSON

```json
{
  "name": "サンプル",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.0.0",
    "typescript": "^5.0.0"
  }
}
```

### CSS

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}
```

### HTML

```html
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>サンプルページ</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>これはサンプルのHTMLです。</p>
</body>
</html>
```

### Bash/Shell

```bash
#!/bin/bash
echo "Hello, World!"

# 変数の使用
NAME="Astro Blog"
echo "Welcome to $NAME"

# ループ
for i in {1..5}; do
  echo "Iteration $i"
done
```

### YAML

```yaml
name: markdown-syntax-showcase
version: 1.0.0
description: マークダウン記法の完全ガイド

features:
  - 見出し
  - リスト
  - コードブロック
  - テーブル

author:
  name: Tech Blog 編集部
  email: editor@example.com
```

## まとめ

この記事では、マークダウンの主要な記法をすべて紹介しました：

1. **見出し** - H1からH6まで
2. **テキスト強調** - 太字、斜体、取り消し線
3. **リスト** - 順序付き、順序なし、チェックボックス
4. **リンクと画像** - 通常形式、参照形式
5. **コード** - インラインコード、コードブロック
6. **引用** - 単一レベル、ネスト
7. **テーブル** - 基本的なテーブル、配置指定
8. **その他** - 水平線、HTMLタグ、エスケープ

これらの記法がすべて正しく表示されることを確認してください。
