import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to shift H1 headings down to H2 in markdown content.
 * Prevents duplicate H1 when the page template already provides the H1 title.
 * Only H1 is shifted; H2–H6 are left as-is.
 */
export function rehypeHeadingShift() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'h1') {
        node.tagName = 'h2';
      }
    });
  };
}
