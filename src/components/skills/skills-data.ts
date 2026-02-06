import type { Skill, SkillsData } from '../../types/knowledge-graph';

// Hardcoded skill data from skills.yaml for use in React components
const skillsData: SkillsData = {
  skills: [
    {
      id: 'frontend',
      name: 'Frontend',
      level: 5,
      description: 'Core frontend engineering expertise',
      aliases: ['Frontend', 'フロントエンド', 'Front-end'],
      children: [
        {
          id: 'react',
          name: 'React',
          level: 4,
          articles: ['react-with-astro'],
          aliases: ['React', 'React.js', 'ReactJS'],
          children: [
            { id: 'hooks', name: 'Hooks', level: 4, aliases: ['React Hooks'] },
            { id: 'server-components', name: 'Server Components', level: 3, aliases: ['RSC', 'React Server Components'] },
            { id: 'framer-motion', name: 'Framer Motion', level: 3, aliases: ['Framer'] },
          ],
        },
        {
          id: 'astro',
          name: 'Astro',
          level: 4,
          articles: ['astro-islands-architecture'],
          aliases: ['Astro', 'Astro.js'],
          children: [
            { id: 'islands', name: 'Islands Architecture', level: 4, articles: ['astro-islands-architecture'], aliases: ['Astro Islands'] },
            { id: 'content-collections', name: 'Content Collections', level: 3, aliases: ['Content Collections'] },
            { id: 'astro-i18n', name: 'i18n Routing', level: 4, aliases: ['i18n', 'Internationalization'] },
          ],
        },
        {
          id: 'typescript',
          name: 'TypeScript',
          level: 4,
          articles: ['shadcn-ui-tailwind-setup'],
          aliases: ['TypeScript', 'TS'],
          children: [
            { id: 'type-system', name: 'Advanced Types', level: 4, aliases: ['TypeScript Types'] },
            { id: 'zod', name: 'Zod Validation', level: 3, aliases: ['Zod'] },
          ],
        },
        {
          id: 'css',
          name: 'CSS / Tailwind',
          level: 4,
          articles: ['shadcn-ui-tailwind-setup'],
          aliases: ['CSS', 'CSS3', 'TailwindCSS', 'Tailwind'],
          children: [
            { id: 'tailwind', name: 'Tailwind CSS', level: 4, articles: ['shadcn-ui-tailwind-setup'], aliases: ['TailwindCSS', 'Tailwind'] },
            { id: 'responsive', name: 'Responsive Design', level: 4, aliases: ['RWD'] },
            { id: 'animations', name: 'CSS Animations', level: 3, aliases: ['Animation'] },
          ],
        },
      ],
    },
    {
      id: 'ai-ml',
      name: 'AI / Machine Learning',
      level: 3,
      description: 'AI integration and LLM application development',
      aliases: ['AI', 'ML', 'Machine Learning', 'AI/ML'],
      children: [
        {
          id: 'llm-integration',
          name: 'LLM Integration',
          level: 3,
          aliases: ['LLM'],
          children: [
            { id: 'openai-api', name: 'OpenAI API', level: 3, aliases: ['OpenAI', 'GPT'] },
            { id: 'anthropic-api', name: 'Anthropic API', level: 3, aliases: ['Anthropic', 'Claude'] },
          ],
        },
        { id: 'rag', name: 'RAG', level: 3, aliases: ['Retrieval Augmented Generation'] },
        { id: 'embeddings', name: 'Embeddings', level: 3, aliases: ['Vector Embeddings'] },
        { id: 'generative-ui', name: 'Generative UI', level: 2, aliases: ['AI UI'] },
        { id: 'vercel-ai-sdk', name: 'Vercel AI SDK', level: 3, aliases: ['AI SDK'] },
      ],
    },
    {
      id: 'infrastructure',
      name: 'Infrastructure',
      level: 3,
      description: 'Cloud infrastructure and DevOps',
      aliases: ['Infrastructure', 'DevOps', 'インフラ'],
      children: [
        {
          id: 'cloudflare',
          name: 'Cloudflare',
          level: 3,
          aliases: ['Cloudflare', 'CF'],
          children: [
            { id: 'cf-pages', name: 'Cloudflare Pages', level: 4, aliases: ['CF Pages'] },
            { id: 'cf-workers', name: 'Workers', level: 2, aliases: ['Cloudflare Workers'] },
            { id: 'cf-d1', name: 'D1 (SQLite)', level: 2, aliases: ['D1', 'Cloudflare D1'] },
          ],
        },
        {
          id: 'git',
          name: 'Git',
          level: 4,
          aliases: ['Git'],
          children: [
            { id: 'github-actions', name: 'GitHub Actions', level: 3, aliases: ['CI/CD', 'GHA'] },
          ],
        },
        { id: 'docker', name: 'Docker', level: 3, aliases: ['Docker', 'Container'] },
      ],
    },
    {
      id: 'data',
      name: 'Data Engineering',
      level: 3,
      description: 'Database and data processing',
      aliases: ['Data', 'Data Engineering', 'データ'],
      children: [
        {
          id: 'sqlite',
          name: 'SQLite',
          level: 3,
          aliases: ['SQLite', 'SQL'],
          children: [
            { id: 'recursive-cte', name: 'Recursive CTE', level: 3, aliases: ['CTE'] },
          ],
        },
        {
          id: 'graph-theory',
          name: 'Graph Theory',
          level: 3,
          aliases: ['Graph'],
          children: [
            { id: 'cytoscape', name: 'Cytoscape.js', level: 3, aliases: ['Cytoscape'] },
          ],
        },
        { id: 'vector-search', name: 'Vector Search', level: 2, aliases: ['Semantic Search'] },
      ],
    },
    {
      id: 'languages',
      name: 'Languages',
      level: 4,
      description: 'Programming and natural languages',
      aliases: ['Languages', '言語'],
      children: [
        { id: 'japanese', name: 'Japanese (Native)', level: 5, aliases: ['Japanese', '日本語'] },
        { id: 'english', name: 'English', level: 4, aliases: ['English', '英語'] },
        { id: 'thai', name: 'Thai', level: 3, aliases: ['Thai', 'タイ語'] },
      ],
    },
  ],
};

