import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to make code blocks toggleable.
 * Wraps each code block (including Expressive Code blocks) in a toggleable container.
 */
export function rehypeToggleableCode() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // Check for Expressive Code blocks first (they use <figure class="expressive-code">)
      const isExpressiveCode = node.tagName === 'figure' && 
        node.properties && 
        node.properties.className && 
        Array.isArray(node.properties.className) &&
        node.properties.className.includes('expressive-code');

      // Check if this is a regular <pre> element containing <code>
      const isRegularPre = node.tagName === 'pre' && 
        node.children && 
        node.children.some(
          child => child.type === 'element' && child.tagName === 'code'
        );

      if (isExpressiveCode || isRegularPre) {
        // Create wrapper div
        const wrapper = {
          type: 'element',
          tagName: 'div',
          properties: {
            className: ['toggleable-code-block'],
            'data-toggleable-code': 'true',
          },
          children: [
            // The original code block element (figure or pre)
            node,
            // Toggle button
            {
              type: 'element',
              tagName: 'button',
              properties: {
                type: 'button',
                className: ['toggleable-code-button'],
                'aria-label': 'Toggle code block',
              },
              children: [
                {
                  type: 'text',
                  value: 'もっと見る'
                },
              ],
            },
          ],
        };

        // Replace the element with the wrapper
        if (parent && parent.children) {
          parent.children[index] = wrapper;
        }
      }
    });
    
    // Debug log
    let codeBlockCount = 0;
    visit(tree, 'element', (node) => {
      if (node.properties && node.properties['data-toggleable-code']) {
        codeBlockCount++;
      }
    });
    if (codeBlockCount > 0) {
      console.log('[rehype-toggleable-code] Wrapped', codeBlockCount, 'code blocks');
    }
  };
}
