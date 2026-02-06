import { motion } from 'framer-motion';
import type {
  GeneratedUI,
  GeneratedComponent,
  GeneratedArticleCard,
  GeneratedSkillHighlight,
  GeneratedGraphFilter,
  GeneratedSummary,
} from '../../types/knowledge-graph';

import graphData from '../../data/generated/graph-data.json';
import type { GraphData } from '../../types/knowledge-graph';

const EASING = [0.22, 1, 0.36, 1] as const;

const typedGraphData = graphData as GraphData;

function ArticleCardComponent({ component }: { component: GeneratedArticleCard }) {
  const node = typedGraphData.nodes.find(n => n.slug === component.slug);
  const title = node?.title ?? component.slug;
  const excerpt = component.highlight || `Published ${node?.publishedAt ?? ''}`;

  return (
    <a
      href={`/blog/${component.slug}`}
      className="block group rounded-lg border bg-card p-4 hover:border-foreground/20 transition-all duration-300"
    >
      <div className="flex gap-3">
        <div className="w-1 rounded-full bg-amber-500 flex-shrink-0" />
        <div className="min-w-0">
          <h4 className="font-serif font-bold text-sm text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
            {title}
          </h4>
          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{excerpt}</p>
          {node?.tags && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {node.tags.slice(0, 3).map(tag => (
                <span
                  key={tag}
                  className="inline-block text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </a>
  );
}

function SkillHighlightComponent({ component }: { component: GeneratedSkillHighlight }) {
  const skillName = component.skillId;
  // Mock skill level based on skillId
  const levelMap: Record<string, number> = {
    react: 4, astro: 4, typescript: 4, css: 5, tailwind: 4, frontend: 5,
  };
  const level = levelMap[skillName.toLowerCase()] ?? 3;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between">
        <span className="font-medium text-sm text-foreground capitalize">{skillName}</span>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill={i < level ? 'currentColor' : 'none'}
              stroke="currentColor"
              strokeWidth="2"
              className={i < level ? 'text-amber-500' : 'text-muted-foreground/30'}
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
        </div>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-500"
          style={{ width: `${(level / 5) * 100}%` }}
        />
      </div>
    </div>
  );
}

function GraphFilterComponent({ component }: { component: GeneratedGraphFilter }) {
  const tags = component.filter.tags ?? [];
  const category = component.filter.category;

  return (
    <div className="rounded-lg border bg-card p-4">
      <p className="text-xs text-muted-foreground mb-2">Filter by:</p>
      <div className="flex gap-1.5 flex-wrap">
        {category && (
          <span className="inline-block text-xs px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
            {category}
          </span>
        )}
        {tags.map(tag => (
          <span
            key={tag}
            className="inline-block text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground border border-border"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

function SummaryComponent({ component }: { component: GeneratedSummary }) {
  return (
    <div className="rounded-lg bg-muted/50 p-4">
      <p className="text-sm text-foreground/90 leading-relaxed">{component.text}</p>
    </div>
  );
}

function renderComponent(component: GeneratedComponent) {
  switch (component.type) {
    case 'article-card':
      return <ArticleCardComponent component={component} />;
    case 'skill-highlight':
      return <SkillHighlightComponent component={component} />;
    case 'graph-filter':
      return <GraphFilterComponent component={component} />;
    case 'summary':
      return <SummaryComponent component={component} />;
    default:
      return null;
  }
}

interface DynamicRendererProps {
  ui: GeneratedUI;
}

export function DynamicRenderer({ ui }: DynamicRendererProps) {
  const layoutClass =
    ui.layout === 'grid'
      ? 'grid grid-cols-1 sm:grid-cols-2 gap-3'
      : ui.layout === 'list'
        ? 'flex flex-col gap-3'
        : 'flex flex-col gap-3 max-w-md mx-auto';

  return (
    <div className={layoutClass}>
      {ui.components.map((component, index) => (
        <motion.div
          key={`${component.type}-${index}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.3,
            ease: EASING as unknown as number[],
          }}
        >
          {renderComponent(component)}
        </motion.div>
      ))}
    </div>
  );
}
