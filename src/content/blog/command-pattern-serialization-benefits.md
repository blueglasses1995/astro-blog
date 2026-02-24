---
title: 命令をデータとして扱うと、時間と場所の制約から解放される
description: GoFのコマンドパターンの精神を継承しつつ、命令をJSON化可能なデータとして設計することで、遅延実行・リトライ・キャンセルが自然に実装できるようになります。ネットワーク越しのコマンド設計と、その背後にある計算機科学の系譜を整理しました。
pubDate: 2026-02-23
tags:
  - デザインパターン
  - TypeScript
  - オフライン対応
  - システム設計
  - 分散システム
author: Toshiki Matsukuma
category: システム設計
readTime: 12分
---

タスク管理システムで「フィールド単位の逐次保存」を実装する際、命令を「実行可能なデータ」として設計しました。**命令をデータ化することで、「今、この場所で、直列に実行する」という制約から解放され、プログラムがプログラム自体を操作する「メタ」な動きが可能になった**のが最大の発見でした。

この設計がもたらしたメリットと、その背後にある計算機科学の思想を整理します。

---

## 1. 命令をデータ化しないと、すべてを「今、この場所で、直列に」書く必要がある

通常の関数呼び出しは、書いた瞬間に実行されます。

```typescript
// 通常の関数呼び出し
function onFieldBlur() {
  updateTitle(123, '新しいタイトル');  // この行を通過した瞬間、実行される
}
```

この設計には以下の制約があります：

- **時間の制約**：今すぐ実行するしかない（遅延実行できない）
- **場所の制約**：この関数内でしか実行できない（別プロセスに移せない）
- **順序の制約**：書かれた順に実行される（並び替えやスキップができない）

**命令をデータとして扱えなければ、処理の流れは常に「上から下へ、一直線」になります**。エラーが起きたら失われ、後から再実行することもできません。

---

## 2. GoFのコマンドパターン：要求のオブジェクト化

GoFのコマンドパターンは、この制約を打破するために「**要求そのものをオブジェクト化する**」設計です。

```typescript
// コマンドパターン（要求をオブジェクト化）
interface Command {
  type: 'UpdateTitle';
  taskId: number;
  newTitle: string;
}

function execute(command: Command) {
  database.update({ id: command.taskId, title: command.newTitle });
}
```

関数呼び出しは「その場で実行」されますが、コマンドは「**後で実行できる要求の記述**」です。

しかし、GoFのコマンドパターンはOOP（オブジェクト指向プログラミング）の文脈で定義されており、以下の前提があります：

- メモリ上のオブジェクトとして存在
- 同一プロセス内での実行を想定
- **ネットワーク越しの通信は考慮されていない**

---

## 3. ネットワーク越しの制約：コマンドをJSON化する

ネットワーク越しに命令を送るためには、**シリアライズ可能（JSON化可能）**である必要があります。

### GoFの厳密なコマンドパターン（OOP）

```typescript
// クロージャやメソッド参照を含む（ネットワーク越しに送れない）
class UpdateTitleCommand {
  constructor(
    private taskId: number,
    private newTitle: string,
    private callback: () => void  // 関数はJSON化できない
  ) {}

  execute() {
    // 実行ロジックがオブジェクト内に閉じている
    database.update({ id: this.taskId, title: this.newTitle });
    this.callback();
  }
}
```

このコマンドは同一プロセス内では実行できますが、以下の理由で**ネットワーク越しに送れません**：

- `callback` 関数はJSON化できない
- `execute` メソッドはシリアライズできない
- IndexedDB や Service Worker に保存できない

### データとして扱えるコマンド（今回の実装）

```typescript
// 純粋なデータ構造（JSON化可能）
type UpdateTitleCommand = {
  id: string;  // crypto.randomUUID()
  type: 'UpdateTitle';
  payload: {
    taskId: number;
    newTitle: string;
  };
};

// 実行ロジックは外部のハンドラに分離
function executeCommand(command: UpdateTitleCommand) {
  switch (command.type) {
    case 'UpdateTitle':
      return database.update({
        id: command.payload.taskId,
        title: command.payload.newTitle,
      });
  }
}
```

