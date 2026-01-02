import { visit } from 'unist-util-visit';

/**
 * Generate a URL-friendly slug from heading text.
 * Preserves original characters (including Japanese, Chinese, etc.) for readability.
 * Replaces spaces and special characters with hyphens.
 */
function generateSlugFromText(text) {
  if (!text) return '';
  
  // Remove leading/trailing whitespace
  let slug = text.trim();
  
  // Replace spaces and common punctuation with hyphens
  slug = slug
    .replace(/\s+/g, '-')           // Spaces to hyphens
    .replace(/[^\w\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FAF\u3400-\u4DBF\u20000-\u2A6DF\u2A700-\u2B73F\u2B740-\u2B81F\uF900-\uFAFF-]/g, '') // Remove special chars except CJK and hyphens
    .replace(/-+/g, '-')            // Multiple hyphens to single
    .replace(/^-|-$/g, '');        // Remove leading/trailing hyphens
  
  // Limit length to 50 characters for URL readability
  if (slug.length > 50) {
    slug = slug.substring(0, 50);
    // Remove trailing hyphen if truncated
    slug = slug.replace(/-$/, '');
  }
  
  return slug.toLowerCase();
}

/**
 * Extract text content from a heading node (handles nested elements).
 */
function extractHeadingText(node) {
  if (!node || !node.children) return '';
  
  const textParts = [];
  
  function traverse(n) {
    if (n.type === 'text') {
      textParts.push(n.value);
    } else if (n.children) {
      n.children.forEach(traverse);
    }
  }
  
  node.children.forEach(traverse);
  return textParts.join('');
}

/**
 * Rehype plugin to add sequential IDs to headings (h1-h6).
 * IDs include both sequential number and text-based slug for readability.
 * Format: h1-1-slug, h2-1-slug, h3-1-slug, etc.
 * 
 * This ensures:
 * - Each heading level has IDs starting from 1 (h1-1, h2-1, h3-1, etc.)
 * - Same heading names get different IDs (h2-1-slug, h2-2-slug, etc.)
 * - IDs include readable text for better URL readability
 * - IDs are stable and predictable for linking
 * - IDs are unique within the document
 */
export function rehypeHeadingId() {
  return (tree) => {
    const counters = {
      h1: 0,
      h2: 0,
      h3: 0,
      h4: 0,
      h5: 0,
      h6: 0,
    };

    visit(tree, 'element', (node) => {
      if (node.tagName && /^h[1-6]$/.test(node.tagName)) {
        const level = node.tagName;
        counters[level]++;
        
        // Extract heading text and generate slug
        const headingText = extractHeadingText(node);
        const textSlug = generateSlugFromText(headingText);
        
        // Generate ID: h2-1-slug or h2-1 if no text
        // Format: {level}-{counter}-{slug}
        const id = textSlug 
          ? `${level}-${counters[level]}-${textSlug}`
          : `${level}-${counters[level]}`;
        
        // Add ID to properties (override existing ID if any)
        if (!node.properties) {
          node.properties = {};
        }
        node.properties.id = id;
      }
    });

    // Debug: Log total headings processed
    const totalHeadings = Object.values(counters).reduce((sum, count) => sum + count, 0);
    if (totalHeadings > 0) {
      console.log('[rehype-heading-id] Processed', totalHeadings, 'headings with IDs');
    }
  };
}
