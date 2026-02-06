import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { getLocalizedPath } from '../i18n/utils';
import type { SupportedLocale, Translations } from '../types';

interface NavigationProps {
  locale: SupportedLocale;
  translations: Translations;
}

export function Navigation({ locale, translations }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const navItems = [
    { href: '/', label: translations.nav.home },
    { href: '/about', label: translations.nav.about },
    { href: '/portfolio', label: translations.nav.portfolio },
    { href: '/cv', label: translations.nav.cv },
    { href: '/blog', label: translations.nav.blog },
  ];

  // Render mobile menu via portal to escape header's stacking context
  const mobileMenu = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] flex flex-col md:hidden bg-[#eef2ff] dark:bg-[#0a0826]"
        >
          <div className="flex justify-end p-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center flex-1 gap-6">
            {navItems.map((item, index) => (
              <motion.a
                key={item.href}
                href={getLocalizedPath(item.href, locale)}
                className="text-2xl font-medium text-foreground hover:text-primary transition-colors py-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.08 }}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <motion.a
            key={item.href}
            href={getLocalizedPath(item.href, locale)}
            className="relative text-foreground/70 hover:text-foreground transition-colors font-medium text-sm tracking-wide py-2"
            whileHover="hover"
          >
            {item.label}
            <motion.span
              className="absolute left-0 -bottom-0.5 h-[2px] bg-amber-500"
              initial={{ width: 0 }}
              variants={{
                hover: { width: '100%' },
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          </motion.a>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Portal mobile menu to document.body to escape sticky header stacking context */}
      {mounted && createPortal(mobileMenu, document.body)}
    </nav>
  );
}