**工夫のポイント**：

- コマンドは純粋なデータ（プリミティブ型とオブジェクトのみ）
- 実行ロジック（`execute`）を外部のハンドラに分離
- JSON化・復元が可能

これにより、コマンドを以下のように扱えるようになります：

```typescript
// JSONとして保存
const json = JSON.stringify(command);
await indexedDB.save(json);

// ネットワーク越しに送信
await fetch('/api/commands', {
  method: 'POST',
  body: JSON.stringify(command),
});

// Service Worker に渡す
navigator.serviceWorker.controller?.postMessage(command);
```

**GoFのコマンドパターンの精神（要求のオブジェクト化）を継承しつつ、ネットワーク環境で使えるようにデータ化した設計**です。

---

## 4. 命令のデータ化がもたらす具体的なメリット

命令をデータとして扱えるようになると、プログラムがプログラム自体を操作する「メタ」な動きが可能になります。

### メリット1: 遅延実行（リクエストと実行の分離）

コマンドをデータとして保存できるため、「リクエストを作るプロセス」と「実行するプロセス」を時間的・空間的に分離できます。

```typescript
// クライアント側（フォーム編集画面）
const command: UpdateTitleCommand = {
  id: crypto.randomUUID(),
  type: 'UpdateTitle',
  payload: { taskId: 123, newTitle: '新しいタイトル' },
};

// IndexedDB に保存
await commandQueue.enqueue(command);

// Service Worker が別スレッドで実行
// （タブを閉じても、オフラインでも、後で実行される）
```

**フォームの編集画面は「コマンドを作る」だけに専念**し、実行タイミングやエラー処理は別レイヤー（Service WorkerやキューマネージャーAPI）が担当します。

### メリット2: キャンセル（実行前の取り消し）

コマンドがデータである以上、実行前であれば取り消すことができます。

```typescript
// タスクの繰り返し設定でコマンドを事前生成
type ScheduledCommand = {
  command: UpdateTitleCommand;
  executeAt: Date;
  recurrence: 'daily' | 'weekly';
};

// 将来の実行をスケジューリング
const scheduledId = await scheduler.schedule({
  command: createTaskCommand,
  executeAt: new Date('2026-03-01 09:00'),
  recurrence: 'daily',
});

// 実行前なら取り消し可能
await scheduler.cancel(scheduledId);
```

**コマンドをデータとして保存しているため、実行前のキューから削除するだけでキャンセルが実現します**。関数呼び出しでは「呼んだ瞬間に実行される」ため、このようなキャンセルは不可能です。

### メリット3: リトライ（失敗時の再実行）

**コマンドは実行中にエラーが起きても「データ」として残っているため、状態を保持したまま再試行できます**。

```typescript
type QueuedCommand = {
  command: Command;
  status: 'pending' | 'sending' | 'failed';
  retryCount: number;
  lastError?: string;
};

// オフライン時はIndexedDBにキュー
async function handleOffline(command: Command) {
  await indexedDB.commandQueue.add({
    command,
    status: 'pending',
    retryCount: 0,
  });
}

// オンライン復帰時に指数バックオフでリトライ
async function retryWithBackoff(queuedCommand: QueuedCommand) {
  const delay = Math.pow(2, queuedCommand.retryCount) * 1000;

  await sleep(delay);

  try {
    await executeCommand(queuedCommand.command);
    await indexedDB.commandQueue.delete(queuedCommand.command.id);
  } catch (error) {
    // 失敗してもコマンドは消えない
    await indexedDB.commandQueue.update({
      ...queuedCommand,
      status: 'failed',
      retryCount: queuedCommand.retryCount + 1,
      lastError: error.message,
    });
  }
}
```

Service Workerと組み合わせることで、以下のフローが実現します：

```
1. ユーザーがフォームを編集 → コマンド生成
2. IndexedDB にキュー保存
3. Service Worker に実行依頼
4. ネットワークエラー → status: 'failed' に更新
5. オンライン復帰をトリガーに自動リトライ
6. 成功 → キューから削除
```

タブを閉じても、ブラウザを再起動しても、**コマンドは IndexedDB に残り続けるため、失われることがありません**。

