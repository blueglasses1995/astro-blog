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

/**
 * 指定ロケールの翻訳を取得。存在しない場合は英語にフォールバック。
 */
export function getTranslations(locale: SupportedLocale): Translations {
  return translations[locale] || translations.en;
}

/**
 * ネストされた翻訳キーを安全に取得するヘルパー。
 * キーが見つからない場合は英語にフォールバック → キー名をそのまま返す。
 *
 * @example t(locale, 'nav.home') → "ホーム" | "Home" | ...
 */
export function t(locale: SupportedLocale, keyPath: string): string {
  const resolve = (obj: Record<string, any>, path: string): string | undefined => {
    const parts = path.split('.');
    let current: any = obj;
    for (const part of parts) {
      if (current == null || typeof current !== 'object') return undefined;
      current = current[part];
    }
    return typeof current === 'string' ? current : undefined;
  };

  const localeTranslations = translations[locale] || translations.en;
  const value = resolve(localeTranslations as any, keyPath);
  if (value !== undefined) return value;

  // Fallback to English
  const fallback = resolve(translations.en as any, keyPath);
  return fallback !== undefined ? fallback : keyPath;
}

export { translations };
