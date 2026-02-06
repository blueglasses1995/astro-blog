// Knowledge Graph shared types

import type { Core, ElementDefinition, NodeSingular } from 'cytoscape';

// ============================================================
// Skill Tree Types
// ============================================================

export interface Skill {
  id: string;
  name: string;
  level: 1 | 2 | 3 | 4 | 5;
  articles?: string[];
  aliases?: string[];
  children?: Skill[];
  description?: string;
}

export interface SkillsData {
  skills: Skill[];
}

export type SkillTreeViewMode = 'rpg' | 'mindmap' | 'radar';

// ============================================================
// Knowledge Graph Types
// ============================================================

export interface GraphNode {
  slug: string;
  title: string;
  category: string;
  tags: string[];
  wordCount: number;
  publishedAt: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  relationshipType: 'related' | 'prerequisite' | 'sequel' | 'references';
  strength: number;
  detectedBy: 'manual' | 'ai_embedding';
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}

export type GraphTabMode = 'graph' | 'analytics';

// ============================================================
// Chat Types
// ============================================================

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  citations?: ArticleCitation[];
}

export interface ArticleCitation {
  slug: string;
  title: string;
  excerpt: string;
  relevance: number;
}

// ============================================================
// Tour Types
// ============================================================

export interface TourStep {
  target: string | string[];
  narration: string;
  duration: number;
  action: 'highlight_and_zoom' | 'highlight_group' | 'pan_to' | 'fit_all';
}

export interface TourScript {
  title: string;
  steps: TourStep[];
}

// ============================================================
// Generative UI Types
// ============================================================

export type GeneratedComponentType = 'article-card' | 'graph-filter' | 'skill-highlight' | 'summary';

export interface GeneratedArticleCard {
  type: 'article-card';
  slug: string;
  highlight: string;
}

export interface GeneratedGraphFilter {
  type: 'graph-filter';
  filter: { tags?: string[]; category?: string };
}

export interface GeneratedSkillHighlight {
  type: 'skill-highlight';
  skillId: string;
}

export interface GeneratedSummary {
  type: 'summary';
  text: string;
}

export type GeneratedComponent =
  | GeneratedArticleCard
  | GeneratedGraphFilter
  | GeneratedSkillHighlight
  | GeneratedSummary;

export interface GeneratedUI {
  layout: 'grid' | 'list' | 'focus';
  components: GeneratedComponent[];
}

// ============================================================
// Editor Types
// ============================================================

export interface AnalysisResult {
  wordCount: number;
  readingTime: number;
  suggestedTags: string[];
  similarArticles: Array<{ slug: string; title: string; similarity: number }>;
}

// ============================================================
// Cytoscape Helper Types
// ============================================================

export interface CytoscapeGraphProps {
  elements: ElementDefinition[];
  layout?: cytoscape.LayoutOptions;
  style?: cytoscape.Stylesheet[];
  onNodeClick?: (node: NodeSingular) => void;
  className?: string;
}
