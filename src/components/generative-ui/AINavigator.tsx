import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DynamicRenderer } from './DynamicRenderer';
import type { GeneratedUI } from '../../types/knowledge-graph';

const EASING = [0.22, 1, 0.36, 1] as const;

function generateMockUI(query: string): GeneratedUI {
  const q = query.toLowerCase().trim();

  if (q.includes('react')) {
    return {
      layout: 'grid',
      components: [
        {
          type: 'article-card',
          slug: 'react-with-astro',
          highlight: 'Learn how to integrate React components into Astro for interactive islands.',
        },
        {
          type: 'skill-highlight',
          skillId: 'react',
        },
      ],
    };
  }

  if (q.includes('astro')) {
    return {
      layout: 'grid',
      components: [
        {
          type: 'article-card',
          slug: 'astro-islands-architecture',
          highlight: 'Deep dive into Astro Islands Architecture and partial hydration.',
        },
        {
          type: 'article-card',
          slug: 'react-with-astro',
          highlight: 'Practical guide to using React within Astro projects.',
        },
      ],
    };
  }

  if (q.includes('frontend') || q.includes('ui') || q.includes('css')) {
    return {
      layout: 'grid',
      components: [
        {
          type: 'summary',
          text: 'This blog covers frontend development topics including Astro, React, Tailwind CSS, and component architecture. Browse the articles below to explore.',
        },
        {
          type: 'skill-highlight',
          skillId: 'frontend',
        },
      ],
    };
  }

  if (q.includes('tailwind') || q.includes('shadcn')) {
    return {
      layout: 'grid',
      components: [
        {
          type: 'article-card',
          slug: 'shadcn-ui-tailwind-setup',
          highlight: 'Setting up shadcn/ui with Tailwind CSS for beautiful, accessible components.',
        },
        {
          type: 'skill-highlight',
          skillId: 'tailwind',
        },
      ],
    };
  }

  // Default
  return {
    layout: 'focus',
    components: [
      {
        type: 'summary',
        text: `I can help you explore topics like React, Astro, Tailwind CSS, frontend development, and more. Try asking about a specific technology!`,
      },
    ],
  };
}

export function AINavigator() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState<GeneratedUI | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim() || isLoading) return;

      setIsLoading(true);
      setResult(null);

      // Simulate streaming delay
      setTimeout(() => {
        const ui = generateMockUI(query);
        setResult(ui);
        setIsLoading(false);
      }, 600);
    },
    [query, isLoading],
  );

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="What are you interested in?"
            className="flex-1 rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background transition-shadow"
          />
          <button
            type="submit"
            disabled={isLoading || !query.trim()}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <svg
                className="animate-spin h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="20" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            )}
            Explore
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex items-center gap-2 text-sm text-muted-foreground py-4"
          >
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
            Generating results...
          </motion.div>
        )}

        {result && !isLoading && (
          <motion.div
            key="result"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASING as unknown as number[] }}
          >
            <DynamicRenderer ui={result} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
