import { useRef, useCallback } from 'react';
import type { ElementDefinition, Core } from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import cytoscape from 'cytoscape';
// @ts-ignore - no type declarations
import coseBilkent from 'cytoscape-cose-bilkent';
import { flattenSkills, domainColors } from './skills-data';

// Register cose-bilkent layout
try { cytoscape.use(coseBilkent); } catch (_) { /* already registered */ }

function buildElements(): ElementDefinition[] {
  const flat = flattenSkills();

  // Center "ME" node
  const nodes: ElementDefinition[] = [
    {
      data: {
        id: 'me',
        label: 'ME',
        level: 5,
        domain: 'center',
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
        domain: s.domain,
        depth: s.depth,
      },
    });
  });

  // Edges: domain roots connect to "ME", rest connect to parents
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
      // Top-level domain node connects to ME
      edges.push({
        data: {
          id: `me-${s.id}`,
          source: 'me',
          target: s.id,
        },
      });
    }
  });

  return [...nodes, ...edges];
}

const mindMapStylesheet: any[] = [
  {
    selector: 'node',
    style: {
      'background-color': (ele: any) => {
        const domain = ele.data('domain');
        if (domain === 'center') return '#c41230';
        return domainColors[domain] || '#6366f1';
      },
      label: 'data(label)',
      color: (ele: any) => {
        const isDark = document.documentElement.classList.contains('dark');
        return isDark ? '#e2e8f0' : '#1e1b4b';
      },
      'text-valign': 'bottom',
      'text-halign': 'center',
      'text-margin-y': 6,
      'font-size': (ele: any) => {
        const domain = ele.data('domain');
        if (domain === 'center') return 16;
        const depth = ele.data('depth') as number;
        return Math.max(9, 14 - depth * 2);
      },
      width: (ele: any) => {
        const domain = ele.data('domain');
        if (domain === 'center') return 60;
        const level = ele.data('level') as number;
        const depth = ele.data('depth') as number;
        return Math.max(16, 20 + level * 8 - depth * 4);
      },
      height: (ele: any) => {
        const domain = ele.data('domain');
        if (domain === 'center') return 60;
        const level = ele.data('level') as number;
        const depth = ele.data('depth') as number;
        return Math.max(16, 20 + level * 8 - depth * 4);
      },
      'border-width': 2,
      'border-color': (ele: any) => {
        const domain = ele.data('domain');
        if (domain === 'center') return '#9a0e26';
        const color = domainColors[domain] || '#6366f1';
        return color;
      },
      'border-opacity': 0.5,
      'background-opacity': 0.85,
      'text-outline-width': (ele: any) => {
        const isDark = document.documentElement.classList.contains('dark');
        return isDark ? 2 : 0;
      },
      'text-outline-color': (ele: any) => {
        const isDark = document.documentElement.classList.contains('dark');
        return isDark ? 'rgba(26, 20, 20, 0.8)' : 'transparent';
      },
      'font-family': "'Noto Sans JP', sans-serif",
    } as any,
  },
  {
    selector: 'edge',
    style: {
      width: (ele: any) => {
        const sourceDepth = ele.source().data('depth') as number;
        return sourceDepth < 0 ? 3 : Math.max(1, 2.5 - sourceDepth * 0.5);
      },
      'line-color': (ele: any) => {
        const targetDomain = ele.target().data('domain');
        const color = domainColors[targetDomain] || '#6366f1';
        return color;
      },
      'line-opacity': 0.4,
      'curve-style': 'bezier',
      'target-arrow-shape': 'none',
    } as any,
  },
  {
    selector: 'node:selected',
    style: {
      'border-width': 4,
      'border-color': '#c41230',
      'border-opacity': 1,
    } as any,
  },
];

interface SkillTreeMindMapProps {
  onNodeSelect?: (nodeId: string, name: string, level: number) => void;
}

export function SkillTreeMindMap({ onNodeSelect }: SkillTreeMindMapProps) {
  const cyRef = useRef<Core | null>(null);
  const elements = buildElements();

  const handleCyRef = useCallback((cy: Core) => {
    cyRef.current = cy;

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      if (node.id() === 'me') return;
      onNodeSelect?.(node.id(), node.data('label'), node.data('level'));
    });

    cy.on('layoutstop', () => {
      cy.fit(undefined, 40);
    });
  }, [onNodeSelect]);

  return (
    <div
      className="w-full rounded-xl overflow-hidden bg-background border border-border"
      style={{ height: '600px' }}
    >
      <CytoscapeComponent
        elements={elements}
        stylesheet={mindMapStylesheet}
        layout={{
          name: 'cose-bilkent',
          animate: false,
          randomize: true,
          idealEdgeLength: 80,
          nodeRepulsion: 8000,
          nestingFactor: 0.1,
          gravity: 0.15,
          numIter: 3500,
          padding: 40,
          quality: 'proof',
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
