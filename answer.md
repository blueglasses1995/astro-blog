 📐 カテゴリ1: LangGraphの設計詳細

  Q1-1: State スキーマの設計

  LangGraphのAgentStateに以下のどれを含めるべきですか？

  class AgentState(TypedDict):
      # 必須フィールド
      user_input: str              # ユーザーの殴り書き
      current_gate: str            # 現在実行中のゲート名

      # ゲート判定結果
      fact_check_passed: bool
      soul_check_passed: bool
      # ... 他のゲートも同様

      # 対話用フィールド
      questions: List[str]         # AIからの質問リスト
      user_answers: Dict[str, str] # ユーザーの回答

      # 中間生成物
      draft_content: str           # 途中の記事案
      metadata: Dict               # frontmatter等

      # どこまで含める？
      user_profile: Dict           # ユーザーのトーン設定（Phase 2以降）
      few_shot_examples: List[str] # 過去の成功記事（Phase 2以降）

  質問:
  - Phase 1ではuser_profileやfew_shot_examplesは不要（Toshiki固定）？
→作成して。
  - draft_contentはどの段階で生成する？（全ゲート通過後？それとも途中で生成・改善？）
→どちらでも良い。拡張性が高い方を選んで。

  Q1-2: Conditional Edgeの判定ロジック

  各ゲートで「合格/不合格」をどう判定しますか？

  案A: LLMに判定させる
  def fact_check_edge(state: AgentState):
      result = llm.invoke(f"以下の記事案に技術的な誤りがあるか判定: {state['user_input']}")
      return "passed" if result.is_correct else "failed"

  案B: 構造化出力で判定
  class FactCheckResult(BaseModel):
      passed: bool
      errors: List[str]

  result = llm.with_structured_output(FactCheckResult).invoke(...)

  質問:
  - どちらの方式を採用しますか？（案A: シンプル、案B: 型安全）
  - 判定の「厳しさ」をパラメータ化しますか？（例: strictness: 0.0-1.0）
→LLMが判定。パラメータ化する。

  Q1-3: 対話ループの実装

  Thorough Draftで「AIが質問 → ユーザーが回答 → 次の質問」をどう実装しますか？

  案A: ゲートごとに質問ノードを分離
  soul_check_node → [不合格] → soul_check_question_node → [ユーザー回答待ち] → soul_check_node

  案B: 1つの質問ノードで全ゲートを処理
  any_gate_node → [不合格] → unified_question_node → [ユーザー回答] → 元のゲートに戻る

  質問:
  - どちらの設計が良いですか？
　→Aの方が精度が安定しそう。
  - MCPサーバーでは「ユーザー回答待ち」をどう表現しますか？（Claude Codeで対話を続けるために、Stateを返す？）　
→どうするべき？ 「確認が必要なステップ」の前で一度ツールを終了させる設計ご良い？

  ---
  🏗️ カテゴリ2: MCPサーバーとREST APIの役割分担

  Q2-1: 共通化の範囲

  「MCPサーバーとREST APIで同じLangGraphを実行」とありますが、具体的にどう共通化しますか？

  案A: LangGraphをライブラリ化
  # backend/langgraph/src/graph.py
  def build_graph() -> Graph:
      # グラフ構築ロジック
      return graph

  # backend/mcp-server/server.py
  from langgraph.src.graph import build_graph
  graph = build_graph()

  # backend/api/main.py
  from langgraph.src.graph import build_graph
  graph = build_graph()

  案B: FastAPI内でMCPとREST両方を提供
  # backend/server.py
  app = FastAPI()

  @app.post("/mcp/execute")  # MCPエンドポイント
  @app.post("/api/drafts/quick")  # RESTエンドポイント

  質問:
  - どちらの設計が良いですか？
→案B
  - Phase 1ではMCPのみ、Phase 2でREST追加という段階的な実装でOK？
