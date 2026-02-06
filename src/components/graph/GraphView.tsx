import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
import type { Core, NodeSingular, ElementDefinition } from 'cytoscape';
// @ts-ignore -- no type declarations available
import coseBilkent from 'cytoscape-cose-bilkent';
import type { GraphData, GraphNode } from '../../types/knowledge-graph';
import graphData from '../../data/generated/graph-data.json';

cytoscape.use(coseBilkent);

const CATEGORY_COLORS: Record<string, string> = {
  'フロントエンド': '#6366f1',
  'バックエンド': '#10b981',
  'ツール': '#f59e0b',
  'デザイン': '#ec4899',
  'インフラ': '#8b5cf6',
  'データ': '#06b6d4',
};

const RELATIONSHIP_COLORS: Record<string, string> = {
  related: '#94a3b8',
  prerequisite: '#f59e0b',
  sequel: '#6366f1',
  references: '#10b981',
};

function getCategoryColor(category: string): string {
  return CATEGORY_COLORS[category] || '#6366f1';
}

function normalizeSize(wordCount: number, min: number, max: number): number {
  if (max === min) return 30;
  return 20 + ((wordCount - min) / (max - min)) * 30;
}

function graphDataToElements(data: GraphData): ElementDefinition[] {
  const wordCounts = data.nodes.map(n => n.wordCount);
  const minWc = Math.min(...wordCounts);
  const maxWc = Math.max(...wordCounts);

  const nodes: ElementDefinition[] = data.nodes.map(n => ({
    data: {
      id: n.slug,
      label: n.title,
      category: n.category,
      wordCount: n.wordCount,
      tags: n.tags,
      publishedAt: n.publishedAt,
      size: normalizeSize(n.wordCount, minWc, maxWc),
      color: getCategoryColor(n.category),
    },
  }));

  const edges: ElementDefinition[] = data.edges.map((e, i) => ({
    data: {
      id: `edge-${i}`,
      source: e.source,
      target: e.target,
      strength: e.strength,
      type: e.relationshipType,
      color: RELATIONSHIP_COLORS[e.relationshipType] || '#94a3b8',
    },
  }));

  return [...nodes, ...edges];
}

const cytoscapeStylesheet: cytoscape.StylesheetJsonBlock[] = [
  {
    selector: 'node',
    style: {
      'background-color': 'data(color)',
      label: 'data(label)',
      width: 'data(size)',
      height: 'data(size)',
      'font-size': '10px',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 6,
      color: '#64748b',
      'text-wrap': 'ellipsis',
      'text-max-width': '80px',
      'border-width': 2,
      'border-color': 'data(color)',
      'border-opacity': 0.3,
    },
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': 3,
      'border-color': '#f59e0b',
      'border-opacity': 1,
    },
  },
  {
    selector: 'edge',
    style: {
      width: 'mapData(strength, 0, 1, 1, 4)',
      'line-color': 'data(color)',
      'target-arrow-color': 'data(color)',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      opacity: 0.6,
    },
  },
  {
    selector: 'edge:selected',
    style: {
      opacity: 1,
      width: 'mapData(strength, 0, 1, 2, 6)',
    },
  },
];

const layoutOptions = {
  name: 'cose-bilkent',
  animate: false,
  nodeDimensionsIncludeLabels: true,
  idealEdgeLength: 120,
  nodeRepulsion: 6000,
  gravity: 0.25,
  numIter: 2500,
};

interface SelectedNodeInfo {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  wordCount: number;
  publishedAt: string;
  connections: number;
}

