import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react';

interface HeroProps {
  name: string;
  title: string;
  bio: string;
}

export function Hero({ name, title, bio }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10" />
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
          }}
        />
      </div>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center"
        >
          {/* Avatar with glow effect */}
          <motion.div
            variants={itemVariants}
            className="relative w-32 h-32 mx-auto mb-8"
          >
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-purple-600 blur-2xl opacity-50"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="relative w-full h-full rounded-full bg-gradient-to-br from-primary to-purple-600 p-1">
              <div className="w-full h-full rounded-full bg-background flex items-center justify-center text-4xl font-bold">
                {name.charAt(0)}
              </div>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold mb-4"
          >
            <span className="bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
              {name}
            </span>
          </motion.h1>

          {/* Title with typing effect */}
          <motion.div
            variants={itemVariants}
            className="text-2xl md:text-3xl text-muted-foreground mb-6 font-medium"
          >
            {title}
          </motion.div>

          {/* Bio */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed"
          >
            {bio}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap gap-4 justify-center mb-12"
          >
            <Button asChild size="lg" className="group">
              <a href="/portfolio">
                ポートフォリオを見る
                <motion.span
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/cv">CV / 履歴書</a>
            </Button>
            <Button asChild variant="outline" size="lg">
              <a href="/about">私について</a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 justify-center"
          >
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Github className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Linkedin className="w-5 h-5" />
            </motion.a>
            <motion.a
              href="mailto:your.email@example.com"
              className="w-12 h-12 rounded-full bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Mail className="w-5 h-5" />
            </motion.a>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex flex-col items-center gap-2 text-muted-foreground"
            >
              <span className="text-sm">スクロール</span>
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
