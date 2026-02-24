// Auto-generated from career-pipeline DB
// Comprehensive CV data with expandable details

export interface CVTask {
  title: string;
  summary: string;
  difficulty?: string;
  technologies: string[];
  highlights: string[];
  decisions?: { title: string; detail: string }[];
  outcomes?: { before: string; after: string; metric?: string }[];
  challenges?: { title: string; resolution: string }[];
}

export interface CVProject {
  id: string;
  company: string;
  companyDesc?: string;
  role: string;
  period: string;
  teamSize?: number;
  summary: string;
  technologies: string[];
  tasks: CVTask[];
}

export const cvProjects: CVProject[] = [
  {
    "id": "ai-translation-tools-2025",
    "company": "生成AI翻訳SaaS",
    "companyDesc": "AI翻訳SaaSの翻訳後処理マイクロサービス群の設計・実装プロジェクト",
    "role": "バックエンドエンジニア（マイクロサービス設計・実装）",
    "period": "2025/04 — 2025/09",
    "teamSize": 5,
    "summary": "FastAPI + Celery + PostgreSQL + Redis構成の翻訳後処理マイクロサービス群。post-validationサービスは設計100%・実装のほぼ全てを担当",
    "technologies": [
      "Docker",
      "Redis",
      "Python",
      "PostgreSQL",
      "Celery",
      "FastAPI",
      "Storybook",
      "Playwright",
      "Vitest",
      "React Testing Library",
      "agent-browser"
    ],
    "tasks": [
      {
        "title": "翻訳後処理サービス（post-validation）のFSM設計・Celeryタスク設計・実装",
        "summary": "翻訳チェック→再翻訳の検証ループをFSM（9状態）で制御。イミュータブルなイベントソーシング、Celeryポーリングタスク設計、4階層エラー分類を実装。可観測性重視スキーマにより生成AIダッシュボードで動作確認工数を大幅削減",
        "difficulty": "extreme",
        "technologies": [
          "Docker",
          "Redis",
          "Python",
          "PostgreSQL",
          "Celery",
          "FastAPI"
        ],
        "highlights": [
          "9状態FSM・イミュータブルイベントソーシング・Celeryポーリングタスク分離・4階層エラー分類のサービス全体アーキテクチャを設計・実装"
        ],
        "decisions": [
          {
            "title": "9状態FSMによる翻訳検証ループの制御設計",
            "detail": "9状態FSM設計。最大5サイクル、サイクル5はチェックのみで確実終了。ディスパッチテーブルで遷移→Celeryタスクをマッピング"
          },
          {
            "title": "可観測性中心のイミュータブルスキーマ設計",
            "detail": "全テーブルをイミュータブル設計。job_state_history/validation_runs/sentence_fix_historyで全意思決定永続化"
          },
          {
            "title": "Celeryポーリングタスク分離とスループット維持設計",
            "detail": "ポーリング専用タスク分離。30秒×最大60回のcountdownベースポーリング。4階層エラー分類で適切リトライ"
          }
        ],
        "outcomes": [
          {
            "before": "翻訳チェック→再翻訳の自動検証未実装。後処理状態がブラックボックス",
            "after": "FSM（9状態・最大5サイクル）検証ループ実装。イミュータブルスキーマで全意思決定永続化。生成AIダッシュボードで確認工数大幅削減",
            "metric": "翻訳後処理の自動化率と開発効率"
          }
        ],
        "challenges": [
          {
            "title": "Celeryタスクチェーンの安全な障害パス設計",
            "resolution": "fail_job_taskにretry=False。FSM状態をDB復元。べき等設計。30分hard limit"
          },
          {
            "title": "イミュータブルスキーマ活用の生成AIダッシュボード構築",
            "resolution": "イミュータブルスキーマがそのまま可視化対象と判断。生成AIにReactダッシュボード（11,095行）をバイブコーディング"
          }
        ]
      },
      {
        "title": "デグレ防止打鍵仕様書の作成とAI活用テスト方針の策定",
        "summary": "初回リリース後のリファクタリングに備えたデグレ防止用打鍵仕様書を作成。生成AI（agent-browser）の非決定論的動作の信頼性限界を正直に評価し、打鍵→E2E→コンポーネントテストへの段階的移行方針を策定。OnlyOfficeエディタ（Canvas実装）密結合部分はE2Eを諦め打鍵に限定する現実的判断",
        "difficulty": "medium",
        "technologies": [
          "Storybook",
          "Playwright",
          "Vitest",
          "React Testing Library",
          "agent-browser"
        ],
        "highlights": [
          "生成AIの非決定論的動作の信頼性限界を評価し、段階的テスト自動化方針（打鍵→E2E→コンポーネント）を策定"
        ],
        "decisions": [
          {
            "title": "生成AI（agent-browser）の非決定論的動作を踏まえたテスト方針策定",
            "detail": "AIに無秩序に打鍵させるのではなく、段階的にテスト自動化を進める方針を策定。(1)まず打鍵仕様書で手動テストを体系化、(2)決定論的なE2Eテスト・コンポーネントテストへ移行、(3)agent-browserは打鍵ではなく決定論的なE2Eテストコードの生成にのみ活用"
          },
          {
            "title": "OnlyOfficeエディタ（Canvas実装）密結合UIのテスト方針",
            "detail": "OnlyOfficeエディタのFake化はテスト有効性が低下すると判断。CanvasのDOM相対位置でのE2Eテストは不安定になりやすいため、正直にOnlyOffice密結合部分はE2Eを諦め打鍵に限定する方針に決定"
          }
        ],
        "outcomes": [
          {
            "before": "リファクタリング時のデグレ防止手段がなく、テスト方針も未策定だった",
            "after": "デグレ防止打鍵仕様書を作成し手動テストを体系化。生成AIの信頼性限界を正直に評価した上で、打鍵→E2E→コンポーネントテストへの段階的移行方針を策定。OnlyOffice密結合部分は手動テストに限定する現実的判断を文書化",
            "metric": "テスト戦略の体系化と品質保証体制"
          }
        ],
        "challenges": [
          {
            "title": "Canvas実装のOnlyOfficeエディタに密結合したUIのテスト自動化の限界判断",
            "resolution": "テスト対象を「自動化可能な領域」と「手動テストが必要な領域」に明確に分離。OnlyOffice密結合部分は打鍵仕様書でカバーし、それ以外のUI・APIロジックはE2E・コンポーネントテストで自動化する方針を策定"
          }
        ]
      }
    ]
  },
  {
    "id": "learning-platform-consulting-2025",
    "company": "中堅オンライン学習プラットフォーム企業",
    "companyDesc": "中堅規模のオンライン学習プラットフォームを提供する企業。統合業務システムの短期拡張要望に対する技術分析・提案支援。",
    "role": "技術調査・資料作成",
    "period": "2025-05 — 2025-07",
    "teamSize": 2,
    "summary": "VBScript/OracleベースのレガシーシステムをSonarQubeで品質定量化し、改修/ERP導入/ブラウザ拡張の3択比較マトリクスで戦略選定を支援。NotebookLM+markitdownによるRAG型社内資料検索基盤も構築。生成AIツールを活用し約2ヶ月の短期コンサルティングで成果を創出",
    "technologies": [
      "SonarQube",
      "NotebookLM",
      "markitdown",
      "Claude",
      "Cursor",
      "ChatGPT",
      "Genspark",
      "Gamma",
      "Canva",
      "Mermaid"
    ],
    "tasks": [
      {
        "title": "社内資料RAG型検索基盤の構築",
        "summary": "社内資料をmarkitdownでマークダウン化・分割処理し、NotebookLMによりRAG型検索環境を整備。Claude Desktop＋SonarQubeをMCP経由で連携し、品質課題の要点抽出と整形フローを効率化。",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "NotebookLM",
          "markitdown",
          "Claude"
        ],
        "highlights": [
          "NotebookLM+markitdownによるRAG型検索基盤のアーキテクチャを設計し、資料変換パイプラインを構築",
          "カスタムRAG開発ではなく既存SaaS（NotebookLM）活用による低コスト・短納期アプローチを提案"
        ],
        "decisions": [
          {
            "title": "NotebookLM + markitdownによる低工数RAG構築",
            "detail": "GoogleのNotebookLMを活用し、markitdownで社内資料（PDF/Word/Excel）をテキスト変換して投入する方式を採用。カスタムRAGの構築ではなく、既存SaaSの活用でコスト最小化を図った"
          }
        ],
        "outcomes": [
          {
            "before": "社内資料が各部署のファイルサーバーやクラウドストレージに散在し、横断検索ができなかった。必要な情報を見つけるのに時間がかかっていた",
            "after": "NotebookLM + markitdownによるRAG型検索基盤を構築。社内資料をMarkdown変換して投入し、自然言語で横断検索可能にした。約2週間のコンサルティング期間内で実用的な検索環境を実現",
            "metric": "社内資料検索の効率化"
          }
        ],
        "challenges": [
          {
            "title": "多様なファイル形式の社内資料をRAG検索可能な形式に変換",
            "resolution": "markitdownを使用してPDF/Word/ExcelをMarkdown形式に変換。構造情報（見出し・表・リスト）を可能な限り保持する変換パイプラインを構築。変換後のMarkdownを手動で品質確認し、必要に応じて修正してからNotebookLMに投入"
          }
        ]
      },
      {
        "title": "レガシーシステムのコード構造調査と拡張性分析",
        "summary": "VBScript/OracleベースのレガシーシステムをCursor/SonarQube/Claude Desktopで静的解析。拡張性・改修難度・依存関係を分析し、ERP・既存改修・拡張案の選択肢整理・比較を実施。",
        "difficulty": "medium",
        "technologies": [
          "SonarQube",
          "Cursor",
          "ChatGPT",
          "Claude"
        ],
        "highlights": [
          "SonarQubeによる静的解析を実施し、モジュール別の改修リスク評価レポートを作成",
          "定量データに基づく改修リスクの可視化により、ブラウザ拡張アプローチの採用根拠を提供"
        ],
        "decisions": [
          {
            "title": "SonarQube静的解析によるレガシーコード品質の定量化",
            "detail": "SonarQube Community Editionを使用して全コードを静的解析し、バグ数(1,451)・コードスメル数(4,164)・重複率(9.8%)・テストカバレッジ(0%)を定量的に計測した"
          },
          {
            "title": "モジュール別の改修リスク評価",
            "detail": "入会申込モジュール(35,280行・信頼性D・バグ412件・重複12%)と講座提案シートモジュール(信頼性C・バグ238件・重複9%)を個別に深掘り分析し、改修影響範囲をマッピングした"
          }
        ],
        "outcomes": [
          {
            "before": "コード品質の客観的評価が存在せず、改修リスクが不明確だった",
            "after": "SonarQube解析によりコードを定量評価。複数の重大バグ、大量のコードスメル、高い重複率、テストカバレッジ0%、相当量の技術的負債を特定",
            "metric": "信頼性レーティングの数値化により改修リスクを客観評価。ブラウザ拡張アプローチの採用根拠として活用"
          }
        ],
        "challenges": [
          {
            "title": "バージョン管理なし・テストなしのレガシー環境での調査",
            "resolution": "SonarQubeによる静的解析で品質を定量化し、Oracle DBの読み取り専用レプリカへの接続で本番環境に影響を与えずに調査を実施。解析結果をスライド形式のレポートにまとめ、技術的リスクを経営層に可視化した"
          }
        ]
      },
      {
        "title": "短期拡張案のPoC構想・意思決定支援資料作成",
        "summary": "Mermaid記法によるフロー・構造図を積極活用した提案資料を作成。Genspark・Gamma・Canva等の生成AIを活用し、資料作成工程を短期イテレーションで高速化。",
        "difficulty": "medium",
        "technologies": [
          "Genspark",
          "Gamma",
          "Canva",
          "Mermaid"
        ],
        "highlights": [
          "7評価軸の3択比較マトリクスと意思決定ツリーを設計し、Reactブラウザ拡張のPoCアーキテクチャを策定",
          "6部門の要望を「拡張で対応可能/改修必要/ERP待ち」の3段階に仕分け、各部門に実現見通しを提示"
        ],
        "decisions": [
          {
            "title": "3択比較フレームワークによる戦略選定支援",
            "detail": "7つの評価軸（開発リスク・コスト・工期・品質保証・運用影響・拡張性・ROI）で3択を比較するマトリクスを作成し、意思決定ツリー形式で判断フローを可視化した"
          },
          {
            "title": "Reactブラウザ拡張による低リスク改善アプローチの提案",
            "detail": "Chrome拡張機能としてReact UIをレガシー画面に重ねるアプローチを提案。既存DBやバックエンドロジックを変更せず、フロント側で値引きマスタの階層ドロップダウン等を実装するPoC設計を行った"
          }
        ],
        "outcomes": [
          {
            "before": "複数の拡張アプローチ（改修/ERP/拡張）の判断基準がなく、経営層が意思決定できなかった",
            "after": "3択比較マトリクス＋意思決定ツリーで戦略選定を支援。Reactブラウザ拡張のPoCアーキテクチャ（Lambda+S3+IndexedDB+Chrome Extension）を設計し、値引き基準柔軟化のユースケースで具体的な実装方針を提示",
            "metric": "ブラウザ拡張が短期施策として承認。ERP導入は2-3年の中長期計画として別途予算化の検討開始"
          }
        ],
        "challenges": [
          {
            "title": "6部門の要望整理と実現可否の仕分け",
            "resolution": "全要望をヒアリング結果としてExcelに集約し、「ブラウザ拡張で対応可能」「既存コード改修必要」「ERP待ち」の3段階で仕分け。優先度を★で表示し、各部門の要望がどの段階で実現されるかを可視化した"
          }
        ]
      }
    ]
  },
  {
    "id": "ai-translation-qcd-2025",
    "company": "生成AI翻訳SaaS国内スタートアップ",
    "companyDesc": "生成AIを活用した翻訳SaaSを提供する国内スタートアップ。開発組織における人材面のQCD改善策の提案を担当。",
    "role": "開発組織アドバイザー",
    "period": "2025-04 — 2025-07",
    "teamSize": 2,
    "summary": "約30名規模の開発組織におけるQCD（品質・コスト・納期）課題を外部アドバイザーとして構造分析。MECE×Issue Treeで100仮説を構造化し、5軸加重スコアリングで施策優先度を客観化。6フェーズ実行ロードマップと経営提案資料を作成し、経営会議でCOO承認を獲得",
    "technologies": [
      "SonarQube",
      "Cursor",
      "NotebookLM",
      "ChatGPT",
      "Gamma",
      "Mermaid",
      "Gemini",
      "Genspark"
    ],
    "tasks": [
      {
        "title": "開発組織のQCD課題構造分析",
        "summary": "開発ベロシティ・品質低下の原因を調査し、技術面・体制面の課題を整理。コード管理・レビュー体制・リリース手順・属人化構造など、エンジニア組織の構造的課題を深掘り。",
        "difficulty": "high",
        "technologies": [
          "SonarQube",
          "Cursor",
          "NotebookLM"
        ],
        "highlights": [
          "MECE×Issue Treeで100仮説を構造化し、5軸スコアリングで8大課題を抽出。組織政治的課題もシステム課題として中立的に記述"
        ],
        "decisions": [
          {
            "title": "MECE×Issue Treeによる100仮説の構造化アプローチ",
            "detail": "MECE（Mutually Exclusive, Collectively Exhaustive）とIssue Tree手法を組み合わせ、5軸定量スコアリング（リリース速度寄与度・バグ発生率寄与度・実行容易性・計測容易性・リードタイム）で100仮説を網羅的に列挙・評価した"
          },
          {
            "title": "8大課題の重要度順序付けと組織構造マッピング",
            "detail": "最重要課題「既存アプリのデリバリー低下」への寄与度を基準に、実装者に直結する3課題を重点的に深掘りし、残り5課題はステークホルダー別に整理。8課題を重要度順に並べ替えた"
          }
        ],
        "outcomes": [
          {
            "before": "課題が断片的で全体像不明。ヒアリング結果が主観的で優先度判断不可",
            "after": "MECE×Issue Treeで100仮説を構造化し、5軸スコアリングで8大課題を抽出。経営層が意思決定に使える課題マップを構築",
            "metric": "100仮説→8大課題の構造化完了。Top仮説スコア4.35（最高）〜1.9（最低）の定量評価を実現"
          }
        ],
        "challenges": [
          {
            "title": "定量データ不足の中での課題構造化",
            "resolution": "定量データに依存せず、MECE×Issue Treeで仮説を構造化し、5軸スコアリングで相対評価する手法を採用。ヒアリング内容を「課題の重み」に変換する独自フレームワークを構築した"
          },
          {
            "title": "組織政治的な課題の中立的記述",
            "resolution": "個人名を出さず「意思決定構造」「決裁権限の不明確」等のシステム課題として記述し、解決策も個人批判ではなく制度設計として提案した"
          }
        ]
      },
      {
        "title": "QCD改善施策の評価フレーム・実行優先度マトリクス構築",
        "summary": "品質・コスト・納期を軸にした改善施策の調査・整理。施策ごとに「影響度×実現性」の定量評価を実施。重み付きマトリクス・優先順位チャートを資料内に実装し、ガントチャートと責任分界図で段階的実行計画を提示。",
        "difficulty": "high",
        "technologies": [
          "ChatGPT",
          "Gamma",
          "Mermaid"
        ],
        "highlights": [
          "5軸加重スコアリング関数を設計し、RANK.EQ関数で6フェーズ×3週間のロードマップを自動生成"
        ],
        "decisions": [
          {
            "title": "5軸加重スコアリングによる施策優先度の客観化",
            "detail": "Q寄与度(0.1)・C寄与度(0.1)・D寄与度(0.4)・金銭コスト(0.1)・所要工数(0.3)の5軸に重み付けしたスコアリング関数を設計。D（納期）への寄与度と所要工数を重視する重み配分にした"
          },
          {
            "title": "6フェーズ×3週間の段階展開ロードマップ設計",
            "detail": "RANK.EQ関数でスコア順位をフェーズ番号に自動マッピングし、6フェーズ×3週間のガントチャートを自動生成。各フェーズに4〜5施策を配置し、前フェーズの成果を次フェーズの前提条件として段階的に展開"
          }
        ],
        "outcomes": [
          {
            "before": "27施策の優先度が不明確で、経営層の意思決定が遅延",
            "after": "5軸加重スコアリング＋6フェーズロードマップにより、月単位で進捗を可視化できる実行計画を構築",
            "metric": "Top5施策の優先度が1回の経営会議で承認。4ヶ月でリリース速度30%向上・バグ率30%削減（仮目標）"
          }
        ],
        "challenges": [
          {
            "title": "施策優先度の客観的評価フレームワーク構築",
            "resolution": "5軸加重スコアリングをExcelで実装し、重み付けの根拠をCOOと事前合意することで、スコアリング結果の客観性と透明性を確保した"
          }
        ]
      },
      {
        "title": "経営会議提出用スライド資料の設計・作成",
        "summary": "非エンジニア層への合意形成を促進するため、Mermaid記法でフロー図・シーケンス図・判断分岐チャート等を多用。NotebookLMのRAG基盤を活用し、経営判断を支援する意思決定資料をリード作成。",
        "difficulty": "medium",
        "technologies": [
          "NotebookLM",
          "Gemini",
          "Genspark",
          "Mermaid"
        ],
        "highlights": [
          "2部構成（23+10スライド）の経営提案資料をリード作成。技術課題をQCD影響として再定義し因果関係チェーンで説明"
        ],
        "decisions": [
          {
            "title": "2部構成の経営提案資料設計（人材最適化＋チケット基盤再設計）",
            "detail": "「AI翻訳事業における開発組織の人材最適化提案」（23スライド・全体像）と「チケット管理基盤の再設計によるQCD向上」（10スライド・深掘り）の2部構成で資料を設計した"
          },
          {
            "title": "Jira統一基盤の提案とツール比較による意思決定支援",
            "detail": "Notion、Planio、Notion+Planio併用、Jiraの4選択肢を「チケット構造柔軟性」「部門横断連携」「UI/UX」「ワークフロー設計」「他ツール連携」の5軸で比較表を作成し、Jira+Jira Service Managementを推奨した"
          }
        ],
        "outcomes": [
          {
            "before": "技術課題の経営層への説明手段がなく、改善投資の承認が困難",
            "after": "2部構成の経営提案資料（23スライド＋10スライド）でQCD改善の全体像と具体施策を可視化。ツール比較表やRACIチャートで意思決定を支援",
            "metric": "COOがPoC実施を承認。チケット管理統一とJira導入検証の開始が決定"
          }
        ],
        "challenges": [
          {
            "title": "非エンジニアの経営層への技術課題の説明",
            "resolution": "技術課題をQCD（品質・コスト・納期）への影響として再定義し、「バグ流出→手戻り工数→コスト増」のように因果関係チェーンで説明。KPI目標値（バグ率40%削減、リードタイム25%短縮）を設定し、改善効果を定量化した"
          }
        ]
      }
    ]
  },
  {
    "id": "factory-maintenance-app-2024",
    "company": "製造業向け業務アプリスタートアップ",
    "companyDesc": "製造業の工場設備保全業務を支援するSaaSスタートアップ。工場設備保全アプリのフルスタック開発を担当。",
    "role": "フルスタックエンジニア",
    "period": "2024-10 — 2025-03",
    "teamSize": 4,
    "summary": "製造業の設備保全・点検業務を管理するマルチテナントSaaS。NestJS + GraphQL + PostgreSQLのバックエンドとReact + Apollo Clientのフロントエンドを一貫担当。RFC5545準拠の繰り返しタスク機能、RBAC+ReBAC 3軸アクセス制御、Googleカレンダー風タスクUI、フィールド単位逐次保存等のコア機能を設計・実装",
    "technologies": [
      "TypeScript",
      "React",
      "Apollo Client",
      "NestJS",
      "Prisma",
      "GraphQL",
      "Apollo Server",
      "Redis",
      "PostgreSQL",
      "CASL",
      "CSS",
      "React Hook Form",
      "Zod",
      "Storybook",
      "Playwright",
      "Vitest"
    ],
    "tasks": [
      {
        "title": "RFC5545準拠の繰り返しタスク機能の設計・実装",
        "summary": "年・月（第n週n曜日/n日）・週（複数曜日可）・日の繰り返しを網羅し、一括更新・スキップ・終了条件まで対応。未実体・実体を分離しつつ同一画面に統合表示できるスキーマ・API・バッチを設計。Redis+SQS+EventBridgeで前日バッチ実体化アーキテクチャを採択。",
        "difficulty": "extreme",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "NestJS",
          "Prisma",
          "GraphQL",
          "Apollo Server",
          "Redis",
          "PostgreSQL"
        ],
        "highlights": [
          "RFC5545仕様を分析し、繰り返しルール展開・例外処理・バッチ実体化アーキテクチャを設計。仕様書858行・振り返り1014行を執筆",
          "generate_series + UNION ALL + DISTINCT ONによる実体・未実体マージ方式のSQL/APIを実装"
        ],
        "decisions": [
          {
            "title": "前日バッチ実体化（EventBridge+SQS）の採用",
            "detail": "EventBridge+SQS+NestJS SQS Consumerによる前日バッチ実体化を採用"
          },
          {
            "title": "generate_series + UNION ALL による実体・未実体マージ方式",
            "detail": "PostgreSQLのgenerate_seriesで日付展開し、defaultValues JSONBから20+カラムを復元、実体WorkOrderとUNION ALL後にDISTINCT ONでデデュプリケーション"
          },
          {
            "title": "単一WorkOrderモデルへの3種類時間モデル統合（政治的判断）",
            "detail": "政治的経緯により単一WorkOrderモデルに統合。技術的には3モデル分離を主張したが却下された"
          }
        ],
        "outcomes": [
          {
            "before": "繰り返しタスク機能が未実装で、毎日/毎週の定期点検を手動で作成していた",
            "after": "RFC5545準拠の繰り返しルール機能をリリースし、Daily/Weekly/Monthly の繰り返しタスクを自動生成可能に",
            "metric": "定期点検の手動作成工数削減"
          },
          {
            "before": "繰り返し設計の議論が収束せず、設計仕様が散在していた",
            "after": "RFC5545仕様書（858行）と振り返り文書（1014行）を作成し、現実装の問題点と理想設計を体系化。6フェーズの改善ロードマップを策定",
            "metric": "設計知識の組織的蓄積と改善ロードマップの明確化"
          }
        ],
        "challenges": [
          {
            "title": "3種類の時間モデルを単一モデルで統合した繰り返しルール設計",
            "resolution": "日付のみ（時刻未対応）の最小実装で着手し、テンプレート側にtimeModelの概念を持たせる理想設計を仕様書として文書化。将来の3モデル分離への移行パスを明確にした"
          },
          {
            "title": "defaultValues JSONB全フィールド複製による300行超SQL",
            "resolution": "300行超のCTEチェーンを段階的に構築（RecurringFields→WithInterval→RecurringDate→UnrealizedTask→RealizedTask→Unioned→OverrideWithRealized）。各CTEの責務を明確に分離し、保守可能な構造を維持。振り返り文書でdefaultValues→templateId移行の理想設計を詳細に記述"
          },
          {
            "title": "ダッシュボードピボットAPIの制約によるバッチ実体化の強制",
            "resolution": "SQL内で未実体タスクをWorkOrderと同じカラム構造に変換するCTEチェーンを構築。振り返り文書でCOUNT/SUMの結合律を利用した二段階集計+アプリ層マージの代替案を詳細に分析（数学的証明付き）"
          }
        ]
      },
      {
        "title": "スコープ×リソース×アクション3軸アクセス制御の設計・合意形成・実装",
        "summary": "本部/工場等のスコープ×リソース×アクションの3軸で権限を定義。個別設定方式とロール割当型の2案を比較・ファシリテーションで合意取得。CASL AbilityでAPI認可とUI表示制御を共管し整合性を維持。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "NestJS",
          "GraphQL",
          "CASL"
        ],
        "highlights": [
          "RBAC+ReBACハイブリッドACLモデルの設計、30+ユースケースの網羅的検証、acl-design.md(737行)を執筆",
          "個別設定方式とロール割当型の2案を比較し、チームとの設計合意形成をファシリテート"
        ],
        "decisions": [
          {
            "title": "RBAC+ReBAC ハイブリッドACLモデルの採用",
            "detail": "DB層はRBAC+ReBAC ハイブリッド（将来ABAC拡張可能）、UI層は3段階フェーズで段階的に公開する設計を採用"
          },
          {
            "title": "Deny-by-default + テンプレート方式の権限評価",
            "detail": "デフォルト拒否、明示的denyが1つでもあればdeny、それ以外でallowがあればallow、どちらもなければdenyの3段階評価"
          },
          {
            "title": "scopeType+inheritChildren による階層継承のオプション化",
            "detail": "inheritChildrenフラグをUserScopeRoleに追加し、継承のオン/オフをロール割当時に選択可能にした"
          }
        ],
        "outcomes": [
          {
            "before": "アクセス制御が未実装で全ユーザーが全データにアクセス可能だった",
            "after": "3層スコープ階層（Company>Office>Project）と5種類のシステム定義テンプレートによるRBAC+ReBAC ACLシステムを設計・合意形成",
            "metric": "ACLモデルの設計完了とチーム合意形成"
          },
          {
            "before": "ACL要件が散在し30+ユースケースの網羅的な検証ができていなかった",
            "after": "acl-design.md（737行）とacl-use-cases.mdを作成。12のユースケース（複数工場兼任、外部エンジニア、監査員等）がカバーされることを検証表で確認",
            "metric": "要件の網羅的検証と設計ドキュメント化"
          }
        ],
        "challenges": [
          {
            "title": "マルチテナントSaaSにおける権限階層設計のバランス",
            "resolution": "inheritChildrenフラグによる継承のオプション化と、RoleTemplate+PermissionOverrideの2層構造で柔軟性と管理容易性を両立。30件以上のユースケースをドキュメント化し、各パターンがカバーされることを検証"
          }
        ]
      },
      {
        "title": "トップ画面の描画最適化（描画時間70%以上削減）",
        "summary": "フィルター・一覧・詳細の連動描画による再描画負荷を状態構造の見直しで最小化。描画コストが高くUXへの影響が大きい箇所に限定し、限られた工数内でリファクタリングを実施。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client"
        ],
        "highlights": [
          "React DevTools Profilerで再レンダリングを分析し、選択的にReact.memo/useMemo/useCallbackを適用して描画時間70%以上削減"
        ],
        "decisions": [
          {
            "title": "React.memo + useMemo による不要再レンダリングの排除",
            "detail": "React DevToolsのProfilerでコンポーネントツリーの再レンダリングを可視化し、不要な再レンダリングをReact.memo、useMemo、useCallbackで排除。描画時間70%以上削減を達成"
          }
        ],
        "outcomes": [
          {
            "before": "描画時間が遅くUXへ悪影響",
            "after": "描画時間70%以上削減",
            "metric": "描画時間削減率"
          }
        ],
        "challenges": [
          {
            "title": "全コンポーネント一括メモ化 vs Profiler駆動の選択的最適化",
            "resolution": "React DevTools Profilerを使い、コンポーネントツリーの再レンダリングを目視で確認。実際に遅いコンポーネントのみを特定し、React.memo/useMemo/useCallbackを選択的に適用。工数を抑えながら70%以上の描画時間削減を達成"
          }
        ]
      },
      {
        "title": "Googleカレンダー風タスク表示UIの実装",
        "summary": "週表示・月表示・3日表示に対応したカレンダービューを実装。CSS Grid/Subgridを用いた角丸表示・可変表示領域・スケジューラ対応を実現。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "CSS"
        ],
        "highlights": [
          "パッキングアルゴリズム（行占有マッピング→上詰め配置）を自作し、Apollo Client SSoTのリアクティブ更新設計を策定",
          "3/4/7日可変ビュー、D&D日付変更、週またぎ角丸、CSS scroll snapモバイル対応をフルスクラッチで実装"
        ],
        "decisions": [
          {
            "title": "カレンダーUIをフルスクラッチで実装する決定",
            "detail": "ライブラリに依存せず、React+CSSでゼロからカレンダーUIを構築した。3日/4日/週次等の可変日数ビューを外部パラメータとして受け取り、任意の日数幅でレイアウトが崩れないよう設計した"
          },
          {
            "title": "Apollo ClientをSSoTとしたドラッグ&ドロップ日付変更と逐次保存連携",
            "detail": "Apollo Clientのキャッシュを唯一の信頼できるデータソース（SSoT）として設計。D&Dでの日付変更時も、編集モーダルでの逐次保存後もApolloキャッシュを更新することで、カレンダーがリアクティブに再描画される仕組みを構築"
          },
          {
            "title": "レスポンシブカレンダーUIとCSS scroll snapによるスマホ最適化",
            "detail": "スマホ時はPC版とは大きく異なるUIに切り替え、日付タップでタスク一覧をスライド表示する設計を採用。CSS scroll snapを適用して、スクロールが常に日付単位でスナップし、中途半端な位置で止まらないようにした"
          }
        ],
        "outcomes": [
          {
            "before": "カレンダーUIが存在せず、作業予定はリスト表示のみで一覧性が低かった",
            "after": "Googleカレンダーと同等の操作感を持つカスタムカレンダーUIをフルスクラッチで実装。3日/4日/週次ビューの動的切り替え、週またぎイベントの角丸表示を実現",
            "metric": "ユーザーが直感的に作業予定を把握・管理できるUIを提供。フルスクラッチにより要件変更への柔軟な対応が可能に"
          },
          {
            "before": "タスクの実施日管理がテーブル形式の一覧表示のみで、視覚的にスケジュール全体を把握しにくかった",
            "after": "Googleカレンダー風のUIをゼロから構築。複数日/単一日タスクの密なパッキング表示、D&Dによる日付変更、Apollo Client SSoTによるリアルタイム更新、レスポンシブ対応（scroll snap含む）を実現。3日/4日/7日の可変表示切替にも対応",
            "metric": "カレンダーUIの完成度とユーザビリティ"
          }
        ],
        "challenges": [
          {
            "title": "週をまたぐイベントの角丸UI表現",
            "resolution": "イベントを週ごとにセグメント分割し、各セグメントの位置（先頭/中間/末尾）に応じてborder-radiusのクラスを動的に適用した。先頭セグメントは左角丸、末尾セグメントは右角丸、中間セグメントは角丸なしにした"
          },
          {
            "title": "可変日数ビューのレスポンシブレイアウト",
            "resolution": "日数パラメータをコンポーネントのpropsとして受け取り、列幅をCSS Gridのfr単位で動的に計算。イベント配置もstartDate/endDateから動的にgrid-column位置を算出するロジックに変更した"
          },
          {
            "title": "複数日タスクと単一日タスクのパッキングアルゴリズム（隙間なく上詰め）",
            "resolution": "行ごとの占有状態を管理するパッキングアルゴリズムを自作。複数日タスクが占有する行を先にマッピングし、単一日タスクは空いている最上位の行に配置。これによりGoogleカレンダー同様の密なレイアウトを実現"
          }
        ]
      },
      {
        "title": "動的フォーム構造に対応した型別バリデーション実装",
        "summary": "テンプレート上で追加・削除可能な項目（文字列/数値/日付等）に対して型別バリデーションをRHF+Zodで実装。作成モーダル・編集画面間で処理分離と再利用性を両立。活性制御・選択肢表示制御・相関バリデーションに対応。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React Hook Form",
          "Zod"
        ],
        "highlights": [
          "テンプレート上で追加・削除可能な項目（文字列/数値/日付等）に対して型別バリデーションをRHF+Zodで実装。作成モーダル・編集画面間で処理分離と再利用性を両立。活性制御・選択肢表示制御・相関バリデーションに対応。"
        ]
      },
      {
        "title": "フォーカスアウト時差分逐次保存機能の実装",
        "summary": "保存漏れ防止のため、フォーカスアウト時に差分のみを対象とした逐次保存を実装。DevToolsスロットリングを活用し、不安定回線下での再送テストも実施。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "GraphQL"
        ],
        "highlights": [
          "フィールド単位onBlur逐次保存+Command Patternのアーキテクチャを設計し、failedCommands再送信機構を実装"
        ],
        "decisions": [
          {
            "title": "フィールド単位onBlur逐次保存の採用（フォーム一括保存の不採用）",
            "detail": "フィールドごとに独立したreact-hook-formインスタンスを持ち、onBlurイベントでisEqual差分チェック後にGraphQL mutationを即座送信する逐次保存方式を採用"
          },
          {
            "title": "コマンドをデータとして扱うRPC的アプローチによるフィールド変更のカプセル化",
            "detail": "各フィールド変更をCommandInputデータ（PatchWorkOrder/PatchWorkOrderCustomField/PatchCheckListCustomField）として構造化し、crypto.randomUUID()でID付与してHTTPSでバックエンドに送信するRPC的方式を採用。GoFのCommand PatternはクラスベースOOPでありJSON化できないため、コマンドをシリアライズ可能なデータとして扱う設計とした"
          }
        ],
        "outcomes": [
          {
            "before": "フォーム一括保存方式で工場内Wi-Fi環境での入力データ消失リスクがあった",
            "after": "フィールド単位onBlur逐次保存+Command Pattern+failedCommands再送信機構を実装。3段階改善ロードマップ（localStorage永続化→SW導入→フルオフライン）を設計",
            "metric": "データ消失リスクの大幅軽減と将来改善計画の策定"
          }
        ],
        "challenges": [
          {
            "title": "工場内Wi-Fi不安定環境でのデータ保全",
            "resolution": "フィールド単位onBlur逐次保存+failedCommandsのuseRef蓄積+保存ボタンでの再送信機構を実装。ネットワークエラー時はフォーム値を保持し、クライアントエラー時はサーバー値にリセットする二段階エラーハンドリング"
          }
        ]
      },
      {
        "title": "UIコンポーネントディレクトリ構成・命名規則の策定と導入",
        "summary": "ドメイン密着型コンポーネントの再利用性を高めるため、ディレクトリ構成・命名規則・コンポーネント構成ルールを提案・合意形成。チーム内共通規約として浸透させた。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React"
        ],
        "highlights": [
          "ドメイン密着型コンポーネントの再利用性を高めるため、ディレクトリ構成・命名規則・コンポーネント構成ルールを提案・合意形成。チーム内共通規約として浸透させた。"
        ]
      },
      {
        "title": "Storybook活用による全UI状態可視化と多言語対応基盤整備",
        "summary": "StorybookでUI全状態を可視化し、将来の表示バリエーション対応を容易化。カードUIの多言語対応（英語文言提案含む）を実装し、国際対応基盤を整備。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Storybook",
          "Playwright",
          "Vitest"
        ],
        "highlights": [
          "StorybookでUI全状態を可視化し、将来の表示バリエーション対応を容易化。カードUIの多言語対応（英語文言提案含む）を実装し、国際対応基盤を整備。"
        ]
      }
    ]
  },
  {
    "id": "recruitment-saas-2022",
    "company": "HRコンサル・システム上場連結子会社",
    "companyDesc": "HRコンサルティング・システム開発を行う上場企業の連結子会社。マルチテナント型採用管理システムの新規開発を担当。",
    "role": "フロントエンドテックリード",
    "period": "2022-10 — 2024-09",
    "teamSize": 10,
    "summary": "新卒採用管理SaaSのフロントエンド開発をテックリードとして2年間主導。B2B（人事向け管理画面）とB2C（応募者向けエントリー画面）をpnpmモノレポ構成で開発。Specificationパターンによる動的フォームビルダー、Suspense対応ダッシュボード、VRTパイプライン等のコア機能を設計・実装し、10名チームの品質・開発効率向上を推進",
    "technologies": [
      "TypeScript",
      "React",
      "GitHub Actions",
      "Renovate",
      "React Hook Form",
      "Storybook",
      "Apollo Client",
      "Playwright",
      "TanStack Query",
      "GraphQL",
      "reg-suit",
      "storycap",
      "MUI"
    ],
    "tasks": [
      {
        "title": "フロントエンドテックリードとしてのチーム運営・品質管理",
        "summary": "タスクアサイン・SP更新・知見共有・PRレビュー文化醸成・実装ガイド整備を主導。Renovateによるライブラリ定期アップデート自動化を導入。チームミーティングを主催し技術・コード規約・画面仕様の共有を推進。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "GitHub Actions",
          "Renovate"
        ],
        "highlights": [
          "B2Cアプリ全体の仕様洗い出し・バックエンドチームとの合意形成・タスク分解・メンバーアサイン・クリティカルパス担当をオーケストレーター型で主導",
          "コードレビューガイドライン策定、VRT環境構築、インターン育成を通じてチーム品質基準を確立"
        ],
        "decisions": [
          {
            "title": "インターン育成とコードレビューによるチーム品質底上げ",
            "detail": "自身もコードレビューを積極的に実施し、インターンメンバーへのフィードバックを通じて育成を行った。レビューを通じてコーディング規約・設計パターンを実践的に伝えるOJT型のアプローチを採用"
          },
          {
            "title": "バックエンドチームへの窓口一本化とオーケストレーター型マネジメント",
            "detail": "自分一人がB2Cアプリ全体の仕様を短期間で洗い出し、バックエンドチームリーダーと1対1で徹底的にすり合わせを実施。合意後にB2Cチームメンバー向けオンボーディングミーティングを開催し、全仕様を説明。チームから上がった質問・疑問点をまとめてバックエンドチームと解消するワンストップ窓口として機能した"
          },
          {
            "title": "仕様のタスク分解・依存関係整理・メンバー特性に基づくアサインメント",
            "detail": "詰めた仕様をタスク分解し依存関係を明確にしてJiraチケットに落とし込み。メンバーの得意・不得意、スキルレベル、希望に応じてチケットをアサイン。タスク依存関係上、単一障害点（クリティカルパス）になりやすい箇所は自分が率先して引き受けた"
          }
        ],
        "outcomes": [
          {
            "before": "フロントエンド品質のばらつきとCSSリグレッションの見落としが発生していた",
            "after": "Storybook+storycap+reg-suitによるビジュアルリグレッション環境を構築し、PRごとにUI差分を自動検知。コードレビューガイドラインも策定",
            "metric": "UI品質の自動担保体制の確立"
          }
        ],
        "challenges": [
          {
            "title": "FEテックリードとしての技術的負債と開発速度のバランス",
            "resolution": "Storybook+storycap+reg-suitによるビジュアルリグレッション環境を構築し、UIの品質を自動的に担保。コードレビューガイドラインを策定し、チーム全体の品質水準を向上"
          },
          {
            "title": "4ヶ月の短期間でB2C応募者向けアプリケーションの仕様詳細詰め",
            "resolution": "テックリードとして仕様の詳細詰めから主導。応募者のユーザーフローを整理し、各ステータスでの遷移条件・表示内容・バリデーションルールを体系的に定義。実装と並行して仕様をアジャイルに確定させていった"
          },
          {
            "title": "動的フォームの仕様エッジケース洗い出しとバックエンド合意形成",
            "resolution": "選択肢0件のケースはB2B側のフォーム設定運用でカスタマーサポートを介入させる方針とし、B2Cアプリ側では特にアラートを出さないと決定。このように各エッジケースについてバックエンドチームリーダーと個別に合意を取り、決定事項をドキュメント化してチームに共有した"
          }
        ]
      },
      {
        "title": "応募者エントリー導線の仕様策定・実装",
        "summary": "会員登録→求人応募→選考ステップへのエントリーフローの詳細仕様詰めとFE実装。4ヶ月の開発期間内に機能開発を完了し、契約先から高い評価を獲得。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "React Hook Form",
          "Storybook",
          "Apollo Client",
          "Playwright"
        ],
        "highlights": [
          "4フォーム導線を共通DynamicForm基盤で統一する設計を策定し、マルチページバリデーション・遷移制御を実装"
        ],
        "decisions": [
          {
            "title": "4つのB2Cフォーム導線を共通DynamicForm基盤で実装",
            "detail": "DynamicFormSpecificationクラスを中核に、共通のuseFormフック・入力コンポーネント群・バリデーションシステムを共有しつつ、導線ごとのページ構成・送信先・パラメータ差分のみを個別に定義する設計を採用"
          },
          {
            "title": "マルチページフォームのページ単位バリデーションと遷移制御",
            "detail": "URLのページインデックス（1始まり）と配列インデックス（0始まり）を変換しつつ、useFormStateでページ単位のバリデーション状態を管理。trigger()をページスコープで実行し、未バリデーションのページへの遷移をブロック"
          }
        ],
        "outcomes": [
          {
            "before": "4ヶ月の開発期間という制約",
            "after": "期間内に全機能開発完了、契約先から高い評価を獲得",
            "metric": "開発完了率・顧客満足度"
          },
          {
            "before": "応募者向けのエントリーフォームが存在せず、採用管理SaaSのB2C側が未整備だった",
            "after": "4つのフォーム導線（新規登録・プリエントリー・プロフィール更新・マイページタスク）を共通DynamicForm基盤で実装。24種の入力コンポーネント・50+バリデーションルール・マルチページ遷移を実現",
            "metric": "B2C応募者向けフォーム基盤の完成度"
          }
        ],
        "challenges": [
          {
            "title": "応募者エントリー導線における複雑な状態遷移管理",
            "resolution": "仕様策定段階で状態遷移図を詳細に作成し、全パターンを可視化。不正な遷移を型レベルで防止する設計を実装。4ヶ月の開発期間内に全機能を完了"
          },
          {
            "title": "サーバーサイドバリデーションエラーのフィールドレベルマッピング",
            "resolution": "useEffect内でisGraphQLValidationErrorを判定し、setRootErrorでバナーエラー、setServerErrorでフィールドレベルエラーを分離して設定。カスタムuseFormフックでエラーハンドリングを統一"
          }
        ]
      },
      {
        "title": "人事用動的フォームビルダーの設計・実装（Specificationパターン採用）",
        "summary": "人事がページ・見出し・入力項目・バリデーション・親子関係等を設定できるフォームビルダーを実装。Specificationパターンでクラスの状態問題を解決し、RHFとの整合性を保持。凝集性と拡張性を両立した設計を実現。",
        "difficulty": "extreme",
        "technologies": [
          "TypeScript",
          "React",
          "React Hook Form",
          "Apollo Client"
        ],
        "highlights": [
          "Specificationパターン×Yupカスタムメソッド50+の相関バリデーション基盤を設計・実装。3層フォーム生成エンジンを構築",
          "FormFieldAssociation+useWatch+SelectionResetterによるリアクティブ選択肢フィルタリングを実装"
        ],
        "decisions": [
          {
            "title": "Specificationパターンによる動的フォームバリデーション設計",
            "detail": "Specificationパターン（ドメイン駆動設計のパターン）を採用し、条件式をオブジェクトとして合成可能な設計を実装"
          },
          {
            "title": "Specificationパターン×Yupカスタムメソッドによる相関バリデーション基盤",
            "detail": "Yupのスキーマにカスタムメソッドを50+追加し、forAllSchemaパターンで全スキーマ型に一括適用。.meta({ dependsOn: [field] })でフィールド間依存関係をメタデータとして宣言的に記述し、getDependencyMapで依存グラフを自動構築"
          },
          {
            "title": "pnpmモノレポ構成でバリデーションをsharedパッケージに分離",
            "detail": "pnpm workspaceでb2b・b2c・sharedの3パッケージ構成を採用。バリデーション基盤をpackages/shared/src/features/validationに配置し、B2B/B2CからはreExportで利用。EnumerationRegistryでGraphQL由来のenum定義を一元管理"
          },
          {
            "title": "FormFieldAssociation + useWatch + SelectionResetterによるリロードなし選択肢フィルタリング",
            "detail": "FormFieldAssociationコンポーネントでuseWatch()を使い親フィールドの値変更をリアクティブに監視。choiceFilter関数を子コンポーネントに渡し、useMemoで選択肢をフィルタリング。SelectionResetterが無効になった選択値を自動クリア"
          }
        ],
        "outcomes": [
          {
            "before": "応募フォームの条件定義がハードコードで、条件変更のたびにコード修正が必要だった",
            "after": "Specificationパターンによる宣言的条件定義を実装し、人事担当者がコードなしでフォーム条件を設定可能に",
            "metric": "フォーム条件変更のセルフサービス化"
          },
          {
            "before": "フォーム項目がハードコードされており、項目追加・変更のたびにエンジニアの実装が必要だった",
            "after": "DynamicFormSpecificationエンジンにより、人事担当者がフォーム項目を自由に設定可能。50+のバリデーションルール・24種の入力コンポーネント・フィールド間相関バリデーション・リアクティブ選択肢フィルタリングを備えた動的フォーム基盤を実現。sharedパッケージでB2B/B2C両方に共通提供",
            "metric": "動的フォーム基盤の柔軟性と品質"
          }
        ],
        "challenges": [
          {
            "title": "人事用動的フォームの条件式組み合わせ爆発",
            "resolution": "Specificationパターン（DDD由来）を採用し、条件式をAND/OR/NOTで合成可能なファーストクラスオブジェクトとして設計。JSON Schemaライクな宣言的条件定義を実装"
          },
          {
            "title": "フォーム項目間の相関バリデーションとリアクティブUIの同期制御",
            "resolution": "SelectionResetterコンポーネントで選択肢変更を検知し無効値を即座にクリア。getDependencyMapでフィールド依存グラフを構築し、React Hook Formのdepsオプションで依存フィールドの再バリデーションを自動トリガー。配列インデックスのワイルドカードマッチング（<number>プレースホルダー）で動的フォームの依存関係も対応"
          },
          {
            "title": "スキーマ駆動の動的フォーム生成エンジンの設計",
            "resolution": "DynamicFormSpecification（全体）→FormPageSpecification（ページ）→FormFieldSpecification（項目）の3層クラス設計を採用。createValidationSchema()でYup.tuple()を動的に構築し、各ページのバリデーションスキーマを自動生成。TypeScript型パラメータでFormValuesの型安全性も確保"
          }
        ]
      },
      {
        "title": "人事用ダッシュボードの詳細仕様策定・Suspense対応実装",
        "summary": "トップ画面ダッシュボードの詳細仕様詰め・実装。全体・3種のパネルをSuspense対応。React Profilerでレンダー原因を特定し、実際のパフォーマンスと体感待ち時間の双方を改善。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "TanStack Query"
        ],
        "highlights": [
          "ウィジェット独立データフェッチ（Suspense+ErrorBoundary）アーキテクチャとカスタムMasonryグリッドアルゴリズムを設計・実装"
        ],
        "decisions": [
          {
            "title": "ウィジェット独立データフェッチアーキテクチャの採用",
            "detail": "各ウィジェットが独立してデータフェッチを行うアーキテクチャを採用。Apollo Client useReadQueryを使用し、ウィジェットコンポーネント内でSuspense対応のデータ取得を完結させた"
          },
          {
            "title": "カスタムMasonryグリッドレイアウトのフルスクラッチ実装",
            "detail": "getGridPanels.tsにカスタムグリッド配置アルゴリズムを実装。leftRowIndex/rightRowIndexで左右列の現在行を追跡し、高さの短い列にウィジェットを配置するロジックでMasonry効果を実現した"
          },
          {
            "title": "dnd-kit v6によるウィジェットドラッグ&ドロップ並べ替え",
            "detail": "@dnd-kit/core v6.1.0 + @dnd-kit/sortable v8.0.0を採用。SortableContextでリスト管理し、useSortableフックで各ウィジェットのD&D状態を制御。DragOverlayで移動中のプレビュー表示を実装した"
          }
        ],
        "outcomes": [
          {
            "before": "ダッシュボードのデータフェッチがウォーターフォール方式で、全ウィジェットの読み込み完了まで操作不可だった。ウィジェット間に隙間が生じる配置問題もあった",
            "after": "React Suspense + Apollo useReadQuery + Material UI Skeletonで独立フェッチ＋スケルトン表示を実現。カスタムMasonryグリッドで隙間なし配置。dnd-kit v6でD&D並べ替え、1列/2列切り替えを実装",
            "metric": "各ウィジェットが独立してロード完了→描画に遷移するUXに改善。将来のサードパーティマーケットプレイス拡張にも対応可能な疎結合アーキテクチャを実現"
          }
        ],
        "challenges": [
          {
            "title": "20ウィジェット同時データフェッチのウォーターフォール問題解消",
            "resolution": "Apollo Client 3.10のuseReadQueryを使用してSuspense対応のデータフェッチに移行。各ウィジェットをReact Suspense境界でラップし、Material UIのSkeletonコンポーネントをfallbackに設定。ErrorBoundaryも各ウィジェットに個別適用し、1つのAPI障害が他ウィジェットに波及しない設計にした"
          },
          {
            "title": "CSS Masonry非対応環境でのカスタムグリッドレイアウト実装",
            "resolution": "getGridPanels.tsにカスタム配置アルゴリズムを実装。左右列の現在行インデックスを追跡し、各ウィジェットを高さの短い列に配置。grid-row-start/grid-row-spanをCSS Grid上で動的に算出するアプローチで、Masonry的な隙間なし配置を実現した"
          }
        ]
      },
      {
        "title": "エラーハンドリング・キャッシュ・アクセス制御等の横断的画面機能整備",
        "summary": "エラーハンドリング・キャッシュリセット・クエリヘッダパラメータ付与・リダイレクト・クエリバッチング・GraphQLスキーマからの自動生成バリデーション修正を実装。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "React",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "エラーハンドリング・キャッシュリセット・クエリヘッダパラメータ付与・リダイレクト・クエリバッチング・GraphQLスキーマからの自動生成バリデーション修正を実装。"
        ]
      },
      {
        "title": "Storybook+storycap+reg-suitによるビジュアルリグレッション環境構築",
        "summary": "StorybookとStoycap・reg-suitをGitHub ActionsのCIに組み込みUIの回帰テストを実施。Playwrightによる回帰テスト用E2EテストもCI環境に整備。",
        "difficulty": "high",
        "technologies": [
          "Storybook",
          "GitHub Actions",
          "Playwright",
          "reg-suit",
          "storycap"
        ],
        "highlights": [
          "Storybook+storycap+reg-suit+GitHub Actions+S3のVRTパイプラインを設計・構築し、チームにVRT文化を定着させた",
          "matrix strategyによるb2b/b2c並列撮影、閾値0.1%差分比較、PRコメント自動投稿を実装"
        ],
        "decisions": [
          {
            "title": "Storybook v8 + storycap + reg-suit + S3によるVRTパイプライン設計",
            "detail": "@storybook/react-vite v8.1.5でStorybook環境を構築し、storycap v5.0.0でスクリーンショット自動取得、reg-suitでピクセル差分比較(閾値0.1%)、AWS S3への結果パブリッシュ、GitHub PR通知による差分レビューフローを構築した"
          },
          {
            "title": "GitHub Actions matrixストラテジーによるb2b/b2c並列VRT実行",
            "detail": "GitHub Actionsのmatrix strategyでb2b/b2cを並列にstorycapで撮影し、アーティファクトとしてアップロード。後続のvrtジョブで統合してreg-suit runを実行する2ステージパイプラインを設計した"
          }
        ],
        "outcomes": [
          {
            "before": "UIの意図しない変更（CSSリグレッション）がリリース後に発覚していた",
            "after": "storycap+reg-suitでPRごとにスクリーンショット比較を自動実行。CSSリグレッションをマージ前に100%検知可能に",
            "metric": "CSSリグレッション検知率"
          },
          {
            "before": "UI変更の品質確認が手動目視のみで、見落としによる退行バグがリリース後に発見されていた",
            "after": "Storybook v8.1.5 + storycap + reg-suit + GitHub Actions + S3のVRTパイプラインを構築。b2b 215ストーリー・b2c 49ページの全UIコンポーネントを毎PR自動スクリーンショット比較",
            "metric": "閾値0.1%のピクセル差分検出で視覚的退行を自動検出。PRコメントでの差分画像レビューが定着し、リリース後のUI退行バグが削減"
          }
        ],
        "challenges": [
          {
            "title": "storycapのタイムアウトとアセット待機の安定化",
            "resolution": "preview.tsxのdefaultパラメータにscreenshot: { waitAssets: true }を設定してアセットの読み込み完了を待機。storycap実行時にserverTimeout 60000ms・captureTimeout 15000msを設定。ストーリー個別にdelayを調整して安定した撮影環境を構築した"
          },
          {
            "title": "チームへのVRT文化の定着",
            "resolution": "reg-notify-github-pluginによるPRコメントでの差分画像表示を導入し、差分がある場合はレビューに含めるチームルールを策定。Storybook上でのコンポーネント開発フローを推奨し、ストーリー作成がVRTの一部として自然に組み込まれる開発プロセスを構築した"
          }
        ]
      },
      {
        "title": "react-admin→Apollo Client/RHF/MUIへの移行とGraphQL Suspense導入",
        "summary": "開発効率向上のためreact-adminからApollo Client・RHF・MUIへの移行を提起し完全移行まで推進。GraphQL Suspense・React Suspense導入による表示速度向上を検証・本格導入。",
        "difficulty": "high",
        "technologies": [
          "React",
          "React Hook Form",
          "MUI",
          "Apollo Client",
          "GraphQL"
        ],
        "highlights": [
          "開発効率向上のためreact-adminからApollo Client・RHF・MUIへの移行を提起し完全移行まで推進。GraphQL Suspense・React Suspense導入による表示速度向上を検証・本格導入。"
        ]
      },
      {
        "title": "スモークテストチームリーダーとしてのテスト推進",
        "summary": "テストフェーズのリーダーとして率先してドライバー役を担当。他メンバーのドライバー時に画面・遷移仕様を共有。不具合チケット起票・テストステータス管理を主導。",
        "difficulty": "medium",
        "technologies": [
          "Playwright"
        ],
        "highlights": [
          "テストフェーズのリーダーとして率先してドライバー役を担当。他メンバーのドライバー時に画面・遷移仕様を共有。不具合チケット起票・テストステータス管理を主導。"
        ]
      }
    ]
  },
  {
    "id": "mobile-order-app-2022",
    "company": "モバイルオーダーアプリケーション販売会社",
    "companyDesc": "飲食店向けモバイルオーダーアプリを開発・販売する会社。LIFF/ネイティブアプリ/バックエンドの開発を担当。",
    "role": "LIFFフロントエンド/ネイティブアプリ/バックエンドエンジニア",
    "period": "2022-04 — 2022-09",
    "teamSize": 7,
    "summary": "",
    "technologies": [
      "TypeScript",
      "Next.js",
      "Apollo Client",
      "React Native",
      "Expo",
      "LIFF",
      "React",
      "NestJS",
      "GraphQL",
      "Jest",
      "Hasura"
    ],
    "tasks": [
      {
        "title": "Web/LIFF/ネイティブアプリの複数プラットフォーム対応フロントエンド開発",
        "summary": "Web（Next.js）・LIFFアプリ・ネイティブアプリ（React Native/Expo）全ての開発を一貫対応。注文管理・店舗LINE連携・レジ連携・在庫管理・締め処理など幅広いドメインロジックを実装。",
        "difficulty": "high",
        "technologies": [
          "TypeScript",
          "Next.js",
          "Apollo Client",
          "React Native",
          "Expo",
          "LIFF"
        ],
        "highlights": [
          "Web（Next.js）・LIFFアプリ・ネイティブアプリ（React Native/Expo）全ての開発を一貫対応。注文管理・店舗LINE連携・レジ連携・在庫管理・締め処理など幅広いドメインロジックを実装。"
        ]
      },
      {
        "title": "モバイルオーダーの多言語化（英語・中国語）対応",
        "summary": "ユーザーデバイスに関わらずロゴ・文言の表示が崩れないこと、意味が簡潔に理解できることを前提に英語圏・中国語圏アプリUIを調査。プロトタイプを用いてデザイナー・POと議論しながらUIを改善。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "LIFF"
        ],
        "highlights": [
          "ユーザーデバイスに関わらずロゴ・文言の表示が崩れないこと、意味が簡潔に理解できることを前提に英語圏・中国語圏アプリUIを調査。プロトタイプを用いてデザイナー・POと議論しながらUIを改善。"
        ]
      },
      {
        "title": "POSシステム仮締め処理の実装（本締め共通化・単体テスト整備）",
        "summary": "本締め処理と重なる処理を共通化し、変数の命名揺れを解消。単体テストを追加し、負債の少ない実装を実現。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "NestJS",
          "GraphQL",
          "Jest"
        ],
        "highlights": [
          "本締め処理と重なる処理を共通化し、変数の命名揺れを解消。単体テストを追加し、負債の少ない実装を実現。"
        ]
      },
      {
        "title": "キッチンディスプレイの卓別・メニュー別・時間別注文状況集計実装",
        "summary": "キッチンディスプレイの機能実装・UI改善。卓別・メニュー別・時間別注文状況を集計する機能を実装。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "Hasura",
          "GraphQL",
          "React Native"
        ],
        "highlights": [
          "キッチンディスプレイの機能実装・UI改善。卓別・メニュー別・時間別注文状況を集計する機能を実装。"
        ]
      }
    ]
  },
  {
    "id": "board-management-app-2022",
    "company": "取締役会DXサービス会社",
    "companyDesc": "取締役会運営をDX化するSaaSを提供する企業。取締役会管理サービスのFE・BE開発を担当。",
    "role": "フロントエンド/バックエンドエンジニア",
    "period": "2022-03 — 2022-05",
    "teamSize": 5,
    "summary": "",
    "technologies": [
      "TypeScript",
      "React",
      "Tailwind CSS",
      "Storybook",
      "Playwright",
      "Node.js",
      "Express",
      "Prisma",
      "GraphQL"
    ],
    "tasks": [
      {
        "title": "UIコンポーネント実装・Storybook整備（Atomic Design採用）",
        "summary": "UIコンポーネントの発見性・検索性が低い問題を解決するため、StorybookのディレクトリをAtomic Designに寄せる。全UIコンポーネントをStorybookで一覧化し、画面実装の効率を改善。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Tailwind CSS",
          "Storybook"
        ],
        "highlights": [
          "UIコンポーネントの発見性・検索性が低い問題を解決するため、StorybookのディレクトリをAtomic Designに寄せる。全UIコンポーネントをStorybookで一覧化し、画面実装の効率を改善。"
        ]
      },
      {
        "title": "書類作成サポート・書面決議画面の実装とE2Eテスト",
        "summary": "書類作成サポートおよび書面決議画面の詳細実装。Playwright E2Eテストを実装し品質を担保。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "Playwright"
        ],
        "highlights": [
          "書類作成サポートおよび書面決議画面の詳細実装。Playwright E2Eテストを実装し品質を担保。"
        ]
      },
      {
        "title": "日程調整機能のバックエンド実装",
        "summary": "日程調整機能のNode.js/Express/GraphQL/Prismaを用いたバックエンド実装。",
        "difficulty": "medium",
        "technologies": [
          "Node.js",
          "Express",
          "Prisma",
          "GraphQL"
        ],
        "highlights": [
          "日程調整機能のNode.js/Express/GraphQL/Prismaを用いたバックエンド実装。"
        ]
      }
    ]
  },
  {
    "id": "freelance-web-2021",
    "company": "フリーランス",
    "companyDesc": "フリーランスとして複数のSPAホームページ制作案件を受託。サイト制作会社・転職会社・データ分析会社・レストランの4案件。",
    "role": "フロントエンドエンジニア",
    "period": "2021-05 — 2022-03",
    "teamSize": 1,
    "summary": "",
    "technologies": [
      "TypeScript",
      "JavaScript",
      "React",
      "Next.js",
      "Amazon S3"
    ],
    "tasks": [
      {
        "title": "React/Next.jsによるSPAホームページ制作（4案件）",
        "summary": "サイト制作会社・転職会社・データ分析会社・レストランのSPAホームページを制作。フロントエンドアプリとCMS（WordPress/Contentful等）の連携・Vercel/Netlify/S3へのホスティングを担当。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "React",
          "Next.js",
          "Amazon S3"
        ],
        "highlights": [
          "サイト制作会社・転職会社・データ分析会社・レストランのSPAホームページを制作。フロントエンドアプリとCMS（WordPress/Contentful等）の連携・Vercel/Netlify/S3へのホスティングを担当。"
        ]
      }
    ]
  },
  {
    "id": "bitkey-data-2020",
    "company": "株式会社ビットキー",
    "companyDesc": "スマートロック開発を手がけるスタートアップ。社内データレイク・ダッシュボード構築とタウンポータルサイト開発を担当。",
    "role": "データエンジニア・フロントエンドエンジニア",
    "period": "2020-08 — 2021-03",
    "teamSize": 3,
    "summary": "",
    "technologies": [
      "Python",
      "SQL",
      "BigQuery",
      "AWS Lambda",
      "Cloud Functions",
      "pandas",
      "NumPy",
      "Google Data Portal",
      "TypeScript",
      "React",
      "MUI",
      "Storybook"
    ],
    "tasks": [
      {
        "title": "全社共有KPIの定義・策定",
        "summary": "経営・製品・営業・品質・利用状況に関するKPIを整理し、社員全体が共有すべき指標群を定義。チーム横断で知恵を出し合う文化を広めるための指標設計を主導。",
        "difficulty": "high",
        "technologies": [
          "Python",
          "SQL",
          "BigQuery"
        ],
        "highlights": [
          "経営・製品・営業・品質・利用状況に関するKPIを整理し、社員全体が共有すべき指標群を定義。チーム横断で知恵を出し合う文化を広めるための指標設計を主導。"
        ]
      },
      {
        "title": "複数データソースからBigQueryへの集約パイプライン構築",
        "summary": "Amazon Redshift・Amazon Aurora・Salesforce・Cloud Firestoreに散在するデータをBigQueryに集める定期実行処理をAWS Lambda・Cloud Functionsに実装。半構造化データの変形・集計自動化も担当。",
        "difficulty": "high",
        "technologies": [
          "AWS Lambda",
          "Cloud Functions",
          "Python",
          "pandas",
          "NumPy",
          "SQL",
          "BigQuery"
        ],
        "highlights": [
          "Amazon Redshift・Amazon Aurora・Salesforce・Cloud Firestoreに散在するデータをBigQueryに集める定期実行処理をAWS Lambda・Cloud Functionsに実装。半構造化データの変形・集計自動化も担当。"
        ]
      },
      {
        "title": "Google Data Portalダッシュボード設計・実装と社内浸透",
        "summary": "Google Data Portalでダッシュボードを設計・実装し、営業・品質・利用指標を常時可視化。オフィス入口パネル設置・社員ポータル配置・週次ミーティング発表でデータ活用文化を定着。",
        "difficulty": "medium",
        "technologies": [
          "SQL",
          "BigQuery",
          "Google Data Portal"
        ],
        "highlights": [
          "Google Data Portalでダッシュボードを設計・実装し、営業・品質・利用指標を常時可視化。オフィス入口パネル設置・社員ポータル配置・週次ミーティング発表でデータ活用文化を定着。"
        ]
      },
      {
        "title": "タウンポータルサイトのUIコンポーネント実装",
        "summary": "スマートロック採用ニュータウンの入居者間情報共有用タウンポータルサイト。UIデザイナーと相談しながら複数画面共通UIコンポーネントを実装。StorybookでUIカタログを作成。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "React",
          "MUI",
          "Storybook"
        ],
        "highlights": [
          "スマートロック採用ニュータウンの入居者間情報共有用タウンポータルサイト。UIデザイナーと相談しながら複数画面共通UIコンポーネントを実装。StorybookでUIカタログを作成。"
        ]
      }
    ]
  },
  {
    "id": "simplex-banking-2019",
    "company": "シンプレクス株式会社",
    "companyDesc": "金融システム開発を主力とするSIer。大手銀行向けリスク管理システムおよび保険会社向け新規登録アプリの開発・テスト・保守を担当。",
    "role": "フロントエンドエンジニア/テスター/保守運用担当",
    "period": "2019-06 — 2020-06",
    "teamSize": 9,
    "summary": "",
    "technologies": [
      "Java",
      "VBA",
      "Bash",
      "TypeScript",
      "JavaScript",
      "Vue.js"
    ],
    "tasks": [
      {
        "title": "VBAによるJava JSON API連携Excelフロントエンドアプリ開発",
        "summary": "VBAでJava JSON APIと通信してExcel上にデータを表示するアプリを開発。JSONデータの結果に応じて動的にカラムを追加し、各カラムにExcelの数式を埋め込む機能を実装。リーダブルな命名を心がけた。",
        "difficulty": "high",
        "technologies": [
          "Java",
          "VBA",
          "Bash"
        ],
        "highlights": [
          "VBAでJava JSON APIと通信してExcel上にデータを表示するアプリを開発。JSONデータの結果に応じて動的にカラムを追加し、各カラムにExcelの数式を埋め込む機能を実装。リーダブルな命名を心がけた。"
        ]
      },
      {
        "title": "客先テスト・リリース作業・保守運用・顧客対応",
        "summary": "シェルコマンド＆AWSでの客先テスト・リリース作業を担当。顧客からのメール質問対応・エンハンスPJの基本設計・不具合チケット起票・定例での対応確認を主導。",
        "difficulty": "medium",
        "technologies": [
          "Java",
          "Bash"
        ],
        "highlights": [
          "シェルコマンド＆AWSでの客先テスト・リリース作業を担当。顧客からのメール質問対応・エンハンスPJの基本設計・不具合チケット起票・定例での対応確認を主導。"
        ]
      },
      {
        "title": "保険会社向け新規登録アプリのVue.jsフロントエンド実装",
        "summary": "ヘルプチップ・モーダルの詳細仕様を設計者と詰め、全画面の各入力項目に実装。ユーザー入力複数画面のUI実装。業務シナリオテスト・システムテストの実施・管理を担当。",
        "difficulty": "medium",
        "technologies": [
          "TypeScript",
          "JavaScript",
          "Vue.js"
        ],
        "highlights": [
          "ヘルプチップ・モーダルの詳細仕様を設計者と詰め、全画面の各入力項目に実装。ユーザー入力複数画面のUI実装。業務シナリオテスト・システムテストの実施・管理を担当。"
        ]
      }
    ]
  },
  {
    "id": "graph-intern-2018",
    "company": "株式会社グラフ",
    "companyDesc": "データ分析・AI開発を行う企業でのインターン。アパレルECレコメンドエンジン開発・自動車メーカー向けデータ分析・チャットボット開発を担当。",
    "role": "データエンジニア・インターン",
    "period": "2018-01 — 2019-03",
    "teamSize": 2,
    "summary": "",
    "technologies": [
      "Python",
      "pandas",
      "NumPy",
      "SQL",
      "JavaScript",
      "Flask",
      "Amazon S3",
      "Amazon EC2"
    ],
    "tasks": [
      {
        "title": "アパレルECレコメンドエンジンのプロトタイプ開発（3種アルゴリズム）",
        "summary": "トップ画面・商品ページ・カート画面に表示するおすすめ一覧用レコメンドエンジンをプロトタイプ開発。新規顧客・既存顧客・商品ページそれぞれにコンテンツベースフィルタリング・協調フィルタリングを適用し、セレンディピティ性も考慮した設計を実現。",
        "difficulty": "high",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "トップ画面・商品ページ・カート画面に表示するおすすめ一覧用レコメンドエンジンをプロトタイプ開発。新規顧客・既存顧客・商品ページそれぞれにコンテンツベースフィルタリング・協調フィルタリングを適用し、セレンディピティ性も考慮した設計を実現。"
        ]
      },
      {
        "title": "k近傍法による顧客分類・購買状況基礎集計",
        "summary": "アパレルEC経営陣のマーケティング施策検討のため、k近傍法で現顧客を分類し、分類ごとの購買状況（商品カテゴリ別売上等）を基礎集計。",
        "difficulty": "medium",
        "technologies": [
          "Python",
          "pandas",
          "NumPy",
          "SQL"
        ],
        "highlights": [
          "アパレルEC経営陣のマーケティング施策検討のため、k近傍法で現顧客を分類し、分類ごとの購買状況（商品カテゴリ別売上等）を基礎集計。"
        ]
      },
      {
        "title": "デモ用チャットボットのフルスタック開発・デプロイ",
        "summary": "デモ用チャットボットのデザイン仕様決定、画面・API実装（Python/Flask）。アプリケーションをS3・EC2にデプロイ。",
        "difficulty": "medium",
        "technologies": [
          "JavaScript",
          "Flask",
          "Amazon S3",
          "Amazon EC2",
          "Python"
        ],
        "highlights": [
          "デモ用チャットボットのデザイン仕様決定、画面・API実装（Python/Flask）。アプリケーションをS3・EC2にデプロイ。"
        ]
      }
    ]
  }
];
