import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType, ArticleCitation } from '../../types/knowledge-graph';

// TODO: Replace with useChat() from 'ai/react' when API is configured

function getMockResponse(input: string): { content: string; citations: ArticleCitation[] } {
  const lower = input.toLowerCase();

  if (lower.includes('react')) {
    return {
      content:
        'Great question! I have an article about using React with Astro that covers component integration, hydration strategies, and best practices.',
      citations: [
        {
          slug: 'react-with-astro',
          title: 'AstroでReactを使う方法',
          excerpt: 'AstroプロジェクトでReactコンポーネントを効果的に使用する方法',
          relevance: 0.95,
        },
      ],
    };
  }

  if (lower.includes('astro')) {
    return {
      content:
        'Astro is the foundation of this blog! I wrote about the Islands Architecture pattern and how it enables partial hydration for optimal performance.',
      citations: [
        {
          slug: 'astro-islands-architecture',
          title: 'Astro Islands Architecture',
          excerpt: 'Astroのアイランドアーキテクチャによる部分的ハイドレーションの仕組み',
          relevance: 0.92,
        },
      ],
    };
  }

  if (lower.includes('tailwind') || lower.includes('shadcn')) {
    return {
      content:
        'I have a detailed guide on setting up shadcn/ui with Tailwind CSS, including theming, dark mode, and component customization.',
      citations: [
        {
          slug: 'shadcn-ui-tailwind-setup',
          title: 'shadcn/ui + Tailwind CSSのセットアップ',
          excerpt: 'shadcn/uiとTailwind CSSを使ったモダンなUIコンポーネントの構築方法',
          relevance: 0.9,
        },
      ],
    };
  }

  return {
    content:
      "I can help you explore this blog! Try asking about React, Astro, or Tailwind to discover relevant articles.",
    citations: [],
  };
}

const WELCOME_MESSAGE: ChatMessageType = {
  role: 'assistant',
  content: "Hi! I can help you find articles on this blog. Ask me about React, Astro, Tailwind, or any topic you're interested in.",
};

const panelVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.95,
    transition: {
      duration: 0.15,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = useCallback(
    (content: string) => {
      if (isLoading) return;

      const userMessage: ChatMessageType = { role: 'user', content };
      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      // Simulate network delay for mock mode
      setTimeout(() => {
        const { content: responseContent, citations } = getMockResponse(content);
        const assistantMessage: ChatMessageType = {
          role: 'assistant',
          content: responseContent,
          citations,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 600);
    },
    [isLoading]
  );

  const chatPanel = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-36 right-4 z-[9998] w-[min(400px,calc(100vw-2rem))] flex flex-col rounded-xl border border-border bg-card shadow-2xl overflow-hidden"
          style={{ maxHeight: 'min(500px, calc(100vh - 8rem))' }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
            <h3 className="text-sm font-semibold text-foreground">
              Ask about this blog
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ minHeight: '200px' }}
          >
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {isLoading && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex justify-start"
              >
                <div className="bg-card border border-border rounded-xl px-4 py-3">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:0ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:150ms]" />
                    <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60 animate-bounce [animation-delay:300ms]" />
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input */}
          <ChatInput onSend={handleSend} disabled={isLoading} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  const chatButton = (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      className="fixed bottom-20 right-4 z-[9999] w-14 h-14 rounded-full bg-amber-500 text-white shadow-lg hover:bg-amber-600 active:scale-95 flex items-center justify-center transition-all"
    >
      {isOpen ? (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-12.375 0C4.5 7.029 8.029 3.5 12.5 3.5S20.5 7.029 20.5 12c0 4.971-3.529 8.5-8 8.5-1.526 0-2.964-.412-4.194-1.13L4.5 20.5l1.13-3.806A8.395 8.395 0 014.5 12z"
          />
        </svg>
      )}
    </button>
  );

  // Portal everything to body to escape Astro island stacking context
  if (!mounted) return null;

  return createPortal(
    <>
      {chatButton}
      {chatPanel}
    </>,
    document.body
  );
}
