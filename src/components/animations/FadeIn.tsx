import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'left';
  className?: string;
}

export function FadeIn({ children, delay = 0, duration = 0.6, direction = 'up', className }: FadeInProps) {
  const initial = direction === 'left'
    ? { opacity: 0, x: -30 }
    : { opacity: 0, y: 20 };

  const animate = direction === 'left'
    ? { opacity: 1, x: 0 }
    : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: '0px' }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
