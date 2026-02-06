import { useMemo } from 'react';
import type { GraphData } from '../../types/knowledge-graph';
import graphData from '../../data/generated/graph-data.json';

const CATEGORY_COLORS: Record<string, string> = {
  'フロントエンド': '#6366f1',
  'バックエンド': '#10b981',
  'ツール': '#f59e0b',
  'デザイン': '#ec4899',
  'インフラ': '#8b5cf6',
  'データ': '#06b6d4',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || '#6366f1';
}

export function AnalyticsDashboard() {
  const data = graphData as GraphData;

  const stats = useMemo(() => {
    const totalArticles = data.nodes.length;
    const totalRelationships = data.edges.length;

    // Connection count per node
    const connectionMap = new Map<string, number>();
    for (const node of data.nodes) {
      connectionMap.set(node.slug, 0);
    }
    for (const edge of data.edges) {
      connectionMap.set(edge.source, (connectionMap.get(edge.source) || 0) + 1);
      connectionMap.set(edge.target, (connectionMap.get(edge.target) || 0) + 1);
    }

    const connectionCounts = Array.from(connectionMap.values());
    const avgConnections = totalArticles > 0
      ? (connectionCounts.reduce((a, b) => a + b, 0) / totalArticles)
      : 0;

    // Orphan articles (no edges)
    const orphans = data.nodes.filter(n => (connectionMap.get(n.slug) || 0) === 0);

    // Category distribution
    const categoryDist = new Map<string, number>();
    for (const node of data.nodes) {
      categoryDist.set(node.category, (categoryDist.get(node.category) || 0) + 1);
    }
    const maxCategoryCount = Math.max(...Array.from(categoryDist.values()), 1);

    // Timeline data
    const timeline = data.nodes
      .map(n => ({ slug: n.slug, title: n.title, date: n.publishedAt }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return {
      totalArticles,
      totalRelationships,
      avgConnections,
      orphans,
      categoryDist,
      maxCategoryCount,
      timeline,
    };
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-8 overflow-y-auto max-h-[calc(100vh-16rem)]">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-xl border border-border bg-background p-5 text-center">
          <p className="text-3xl font-bold text-foreground">{stats.totalArticles}</p>
          <p className="text-sm text-muted-foreground mt-1">Total Articles</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-5 text-center">
          <p className="text-3xl font-bold text-foreground">{stats.totalRelationships}</p>
          <p className="text-sm text-muted-foreground mt-1">Relationships</p>
        </div>
        <div className="rounded-xl border border-border bg-background p-5 text-center">
          <p className="text-3xl font-bold text-foreground">{stats.avgConnections.toFixed(1)}</p>
          <p className="text-sm text-muted-foreground mt-1">Avg Connections</p>
        </div>
      </div>

      {/* Category Distribution */}
      <div className="rounded-xl border border-border bg-background p-5">
        <h3 className="font-serif text-lg font-bold text-foreground mb-4">Category Distribution</h3>
        <div className="space-y-3">
          {Array.from(stats.categoryDist.entries()).map(([category, count]) => (
            <div key={category} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <span className="text-foreground font-medium">{category}</span>
                <span className="text-muted-foreground">{count} article{count !== 1 ? 's' : ''}</span>
              </div>
              <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${(count / stats.maxCategoryCount) * 100}%`,
                    backgroundColor: getCategoryColor(category),
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Article Timeline */}
      <div className="rounded-xl border border-border bg-background p-5">
        <h3 className="font-serif text-lg font-bold text-foreground mb-4">Article Timeline</h3>
        {stats.timeline.length > 0 ? (
          <div className="relative">
            <div className="absolute top-3 left-0 right-0 h-0.5 bg-border" />
            <div className="flex justify-between relative">
              {stats.timeline.map((item, i) => (
                <div key={item.slug} className="flex flex-col items-center" style={{ flex: 1 }}>
                  <div
                    className="w-3 h-3 rounded-full bg-amber-500 border-2 border-background relative z-10"
                    title={`${item.title} (${item.date})`}
                  />
                  <p className="text-[10px] text-muted-foreground mt-2 text-center max-w-[80px] truncate">
                    {item.date}
                  </p>
                  <p className="text-[10px] text-foreground text-center max-w-[80px] truncate">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">No timeline data available.</p>
        )}
      </div>

      {/* Orphan Articles */}
      <div className="rounded-xl border border-border bg-background p-5">
        <h3 className="font-serif text-lg font-bold text-foreground mb-4">Orphan Articles</h3>
        <p className="text-sm text-muted-foreground mb-3">
          Articles with no connections to other content.
        </p>
        {stats.orphans.length > 0 ? (
          <ul className="space-y-2">
            {stats.orphans.map(node => (
              <li key={node.slug} className="flex items-center justify-between text-sm">
                <a
                  href={`/blog/${node.slug}`}
                  className="text-foreground hover:text-amber-500 transition-colors font-medium"
                >
                  {node.title}
                </a>
                <span
                  className="text-xs px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: getCategoryColor(node.category) }}
                >
                  {node.category}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-green-600 dark:text-green-400">
            All articles are connected.
          </p>
        )}
      </div>
    </div>
  );
}
