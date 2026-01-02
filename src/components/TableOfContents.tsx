import React from 'react';

type Heading = {
  depth: number;
  slug: string;
  text: string;
};

type TocNode = {
  slug: string;
  text: string;
  level: number;
  children: TocNode[];
};

export type TableOfContentsProps = {
  headings?: Heading[];
  title?: string;
  maxLevels?: number;
  className?: string;
};

function buildTree(headings: Heading[], maxLevels: number): TocNode[] {
  const cleaned = (headings ?? [])
    .filter((h) => typeof h?.depth === 'number' && !!h?.slug && !!h?.text)
    .filter((h) => h.depth >= 1 && h.depth <= 6);

  const minDepth = cleaned.length ? Math.min(...cleaned.map((h) => h.depth)) : 1;
  const normalized = cleaned
    .map((h) => ({
      slug: h.slug,
      text: h.text,
      level: h.depth - minDepth + 1,
    }))
    .filter((h) => h.level >= 1 && h.level <= maxLevels);

  const tree: TocNode[] = [];
  const stack: TocNode[] = [];

  for (const h of normalized) {
    const node: TocNode = { slug: h.slug, text: h.text, level: h.level, children: [] };
    stack[h.level - 1] = node;
    stack.length = h.level;

    if (h.level === 1) {
      tree.push(node);
      continue;
    }

    const parent = stack[h.level - 2];
    if (parent) parent.children.push(node);
    else tree.push(node);
  }

  return tree;
}

function TocList({ nodes, level }: { nodes: TocNode[]; level: number }) {
  if (!nodes.length) return null;
  const indent = level === 1 ? '' : 'pl-4 border-l border-border';

  return (
    <ul className={`space-y-1 ${indent}`}>
      {nodes.map((n) => (
        <li key={n.slug}>
          <a
            href={`#${n.slug}`}
            className="block text-sm text-muted-foreground hover:text-foreground transition-colors no-underline"
          >
            {n.text}
          </a>
          <TocList nodes={n.children} level={level + 1} />
        </li>
      ))}
    </ul>
  );
}

export default function TableOfContents({
  headings = [],
  title = '目次',
  maxLevels = 3,
  className,
}: TableOfContentsProps) {
  const tree = buildTree(headings, maxLevels);
  if (!tree.length) return null;

  return (
    <nav className={className} aria-label="目次">
      <div className="text-xs font-semibold tracking-wide text-foreground/80 mb-3">{title}</div>
      <TocList nodes={tree} level={1} />
    </nav>
  );
}

