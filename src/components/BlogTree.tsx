import { useMemo } from 'react';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { SupportedLocale } from '../types';

type BlogPost = {
  title: string;
  slug: string;
  category?: string;
  subcategory?: string;
};

type TreeNodeKind = 'category' | 'subcategory';

type TreeNode = {
  name: string;
  kind: TreeNodeKind;
  posts: BlogPost[];
  children: Map<string, TreeNode>;
};

type BlogTreeProps = {
  posts: BlogPost[];
  currentSlug?: string;
  locale?: SupportedLocale;
  className?: string;
};

export function BlogTree({ posts, currentSlug, locale = 'ja', className }: BlogTreeProps) {
  const splitTaxonomy = (value?: string): string[] => {
    if (!value) return [];
    // Support "A/B/C", "A > B > C", "A／B" (full-width slash) etc.
    return value
      .split(/[/>＞／]/g)
      .map((s) => s.trim())
      .filter(Boolean);
  };

  const tree = useMemo(() => {
    const root = new Map<string, TreeNode>();

    const getOrCreateChild = (parent: Map<string, TreeNode>, name: string, kind: TreeNodeKind) => {
      const key = `${kind}:${name}`;
      const existing = parent.get(key);
      if (existing) return existing;

      const node: TreeNode = {
        name,
        kind,
        posts: [],
        children: new Map(),
      };
      parent.set(key, node);
      return node;
    };

    posts.forEach((post) => {
      const categorySegments = splitTaxonomy(post.category);
      const normalizedCategorySegments = categorySegments.length > 0 ? categorySegments : ['未分類'];
      const subcategorySegments = splitTaxonomy(post.subcategory);

      // Build nested category nodes
      let currentMap = root;
      let currentNode: TreeNode | undefined;
      normalizedCategorySegments.forEach((segment) => {
        currentNode = getOrCreateChild(currentMap, segment, 'category');
        currentMap = currentNode.children;
      });

      // Build nested subcategory nodes under the leaf category
      if (subcategorySegments.length > 0) {
        subcategorySegments.forEach((segment) => {
          if (!currentNode) return;
          currentNode = getOrCreateChild(currentNode.children, segment, 'subcategory');
        });
      }

      // Attach the post to the leaf node (subcategory leaf if present; otherwise category leaf)
      if (currentNode) currentNode.posts.push(post);
    });

    const sortNode = (node: TreeNode): TreeNode => {
      node.posts.sort((a, b) => a.title.localeCompare(b.title));
      const sortedChildren = Array.from(node.children.values())
        .map(sortNode)
        .sort((a, b) => {
          if (a.kind !== b.kind) return a.kind === 'category' ? -1 : 1;
          return a.name.localeCompare(b.name);
        });
      node.children = new Map(sortedChildren.map((c) => [`${c.kind}:${c.name}`, c]));
      return node;
    };

    return Array.from(root.values())
      .map(sortNode)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [posts]);

  const getCategoryUrl = (category: string) => {
    if (locale === 'ja') {
      return `/categories/${encodeURIComponent(category)}`;
    }
    return `/${locale}/categories/${encodeURIComponent(category)}`;
  };

  const getSubcategoryUrl = (category: string, subcategory: string) => {
    if (locale === 'ja') {
      return `/blog?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`;
    }
    return `/${locale}/blog?category=${encodeURIComponent(category)}&subcategory=${encodeURIComponent(subcategory)}`;
  };

  const getPostUrl = (slug: string) => {
    if (locale === 'ja') {
      return `/blog/${slug}`;
    }
    return `/${locale}/blog/${slug}`;
  };

  const joinPath = (segments: string[]) => segments.join('/');

  const containsSlug = (node: TreeNode, slug?: string): boolean => {
    if (!slug) return false;
    if (node.posts.some((p) => p.slug === slug)) return true;
    return Array.from(node.children.values()).some((child) => containsSlug(child, slug));
  };

  const renderNode = (
    node: TreeNode,
    opts: { categoryPath: string[]; subcategoryPath: string[]; depth: number }
  ) => {
    const { categoryPath, subcategoryPath, depth } = opts;

    const nextCategoryPath = node.kind === 'category' ? [...categoryPath, node.name] : categoryPath;
    const nextSubcategoryPath = node.kind === 'subcategory' ? [...subcategoryPath, node.name] : subcategoryPath;

    const nodeKey =
      node.kind === 'category'
        ? `category:${joinPath(nextCategoryPath)}`
        : `subcategory:${joinPath(nextCategoryPath)}//${joinPath(nextSubcategoryPath)}`;

    const hasChildren = node.children.size > 0;
    const hasPosts = node.posts.length > 0;
    const canExpand = hasChildren || hasPosts;
    const shouldOpen = canExpand && containsSlug(node, currentSlug);

    const nodeHref =
      node.kind === 'category'
        ? getCategoryUrl(joinPath(nextCategoryPath))
        : getSubcategoryUrl(joinPath(nextCategoryPath), joinPath(nextSubcategoryPath));

    const labelClass =
      node.kind === 'category'
        ? 'flex-1 text-sm font-semibold text-foreground hover:text-primary transition-colors no-underline leading-relaxed'
        : 'flex-1 text-[0.6875rem] font-normal text-muted-foreground hover:text-foreground transition-colors no-underline leading-tight';

    const childrenNodes = Array.from(node.children.values()).sort((a, b) => {
      if (a.kind !== b.kind) return a.kind === 'category' ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    if (!canExpand) {
      return (
        <li key={nodeKey} className={cn('space-y-1.5', depth > 0 && 'pt-0.5')}>
          <div className="flex items-center gap-1 py-0.5">
            <span className="w-4" />
            <a href={nodeHref} className={labelClass}>
              {node.name}
            </a>
          </div>
        </li>
      );
    }

    return (
      <li key={nodeKey} className={cn('space-y-1.5', depth > 0 && 'pt-0.5')}>
        <details className="group" open={shouldOpen}>
          <summary className="flex items-center gap-1 py-0.5 list-none cursor-pointer">
            <span className="p-0.5 hover:bg-muted rounded transition-colors">
              <ChevronRight className="h-3 w-3 text-muted-foreground transition-transform group-open:rotate-90" />
            </span>
            <a
              href={nodeHref}
              className={cn(labelClass, node.posts.some((p) => p.slug === currentSlug) && 'text-primary')}
            >
              {node.name}
            </a>
          </summary>

          <ul className={cn('pl-4 space-y-1 border-l border-border/50 ml-2', depth >= 1 && 'border-border/30')}>
            {/* Nested categories/subcategories */}
            {childrenNodes.map((child) =>
              renderNode(child, {
                categoryPath: nextCategoryPath,
                subcategoryPath: node.kind === 'category' ? [] : nextSubcategoryPath,
                depth: depth + 1,
              })
            )}

            {/* Posts directly under this node */}
            {hasPosts && (
              <li className="space-y-0.5">
                {node.posts.map((post) => (
                  <a
                    key={post.slug}
                    href={getPostUrl(post.slug)}
                    className={cn(
                      'block text-xs text-muted-foreground hover:text-foreground transition-colors no-underline py-0.5 truncate pl-4',
                      post.slug === currentSlug && 'text-primary font-medium'
                    )}
                  >
                    {post.title}
                  </a>
                ))}
              </li>
            )}
          </ul>
        </details>
      </li>
    );
  };

  return (
    <nav className={cn('space-y-1', className)} aria-label="ブログ記事一覧">
      <div className="text-xs font-semibold tracking-wide text-foreground/80 mb-3">記事一覧</div>
      <ul className="space-y-1">
        {tree.map((node) => renderNode(node, { categoryPath: [], subcategoryPath: [], depth: 0 }))}
      </ul>
    </nav>
  );
}
