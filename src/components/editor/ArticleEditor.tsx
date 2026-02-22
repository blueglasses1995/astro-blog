import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import type { AnalysisResult } from '../../types/knowledge-graph';

const EASING = [0.22, 1, 0.36, 1] as const;

const DEFAULT_TEXT = `# Getting Started with Astro and React

Astro is a modern static site generator that supports multiple UI frameworks through its Islands Architecture. In this article, we'll explore how to integrate React components into an Astro project.

## Why Astro?

Astro provides excellent performance by default, shipping zero JavaScript to the client unless explicitly needed. This makes it perfect for content-focused websites like blogs and documentation sites.

## Setting Up React in Astro

First, install the React integration using the Astro CLI. Then create your interactive React components and use them with client directives like \`client:load\` or \`client:visible\`.

## Conclusion

The combination of Astro and React gives you the best of both worlds: fast static sites with interactive islands where needed.
`;

export function ArticleEditor() {
  const [text, setText] = useState(DEFAULT_TEXT);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const workerRef = useRef<Worker | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL('../../workers/analysis.worker.ts', import.meta.url),
      { type: 'module' },
    );

    workerRef.current.onmessage = (event: MessageEvent<AnalysisResult>) => {
      setAnalysis(event.data);
    };

    return () => {
      workerRef.current?.terminate();
    };
  }, []);

  const analyzeText = useCallback((content: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      workerRef.current?.postMessage({ text: content });
    }, 300);
  }, []);

  useEffect(() => {
    analyzeText(text);
  }, [text, analyzeText]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-full">
      {/* Editor pane */}
      <div className="flex flex-col rounded-xl border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b bg-muted/30">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
          <span className="text-xs font-medium text-muted-foreground">Editor</span>
        </div>
        <textarea
          value={text}
          onChange={e => setText(e.target.value)}
          className="flex-1 w-full resize-none bg-transparent p-4 text-sm text-foreground font-mono leading-relaxed focus:outline-none placeholder:text-muted-foreground min-h-[400px] lg:min-h-0"
          placeholder="Write your article here..."
          spellCheck={false}
        />
      </div>

      {/* Analysis pane */}
      <div className="flex flex-col rounded-xl border bg-card overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-2.5 border-b bg-muted/30">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted-foreground">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span className="text-xs font-medium text-muted-foreground">Analysis</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {analysis ? (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 gap-3">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, ease: EASING as unknown as number[] }}
                  className="rounded-lg bg-muted/50 p-3"
                >
                  <p className="text-xs text-muted-foreground mb-1">Word Count</p>
                  <p className="text-2xl font-bold text-foreground">{analysis.wordCount.toLocaleString()}</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: EASING as unknown as number[] }}
                  className="rounded-lg bg-muted/50 p-3"
                >
                  <p className="text-xs text-muted-foreground mb-1">Reading Time</p>
                  <p className="text-2xl font-bold text-foreground">{analysis.readingTime} <span className="text-sm font-normal text-muted-foreground">min</span></p>
                </motion.div>
              </div>

              {/* Suggested tags */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2, ease: EASING as unknown as number[] }}
              >
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Suggested Tags</h4>
                {analysis.suggestedTags.length > 0 ? (
                  <div className="flex flex-wrap gap-1.5">
                    {analysis.suggestedTags.map(tag => (
                      <span
                        key={tag}
                        className="inline-block text-xs px-2 py-0.5 rounded bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground/70">Write more content to detect tags.</p>
                )}
              </motion.div>

              {/* Similar articles */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3, ease: EASING as unknown as number[] }}
              >
                <h4 className="text-xs font-medium text-muted-foreground mb-2">Similar Articles</h4>
                {analysis.similarArticles.length > 0 ? (
                  <div className="space-y-2">
                    {analysis.similarArticles.map(article => (
                      <div key={article.slug} className="flex items-center justify-between rounded-lg border p-2.5">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-0.5 h-6 rounded-full bg-crimson-500 flex-shrink-0" />
                          <span className="text-xs text-foreground truncate">{article.title}</span>
                        </div>
                        <span className="text-[10px] text-muted-foreground ml-2 flex-shrink-0">
                          {Math.round(article.similarity * 100)}%
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground/70">No similar articles detected.</p>
                )}
              </motion.div>
            </>
          ) : (
            <div className="flex items-center justify-center h-32 text-sm text-muted-foreground">
              Analyzing...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
