/**
 * Markdownスタイルの生成と管理
 */

import type { MarkdownStyleConfig } from './markdown-config';
import { defaultStyleConfig } from './markdown-config';

/**
 * スタイルクラス文字列を生成
 */
export function generateMarkdownStyles(
  config: MarkdownStyleConfig = defaultStyleConfig
): string {
  const classes = [
    config.baseClasses,
    config.darkMode ? 'dark:prose-invert' : '',
    config.elementStyles.headings,
    config.elementStyles.paragraphs,
    config.elementStyles.links,
    config.elementStyles.code,
    config.elementStyles.blockquote,
    config.elementStyles.lists,
    config.elementStyles.tables,
    config.elementStyles.images,
    config.elementStyles.horizontalRule,
  ]
    .filter(Boolean)
    .join(' ');

  return classes;
}

/**
 * カスタムスタイル設定をマージ
 */
export function mergeStyleConfig(
  base: MarkdownStyleConfig,
  overrides: Partial<MarkdownStyleConfig>
): MarkdownStyleConfig {
  return {
    ...base,
    ...overrides,
    elementStyles: {
      ...base.elementStyles,
      ...overrides.elementStyles,
    },
  };
}
