import type { SupportedLocale, Experience, Education, Project } from '../types';

interface LocalizedProfile {
  name: string;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
}

const profileData: Record<SupportedLocale, LocalizedProfile> = {
  ja: {
    name: '松熊利樹',
    experiences: [
      {
        id: '1',
        title: 'バックエンド / インフラエンジニア',
        company: '生成AI翻訳SaaS スタートアップ',
        period: '2025年4月 - 2025年7月',
        description:
          '翻訳後処理マイクロサービスの設計・実装。9状態の有限状態マシンによるジョブ管理、不可変イベントソーシング、Celery分散タスク処理基盤の構築。Docker Compose + GitHub Container Registryによるコンテナ運用。',
        technologies: ['Python', 'FastAPI', 'Celery', 'Docker', 'PostgreSQL', 'React'],
      },
      {
        id: '2',
        title: '技術調査・アドバイザー',
        company: 'オンライン学習プラットフォーム企業',
        period: '2025年5月 - 2025年7月',
        description:
          'レガシーシステムのSonarQube定量分析、NotebookLMを活用したRAG型社内検索基盤の提案、短期拡張PoC構想。経営判断向けスライド資料によりCOO承認を獲得。',
        technologies: ['SonarQube', 'NotebookLM', 'Python', 'React'],
      },
      {
        id: '3',
        title: 'フルスタックエンジニア',
        company: '製造業向け業務アプリSaaS',
        period: '2024年10月 - 2025年3月',
        description:
          'RFC5545準拠の繰り返しタスク設計・実装、ロール×リソース×アクション3軸のアクセス制御(RBAC+ReBAC)設計、React Profilerによる描画最適化70%以上削減、Googleカレンダー風UIのフルスクラッチ実装、Service Workerを活用したフィールドレベル逐次保存設計。',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'NestJS', 'GraphQL', 'PostgreSQL'],
      },
      {
        id: '4',
        title: 'FEテックリード',
        company: 'HR系コンサル上場企業 連結子会社',
        period: '2022年10月 - 2024年9月',
        description:
          '10名チームのFEテックリードとして技術方針策定・仕様策定主導・スキルベース人員配置を実施。動的フォームビルダー(Specification Pattern)、Suspenseダッシュボード、Storybook VRTパイプライン(215ストーリー+49ページの並列実行)を設計・構築。',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'GraphQL', 'Storybook', 'GitHub Actions'],
      },
      {
        id: '5',
        title: 'フリーランスエンジニア',
        company: 'フリーランス / 複数案件',
        period: '2021年5月 - 2022年9月',
        description:
          'モバイルオーダーアプリ(LINE LIFF + React Native)、取締役会DXサービス(Next.js)、複数のWeb制作案件にフロントエンド/バックエンドとして従事。',
        technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Firebase'],
      },
      {
        id: '6',
        title: 'データエンジニア / フロントエンド',
        company: '株式会社ビットキー / シンプレクス株式会社',
        period: '2019年6月 - 2021年3月',
        description:
          'ビットキーにてデータ基盤構築(BigQuery, GCP)・ダッシュボード開発。シンプレクスにて金融系フロントエンド開発・テスト自動化を担当。',
        technologies: ['Python', 'BigQuery', 'GCP', 'React', 'TypeScript'],
      },
    ],
    education: [
      {
        id: '1',
        degree: '教養学部 学士',
        school: '東京大学',
        period: '2015年4月 - 2019年3月',
        description: 'ケンブリッジ大学・トロント大学への交換留学。TOEIC 960, IELTS 7.0, HSK 6級取得。',
      },
    ],
    projects: [
      {
        id: '1',
        title: 'tosh.sh',
        description:
          'Astroアイランドアーキテクチャ、7言語対応i18n、知識グラフ可視化、AI翻訳パイプラインを備えた技術ブログ。',
        image: '/projects/blog.jpg',
        tags: ['Astro', 'React', 'TypeScript', 'TailwindCSS', 'Cytoscape.js'],
        demoUrl: 'https://tosh.sh',
        featured: true,
      },
      {
        id: '2',
        title: 'Career Pipeline',
        description:
          'キャリアデータをSQLiteで構造化管理し、CV自動生成・STAR面接練習・技術レーダーを提供するClaude Code MCPプラグイン。13のスラッシュコマンドと21テーブルのスキーマで職務経歴を構造化。',
        image: '/projects/career-pipeline.jpg',
        tags: ['SQLite', 'TypeScript', 'MCP', 'Claude Code'],
        demoUrl: 'https://career-pipeline-docs.vercel.app',
        githubUrl: 'https://github.com/blueglasses1995/career-pipeline',
        featured: true,
      },
    ],
  },

  en: {
    name: 'Toshiki Matsukuma',
    experiences: [
      {
        id: '1',
        title: 'Backend / Infrastructure Engineer',
        company: 'Generative AI Translation SaaS Startup',
        period: 'Apr 2025 - Jul 2025',
        description:
          'Designed and implemented a post-translation processing microservice. Built a 9-state finite state machine for job management, immutable event sourcing, and a Celery distributed task processing infrastructure. Container operations with Docker Compose + GitHub Container Registry.',
        technologies: ['Python', 'FastAPI', 'Celery', 'Docker', 'PostgreSQL', 'React'],
      },
      {
        id: '2',
        title: 'Technical Research & Advisor',
        company: 'Online Learning Platform Company',
        period: 'May 2025 - Jul 2025',
        description:
          'Conducted quantitative analysis of a legacy system using SonarQube, proposed a RAG-based internal search platform leveraging NotebookLM, and conceptualized short-term extension PoC plans. Secured COO approval through executive-oriented presentation materials.',
        technologies: ['SonarQube', 'NotebookLM', 'Python', 'React'],
      },
      {
        id: '3',
        title: 'Full-Stack Engineer',
        company: 'Manufacturing Industry Business App SaaS',
        period: 'Oct 2024 - Mar 2025',
        description:
          'Designed and implemented RFC5545-compliant recurring task functionality, a 3-axis access control system combining Role x Resource x Action (RBAC+ReBAC), achieved over 70% rendering optimization using React Profiler, built a Google Calendar-style UI from scratch, and designed a field-level incremental save mechanism using Service Worker.',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'NestJS', 'GraphQL', 'PostgreSQL'],
      },
      {
        id: '4',
        title: 'Frontend Tech Lead',
        company: 'Subsidiary of a Listed HR Consulting Firm',
        period: 'Oct 2022 - Sep 2024',
        description:
          'Served as frontend tech lead for a 10-member team, driving technical strategy, specification design, and skill-based staffing. Designed and built a dynamic form builder (Specification Pattern), a Suspense-based dashboard, and a Storybook VRT pipeline (parallel execution across 215 stories + 49 pages).',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'GraphQL', 'Storybook', 'GitHub Actions'],
      },
      {
        id: '5',
        title: 'Freelance Engineer',
        company: 'Freelance / Multiple Projects',
        period: 'May 2021 - Sep 2022',
        description:
          'Worked as a frontend/backend engineer on a mobile order app (LINE LIFF + React Native), a board of directors DX service (Next.js), and multiple web development projects.',
        technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Firebase'],
      },
      {
        id: '6',
        title: 'Data Engineer / Frontend Developer',
        company: 'Bitkey Inc. / Simplex Inc.',
        period: 'Jun 2019 - Mar 2021',
        description:
          'At Bitkey, built data infrastructure (BigQuery, GCP) and developed dashboards. At Simplex, handled financial frontend development and test automation.',
        technologies: ['Python', 'BigQuery', 'GCP', 'React', 'TypeScript'],
      },
    ],
    education: [
      {
        id: '1',
        degree: 'BA in Liberal Arts',
        school: 'University of Tokyo',
        period: 'Apr 2015 - Mar 2019',
        description:
          'Exchange programs at the University of Cambridge and the University of Toronto. Achieved TOEIC 960, IELTS 7.0, and HSK Level 6.',
      },
    ],
    projects: [
      {
        id: '1',
        title: 'tosh.sh',
        description:
          'A technical blog featuring Astro island architecture, 7-language i18n support, knowledge graph visualization, and an AI translation pipeline.',
        image: '/projects/blog.jpg',
        tags: ['Astro', 'React', 'TypeScript', 'TailwindCSS', 'Cytoscape.js'],
        demoUrl: 'https://tosh.sh',
        featured: true,
      },
      {
        id: '2',
        title: 'Career Pipeline',
        description:
          'A Claude Code MCP plugin that manages career data in a structured SQLite database, providing automated CV generation, STAR interview practice, and a tech radar. Structures work history with 13 slash commands and a 21-table schema.',
        image: '/projects/career-pipeline.jpg',
        tags: ['SQLite', 'TypeScript', 'MCP', 'Claude Code'],
        demoUrl: 'https://career-pipeline-docs.vercel.app',
        githubUrl: 'https://github.com/blueglasses1995/career-pipeline',
        featured: true,
      },
    ],
  },

  zh: {
    name: '松熊利树',
    experiences: [
      {
        id: '1',
        title: '后端 / 基础设施工程师',
        company: '生成式AI翻译SaaS初创公司',
        period: '2025年4月 - 2025年7月',
        description:
          '设计并实现翻译后处理微服务。通过9状态有限状态机进行作业管理、不可变事件溯源、构建Celery分布式任务处理基础设施。基于Docker Compose + GitHub Container Registry的容器运维。',
        technologies: ['Python', 'FastAPI', 'Celery', 'Docker', 'PostgreSQL', 'React'],
      },
      {
        id: '2',
        title: '技术调研与顾问',
        company: '在线学习平台企业',
        period: '2025年5月 - 2025年7月',
        description:
          '使用SonarQube对遗留系统进行定量分析，提出基于NotebookLM的RAG型内部搜索平台方案，构想短期扩展PoC计划。通过面向经营层的演示资料获得COO批准。',
        technologies: ['SonarQube', 'NotebookLM', 'Python', 'React'],
      },
      {
        id: '3',
        title: '全栈工程师',
        company: '制造业业务应用SaaS',
        period: '2024年10月 - 2025年3月',
        description:
          '设计并实现RFC5545标准的重复任务功能，设计角色x资源x操作三轴访问控制(RBAC+ReBAC)，使用React Profiler实现70%以上的渲染优化，从零构建Google日历风格的UI，设计基于Service Worker的字段级增量保存机制。',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'NestJS', 'GraphQL', 'PostgreSQL'],
      },
      {
        id: '4',
        title: '前端技术负责人',
        company: 'HR咨询上市企业合并子公司',
        period: '2022年10月 - 2024年9月',
        description:
          '作为10人团队的前端技术负责人，主导技术方针制定、规格设计和基于技能的人员配置。设计并构建动态表单构建器(Specification Pattern)、Suspense仪表盘、Storybook VRT流水线(215个故事+49个页面的并行执行)。',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'GraphQL', 'Storybook', 'GitHub Actions'],
      },
      {
        id: '5',
        title: '自由职业工程师',
        company: '自由职业 / 多个项目',
        period: '2021年5月 - 2022年9月',
        description:
          '作为前端/后端工程师参与移动点餐应用(LINE LIFF + React Native)、董事会DX服务(Next.js)以及多个Web开发项目。',
        technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Firebase'],
      },
      {
        id: '6',
        title: '数据工程师 / 前端开发',
        company: 'Bitkey Inc. / Simplex Inc.',
        period: '2019年6月 - 2021年3月',
        description:
          '在Bitkey构建数据基础设施(BigQuery, GCP)并开发仪表盘。在Simplex负责金融前端开发和测试自动化。',
        technologies: ['Python', 'BigQuery', 'GCP', 'React', 'TypeScript'],
      },
    ],
    education: [
      {
        id: '1',
        degree: '文科学士',
        school: '东京大学',
        period: '2015年4月 - 2019年3月',
        description:
          '剑桥大学与多伦多大学交换留学。取得TOEIC 960、IELTS 7.0、HSK 6级。',
      },
    ],
    projects: [
      {
        id: '1',
        title: 'tosh.sh',
        description:
          '采用Astro岛屿架构、支持7种语言i18n、知识图谱可视化和AI翻译流水线的技术博客。',
        image: '/projects/blog.jpg',
        tags: ['Astro', 'React', 'TypeScript', 'TailwindCSS', 'Cytoscape.js'],
        demoUrl: 'https://tosh.sh',
        featured: true,
      },
      {
        id: '2',
        title: 'Career Pipeline',
        description:
          '使用SQLite结构化管理职业数据，提供CV自动生成、STAR面试练习和技术雷达的Claude Code MCP插件。通过13个斜杠命令和21张表的模式结构化工作经历。',
        image: '/projects/career-pipeline.jpg',
        tags: ['SQLite', 'TypeScript', 'MCP', 'Claude Code'],
        demoUrl: 'https://career-pipeline-docs.vercel.app',
        githubUrl: 'https://github.com/blueglasses1995/career-pipeline',
        featured: true,
      },
    ],
  },

  th: {
    name: 'โทชิกิ มัตสึคุมะ',
    experiences: [
      {
        id: '1',
        title: 'วิศวกรแบ็กเอนด์ / โครงสร้างพื้นฐาน',
        company: 'สตาร์ทอัพ SaaS แปลภาษาด้วย Generative AI',
        period: 'เม.ย. 2025 - ก.ค. 2025',
        description:
          'ออกแบบและพัฒนาไมโครเซอร์วิสสำหรับการประมวลผลหลังการแปล สร้างระบบจัดการงานด้วย Finite State Machine 9 สถานะ, Immutable Event Sourcing และโครงสร้างพื้นฐานการประมวลผลงานแบบกระจายด้วย Celery การดำเนินงานคอนเทนเนอร์ด้วย Docker Compose + GitHub Container Registry',
        technologies: ['Python', 'FastAPI', 'Celery', 'Docker', 'PostgreSQL', 'React'],
      },
      {
        id: '2',
        title: 'ที่ปรึกษาและนักวิจัยด้านเทคนิค',
        company: 'บริษัทแพลตฟอร์มการเรียนรู้ออนไลน์',
        period: 'พ.ค. 2025 - ก.ค. 2025',
        description:
          'วิเคราะห์เชิงปริมาณของระบบเดิมด้วย SonarQube เสนอแพลตฟอร์มค้นหาภายในองค์กรแบบ RAG โดยใช้ NotebookLM และวางแผน PoC สำหรับการขยายระบบระยะสั้น ได้รับการอนุมัติจาก COO ผ่านเอกสารนำเสนอสำหรับผู้บริหาร',
        technologies: ['SonarQube', 'NotebookLM', 'Python', 'React'],
      },
      {
        id: '3',
        title: 'วิศวกรฟูลสแตก',
        company: 'SaaS แอปพลิเคชันธุรกิจสำหรับอุตสาหกรรมการผลิต',
        period: 'ต.ค. 2024 - มี.ค. 2025',
        description:
          'ออกแบบและพัฒนาฟังก์ชันงานซ้ำตามมาตรฐาน RFC5545 ออกแบบระบบควบคุมการเข้าถึง 3 แกน Role x Resource x Action (RBAC+ReBAC) เพิ่มประสิทธิภาพการเรนเดอร์มากกว่า 70% ด้วย React Profiler สร้าง UI สไตล์ Google Calendar ตั้งแต่เริ่มต้น และออกแบบกลไกการบันทึกข้อมูลแบบค่อยเป็นค่อยไประดับฟิลด์ด้วย Service Worker',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'NestJS', 'GraphQL', 'PostgreSQL'],
      },
      {
        id: '4',
        title: 'หัวหน้าทีมฟรอนต์เอนด์',
        company: 'บริษัทลูกของบริษัทที่ปรึกษา HR จดทะเบียนในตลาดหลักทรัพย์',
        period: 'ต.ค. 2022 - ก.ย. 2024',
        description:
          'ดำรงตำแหน่งหัวหน้าทีมฟรอนต์เอนด์ในทีม 10 คน นำการกำหนดทิศทางเทคนิค การออกแบบสเปค และการจัดสรรบุคลากรตามทักษะ ออกแบบและสร้าง Dynamic Form Builder (Specification Pattern), Suspense Dashboard และ Storybook VRT Pipeline (การประมวลผลแบบขนาน 215 สตอรี่ + 49 หน้า)',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'GraphQL', 'Storybook', 'GitHub Actions'],
      },
      {
        id: '5',
        title: 'วิศวกรฟรีแลนซ์',
        company: 'ฟรีแลนซ์ / หลายโปรเจกต์',
        period: 'พ.ค. 2021 - ก.ย. 2022',
        description:
          'ทำงานเป็นวิศวกรฟรอนต์เอนด์/แบ็กเอนด์ในแอปสั่งอาหารผ่านมือถือ (LINE LIFF + React Native) บริการ DX สำหรับคณะกรรมการบริหาร (Next.js) และโปรเจกต์พัฒนาเว็บหลายรายการ',
        technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Firebase'],
      },
      {
        id: '6',
        title: 'วิศวกรข้อมูล / นักพัฒนาฟรอนต์เอนด์',
        company: 'Bitkey Inc. / Simplex Inc.',
        period: 'มิ.ย. 2019 - มี.ค. 2021',
        description:
          'ที่ Bitkey สร้างโครงสร้างพื้นฐานข้อมูล (BigQuery, GCP) และพัฒนาแดชบอร์ด ที่ Simplex รับผิดชอบการพัฒนาฟรอนต์เอนด์ด้านการเงินและระบบทดสอบอัตโนมัติ',
        technologies: ['Python', 'BigQuery', 'GCP', 'React', 'TypeScript'],
      },
    ],
    education: [
      {
        id: '1',
        degree: 'ศิลปศาสตรบัณฑิต สาขาศิลปศาสตร์',
        school: 'มหาวิทยาลัยโตเกียว',
        period: 'เม.ย. 2015 - มี.ค. 2019',
        description:
          'โปรแกรมแลกเปลี่ยนที่มหาวิทยาลัยเคมบริดจ์และมหาวิทยาลัยโตรอนโต ได้รับ TOEIC 960, IELTS 7.0 และ HSK ระดับ 6',
      },
    ],
    projects: [
      {
        id: '1',
        title: 'tosh.sh',
        description:
          'บล็อกเทคนิคที่ใช้สถาปัตยกรรม Astro Island รองรับ i18n 7 ภาษา การแสดงผลกราฟความรู้ และไปป์ไลน์การแปลด้วย AI',
        image: '/projects/blog.jpg',
        tags: ['Astro', 'React', 'TypeScript', 'TailwindCSS', 'Cytoscape.js'],
        demoUrl: 'https://tosh.sh',
        featured: true,
      },
      {
        id: '2',
        title: 'Career Pipeline',
        description:
          'ปลั๊กอิน Claude Code MCP ที่จัดการข้อมูลอาชีพแบบมีโครงสร้างใน SQLite ให้บริการสร้าง CV อัตโนมัติ ฝึกสัมภาษณ์แบบ STAR และเรดาร์เทคโนโลยี จัดโครงสร้างประวัติการทำงานด้วย 13 คำสั่งสแลชและสคีมา 21 ตาราง',
        image: '/projects/career-pipeline.jpg',
        tags: ['SQLite', 'TypeScript', 'MCP', 'Claude Code'],
        demoUrl: 'https://career-pipeline-docs.vercel.app',
        githubUrl: 'https://github.com/blueglasses1995/career-pipeline',
        featured: true,
      },
    ],
  },

  de: {
    name: 'Toshiki Matsukuma',
    experiences: [
      {
        id: '1',
        title: 'Backend- / Infrastruktur-Ingenieur',
        company: 'Generative-AI-Übersetzungs-SaaS-Startup',
        period: 'Apr. 2025 - Jul. 2025',
        description:
          'Entwurf und Implementierung eines Nachbearbeitungs-Microservices für Übersetzungen. Aufbau eines Jobmanagements mit 9-Zustands-Finite-State-Machine, unveränderlichem Event Sourcing und einer verteilten Celery-Task-Verarbeitungsinfrastruktur. Container-Betrieb mit Docker Compose + GitHub Container Registry.',
        technologies: ['Python', 'FastAPI', 'Celery', 'Docker', 'PostgreSQL', 'React'],
      },
      {
        id: '2',
        title: 'Technischer Berater & Analyst',
        company: 'Online-Lernplattform-Unternehmen',
        period: 'Mai 2025 - Jul. 2025',
        description:
          'Quantitative Analyse eines Legacy-Systems mit SonarQube, Vorschlag einer RAG-basierten internen Suchplattform unter Nutzung von NotebookLM und Konzeption eines kurzfristigen Erweiterungs-PoC. Einholung der COO-Genehmigung durch führungsorientierte Präsentationsunterlagen.',
        technologies: ['SonarQube', 'NotebookLM', 'Python', 'React'],
      },
      {
        id: '3',
        title: 'Full-Stack-Ingenieur',
        company: 'SaaS für Geschäftsanwendungen in der Fertigungsindustrie',
        period: 'Okt. 2024 - März 2025',
        description:
          'Entwurf und Implementierung einer RFC5545-konformen wiederkehrenden Aufgabenfunktion, Entwurf einer 3-Achsen-Zugriffskontrolle mit Rolle x Ressource x Aktion (RBAC+ReBAC), über 70 % Rendering-Optimierung mittels React Profiler, vollständige Eigenentwicklung einer Google-Calendar-ähnlichen Benutzeroberfläche und Entwurf eines feldbasierten inkrementellen Speichermechanismus mit Service Worker.',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'NestJS', 'GraphQL', 'PostgreSQL'],
      },
      {
        id: '4',
        title: 'Frontend Tech Lead',
        company: 'Tochtergesellschaft eines börsennotierten HR-Beratungsunternehmens',
        period: 'Okt. 2022 - Sep. 2024',
        description:
          'Frontend Tech Lead eines 10-köpfigen Teams mit Verantwortung für technische Strategiefestlegung, Spezifikationsdesign und kompetenzbasierte Personalplanung. Entwurf und Aufbau eines dynamischen Formular-Builders (Specification Pattern), eines Suspense-Dashboards und einer Storybook-VRT-Pipeline (parallele Ausführung von 215 Stories + 49 Seiten).',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'GraphQL', 'Storybook', 'GitHub Actions'],
      },
      {
        id: '5',
        title: 'Freiberuflicher Ingenieur',
        company: 'Freiberuflich / Mehrere Projekte',
        period: 'Mai 2021 - Sep. 2022',
        description:
          'Tätigkeit als Frontend-/Backend-Ingenieur für eine Mobile-Order-App (LINE LIFF + React Native), einen Vorstandssitzungs-DX-Service (Next.js) und mehrere Webentwicklungsprojekte.',
        technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Firebase'],
      },
      {
        id: '6',
        title: 'Dateningenieur / Frontend-Entwickler',
        company: 'Bitkey Inc. / Simplex Inc.',
        period: 'Jun. 2019 - März 2021',
        description:
          'Bei Bitkey: Aufbau der Dateninfrastruktur (BigQuery, GCP) und Dashboard-Entwicklung. Bei Simplex: Entwicklung von Finanz-Frontends und Testautomatisierung.',
        technologies: ['Python', 'BigQuery', 'GCP', 'React', 'TypeScript'],
      },
    ],
    education: [
      {
        id: '1',
        degree: 'Bachelor of Arts in Geisteswissenschaften',
        school: 'Universität Tokio',
        period: 'Apr. 2015 - März 2019',
        description:
          'Austauschprogramme an der University of Cambridge und der University of Toronto. TOEIC 960, IELTS 7.0 und HSK Stufe 6 erworben.',
      },
    ],
    projects: [
      {
        id: '1',
        title: 'tosh.sh',
        description:
          'Ein technischer Blog mit Astro-Island-Architektur, 7-sprachiger i18n-Unterstützung, Wissensgraph-Visualisierung und einer KI-Übersetzungspipeline.',
        image: '/projects/blog.jpg',
        tags: ['Astro', 'React', 'TypeScript', 'TailwindCSS', 'Cytoscape.js'],
        demoUrl: 'https://tosh.sh',
        featured: true,
      },
      {
        id: '2',
        title: 'Career Pipeline',
        description:
          'Ein Claude Code MCP-Plugin, das Karrieredaten strukturiert in SQLite verwaltet und automatische CV-Generierung, STAR-Interview-Übungen und ein Tech-Radar bereitstellt. Strukturierung des Berufswerdegangs mit 13 Slash-Befehlen und einem 21-Tabellen-Schema.',
        image: '/projects/career-pipeline.jpg',
        tags: ['SQLite', 'TypeScript', 'MCP', 'Claude Code'],
        demoUrl: 'https://career-pipeline-docs.vercel.app',
        githubUrl: 'https://github.com/blueglasses1995/career-pipeline',
        featured: true,
      },
    ],
  },

  fr: {
    name: 'Toshiki Matsukuma',
    experiences: [
      {
        id: '1',
        title: 'Ingénieur Backend / Infrastructure',
        company: 'Startup SaaS de traduction par IA générative',
        period: 'Avr. 2025 - Juil. 2025',
        description:
          'Conception et implémentation d\'un microservice de post-traitement de traduction. Construction d\'un système de gestion de tâches par machine à états finis à 9 états, event sourcing immuable et infrastructure de traitement distribué de tâches Celery. Exploitation de conteneurs avec Docker Compose + GitHub Container Registry.',
        technologies: ['Python', 'FastAPI', 'Celery', 'Docker', 'PostgreSQL', 'React'],
      },
      {
        id: '2',
        title: 'Consultant technique & Analyste',
        company: 'Entreprise de plateforme d\'apprentissage en ligne',
        period: 'Mai 2025 - Juil. 2025',
        description:
          'Analyse quantitative d\'un système legacy avec SonarQube, proposition d\'une plateforme de recherche interne de type RAG utilisant NotebookLM, et conception d\'un PoC d\'extension à court terme. Obtention de l\'approbation du COO grâce à des supports de présentation destinés à la direction.',
        technologies: ['SonarQube', 'NotebookLM', 'Python', 'React'],
      },
      {
        id: '3',
        title: 'Ingénieur Full-Stack',
        company: 'SaaS d\'applications métier pour l\'industrie manufacturière',
        period: 'Oct. 2024 - Mars 2025',
        description:
          'Conception et implémentation de fonctionnalités de tâches récurrentes conformes à RFC5545, conception d\'un contrôle d\'accès à 3 axes Rôle x Ressource x Action (RBAC+ReBAC), optimisation du rendu de plus de 70 % avec React Profiler, développement complet d\'une interface utilisateur style Google Calendar, et conception d\'un mécanisme de sauvegarde incrémentielle au niveau des champs avec Service Worker.',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'NestJS', 'GraphQL', 'PostgreSQL'],
      },
      {
        id: '4',
        title: 'Tech Lead Frontend',
        company: 'Filiale d\'un cabinet de conseil RH coté en bourse',
        period: 'Oct. 2022 - Sep. 2024',
        description:
          'Tech Lead frontend d\'une équipe de 10 personnes, pilotant la stratégie technique, la conception des spécifications et l\'affectation du personnel basée sur les compétences. Conception et construction d\'un générateur de formulaires dynamiques (Specification Pattern), d\'un tableau de bord Suspense et d\'un pipeline VRT Storybook (exécution parallèle de 215 stories + 49 pages).',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'GraphQL', 'Storybook', 'GitHub Actions'],
      },
      {
        id: '5',
        title: 'Ingénieur freelance',
        company: 'Freelance / Projets multiples',
        period: 'Mai 2021 - Sep. 2022',
        description:
          'Intervention en tant qu\'ingénieur frontend/backend sur une application de commande mobile (LINE LIFF + React Native), un service DX pour conseil d\'administration (Next.js) et plusieurs projets de développement web.',
        technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Firebase'],
      },
      {
        id: '6',
        title: 'Ingénieur données / Développeur Frontend',
        company: 'Bitkey Inc. / Simplex Inc.',
        period: 'Juin 2019 - Mars 2021',
        description:
          'Chez Bitkey, construction de l\'infrastructure de données (BigQuery, GCP) et développement de tableaux de bord. Chez Simplex, développement frontend dans le secteur financier et automatisation des tests.',
        technologies: ['Python', 'BigQuery', 'GCP', 'React', 'TypeScript'],
      },
    ],
    education: [
      {
        id: '1',
        degree: 'Licence en Arts libéraux',
        school: 'Université de Tokyo',
        period: 'Avr. 2015 - Mars 2019',
        description:
          'Programmes d\'échange à l\'Université de Cambridge et à l\'Université de Toronto. Obtention du TOEIC 960, IELTS 7.0 et HSK niveau 6.',
      },
    ],
    projects: [
      {
        id: '1',
        title: 'tosh.sh',
        description:
          'Un blog technique avec architecture Astro Island, support i18n en 7 langues, visualisation de graphe de connaissances et pipeline de traduction par IA.',
        image: '/projects/blog.jpg',
        tags: ['Astro', 'React', 'TypeScript', 'TailwindCSS', 'Cytoscape.js'],
        demoUrl: 'https://tosh.sh',
        featured: true,
      },
      {
        id: '2',
        title: 'Career Pipeline',
        description:
          'Un plugin Claude Code MCP qui gère les données de carrière de manière structurée dans SQLite, offrant la génération automatique de CV, la pratique d\'entretiens STAR et un radar technologique. Structuration du parcours professionnel avec 13 commandes slash et un schéma de 21 tables.',
        image: '/projects/career-pipeline.jpg',
        tags: ['SQLite', 'TypeScript', 'MCP', 'Claude Code'],
        demoUrl: 'https://career-pipeline-docs.vercel.app',
        githubUrl: 'https://github.com/blueglasses1995/career-pipeline',
        featured: true,
      },
    ],
  },

  es: {
    name: 'Toshiki Matsukuma',
    experiences: [
      {
        id: '1',
        title: 'Ingeniero Backend / Infraestructura',
        company: 'Startup SaaS de traducción con IA generativa',
        period: 'Abr. 2025 - Jul. 2025',
        description:
          'Diseño e implementación de un microservicio de posprocesamiento de traducciones. Construcción de gestión de tareas mediante máquina de estados finitos de 9 estados, event sourcing inmutable e infraestructura de procesamiento distribuido de tareas con Celery. Operaciones de contenedores con Docker Compose + GitHub Container Registry.',
        technologies: ['Python', 'FastAPI', 'Celery', 'Docker', 'PostgreSQL', 'React'],
      },
      {
        id: '2',
        title: 'Consultor técnico y Analista',
        company: 'Empresa de plataforma de aprendizaje en línea',
        period: 'May. 2025 - Jul. 2025',
        description:
          'Análisis cuantitativo de un sistema legacy con SonarQube, propuesta de una plataforma de búsqueda interna tipo RAG utilizando NotebookLM y conceptualización de un PoC de extensión a corto plazo. Obtención de la aprobación del COO mediante materiales de presentación orientados a la dirección.',
        technologies: ['SonarQube', 'NotebookLM', 'Python', 'React'],
      },
      {
        id: '3',
        title: 'Ingeniero Full-Stack',
        company: 'SaaS de aplicaciones empresariales para la industria manufacturera',
        period: 'Oct. 2024 - Mar. 2025',
        description:
          'Diseño e implementación de funcionalidad de tareas recurrentes conforme a RFC5545, diseño de control de acceso de 3 ejes Rol x Recurso x Acción (RBAC+ReBAC), optimización de renderizado superior al 70% con React Profiler, desarrollo completo de una interfaz de usuario estilo Google Calendar y diseño de un mecanismo de guardado incremental a nivel de campo con Service Worker.',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'NestJS', 'GraphQL', 'PostgreSQL'],
      },
      {
        id: '4',
        title: 'Tech Lead Frontend',
        company: 'Filial de una consultora de RRHH cotizada en bolsa',
        period: 'Oct. 2022 - Sep. 2024',
        description:
          'Tech Lead frontend de un equipo de 10 personas, liderando la estrategia técnica, el diseño de especificaciones y la asignación de personal basada en competencias. Diseño y construcción de un constructor de formularios dinámicos (Specification Pattern), un dashboard Suspense y un pipeline VRT de Storybook (ejecución paralela de 215 stories + 49 páginas).',
        technologies: ['TypeScript', 'React', 'Apollo Client', 'GraphQL', 'Storybook', 'GitHub Actions'],
      },
      {
        id: '5',
        title: 'Ingeniero freelance',
        company: 'Freelance / Múltiples proyectos',
        period: 'May. 2021 - Sep. 2022',
        description:
          'Trabajo como ingeniero frontend/backend en una aplicación de pedidos móviles (LINE LIFF + React Native), un servicio DX para juntas directivas (Next.js) y múltiples proyectos de desarrollo web.',
        technologies: ['React', 'Next.js', 'React Native', 'TypeScript', 'Firebase'],
      },
      {
        id: '6',
        title: 'Ingeniero de datos / Desarrollador Frontend',
        company: 'Bitkey Inc. / Simplex Inc.',
        period: 'Jun. 2019 - Mar. 2021',
        description:
          'En Bitkey, construcción de infraestructura de datos (BigQuery, GCP) y desarrollo de dashboards. En Simplex, desarrollo frontend financiero y automatización de pruebas.',
        technologies: ['Python', 'BigQuery', 'GCP', 'React', 'TypeScript'],
      },
    ],
    education: [
      {
        id: '1',
        degree: 'Licenciatura en Artes Liberales',
        school: 'Universidad de Tokio',
        period: 'Abr. 2015 - Mar. 2019',
        description:
          'Programas de intercambio en la Universidad de Cambridge y la Universidad de Toronto. Obtención de TOEIC 960, IELTS 7.0 y HSK nivel 6.',
      },
    ],
    projects: [
      {
        id: '1',
        title: 'tosh.sh',
        description:
          'Un blog técnico con arquitectura Astro Island, soporte i18n en 7 idiomas, visualización de grafos de conocimiento y pipeline de traducción con IA.',
        image: '/projects/blog.jpg',
        tags: ['Astro', 'React', 'TypeScript', 'TailwindCSS', 'Cytoscape.js'],
        demoUrl: 'https://tosh.sh',
        featured: true,
      },
      {
        id: '2',
        title: 'Career Pipeline',
        description:
          'Un plugin Claude Code MCP que gestiona datos de carrera de forma estructurada en SQLite, proporcionando generación automática de CV, práctica de entrevistas STAR y un radar tecnológico. Estructuración del historial laboral con 13 comandos slash y un esquema de 21 tablas.',
        image: '/projects/career-pipeline.jpg',
        tags: ['SQLite', 'TypeScript', 'MCP', 'Claude Code'],
        demoUrl: 'https://career-pipeline-docs.vercel.app',
        githubUrl: 'https://github.com/blueglasses1995/career-pipeline',
        featured: true,
      },
    ],
  },
};

export function getLocalizedProfile(locale: SupportedLocale): LocalizedProfile {
  return profileData[locale] || profileData.ja;
}
