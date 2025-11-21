import type { ProfileData, Skill, Experience, Education, Project } from '../types';

export const profile: ProfileData = {
  name: 'あなたの名前',
  title: 'フルスタックエンジニア',
  bio: 'Astro、React、TypeScriptを使ったモダンなWeb開発を得意としています。パフォーマンスとユーザー体験を重視したプロダクト作りに情熱を注いでいます。',
  email: 'your.email@example.com',
  github: 'https://github.com/yourusername',
  twitter: 'https://twitter.com/yourusername',
  linkedin: 'https://linkedin.com/in/yourusername',
  location: '東京、日本',
  avatar: '/avatar.jpg',
};

export const skills: Skill[] = [
  // Frontend
  { name: 'React', level: 95, category: 'frontend' },
  { name: 'TypeScript', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'Astro', level: 90, category: 'frontend' },
  { name: 'TailwindCSS', level: 95, category: 'frontend' },
  { name: 'Vue.js', level: 75, category: 'frontend' },

  // Backend
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Python', level: 80, category: 'backend' },
  { name: 'PostgreSQL', level: 75, category: 'backend' },
  { name: 'GraphQL', level: 70, category: 'backend' },

  // DevOps
  { name: 'Docker', level: 80, category: 'devops' },
  { name: 'AWS', level: 70, category: 'devops' },
  { name: 'GitHub Actions', level: 85, category: 'devops' },

  // Design
  { name: 'Figma', level: 80, category: 'design' },
  { name: 'UI/UX Design', level: 75, category: 'design' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'シニアフロントエンドエンジニア',
    company: 'テック株式会社',
    period: '2022年4月 - 現在',
    description: 'React、TypeScript、Next.jsを使用した大規模Webアプリケーションの開発をリード。パフォーマンス改善により、ページロード時間を50%削減。',
    technologies: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'GraphQL'],
  },
  {
    id: '2',
    title: 'フロントエンドエンジニア',
    company: 'スタートアップ Inc.',
    period: '2020年4月 - 2022年3月',
    description: 'Vue.jsとNuxt.jsを使用したEコマースプラットフォームの開発。コンポーネントライブラリの設計と実装を担当。',
    technologies: ['Vue.js', 'Nuxt.js', 'TypeScript', 'Vuetify'],
  },
  {
    id: '3',
    title: 'ジュニアエンジニア',
    company: 'Web制作会社',
    period: '2018年4月 - 2020年3月',
    description: 'HTML/CSS/JavaScriptを使用したコーポレートサイトやランディングページの制作。WordPressのテーマ開発も担当。',
    technologies: ['HTML', 'CSS', 'JavaScript', 'WordPress', 'PHP'],
  },
];

export const education: Education[] = [
  {
    id: '1',
    degree: '情報工学 学士',
    school: '○○大学',
    period: '2014年4月 - 2018年3月',
    description: 'コンピュータサイエンスの基礎、アルゴリズム、データ構造、Web開発を学習',
  },
];

export const projects: Project[] = [
  {
    id: '1',
    title: 'Astro技術ブログ',
    description: 'Astroのアイランドアーキテクチャを活用した高速な技術ブログ。React、shadcn/ui、TailwindCSSを使用。',
    image: '/projects/blog.jpg',
    tags: ['Astro', 'React', 'TailwindCSS', 'TypeScript'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/astro-blog',
    featured: true,
  },
  {
    id: '2',
    title: 'タスク管理アプリ',
    description: 'Next.js 14とApp Routerを使用したモダンなタスク管理アプリケーション。ドラッグ&ドロップ対応。',
    image: '/projects/task-app.jpg',
    tags: ['Next.js', 'React', 'Prisma', 'PostgreSQL'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/task-app',
    featured: true,
  },
  {
    id: '3',
    title: 'UIコンポーネントライブラリ',
    description: 'React + TypeScriptで作成した再利用可能なUIコンポーネント集。Storybookでドキュメント化。',
    image: '/projects/ui-lib.jpg',
    tags: ['React', 'TypeScript', 'Storybook', 'TailwindCSS'],
    githubUrl: 'https://github.com/yourusername/ui-library',
    featured: true,
  },
  {
    id: '4',
    title: 'リアルタイムチャット',
    description: 'WebSocketを使用したリアルタイムチャットアプリケーション。認証機能付き。',
    image: '/projects/chat.jpg',
    tags: ['Node.js', 'Socket.io', 'React', 'MongoDB'],
    demoUrl: 'https://example.com',
    githubUrl: 'https://github.com/yourusername/chat-app',
  },
  {
    id: '5',
    title: 'ポートフォリオサイト',
    description: '3D要素とアニメーションを取り入れたインタラクティブなポートフォリオサイト。',
    image: '/projects/portfolio.jpg',
    tags: ['Three.js', 'React', 'Framer Motion', 'Astro'],
    demoUrl: 'https://example.com',
  },
  {
    id: '6',
    title: 'ECサイトテンプレート',
    description: 'Stripeを統合したEコマースサイトのテンプレート。カート機能、決済機能実装。',
    image: '/projects/ecommerce.jpg',
    tags: ['Next.js', 'Stripe', 'Prisma', 'TailwindCSS'],
    githubUrl: 'https://github.com/yourusername/ecommerce',
  },
];
