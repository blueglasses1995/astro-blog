import { useRef, useEffect, useCallback } from 'react';
import type { ElementDefinition, Core } from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
// @ts-ignore - no type declarations
import dagre from 'cytoscape-dagre';
import { flattenSkills, domainColors } from './skills-data';

// Register dagre layout
try { cytoscape.use(dagre); } catch (_) { /* already registered */ }

function buildElements(): ElementDefinition[] {
  const flat = flattenSkills();

  // Root node connecting all domain trees
  const nodes: ElementDefinition[] = [
    {
      data: {
        id: 'skills-root',
        label: 'SKILLS',
        level: 5,
        articles: 0,
        domain: 'root',
        depth: -1,
      },
    },
  ];

  flat.forEach((s) => {
    nodes.push({
      data: {
        id: s.id,
        label: s.name,
        level: s.level,
        articles: s.articles.length,
        domain: s.domain,
        depth: s.depth,
      },
    });
  });

  const edges: ElementDefinition[] = [];

  flat.forEach((s) => {
    if (s.parentId) {
      edges.push({
        data: {
          id: `${s.parentId}-${s.id}`,
          source: s.parentId,
          target: s.id,
        },
      });
    } else {
      // Top-level domain nodes connect to root
      edges.push({
        data: {
          id: `root-${s.id}`,
          source: 'skills-root',
          target: s.id,
        },
      });
    }
  });

  return [...nodes, ...edges];
}

const rpgStylesheet: any[] = [
  {
    selector: 'node',
    style: {
      'background-color': (ele: any) => {
        const domain = ele.data('domain');
        if (domain === 'root') return '#f59e0b';
        return domainColors[domain] || '#6366f1';
      },
      label: 'data(label)',
      color: '#e2e8f0',
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 8,
      'font-size': (ele: any) => {
        const level = ele.data('level') as number;
        return Math.max(10, 8 + level * 2);
      },
      width: (ele: any) => {
        const level = ele.data('level') as number;
        return 20 + level * 12;
      },
      height: (ele: any) => {
        const level = ele.data('level') as number;
        return 20 + level * 12;
      },
      'border-width': (ele: any) => {
        const articles = ele.data('articles') as number;
        return articles > 0 ? 3 : 1;
      },
      'border-color': (ele: any) => {
        const domain = ele.data('domain');
        if (domain === 'root') return '#d97706';
        const articles = ele.data('articles') as number;
        return articles > 0 ? '#f59e0b' : 'rgba(255,255,255,0.2)';
      },
      'shadow-blur': (ele: any) => {
        const articles = ele.data('articles') as number;
        return articles > 0 ? 20 : 5;
      },
      'shadow-color': (ele: any) => {
        const domain = ele.data('domain');
        return domainColors[domain] || '#6366f1';
      },
      'shadow-opacity': (ele: any) => {
        const articles = ele.data('articles') as number;
        return articles > 0 ? 0.8 : 0.3;
      },
      'text-outline-width': 2,
      'text-outline-color': '#0a0826',
      'font-family': "'Noto Sans JP', sans-serif",
    } as any,
  },
  {
    selector: 'edge',
    style: {
      width: 2,
      'line-color': 'rgba(165, 180, 252, 0.3)',
      'target-arrow-color': 'rgba(165, 180, 252, 0.3)',
      'target-arrow-shape': 'triangle',
      'curve-style': 'bezier',
      'arrow-scale': 0.8,
    } as any,
  },
  {
    selector: 'node:active',
    style: {
      'overlay-opacity': 0,
    } as any,
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': 4,
      'border-color': '#f59e0b',
    } as any,
  },
];

interface SkillTreeRPGProps {
  onNodeSelect?: (nodeId: string, name: string, level: number) => void;
}

export function SkillTreeRPG({ onNodeSelect }: SkillTreeRPGProps) {
  const cyRef = useRef<Core | null>(null);
  const elements = buildElements();

  const handleCyRef = useCallback((cy: Core) => {
    cyRef.current = cy;

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      if (node.id() === 'skills-root') return;
      onNodeSelect?.(node.id(), node.data('label'), node.data('level'));
    });

    // Fit after layout
    cy.on('layoutstop', () => {
      cy.fit(undefined, 40);
    });
  }, [onNodeSelect]);

  return (
    <div className="w-full rounded-xl overflow-hidden" style={{ height: '600px', background: '#0a0826' }}>
      <CytoscapeComponent
        elements={elements}
        stylesheet={rpgStylesheet}
        layout={{
          name: 'dagre',
          rankDir: 'TB',
          nodeSep: 60,
          rankSep: 80,
          padding: 40,
        } as any}
        cy={handleCyRef}
        style={{ width: '100%', height: '100%' }}
        userZoomingEnabled={true}
        userPanningEnabled={true}
        boxSelectionEnabled={false}
      />
    </div>
  );
}