// Domain color map for consistent coloring across views
export const domainColors: Record<string, string> = {
  frontend: '#3b82f6',    // blue
  'ai-ml': '#a855f7',     // purple
  infrastructure: '#22c55e', // green
  data: '#f97316',        // orange
  languages: '#ec4899',   // pink
};

// Get domain (top-level parent) for a skill ID
export function getDomain(skillId: string): string {
  for (const domain of skillsData.skills) {
    if (domain.id === skillId) return domain.id;
    if (findSkillIn(domain, skillId)) return domain.id;
  }
  return 'frontend';
}

function findSkillIn(skill: Skill, targetId: string): boolean {
  if (skill.id === targetId) return true;
  return skill.children?.some((child) => findSkillIn(child, targetId)) ?? false;
}

// Find the raw Skill definition by id (for accessing aliases)
export function findSkillDef(skillId: string): Skill | undefined {
  function search(skill: Skill): Skill | undefined {
    if (skill.id === skillId) return skill;
    for (const child of skill.children ?? []) {
      const found = search(child);
      if (found) return found;
    }
    return undefined;
  }
  for (const domain of skillsData.skills) {
    const found = search(domain);
    if (found) return found;
  }
  return undefined;
}

// Get all tag variations for a skill (id + name + aliases)
export function getSkillAliases(skillId: string): string[] {
  const def = findSkillDef(skillId);
  if (!def) return [skillId];
  const set = new Set<string>();
  set.add(def.id);
  set.add(def.name);
  def.aliases?.forEach((a) => set.add(a));
  return Array.from(set);
}

// Check if a tag matches a given skill (case-insensitive)
export function matchesSkill(skillId: string, tag: string): boolean {
  const aliases = getSkillAliases(skillId);
  const lowerTag = tag.toLowerCase();
  return aliases.some((a) => a.toLowerCase() === lowerTag);
}

// Find all skills that match a given tag string
export function findSkillsByTag(tag: string): FlatSkill[] {
  const flat = flattenSkills();
  const lowerTag = tag.toLowerCase();
  return flat.filter((skill) => {
    if (skill.id.toLowerCase() === lowerTag) return true;
    if (skill.name.toLowerCase() === lowerTag) return true;
    const def = findSkillDef(skill.id);
    return def?.aliases?.some((a) => a.toLowerCase() === lowerTag) ?? false;
  });
}

// Flatten skills tree into nodes + edges for Cytoscape
export interface FlatSkill {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  articles: string[];
  domain: string;
  parentId?: string;
  depth: number;
}

export function flattenSkills(): FlatSkill[] {
  const result: FlatSkill[] = [];

  function walk(skill: Skill, domain: string, parentId?: string, depth = 0) {
    result.push({
      id: skill.id,
      name: skill.name,
      level: skill.level,
      articles: skill.articles ?? [],
      domain,
      parentId,
      depth,
    });
    skill.children?.forEach((child) => walk(child, domain, skill.id, depth + 1));
  }

  skillsData.skills.forEach((domain) => walk(domain, domain.id));
  return result;
}

export { skillsData };
