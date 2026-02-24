import type { ProfileData, Skill, Experience, Education, Project } from '../types';

export const profile: ProfileData = {
  name: '松熊利樹',
  title: 'Software Engineer',
  bio: '設計で手戻りを防ぎ、コードで即実行する。Web開発7年超のフルスタックエンジニア。10名チームのFEテックリードを経験。東京育ち、バンコク在住。ベジタリアン。昼休みは公園を散歩して日光浴するのが日課。旅行とビーチが好き。数学・会計・法律・哲学など、新しいことを学ぶのが何より好き。',
  email: 'contact@tosh-dot-sh.dev',
  github: 'https://github.com/blueglasses1995',
  linkedin: 'https://linkedin.com/in/toshikimatsukuma',
  location: 'Bangkok, Thailand',
  avatar: '/avatar.jpg',
};

export const skills: Skill[] = [
  // Frontend
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Apollo Client', level: 80, category: 'frontend' },
  { name: 'Next.js', level: 75, category: 'frontend' },
  { name: 'Astro', level: 70, category: 'frontend' },
  { name: 'TailwindCSS', level: 80, category: 'frontend' },
  { name: 'React Hook Form', level: 75, category: 'frontend' },
  { name: 'Storybook', level: 80, category: 'frontend' },

  // Backend
  { name: 'NestJS', level: 75, category: 'backend' },
  { name: 'GraphQL', level: 80, category: 'backend' },
  { name: 'Python', level: 70, category: 'backend' },
  { name: 'FastAPI', level: 65, category: 'backend' },
  { name: 'Celery', level: 65, category: 'backend' },
  { name: 'Node.js', level: 80, category: 'backend' },

  // Database
  { name: 'PostgreSQL', level: 80, category: 'database' },
  { name: 'SQL (Recursive CTE)', level: 75, category: 'database' },
  { name: 'Redis', level: 60, category: 'database' },

  // DevOps
  { name: 'Docker', level: 75, category: 'devops' },
  { name: 'AWS (ECS, Lambda, S3)', level: 70, category: 'devops' },
  { name: 'GitHub Actions', level: 80, category: 'devops' },
  { name: 'GitHub Container Registry', level: 65, category: 'devops' },

  // Testing
  { name: 'Playwright', level: 70, category: 'testing' },
  { name: 'Vitest', level: 70, category: 'testing' },
  { name: 'VRT (storycap + reg-suit)', level: 80, category: 'testing' },
  { name: 'React Testing Library', level: 70, category: 'testing' },
  { name: 'SonarQube', level: 65, category: 'testing' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'バックエンド / インフラエンジニア',
    company: '生成AI翻訳SaaS スタートアップ',
    period: '2025年4月 - 2025年7月',
    description: '翻訳後処理マイクロサービスの設計・実装。9状態の有限状態マシンによるジョブ管理、不可変イベントソーシング、Celery分散タスク処理基盤の構築。Docker Compose + GitHub Container Registryによるコンテナ運用。',
    technologies: ['Python', 'FastAPI', 'Celery', 'Docker', 'PostgreSQL', 'React'],
  },
  {
    id: '2',
    title: '技術調査・アドバイザー',
    company: 'オンライン学習プラットフォーム企業',
    period: '2025年5月 - 2025年7月',
    description: 'レガシーシステムのSonarQube定量分析、NotebookLMを活用したRAG型社内検索基盤の提案、短期拡張PoC構想。経営判断向けスライド資料によりCOO承認を獲得。',
    technologies: ['SonarQube', 'NotebookLM', 'Python', 'React'],
  },
  {
    id: '3',
    title: 'フルスタックエンジニア',
    company: '製造業向け業務アプリSaaS',
    period: '2024年10月 - 2025年3月',
    description: 'RFC5545準拠の繰り返しタスク設計・実装、ロール×リソース×アクション3軸のアクセス制御(RBAC+ReBAC)設計、React Profilerによる描画最適化70%以上削減、Googleカレンダー風UIのフルスクラッチ実装、Service Workerを活用したフィールドレベル逐次保存設計。',
    technologies: ['TypeScript', 'React', 'Apollo Client', 'NestJS', 'GraphQL', 'PostgreSQL'],
  },
  {
    id: '4',
    title: 'FEテックリード',
    company: 'HR系コンサル上場企業 連結子会社',
    period: '2022年10月 - 2024年9月',
    description: '10名チームのFEテックリードとして技術方針策定・仕様策定主導・スキルベース人員配置を実施。動的フォームビルダー(Specification Pattern)、Suspenseダッシュボード、Storybook VRTパイプライン(215ストーリー+49ページの並列実行)を設計・構築。',
    technologies: ['TypeScript', 'React', 'Apollo Client', 'GraphQL', 'Storybook', 'GitHub Actions'],
  },
  {
    id: '5',
    title: 'フリーランスエンジニア',
    company: 'フリーランス / 複数案件',
    period: '2021年5月 - 2022年9月',
    description: 'モバイルオーダーアプリ(LINE LIFF + React Native)、取締役会DXサービス(Next.js)、複数のWeb制作案件にフロントエンド/バックエンドとして従事。',
    technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Firebase'],
  },
  {
    id: '6',
    title: 'データエンジニア / フロントエンド',
    company: '株式会社ビットキー / シンプレクス株式会社',
    period: '2019年6月 - 2021年3月',
    description: 'ビットキーにてデータ基盤構築(BigQuery, GCP)・ダッシュボード開発。シンプレクスにて金融系フロントエンド開発・テスト自動化を担当。',
    technologies: ['Python', 'BigQuery', 'GCP', 'React', 'TypeScript'],
  },
];

export const education: Education[] = [
  {
    id: '1',
    degree: '教養学部 学士',
    school: '東京大学',
    period: '2015年4月 - 2019年3月',
    description: 'ケンブリッジ大学・トロント大学への交換留学。TOEIC 960, IELTS 7.0, HSK 6級取得。',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'tosh.sh',
    description: 'Astroアイランドアーキテクチャ、7言語対応i18n、知識グラフ可視化、AI翻訳パイプラインを備えた技術ブログ。',
    image: '/projects/blog.jpg',
    tags: ['Astro', 'React', 'TypeScript', 'TailwindCSS', 'Cytoscape.js'],
    demoUrl: 'https://tosh.sh',
    featured: true,
  },
  {
    id: '2',
    title: 'Career Pipeline',
    description: 'キャリアデータをSQLiteで構造化管理し、CV自動生成・STAR面接練習・技術レーダーを提供するClaude Code MCPプラグイン。13のスラッシュコマンドと21テーブルのスキーマで職務経歴を構造化。',
    image: '/projects/career-pipeline.jpg',
    tags: ['SQLite', 'TypeScript', 'MCP', 'Claude Code'],
    demoUrl: 'https://career-pipeline-docs.vercel.app',
    githubUrl: 'https://github.com/blueglasses1995/career-pipeline',
    featured: true,
  },
];