### メリット4: Undo/Redo（操作の取り消しと再実行）

すべての操作がコマンドとして記録されるため、履歴管理が容易です。

```typescript
// 操作履歴をスタックで管理
const undoStack: Command[] = [];
const redoStack: Command[] = [];

// Undo実装
function undo() {
  const command = undoStack.pop();
  if (!command) return;

  // 逆コマンドを実行
  const inverseCommand = createInverse(command);
  await executeCommand(inverseCommand);

  redoStack.push(command);
}

// 逆コマンドの生成例
function createInverse(command: UpdateTitleCommand): UpdateTitleCommand {
  // 現在のDBの値を取得して、元に戻すコマンドを作る
  const currentTitle = await database.get(command.payload.taskId).title;
  return {
    id: crypto.randomUUID(),
    type: 'UpdateTitle',
    payload: {
      taskId: command.payload.taskId,
      newTitle: currentTitle,  // 現在の値に戻す
    },
  };
}
```

コマンドが「データ」なので、配列で履歴を持つだけで Undo/Redo が実現します。

---

## 5. 計算機科学における「命令のデータ化」の系譜

命令をデータとして扱う思想は、今回の実装に限らず、計算機科学の根幹をなす概念です。

### ノイマン型コンピューター（プログラム内蔵方式）

1945年、ジョン・フォン・ノイマンが提案した「プログラム内蔵方式」は、**プログラム（命令）をデータと同じメモリに保存する**アーキテクチャです。

それまでのコンピューター（ENIAC等）では、プログラムは配線で表現されており、処理を変えるには物理的に配線をやり直す必要がありました。

**ノイマンのアイデア**：命令をデータとしてメモリに保存すれば、プログラムを書き換えるだけで処理を変更できる。

今日のすべてのコンピューターは、この「命令のデータ化」を前提にしています。

### 高階関数（関数を値として扱う）

関数型プログラミングでは、関数を「値」として扱います。

```typescript
// 関数をデータとして変数に代入
const add = (a: number, b: number) => a + b;

// 関数を引数として渡す（高階関数）
function execute(fn: Function, x: number, y: number) {
  return fn(x, y);
}

execute(add, 2, 3);  // 5
```

**関数をデータとして扱えることで、処理そのものを抽象化・合成できる**ようになります。今回のコマンドパターンも、この思想の延長です。

### Lisp（コードとデータの同一性）

Lispは「**コードとデータが同じ構造（S式）で表現される**」言語です。

```lisp
; データとしてのリスト
(1 2 3)

; コードとしてのリスト（関数呼び出し）
(+ 1 2 3)

; コード自体をデータとして操作できる（マクロ）
(defmacro when (condition &rest body)
  `(if ,condition (progn ,@body)))
```

Lispでは、プログラムがプログラム自身を生成・変換できます（メタプログラミング）。これも「命令のデータ化」の極致です。

### RPC（Remote Procedure Call）

ネットワーク越しに関数を呼び出すRPCも、**関数呼び出しをデータ化してネットワークで送る**技術です。

```
クライアント側:
  updateTitle(123, "新しいタイトル")
    ↓ シリアライズ
  { method: "updateTitle", params: [123, "新しいタイトル"] }
    ↓ ネットワーク送信
サーバー側:
  デシリアライズ → 関数実行
```

今回のコマンドパターンは、RPCを「キューイング可能・リトライ可能」に拡張したものと見ることもできます。

---

## 6. 実装の核心部分

### コマンドの型定義

```typescript
// 判別可能なユニオン型で全コマンドを定義
type Command =
  | { type: 'CreateTask'; payload: { title: string } }
  | { type: 'UpdateTitle'; payload: { taskId: number; newTitle: string } }
  | { type: 'DeleteTask'; payload: { taskId: number } };

