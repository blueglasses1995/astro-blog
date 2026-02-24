import type { CVProject } from './cv-details';
import { cvProjects } from './cv-details';
import type { SupportedLocale } from '../types';

// Lazy imports for each locale's translated CV data
import { cvProjectsEn } from './cv-details-en';
import { cvProjectsZh } from './cv-details-zh';
import { cvProjectsTh } from './cv-details-th';
import { cvProjectsDe } from './cv-details-de';
import { cvProjectsFr } from './cv-details-fr';
import { cvProjectsEs } from './cv-details-es';

const localeMap: Record<SupportedLocale, CVProject[]> = {
  ja: cvProjects,
  en: cvProjectsEn,
  zh: cvProjectsZh,
  th: cvProjectsTh,
  de: cvProjectsDe,
  fr: cvProjectsFr,
  es: cvProjectsEs,
};

export function getLocalizedCVProjects(locale: SupportedLocale): CVProject[] {
  return localeMap[locale] || cvProjects;
}