export function GraphView() {
  const data = graphData as GraphData;
  const cyRef = useRef<Core | null>(null);
  const [selectedNode, setSelectedNode] = useState<SelectedNodeInfo | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterTag, setFilterTag] = useState<string>('all');
  const [filterRelType, setFilterRelType] = useState<string>('all');
  const [legendOpen, setLegendOpen] = useState(false);

  const categories = useMemo(() => {
    const cats = new Set(data.nodes.map(n => n.category));
    return Array.from(cats).sort();
  }, []);

  const allTags = useMemo(() => {
    const tags = new Set(data.nodes.flatMap(n => n.tags));
    return Array.from(tags).sort();
  }, []);

  const relationshipTypes = useMemo(() => {
    const types = new Set(data.edges.map(e => e.relationshipType));
    return Array.from(types).sort();
  }, []);

  const filteredData = useMemo(() => {
    let nodes = data.nodes;
    if (filterCategory !== 'all') {
      nodes = nodes.filter(n => n.category === filterCategory);
    }
    if (filterTag !== 'all') {
      nodes = nodes.filter(n => n.tags.includes(filterTag));
    }
    const slugs = new Set(nodes.map(n => n.slug));
    let edges = data.edges.filter(
      e => slugs.has(e.source) && slugs.has(e.target)
    );
    if (filterRelType !== 'all') {
      edges = edges.filter(e => e.relationshipType === filterRelType);
    }
    return { nodes, edges };
  }, [filterCategory, filterTag, filterRelType]);

  const elements = useMemo(() => graphDataToElements(filteredData), [filteredData]);

  const handleCyInit = useCallback((cy: Core) => {
    cyRef.current = cy;

    cy.on('tap', 'node', (evt) => {
      const node = evt.target as NodeSingular;
      const nodeData = node.data();
      const connectedEdges = node.connectedEdges();
      setSelectedNode({
        slug: nodeData.id,
        title: nodeData.label,
        category: nodeData.category,
        tags: nodeData.tags || [],
        wordCount: nodeData.wordCount,
        publishedAt: nodeData.publishedAt,
        connections: connectedEdges.length,
      });
    });

    cy.on('tap', (evt) => {
      if (evt.target === cy) {
        setSelectedNode(null);
      }
    });
  }, []);

  const handleFit = useCallback(() => {
    cyRef.current?.fit(undefined, 30);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Filter controls */}
      <div className="flex flex-wrap gap-3 p-4 border-b border-border bg-muted/30">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Category</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="text-sm rounded-md border border-border bg-background px-2 py-1 text-foreground"
          >
            <option value="all">All</option>
            {categories.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Tag</label>
          <select
            value={filterTag}
            onChange={(e) => setFilterTag(e.target.value)}
            className="text-sm rounded-md border border-border bg-background px-2 py-1 text-foreground"
          >
            <option value="all">All</option>
            {allTags.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Relation</label>
          <select
            value={filterRelType}
            onChange={(e) => setFilterRelType(e.target.value)}
            className="text-sm rounded-md border border-border bg-background px-2 py-1 text-foreground"
          >
            <option value="all">All</option>
            {relationshipTypes.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <button
          onClick={handleFit}
          className="ml-auto text-sm px-3 py-1 rounded-md border border-border bg-background hover:bg-muted text-foreground transition-colors"
        >
          Fit to View
        </button>
      </div>

      {/* Graph + Sidebar */}
      <div className="flex flex-1 min-h-0 relative">
        <div className="flex-1 min-w-0">
          {elements.length > 0 ? (
            <CytoscapeComponent
              elements={elements}
              layout={layoutOptions as any}
              stylesheet={cytoscapeStylesheet}
              cy={handleCyInit}
              style={{ width: '100%', height: '100%', minHeight: '400px' }}
              className="bg-background"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground">
              No articles match the current filters.
            </div>
          )}
        </div>

        {/* Legend (collapsible) */}
        <div className="absolute bottom-4 left-4">
          {legendOpen ? (
            <div className="bg-background/90 backdrop-blur-sm border border-border rounded-lg p-3 text-xs space-y-2">
              <button
                onClick={() => setLegendOpen(false)}
                className="font-medium text-foreground hover:text-muted-foreground transition-colors w-full text-left"
              >
                Categories <span className="text-muted-foreground ml-1">-</span>
              </button>
              {Object.entries(CATEGORY_COLORS).map(([name, color]) => (
                <div key={name} className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: color }} />
                  <span className="text-muted-foreground">{name}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 mt-2">
                <p className="font-medium text-foreground mb-1">Edges</p>
                {Object.entries(RELATIONSHIP_COLORS).map(([name, color]) => (
                  <div key={name} className="flex items-center gap-2">
                    <span className="w-4 h-0.5 shrink-0" style={{ backgroundColor: color }} />
                    <span className="text-muted-foreground">{name}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <button
              onClick={() => setLegendOpen(true)}
              className="bg-background/90 backdrop-blur-sm border border-border rounded-lg px-3 py-2 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Legend +
            </button>
          )}
        </div>

        {/* Sidebar */}
        {selectedNode && (
          <div className="w-72 border-l border-border bg-background p-4 overflow-y-auto">
            <div className="space-y-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-foreground leading-tight">
                  {selectedNode.title}
                </h3>
                <span
                  className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full text-white"
                  style={{ backgroundColor: getCategoryColor(selectedNode.category) }}
                >
                  {selectedNode.category}
                </span>
              </div>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Word count</span>
                  <span className="text-foreground font-medium">{selectedNode.wordCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Connections</span>
                  <span className="text-foreground font-medium">{selectedNode.connections}</span>
                </div>
                <div className="flex justify-between">
                  <span>Published</span>
                  <span className="text-foreground font-medium">{selectedNode.publishedAt}</span>
                </div>
              </div>
              {selectedNode.tags.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">Tags</p>
                  <div className="flex flex-wrap gap-1">
                    {selectedNode.tags.map(tag => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-md bg-muted text-muted-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              <a
                href={`/blog/${selectedNode.slug}`}
                className="block text-center text-sm font-medium px-4 py-2 rounded-md bg-amber-500 text-white hover:bg-amber-600 transition-colors"
              >
                Read Article
              </a>
              <button
                onClick={() => setSelectedNode(null)}
                className="block w-full text-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