// すべてのコマンドに共通のメタデータ
type CommandWithMetadata = Command & {
  id: string;
  createdAt: number;
};
```

TypeScriptの判別可能なユニオン型により、`switch`文で型安全にコマンドを処理できます。

### コマンド実行サービス

```typescript
class CommandService {
  async processCommands(commands: CommandWithMetadata[]): Promise<void> {
    for (const command of commands) {
      switch (command.type) {
        case 'CreateTask':
          await this.taskService.create(command.payload);
          break;
        case 'UpdateTitle':
          await this.taskService.updateTitle(command.payload);
          break;
        case 'DeleteTask':
          await this.taskService.delete(command.payload);
          break;
        default:
          // TypeScriptが網羅性をチェック
          const _exhaustive: never = command;
      }
    }
  }
}
```

**実行ロジックはサービス層に集約**され、コマンドはあくまで「何をするかの記述」に徹しています。

### クライアント側の実装

```typescript
// フォームの onBlur で逐次保存
function onFieldBlur(taskId: number, field: string, value: unknown) {
  const command: CommandWithMetadata = {
    id: crypto.randomUUID(),
    type: 'UpdateTitle',
    payload: { taskId, newTitle: value as string },
    createdAt: Date.now(),
  };

  // コマンドキューに追加（実行は別プロセス）
  commandQueue.enqueue(command);
}
```

フォーム側は「コマンドを作る」だけで、送信やエラー処理を意識する必要がありません。

---

## 7. 設計の選択

今回の実装では、以下の特性を意図的に選択しました：

- **シリアライズ可能性**：コマンドは純粋なデータ構造（プリミティブ型とオブジェクトのみ）
- **冪等性の考慮**：同じコマンドを複数回実行しても安全な設計（一部のコマンドは冪等性を保証）
- **イミュータブル**：一度生成されたコマンドは変更されない（状態管理はキューが担当）

これらの特性により、「リクエストがデータとして永続化され、非同期・分散環境で安全に実行される」システムが構築できました。

---

## 結論

命令をデータ化しないと、すべてを「今、この場所で、直列に」書く必要があります。

命令をデータとして扱えるようになると、以下が可能になります：

- **遅延実行**：リクエストと実行を分離し、任意のタイミング・プロセスで実行
- **キャンセル**：実行前のキューから削除
- **リトライ**：失敗してもデータとして残り、指数バックオフで再試行
- **Undo/Redo**：履歴を配列で保持し、逆コマンドを実行

| 比較軸 | 通常の関数呼び出し | データとしてのコマンド |
|--------|------------------|---------------------|
| 実行タイミング | その場で実行 | 任意のタイミング・プロセスで実行 |
| ネットワーク越し | 不可能 | JSON化して送信可能 |
| 永続化 | メモリ上のみ | IndexedDB/JSONB に保存可能 |
| エラー時の挙動 | 失われる | データとして残り、再試行可能 |
| キャンセル | 不可能（呼んだ瞬間に実行） | キューから削除するだけで実現 |
| Undo/Redo | 追加実装が必要 | 履歴配列で自然に実現 |

**命令をデータとして扱う思想は、ノイマン型コンピューター、高階関数、Lisp、RPCに共通する計算機科学の根幹をなす概念**。GoFのコマンドパターンの精神を継承しつつ、ネットワーク環境に適応させることで、プログラムがプログラム自体を操作する「メタ」な動きが可能になります。

---

## 8. この手法を使うべきでないケース

コマンドのデータ化は強力ですが、**全てのシステムに適しているわけではありません**。以下のケースでは、通常の関数呼び出しの方が適切です。

### ケース1: リアルタイム性が最優先の場合

シリアライズ・デシリアライズで**10-20ms程度のオーバーヘッド**が発生します。

**不向きなシステム**:
- リアルタイムゲーム（フレーム単位での応答が必要）
- HFT（高頻度取引）システム（マイクロ秒単位の遅延が致命的）
- リアルタイム通信（WebRTC、VoIP等）

これらのシステムでは、コマンドをデータ化せず、関数を直接呼び出す方が適切です。

### ケース2: セキュリティが極めて重要な場合

シリアライズされたコマンドは、以下のリスクを抱えます：

- **コマンドの漏洩**: ログやDBに保存されるため、アクセス制御を誤ると攻撃者がコマンドを取得できる
- **コマンドの改ざん**: 保存されたコマンドを書き換えられると、意図しない操作が実行される
- **コマンドの再実行攻撃**: 過去のコマンドを攻撃者が再実行できてしまう

**対策のコスト**:
- コマンドの暗号化（実装コスト増）
- 署名検証（実行時のオーバーヘッド増）
- 冪等性トークンの管理（DB容量増）

金融システムや医療システムでは、これらの対策が必須となり、実装の複雑性が増します。

### ケース3: コマンドのペイロードが巨大な場合

ファイルアップロードや画像処理など、**ペイロードが10MB以上**になる場合：

- **DB容量の圧迫**: 1日10万コマンドで1GB/日のストレージコストが発生
- **シリアライズの遅延**: 大きなオブジェクトのJSON化に時間がかかる
- **メモリ使用量**: コマンドキューが肥大化

このような場合は、コマンドには**ファイルパスやURLのみを保存**し、実体は別ストレージに配置する設計が必要です。

### ケース4: シンプルさを優先する場合

**CRUD操作だけ**の単純なアプリケーションでは、コマンドパターンは過剰設計になりがちです。

通常の関数呼び出しで十分なケース：
- 管理画面の単純なフォーム送信
- ログイン・ログアウト処理
- 静的コンテンツの配信

コマンドパターンは「遅延実行」「リトライ」「Undo/Redo」が必要になったときに導入すべきです。

---

## 9. トレードオフ

コマンドのデータ化は、以下のトレードオフを伴います：

| 得るもの | 失うもの |
|---------|---------|
| 遅延実行、キャンセル、リトライ、Undo/Redo | リアルタイム性（10-20ms遅延） |
| オフライン対応、永続化 | シンプルさ（暗号化・ストレージ管理が必要） |
| 実行の透明性（ログで追跡可能） | セキュリティリスク（コマンド漏洩で再実行可能） |
| プロセス間・ネットワーク越しの実行 | 開発コスト（ハンドラー実装、エラー処理） |

### 向いているシステム

- **Slack、Discord等のチャットアプリ**: メッセージ送信の失敗時リトライが重要
- **タスク管理ツール**: Undo/Redoが頻繁に使われる
- **オフライン対応アプリ**: モバイルアプリでネットワークが不安定
- **ワークフローエンジン**: 複雑な業務フローを段階的に実行

### 向いていないシステム

- **リアルタイムゲーム**: 遅延が致命的
- **金融取引システム**: セキュリティリスクが高すぎる（対策コスト増）
- **単純なCRUDアプリ**: シンプルさを失うデメリットが大きい

---

## 10. 結論（改訂版）

命令をデータ化しないと、すべてを「今、この場所で、直列に」書く必要があります。

命令をデータとして扱えるようになると、以下が可能になります：

- **遅延実行**：リクエストと実行を分離し、任意のタイミング・プロセスで実行
- **キャンセル**：実行前のキューから削除
- **リトライ**：失敗してもデータとして残り、指数バックオフで再試行
- **Undo/Redo**：履歴を配列で保持し、逆コマンドを実行

ただし、**リアルタイム性**、**セキュリティ**、**シンプルさ**とのトレードオフがあります。システムの要件に応じて、通常の関数呼び出しとコマンドパターンを使い分ける判断が重要です。

| 比較軸 | 通常の関数呼び出し | データとしてのコマンド |
|--------|------------------|---------------------|
| 実行タイミング | その場で実行 | 任意のタイミング・プロセスで実行 |
| ネットワーク越し | 不可能 | JSON化して送信可能 |
| 永続化 | メモリ上のみ | IndexedDB/JSONB に保存可能 |
| エラー時の挙動 | 失われる | データとして残り、再試行可能 |
| キャンセル | 不可能（呼んだ瞬間に実行） | キューから削除するだけで実現 |
| Undo/Redo | 追加実装が必要 | 履歴配列で自然に実現 |
| リアルタイム性 | 高速（直接実行） | 遅延あり（10-20ms） |
| セキュリティリスク | 低（メモリ上のみ） | 高（漏洩すると再実行リスク） |
| 実装の複雑性 | シンプル | 複雑（ハンドラー、エラー処理、暗号化） |
