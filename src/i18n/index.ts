import type { SupportedLocale, Translations } from '../types';
import jaTranslations from './translations/ja.json';
import enTranslations from './translations/en.json';
import zhTranslations from './translations/zh.json';
import thTranslations from './translations/th.json';
import deTranslations from './translations/de.json';
import frTranslations from './translations/fr.json';
import esTranslations from './translations/es.json';

const translations: Record<SupportedLocale, Translations> = {
  ja: jaTranslations as Translations,
  en: enTranslations as Translations,
  zh: zhTranslations as Translations,
  th: thTranslations as Translations,
  de: deTranslations as Translations,
  fr: frTranslations as Translations,
  es: esTranslations as Translations,
};

export function getTranslations(locale: SupportedLocale): Translations {
  return translations[locale] || translations.ja;
}

export { translations };




