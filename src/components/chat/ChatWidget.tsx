import { useState, useRef, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import type { ChatMessage as ChatMessageType, ArticleCitation } from '../../types/knowledge-graph';

// Blog content index for local search
const BLOG_INDEX = [
  {
    slug: 'acid-cap-consistency-difference',
    title: 'ACID特性とCAP定理の「C」は全くの別物である',
    description: '「整合性（Consistency）」という言葉はACIDとCAPで全く異なる概念を指します。',
    tags: ['データベース', '分散システム', 'システム設計', 'ACID', 'CAP定理', 'database', 'distributed', 'consistency'],
    keywords: ['acid', 'cap', 'consistency', '整合性', 'データベース', 'database', 'distributed', '分散', 'theorem', '定理'],
  },
  {
    slug: 'command-pattern-serialization-benefits',
    title: '命令をデータとして扱うと、時間と場所の制約から解放される',
    description: 'GoFのコマンドパターンの精神を継承しつつ、命令をJSON化可能なデータとして設計する方法。',
    tags: ['デザインパターン', 'TypeScript', 'オフライン対応', 'システム設計', '分散システム', 'command', 'pattern', 'design'],
    keywords: ['command', 'pattern', 'serialization', 'json', 'gof', 'design pattern', 'デザインパターン', 'コマンド', 'offline', 'retry', 'typescript'],
  },
  {
    slug: 'infra-cap-availability-difference',
    title: 'CAP定理の「A」はインフラの「可用性」と全くの別物である',
    description: 'CAP定理の可用性（Availability）は、インフラの可用性とは全く異なる概念を指します。',
    tags: ['データベース', '分散システム', 'システム設計', 'CAP定理', 'インフラ', 'availability', 'infrastructure'],
    keywords: ['cap', 'availability', '可用性', 'infra', 'infrastructure', 'インフラ', '分散', 'distributed', 'theorem', '定理'],
  },
];

// Profile knowledge for answering personal questions
const PROFILE_KNOWLEDGE = {
  name: ['松熊利樹', 'Toshiki Matsukuma', 'tosh'],
  role: 'Full-stack engineer with 7+ years in web development',
  location: 'Bangkok, Thailand (raised in Tokyo)',
  skills: ['TypeScript', 'React', 'Apollo Client', 'GraphQL', 'NestJS', 'Python', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS'],
  education: 'University of Tokyo (BA), exchange at Cambridge & Toronto',
  languages: ['Japanese (native)', 'English (TOEIC 960, IELTS 7.0)', 'Chinese (HSK 6)'],
  experience: 'FE tech lead (10-person team), full-stack development, system design, data engineering',
};

function searchBlog(query: string): ArticleCitation[] {
  const lower = query.toLowerCase();
  const results: { article: typeof BLOG_INDEX[0]; score: number }[] = [];

  for (const article of BLOG_INDEX) {
    let score = 0;
    const allText = [
      article.title,
      article.description,
      ...article.tags,
      ...article.keywords,
    ].join(' ').toLowerCase();

    // Check each word in the query
    const words = lower.split(/\s+/).filter(w => w.length > 1);
    for (const word of words) {
      if (allText.includes(word)) score += 2;
      // Partial match
      if (article.keywords.some(k => k.includes(word) || word.includes(k))) score += 3;
    }

    if (score > 0) {
      results.push({ article, score });
    }
  }

  return results
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(r => ({
      slug: r.article.slug,
      title: r.article.title,
      excerpt: r.article.description,
      relevance: Math.min(r.score / 10, 1),
    }));
}

function generateResponse(input: string): { content: string; citations: ArticleCitation[] } {
  const lower = input.toLowerCase();

  // Profile questions
  if (lower.match(/who|だれ|誰|自己紹介|about|profile|プロフィール/)) {
    return {
      content: `I'm ${PROFILE_KNOWLEDGE.name[0]} (${PROFILE_KNOWLEDGE.name[1]}), a full-stack engineer based in ${PROFILE_KNOWLEDGE.location}. ${PROFILE_KNOWLEDGE.education}. I speak ${PROFILE_KNOWLEDGE.languages.join(', ')}.`,
      citations: [],
    };
  }

  if (lower.match(/skill|技術|スキル|tech|stack|得意|what.*know|何.*できる/)) {
    return {
      content: `My core tech stack: ${PROFILE_KNOWLEDGE.skills.join(', ')}. I've led a 10-person frontend team and have experience across the full stack from UI to infrastructure.`,
      citations: [],
    };
  }

  if (lower.match(/experience|経験|経歴|career|仕事|work|job/)) {
    return {
      content: `7+ years of web development experience. Highlights: FE tech lead for a 10-person team at an HR SaaS company, full-stack development for manufacturing SaaS, AI translation microservice architecture, and technical consulting. Check my CV for full details!`,
      citations: [],
    };
  }

  if (lower.match(/contact|連絡|メール|email|hire|採用/)) {
    return {
      content: `You can reach me at contact@tosh-dot-sh.dev. Feel free to check the CV page for more details about my experience, or use the contact form at the bottom of the CV page.`,
      citations: [],
    };
  }

  // Blog content search
  const citations = searchBlog(input);
  if (citations.length > 0) {
    return {
      content: `I found ${citations.length} relevant article${citations.length > 1 ? 's' : ''} on this topic:`,
      citations,
    };
  }

  // Fallback
  return {
    content: "I can help you explore this site! Try asking about:\n• My technical skills and experience\n• Blog topics (ACID, CAP theorem, Command Pattern, distributed systems)\n• How to contact me\n• My background and education",
    citations: [],
  };
}

const WELCOME_MESSAGE: ChatMessageType = {
  role: 'assistant',
  content: "Hi! I'm the tosh.sh assistant. Ask me about blog articles, technical skills, or career background.",
};

const panelVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
  },
  exit: {
    opacity: 0, y: 20, scale: 0.95,
    transition: { duration: 0.15, ease: [0.22, 1, 0.36, 1] },
  },
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessageType[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => { setMounted(true); }, []);

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

      setTimeout(() => {
        const { content: responseContent, citations } = generateResponse(content);
        const assistantMessage: ChatMessageType = {
          role: 'assistant',
          content: responseContent,
          citations,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        setIsLoading(false);
      }, 300);
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
          <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
            <h3 className="text-sm font-semibold text-foreground">
              tosh.sh assistant
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3"
            style={{ minHeight: '200px' }}
          >
            {messages.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
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

          <ChatInput onSend={handleSend} disabled={isLoading} />
        </motion.div>
      )}
    </AnimatePresence>
  );

  const chatButton = (
    <button
      onClick={() => setIsOpen((prev) => !prev)}
      aria-label={isOpen ? 'Close chat' : 'Open chat'}
      className="fixed bottom-20 right-4 z-[9999] w-14 h-14 rounded-full bg-crimson-500 text-white shadow-lg hover:bg-crimson-600 active:scale-95 flex items-center justify-center transition-all"
    >
      {isOpen ? (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      ) : (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-12.375 0C4.5 7.029 8.029 3.5 12.5 3.5S20.5 7.029 20.5 12c0 4.971-3.529 8.5-8 8.5-1.526 0-2.964-.412-4.194-1.13L4.5 20.5l1.13-3.806A8.395 8.395 0 014.5 12z"
          />
        </svg>
      )}
    </button>
  );

  if (!mounted) return null;

  return createPortal(
    <>
      {chatButton}
      {chatPanel}
    </>,
    document.body
  );
}
