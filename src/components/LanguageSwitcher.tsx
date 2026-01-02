import { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import { defaultLocale, supportedLocales, localeNames, getLocalizedPath } from '../i18n/utils';
import type { SupportedLocale } from '../types';

interface LanguageSwitcherProps {
  currentLocale: SupportedLocale;
  currentPath: string;
}

export function LanguageSwitcher({ currentLocale, currentPath }: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-switcher')) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  const handleLanguageChange = (locale: SupportedLocale) => {
    const newPath = getLocalizedPath(currentPath, locale);
    window.location.href = newPath;
  };

  return (
    <div className="language-switcher relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
        aria-label="Change language"
      >
        <Globe className="w-4 h-4" />
        <span className="hidden sm:inline">{localeNames[currentLocale]}</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 bg-background border rounded-lg shadow-lg z-50">
          <div className="py-1">
            {supportedLocales.map((locale) => (
              <button
                key={locale}
                onClick={() => handleLanguageChange(locale)}
                className={`w-full text-left px-4 py-2 text-sm hover:bg-muted transition-colors ${
                  locale === currentLocale ? 'bg-muted font-medium' : ''
                }`}
              >
                {localeNames[locale]}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}




