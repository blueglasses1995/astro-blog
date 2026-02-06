import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Github, Linkedin, Mail } from 'lucide-react';
import { getLocalizedPath, defaultLocale } from '../i18n/utils';
import type { SupportedLocale, Translations } from '../types';

interface HeroProps {
  name: string;
  title: string;
  bio: string;
  locale?: SupportedLocale;
  translations?: Translations;
}

export function Hero({ name, title, bio, locale = defaultLocale, translations }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, x: -40 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const fadeUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const nameChars = name.split('');

  return (
    <section className="relative min-h-[55vh] sm:min-h-[65vh] flex items-end overflow-hidden pb-12 sm:pb-16 md:pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-5xl"
        >
          {/* Oversized Name */}
          <motion.h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-serif font-black tracking-tight leading-[0.9] mb-6"
          >
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                variants={letterVariants}
                className="inline-block"
                style={{ display: char === ' ' ? 'inline' : 'inline-block' }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </motion.h1>

          {/* Title with amber accent bar */}
          <motion.div
            variants={fadeUpVariants}
            className="flex items-center gap-4 mb-6"
          >
            <div className="w-12 h-[3px] bg-amber-500 shrink-0" />
            <span className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-medium tracking-wide">
              {title}
            </span>
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={fadeUpVariants}
            className="text-base sm:text-lg text-muted-foreground max-w-xl leading-relaxed mb-8"
          >
            {bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUpVariants}
            className="flex flex-wrap gap-3 sm:gap-4 mb-8"
          >
            <Button asChild size="lg" className="bg-amber-500 hover:bg-amber-600 text-white border-0">
              <a href={getLocalizedPath('/portfolio', locale)}>
                {translations?.hero?.viewPortfolio ?? 'ポートフォリオを見る'}
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={getLocalizedPath('/cv', locale)}>{translations?.hero?.cvResume ?? 'CV / 履歴書'}</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href={getLocalizedPath('/about', locale)}>{translations?.hero?.aboutMe ?? '私について'}</a>
            </Button>
          </motion.div>

          {/* Social Links - minimal */}
          <motion.div
            variants={fadeUpVariants}
            className="flex gap-4 items-center"
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:your.email@example.com"
              aria-label="Email"
              className="text-muted-foreground hover:text-foreground transition-colors"
              whileHover={{ y: -2 }}
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
