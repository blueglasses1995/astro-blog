import type { SupportedLocale } from '../types';

export const defaultLocale: SupportedLocale = 'en';
export const supportedLocales: SupportedLocale[] = ['ja', 'en', 'zh', 'th', 'de', 'fr', 'es'];

export const localeNames: Record<SupportedLocale, string> = {
  ja: '日本語',
  en: 'English',
  zh: '中文',
  th: 'ไทย',
  de: 'Deutsch',
  fr: 'Français',
  es: 'Español',
};

export function getLocaleFromPath(pathname: string): SupportedLocale {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];
  
  if (supportedLocales.includes(firstSegment as SupportedLocale)) {
    return firstSegment as SupportedLocale;
  }
  
  return defaultLocale;
}

export function getLocalizedPath(pathname: string, locale: SupportedLocale): string {
  const pathWithoutLocale = getPathWithoutLocale(pathname);
  if (locale === defaultLocale) {
    return pathWithoutLocale;
  }
  return `/${locale}${pathWithoutLocale}`;
}

export function getPathWithoutLocale(pathname: string): string {
  const segments = pathname.split('/').filter(Boolean);
  
  if (supportedLocales.includes(segments[0] as SupportedLocale)) {
    segments.shift();
  }
  
  return '/' + segments.join('/');
}




