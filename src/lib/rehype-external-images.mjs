import { visit } from 'unist-util-visit';

/**
 * Rehype plugin for image optimization and external image handling.
 * - Adds loading="lazy" and decoding="async" to ALL images
 * - Adds referrerpolicy and fallback alt to external images
 */
export function rehypeExternalImages() {
  return (tree) => {
    visit(tree, 'element', (node) => {
      if (node.tagName === 'img' && node.properties && node.properties.src) {
        const src = node.properties.src;

        // Add lazy loading and async decoding to ALL images
        if (!node.properties.loading) {
          node.properties.loading = 'lazy';
        }
        if (!node.properties.decoding) {
          node.properties.decoding = 'async';
        }

        // External image specific handling
        if (typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'))) {
          if (!node.properties.referrerpolicy) {
            node.properties.referrerpolicy = 'no-referrer-when-downgrade';
          }

          if (!node.properties.alt || node.properties.alt === '') {
            node.properties.alt = 'External image';
          }

          const existingClass = node.properties.className || [];
          const classArray = Array.isArray(existingClass) ? existingClass : [existingClass];
          if (!classArray.some(cls => typeof cls === 'string' && cls.includes('external-image'))) {
            node.properties.className = [...classArray, 'external-image'];
          }
        }
      }
    });
  };
}
