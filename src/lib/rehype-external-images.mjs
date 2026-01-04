import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to ensure external images are properly handled.
 * Adds necessary attributes to external image URLs to ensure they display correctly.
 * This plugin processes both external URLs (http://, https://) and ensures they render properly.
 */
export function rehypeExternalImages() {
  return (tree) => {
    let imageCount = 0;
    let externalImageCount = 0;
    
    visit(tree, 'element', (node) => {
      // Process img elements
      if (node.tagName === 'img' && node.properties && node.properties.src) {
        imageCount++;
        const src = node.properties.src;
        
        console.log('[rehype-external-images] Found image:', {
          src,
          alt: node.properties.alt,
          isExternal: typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'))
        });
        
        // Check if it's an external URL (starts with http:// or https://)
        if (typeof src === 'string' && (src.startsWith('http://') || src.startsWith('https://'))) {
          externalImageCount++;
          
          // Ensure the src is properly set and not modified
          node.properties.src = src;
          
          // Add loading attribute for better performance (lazy loading)
          if (!node.properties.loading) {
            node.properties.loading = 'lazy';
          }
          
          // Add referrerpolicy to allow external images
          // 'no-referrer-when-downgrade' allows images from HTTPS to HTTP
          if (!node.properties.referrerpolicy) {
            node.properties.referrerpolicy = 'no-referrer-when-downgrade';
          }
          
          // Add decoding attribute for better performance
          if (!node.properties.decoding) {
            node.properties.decoding = 'async';
          }
          
          // Ensure alt text exists (fallback if missing)
          if (!node.properties.alt || node.properties.alt === '') {
            node.properties.alt = 'External image';
          }
          
          // Add class for styling if not already present
          const existingClass = node.properties.className || [];
          const classArray = Array.isArray(existingClass) ? existingClass : [existingClass];
          if (!classArray.some(cls => typeof cls === 'string' && cls.includes('external-image'))) {
            node.properties.className = [...classArray, 'external-image'];
          }
          
          console.log('[rehype-external-images] Processed external image:', {
            src: node.properties.src,
            alt: node.properties.alt,
            loading: node.properties.loading,
            referrerpolicy: node.properties.referrerpolicy
          });
        }
      }
    });
    
    if (imageCount > 0) {
      console.log('[rehype-external-images] Processed', imageCount, 'image(s),', externalImageCount, 'external');
    }
  };
}
