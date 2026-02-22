import { useRef, useCallback, useState } from 'react';
import type { ElementDefinition, Core } from 'cytoscape';
import CytoscapeComponent from 'react-cytoscapejs';
import { flattenSkills, domainColors } from './skills-data';

// Level-to-ring mapping (concentric rings)
// 5 = Expert (innermost), 4 = Proficient, 3 = Familiar, 2 = Learning (outermost)
const levelToRing: Record<number, number> = { 5: 0, 4: 1, 3: 2, 2: 3, 1: 3 };
const ringLabels = ['Expert', 'Proficient', 'Familiar', 'Learning'];

function buildElements(): ElementDefinition[] {
  const flat = flattenSkills();
  // Only leaf and mid-level nodes, skip top-level domains (they're the quadrants)
  const skillNodes = flat.filter((s) => s.depth > 0);

  const nodes: ElementDefinition[] = skillNodes.map((s) => ({
    data: {
      id: s.id,
      label: s.name,
      level: s.level,
      domain: s.domain,
      ring: levelToRing[s.level] ?? 3,
    },
  }));

  // No edges in radar view - it's a pure positional visualization
  return nodes;
}

const radarStylesheet: any[] = [
  {
    selector: 'node',
    style: {
      'background-color': (ele: any) => {
        const domain = ele.data('domain');
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
      'font-size': 10,
      width: (ele: any) => {
        const level = ele.data('level') as number;
        return 14 + level * 6;
      },
      height: (ele: any) => {
        const level = ele.data('level') as number;
        return 14 + level * 6;
      },
      'background-opacity': 0.9,
      'border-width': 2,
      'border-color': (ele: any) => {
        const domain = ele.data('domain');
        return domainColors[domain] || '#6366f1';
      },
      'border-opacity': 0.4,
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
    selector: 'node:selected',
    style: {
      'border-width': 4,
      'border-color': '#c41230',
      'border-opacity': 1,
    } as any,
  },
];

interface SkillTreeRadarProps {
  onNodeSelect?: (nodeId: string, name: string, level: number) => void;
}

export function SkillTreeRadar({ onNodeSelect }: SkillTreeRadarProps) {
  const cyRef = useRef<Core | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const elements = buildElements();
  const [rings, setRings] = useState<{ label: string; radius: number }[]>([]);

  const handleCyRef = useCallback((cy: Core) => {
    cyRef.current = cy;

    cy.on('tap', 'node', (evt) => {
      const node = evt.target;
      onNodeSelect?.(node.id(), node.data('label'), node.data('level'));
    });

    cy.on('layoutstop', () => {
      cy.fit(undefined, 40);

      // Compute ring radii from actual rendered node positions
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const containerCenterX = containerRect.width / 2;
      const containerCenterY = containerRect.height / 2;

      // Group nodes by their concentric level and find max rendered distance per ring
      const ringDistances: Record<number, number> = {};
      cy.nodes().forEach((node) => {
        const level = node.data('level') as number;
        const pos = node.renderedPosition();
        const dx = pos.x - containerCenterX;
        const dy = pos.y - containerCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (!ringDistances[level] || dist > ringDistances[level]) {
          ringDistances[level] = dist;
        }
      });

      // Build ring data: levels 5,4,3,2 map to Expert,Proficient,Familiar,Learning
      const levelOrder = [5, 4, 3, 2];
      const computed: { label: string; radius: number }[] = [];
      levelOrder.forEach((level, i) => {
        const dist = ringDistances[level];
        if (dist !== undefined) {
          // Add padding so ring sits between this level and the next
          const nextDist = ringDistances[levelOrder[i + 1]];
          const radius = nextDist !== undefined
            ? (dist + nextDist) / 2
            : dist + 30;
          computed.push({ label: ringLabels[i], radius });
        }
      });

      setRings(computed);
    });
  }, [onNodeSelect]);

  return (
    <div ref={containerRef} className="w-full rounded-xl overflow-hidden relative" style={{ height: '600px' }}>
      {/* Dynamic ring labels overlay */}
      {rings.length > 0 && (
        <div className="absolute inset-0 pointer-events-none z-10 flex items-center justify-center">
          {rings.map(({ label, radius }) => (
            <div
              key={label}
              className="absolute rounded-full border border-dashed"
              style={{
                width: radius * 2,
                height: radius * 2,
                borderColor: 'rgba(148, 163, 184, 0.2)',
              }}
            >
              <span
                className="absolute text-xs text-muted-foreground"
                style={{
                  top: -8,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: 10,
                  whiteSpace: 'nowrap',
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
      {/* Cytoscape graph */}
      <div className="w-full h-full bg-background border border-border rounded-xl">
        <CytoscapeComponent
          elements={elements}
          stylesheet={radarStylesheet}
          layout={{
            name: 'concentric',
            concentric: (node: any) => {
              return node.data('level') as number;
            },
            levelWidth: () => 1,
            equidistant: true,
            minNodeSpacing: 40,
            padding: 50,
            clockwise: true,
            startAngle: (3 / 2) * Math.PI,
            animate: false,
          } as any}
          cy={handleCyRef}
          style={{ width: '100%', height: '100%' }}
          userZoomingEnabled={true}
          userPanningEnabled={true}
          boxSelectionEnabled={false}
        />
      </div>
      {/* Domain legend */}
      <div className="absolute bottom-3 right-3 flex flex-wrap gap-2 z-10">
        {Object.entries(domainColors).map(([domain, color]) => (
          <div
            key={domain}
            className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs bg-card/80 backdrop-blur-sm border border-border"
          >
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ background: color }}
            />
            <span className="text-muted-foreground capitalize">
              {domain === 'ai-ml' ? 'AI/ML' : domain}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
