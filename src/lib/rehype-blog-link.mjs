import { visit } from 'unist-util-visit';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

/**
 * Gather all terms (titles and aliases) from the content/blog directory.
 * Returns a Map of term -> slug.
 */
function buildTermDictionary() {
  const contentDir = path.join(process.cwd(), 'src/content/blog');
  
  if (!fs.existsSync(contentDir)) {
    console.warn('[rehype-blog-link] src/content/blog directory not found. Skipping auto-linking.');
    return new Map();
  }

  const files = fs.readdirSync(contentDir).filter(file => file.endsWith('.md') || file.endsWith('.mdx'));
  const dictionary = new Map();

  for (const file of files) {
    const content = fs.readFileSync(path.join(contentDir, file), 'utf-8');
    const { data } = matter(content);
    
    // Slug is filename without extension, consistent with Astro's default behavior for content collections
    const slug = file.replace(/\.(md|mdx)$/, '');

    const terms = [];
    if (data.title) terms.push(data.title);
    if (data.aliases && Array.isArray(data.aliases)) {
      terms.push(...data.aliases);
    }

    for (const term of terms) {
      if (typeof term !== 'string' || term.trim() === '') continue;
      
      const normalizedTerm = term.trim();
      
      // Collision detection
      if (dictionary.has(normalizedTerm)) {
        const existingSlug = dictionary.get(normalizedTerm);
        if (existingSlug !== slug) {
          throw new Error(
            `[Wiki Collision] The term "${normalizedTerm}" is defined in multiple files: "${existingSlug}" and "${slug}". Please resolve this conflict by removing the alias from one of the files.`
          );
        }
      }

      dictionary.set(normalizedTerm, slug);
    }
  }

  return dictionary;
}

/**
 * Rehype plugin to auto-link terms.
 */
export function rehypeBlogLink() {
  const dictionary = buildTermDictionary();
  
  // Sort terms by length (descending) to ensure greedy matching
  const sortedTerms = Array.from(dictionary.keys()).sort((a, b) => b.length - a.length);

  return (tree, file) => {
    // Current page slug, used to prevent self-linking
    const currentFilePath = file.history[0];
    const currentFilename = currentFilePath ? path.basename(currentFilePath) : '';
    const currentSlug = currentFilename.replace(/\.(md|mdx)$/, '');

    visit(tree, 'text', (node, index, parent) => {
      // Skip if parent is already a link, code block, or image
      if (parent.tagName === 'a' || parent.tagName === 'code' || parent.tagName === 'pre' || parent.tagName === 'img') {
        return;
      }

      const text = node.value;
      if (!text) return;

      // Find all matches
      const matches = [];
      for (const term of sortedTerms) {
        // Simple case-sensitive match. For more complex matching, regex could be used.
        // We look for the term in the text.
        let startIndex = 0;
        let p = text.indexOf(term, startIndex);
        
        while (p !== -1) {
          // Ensure we don't overlap with already found matches
          const isOverlapping = matches.some(m => 
            (p >= m.start && p < m.end) || (p + term.length > m.start && p + term.length <= m.end)
          );

          if (!isOverlapping) {
             // Self-reference check: don't link if it points to the current page
            const targetSlug = dictionary.get(term);
            if (targetSlug !== currentSlug) {
              matches.push({
                term,
                slug: targetSlug,
                start: p,
                end: p + term.length
              });
            }
          }
           startIndex = p + 1;
           p = text.indexOf(term, startIndex);
        }
      }

      // If no matches, continue
      if (matches.length === 0) return;

      // Sort matches by start index
      matches.sort((a, b) => a.start - b.start);

      // Reconstruct the node with links
      const children = [];
      let lastIndex = 0;

      for (const match of matches) {
        // Text before the match
        if (match.start > lastIndex) {
          children.push({
            type: 'text',
            value: text.slice(lastIndex, match.start)
          });
        }

        // The link
        children.push({
          type: 'element',
          tagName: 'a',
          properties: {
            href: `/blog/${match.slug}`,
            className: ['wiki-link'], // Class for styling
          },
          children: [{ type: 'text', value: match.term }]
        });

        lastIndex = match.end;
      }

      // Text after the last match
      if (lastIndex < text.length) {
        children.push({
          type: 'text',
          value: text.slice(lastIndex)
        });
      }

      // Replace the current text node with the new children
      parent.children.splice(index, 1, ...children);
      
      // Since we replaced the node, we need to skip visiting the new nodes to avoid infinite loops or issues,
      // though 'visit' generally handles array replacement if index is returned.
      // However, typical usage is to return the new index.
      return index + children.length; 
    });
  };
}
