import { motion } from 'framer-motion';
import type { ChatMessage as ChatMessageType, ArticleCitation } from '../../types/knowledge-graph';

interface ChatMessageProps {
  message: ChatMessageType;
}

function CitationCard({ citation }: { citation: ArticleCitation }) {
  return (
    <a
      href={`/blog/${citation.slug}`}
      className="block mt-2 p-2.5 rounded-lg border border-border bg-secondary/50 hover:bg-secondary transition-colors group"
    >
      <div className="flex items-start gap-2">
        <svg
          className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-amber-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
          />
        </svg>
        <div className="min-w-0">
          <p className="text-xs font-medium text-foreground group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight truncate">
            {citation.title}
          </p>
          <p className="text-[11px] text-muted-foreground mt-0.5 leading-snug line-clamp-2">
            {citation.excerpt}
          </p>
        </div>
      </div>
    </a>
  );
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      <div
        className={`max-w-[85%] rounded-xl px-3.5 py-2.5 ${
          isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-card border border-border text-card-foreground'
        }`}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        {message.citations && message.citations.length > 0 && (
          <div className="mt-1.5 space-y-1.5">
            {message.citations.map((citation) => (
              <CitationCard key={citation.slug} citation={citation} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