→ok

  Q2-2: Stateの永続化

  MCPサーバー（ローカル）でもStateをPostgreSQLに保存しますか？
→はい。基本MCPとWebUIで行き来して作業できるようにしたい。例えばMCPの作業結果がWebUIで見たい。その逆も。

  Phase 1の選択肢:
  - A: ファイルベース（.claude/state/session-001.json）
  - B: SQLite（ローカルDB）
  - C: PostgreSQL（Phase 2と共通）

  質問:
  - Phase 1ではどれを使いますか？
→ポスグレ
  - Thorough Draftで対話を中断・再開する場合、Checkpointerを使いますか？
→はい、ぜひ使って。

  ---
  💬 カテゴリ3: 対話フローの実装詳細

  Q3-1: MCPサーバーでの対話

  Claude Codeから/thorough-draftを実行したとき、AIが質問してきたらどうユーザーに見せますか？

  案A: MCPツールが質問を返す
  # MCP tool
  def thorough_draft(input: str) -> dict:
      result = graph.invoke({"user_input": input})

      if result["current_state"] == "waiting_for_answer":
          return {
              "status": "pending",
              "question": "あなたの驚きは何ですか？",
              "session_id": "xxx"
          }
      else:
          return {
              "status": "completed",
              "article": result["final_article"]
          }

  Claude Codeで↑を受け取ったら、ユーザーに質問を見せて、回答を別のMCPツールcontinue_session(session_id, 
  answer)で送る？

  案B: カスタムコマンド内で対話
  <!-- /thorough-draft -->
  1. MCP tool `thorough_draft_start(input)` を呼ぶ
  2. 質問が返ってきたら、ユーザーに聞く
  3. 回答を `thorough_draft_continue(session_id, answer)` で送る
  4. 繰り返し

  質問:
  - どちらの設計が良いですか？
  - セッションIDをどう管理しますか？（UUIDをファイルに保存？）

  Q3-2: REST APIでの対話

  Webアプリでの対話UIはSSE（Server-Sent Events）？WebSocket？

  案A: SSE
  const eventSource = new EventSource('/api/drafts/thorough?input=...');
  eventSource.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'question') {
      showQuestion(data.question);
    } else if (data.type === 'completed') {
      showArticle(data.article);
    }
  };

  案B: WebSocket
  const ws = new WebSocket('/api/drafts/thorough');
  ws.send(JSON.stringify({ input: '...' }));
  ws.onmessage = (event) => { ... };

  質問:
  - どちらを使いますか？（SSEの方がシンプル？）
  - LangGraphのストリーミング実行（.stream()）を使いますか？
→充電の持ちが良いSSEが良いかな？ストリーミングも使う。

  ---
  🎨 カテゴリ4: プロンプトのコンポーネント化

  Q4-1: 4層構造の具体例

  「Base + Persona + Knowledge + Media」とありますが、具体的にどう組み合わせますか？

  # Base（全ユーザー共通）
  BASE = """
  あなたは技術ブログの執筆支援AIです。
  AI語（「したがって」等）を完全に排除してください。
  """

  # Persona（ユーザー個性）
  PERSONA = """
  あなたは辛口で率直な文体を好みます。
  読者は「〜ですよね」という親しみやすい口調を期待しています。
  """

  # Knowledge（専門分野）
  KNOWLEDGE = """
  あなたはSREの専門家です。
  監視、アラート、インシデント対応に詳しいです。
  """

  # Media（媒体）
  MEDIA = """
  これはブログ記事です。
  見出しは具体的に、コードブロックに説明を添えてください。
  """

  # 最終プロンプト
  prompt = f"{BASE}\n{PERSONA}\n{KNOWLEDGE}\n{MEDIA}\n\n{user_input}"

  質問:
  - この構成でOK？
→OK
  - Phase 1ではPERSONA, KNOWLEDGE, MEDIAはハードコーディング？
