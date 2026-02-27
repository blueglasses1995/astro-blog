---
title: 命令をデータとして扱うと、時間と場所の制約から解放される
description: タスク管理システムでフィールド単位の逐次保存を実装する際、命令をJSON化可能なデータとして設計しました。「今、この場所で、直列に実行する」という制約から解放されたのが最大の発見です。
pubDate: 2026-02-27
tags:
  - デザインパターン
  - TypeScript
  - オフライン対応
  - システム設計
author: Toshiki Matsukuma
category: システム設計
readTime: 8分
---

タスク管理システムで「フィールドを編集したら即座にサーバーに保存する」機能を実装していた時、壁にぶつかりました。どのような壁かというと、編集中にオフラインになると、その変更が失われてしまう。かといって、オンライン復帰まで待つと、ユーザーは何が保存されて何が保存されていないのか分からなくなります。

調べてみると、命令を「実行可能なデータ」として扱うことで、この問題が自然に解決できることに気付きました。

## やろうとしていたこと

実装したかったのは、こんな動作です：

- タイトルフィールドからフォーカスが外れる → タイトル更新APIを呼ぶ
- 説明フィールドからフォーカスが外れる → 説明更新APIを呼ぶ
- ステータスを変更する → ステータス更新APIを呼ぶ

Notionみたいな「編集したら勝手に保存される」UXです。ユーザーが保存ボタンを押す必要がない。

## 直面した課題

最初は素直に関数呼び出しで書いてみました：

```typescript
function onTitleBlur(taskId: number, newTitle: string) {
  api.updateTitle(taskId, newTitle);
}

function onDescriptionBlur(taskId: number, newDescription: string) {
  api.updateDescription(taskId, newDescription);
}
```

この実装、オンラインの時は問題ありません。でも、オフラインになった瞬間に困りました：

- ネットワークエラーが起きたら、その変更は失われる
- リトライしようにも、「何を実行しようとしていたか」の情報がない
- オンライン復帰後に「保留中の変更」を再実行できない

つまり、**関数呼び出しは「書いた瞬間に実行される」ので、実行を遅らせたり、後から再実行することができません**。

## 思いついた解決策

このブログ記事を書きながら思い出しましたが、GoFのコマンドパターンって、まさにこれを解決するパターンでした。「要求そのものをオブジェクト化する」という考え方。

ただ、GoFのコマンドパターンはメモリ上のオブジェクトなので、ネットワーク越しに送ったり、IndexedDBに保存したりできません。私の場合、オフライン対応が必要だったので、**コマンドをJSONとして表現できる必要がありました**。

```typescript
// 命令をデータとして表現
interface UpdateTitleCommand {
  type: 'UpdateTitle';
  taskId: number;
  newTitle: string;
}

interface UpdateDescriptionCommand {
  type: 'UpdateDescription';
  taskId: number;
  newDescription: string;
}

type Command = UpdateTitleCommand | UpdateDescriptionCommand;
```

このように命令をデータ化すると、以下ができるようになりました：

1. **IndexedDBに保存できる**（オフライン時の保留）
2. **ネットワーク越しに送れる**（Service Workerに渡せる）
3. **後から実行できる**（オンライン復帰時に再実行）
4. **キャンセルできる**（実行前なら削除するだけ）

## 実装してみて分かったこと

実際にこの設計で実装してみたら、意外な副次効果がありました。

### 1. コマンドキューが自然にできる

```typescript
// 保留中のコマンドをキューに入れる
const pendingCommands: Command[] = [];

function enqueueCommand(command: Command) {
  pendingCommands.push(command);
  saveToIndexedDB(command);  // 永続化
}

// オンライン復帰時に一括実行
function flushPendingCommands() {
  for (const command of pendingCommands) {
    executeCommand(command);
  }
  pendingCommands.length = 0;
}
```

命令がデータになったおかげで、配列に入れて管理できる。普通の関数呼び出しだと、こうはいきません。

### 2. undo/redoが実装しやすい

```typescript
const executedCommands: Command[] = [];  // 実行済みコマンド
const undoneCommands: Command[] = [];    // undo済みコマンド

function undo() {
  const command = executedCommands.pop();
  if (command) {
    undoneCommands.push(command);
    executeReverseCommand(command);  // 逆操作を実行
  }
}
```

実行済みのコマンドをスタックに積んでおけば、後から「逆操作」できる。これも命令がデータだからこそ。

### 3. 実行ログが自然に残る

```typescript
function executeCommand(command: Command) {
  console.log('Executing:', command);  // ログに残る

  switch (command.type) {
    case 'UpdateTitle':
      api.updateTitle(command.taskId, command.newTitle);
      break;
    case 'UpdateDescription':
      api.updateDescription(command.taskId, command.newDescription);
      break;
  }

  executedCommands.push(command);  // 履歴に保存
}
```

デバッグ時に「どのコマンドが実行されたか」を追跡できるのが、かなり便利でした。

## やってみた結果

実装してみて、ユーザーからの反応は良好でした：

- オフライン時に編集しても、オンライン復帰で自動的に保存される
- 「保存中」インジケーターで、何が保留中かが分かる
- ネットワークエラー時のリトライが自動で動く

個人的には、**プログラムがプログラム自体を操作する「メタ」な感覚が面白かったです**。コマンドという「データ」を通じて、実行タイミングや場所を自由にコントロールできます。

このブログ記事を書きながら気付きましたが、RPCとかLispの高階関数とか、「命令をデータとして扱う」思想は色んな所に出てきます。もしかしたらノイマン型コンピューター（プログラムとデータを同じメモリに格納する）の考え方にも似ているのかもしれません。

## この方法が向いていないケース

私個人としては、以下のケースではこの設計は不要かなと思いました：

- **リアルタイム性が最重要**：コマンドキューの遅延が許容できない場合
- **単純なCRUD**：オフライン対応やリトライが不要なら、普通の関数呼び出しで十分
- **コマンドの種類が膨大**：型定義やswitch文が膨れ上がって管理が大変

あくまで「編集 → 保存」のサイクルが頻繁にあって、ネットワークの不安定さを吸収したい場合に向いている設計だと感じました。

## まとめ

タスク管理システムで「フィールド単位の逐次保存」を実装する際、命令をJSON化可能なデータとして設計しました。結果として：

- オフライン対応が自然に実現できた
- undo/redo、ログ、リトライが副次的に実装しやすくなった
- 「今、この場所で、直列に実行する」という制約から解放された

私が試した環境では（Next.js 14 + TypeScript）、この設計でユーザー体験が大幅に向上しました。もし似たような課題に直面している方がいたら、試してみる価値はあるかもしれません。
