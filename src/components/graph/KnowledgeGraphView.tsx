import { useState } from 'react';
import type { GraphTabMode } from '../../types/knowledge-graph';
import { GraphView } from './GraphView';
import { AnalyticsDashboard } from './AnalyticsDashboard';

export function KnowledgeGraphView() {
  const [activeTab, setActiveTab] = useState<GraphTabMode>('graph');

  return (
    <div className="flex flex-col h-[calc(100vh-12rem)] min-h-[500px] rounded-xl border border-border bg-background overflow-hidden">
      {/* Tab Switcher */}
      <div className="flex border-b border-border bg-muted/30">
        <button
          onClick={() => setActiveTab('graph')}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'graph'
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Graph
          {activeTab === 'graph' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('analytics')}
          className={`px-6 py-3 text-sm font-medium transition-colors relative ${
            activeTab === 'analytics'
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Analytics
          {activeTab === 'analytics' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-0">
        {activeTab === 'graph' ? <GraphView /> : <AnalyticsDashboard />}
      </div>
    </div>
  );
}