→はい。
  - Phase 2でユーザーがカスタマイズできる範囲は？（全部？一部？）
→一部。これについては実際試してみないとわからない。

  Q4-2: スタイル学習の方法

  Phase 2で「過去の記事からユーザーのスタイルを学習」とありますが、どうやって？

  案A: Few-Shot Learning
  PERSONA = f"""
  過去のあなたの記事例：
  {example_article_1}
  {example_article_2}

  この文体を模倣してください。
  """

  案B: RAG（検索拡張生成）
  # ユーザーの過去記事をpgvectorに保存
  similar_articles = vector_search(user_input, user_id=user.id, top_k=3)
  KNOWLEDGE = f"関連する過去の記事:\n{similar_articles}"

  質問:
  - どちらを採用しますか？（両方？）
→案A
  - Few-Shotの場合、何記事を含めますか？（2-3記事？5記事？）
→まずは5くらいかな。

  ---
  📝 カテゴリ5: ブログネタ管理の詳細

  Q5-1: /expand-ideaの対話フロー

  保存したメモを膨らませる際の対話は、Thorough Draftと同じフローですか？

  案A: Thorough Draftを再利用
  /expand-idea 001

  → メモの内容を読み込み
  → `/thorough-draft`と同じSoul Checkを実行
  → 全ゲート通過後、メモを更新

  案B: 専用の対話フロー
  /expand-idea 001

  → 「Before/Gap/After」の3つの質問のみ
  → メモに追記して保存
  → 記事化はしない

  質問:
  - どちらが良いですか？
→案B
  - /expand-ideaの目的は「メモの詳細化」？それとも「記事生成の前段階」？
→メモの詳細化

  Q5-2: AIの題材提案ロジック

  /suggest-topicでAIが「どのネタを記事化すべきか」をどう判定しますか？

  案A: ルールベース
  # 古いメモを優先
  # タグで関連するメモをグルーピング
  # ステータスが'draft'のものを優先

  案B: LLMで判定
  result = llm.invoke(f"""
  以下のメモから、記事化する価値が高いものを3つ選んでください：
  {all_ideas}

  判定基準：
  - 実務的な価値が高い
  - 他のメモと組み合わせて深みが出る
  """)

  質問:
  - どちらを使いますか？
→案B
  - Phase 1では全メモをLLMに渡しますか？（トークン節約のためフィルタリング？）
→はい。トークン節約は今後。

  Q5-3: ネタの関連性抽出

  複数のネタを「組み合わせると良い」と判定するロジックは？

  案A: pgvectorでベクトル類似度
  # 各メモをembedding化
  # cos類似度が高いメモをグルーピング

  案B: LLMで判定
  llm.invoke(f"以下の2つのメモは関連していますか？\n{idea1}\n{idea2}")

  質問:
  - Phase 1ではどちらを使いますか？（pgvectorはPhase 2以降？）
  - ベクトル化するのはタイトルのみ？本文全体？
→グルーピングはLLM。そもそもメモ詳細化コマンドで必要がある時のみ統合することもあるくらいで必須でない。

  ---
  👤 カテゴリ6: ユーザープロファイルの抽出

  Q6-1: 対話型オンボーディングの質問内容

  Phase 2でユーザーが初回訪問したとき、どんな質問をしますか？

  AI: 「あなたの専門分野は何ですか？」
  User: 「SREとバックエンドです」

  AI: 「記事のトーンを教えてください。辛口？親しみやすい？学術的？」
  User: 「辛口で率直に」

  AI: 「ターゲット読者は？」
  User: 「中級者以上のエンジニア」

  AI: 「過去に書いた記事を1つ貼り付けてください（スタイル学習のため）」
  User: （記事を貼り付け）

  質問:
  - この流れでOK？
->OK
  - 質問は何問くらいが適切？（5問？10問？）
->10問。未解答も許可する。
  - 過去記事の貼り付けは必須？（なくてもOK？）
->なくてもOK
