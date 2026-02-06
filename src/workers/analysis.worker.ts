// Web Worker for article text analysis

interface AnalysisMessage {
  text: string;
}

interface AnalysisResponse {
  wordCount: number;
  readingTime: number;
  suggestedTags: string[];
  similarArticles: Array<{ slug: string; title: string; similarity: number }>;
}

const TECH_KEYWORDS: Record<string, string> = {
  react: 'React',
  astro: 'Astro',
  typescript: 'TypeScript',
  javascript: 'JavaScript',
  css: 'CSS',
  tailwind: 'Tailwind CSS',
  'tailwind css': 'Tailwind CSS',
  'next.js': 'Next.js',
  nextjs: 'Next.js',
  node: 'Node.js',
  'node.js': 'Node.js',
  python: 'Python',
  rust: 'Rust',
  go: 'Go',
  docker: 'Docker',
  kubernetes: 'Kubernetes',
  graphql: 'GraphQL',
  'rest api': 'REST API',
  api: 'API',
  html: 'HTML',
  svelte: 'Svelte',
  vue: 'Vue',
  angular: 'Angular',
  webpack: 'Webpack',
  vite: 'Vite',
  markdown: 'Markdown',
  git: 'Git',
  github: 'GitHub',
  'ci/cd': 'CI/CD',
  testing: 'Testing',
  jest: 'Jest',
  'web worker': 'Web Worker',
  pwa: 'PWA',
  ssr: 'SSR',
  ssg: 'SSG',
  'shadcn/ui': 'shadcn/ui',
  'framer motion': 'Framer Motion',
  'three.js': 'Three.js',
  threejs: 'Three.js',
  prisma: 'Prisma',
  supabase: 'Supabase',
  firebase: 'Firebase',
  cloudflare: 'Cloudflare',
  vercel: 'Vercel',
};

const MOCK_ARTICLES = [
  { slug: 'react-with-astro', title: 'AstroでReactを使う方法' },
  { slug: 'astro-islands-architecture', title: 'Astro Islands Architecture' },
  { slug: 'shadcn-ui-tailwind-setup', title: 'shadcn/ui + Tailwind CSS セットアップ' },
  { slug: 'markdown-syntax-showcase', title: 'Markdownシンタックスショーケース' },
];

function analyze(text: string): AnalysisResponse {
  // Word count: split by whitespace, filter empty
  const words = text.split(/\s+/).filter(w => w.length > 0);
  const wordCount = words.length;

  // Reading time: ~400 words/min for Japanese (slower reading), ceil
  const readingTime = Math.max(1, Math.ceil(wordCount / 400));

  // Suggested tags: find tech keywords in text
  const lowerText = text.toLowerCase();
  const foundTags = new Set<string>();

  for (const [keyword, label] of Object.entries(TECH_KEYWORDS)) {
    if (lowerText.includes(keyword)) {
      foundTags.add(label);
    }
  }

  const suggestedTags = Array.from(foundTags).slice(0, 8);

  // Similar articles: simple keyword overlap scoring
  const similarArticles = MOCK_ARTICLES.map(article => {
    const slug = article.slug.toLowerCase().replace(/-/g, ' ');
    const slugWords = slug.split(' ');
    const matchCount = slugWords.filter(w => lowerText.includes(w)).length;
    const similarity = Math.min(1, matchCount / Math.max(slugWords.length, 1));
    return { ...article, similarity: Math.round(similarity * 100) / 100 };
  })
    .filter(a => a.similarity > 0)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, 3);

  return { wordCount, readingTime, suggestedTags, similarArticles };
}

self.onmessage = (event: MessageEvent<AnalysisMessage>) => {
  const result = analyze(event.data.text);
  self.postMessage(result);
};
