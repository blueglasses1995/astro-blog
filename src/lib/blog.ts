/**
 * Filter out draft posts in production.
 * Draft posts (frontmatter.draft === true) are only visible in development.
 */
export function filterDrafts<T extends { frontmatter?: Record<string, unknown> }>(posts: T[]): T[] {
  if (import.meta.env.DEV) return posts;
  return posts.filter(p => !p.frontmatter?.draft);
}
