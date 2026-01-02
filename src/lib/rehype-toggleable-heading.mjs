import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to make H1 and H2 headings toggleable.
 * Wraps each heading and its content (until the next heading of same or higher level) in a toggleable container.
 */
export function rehypeToggleableHeading() {
  return (tree) => {
    const headingSections = [];

    // First pass: collect all H1 and H2 elements and their positions
    visit(tree, 'element', (node, index, parent) => {
      if ((node.tagName === 'h1' || node.tagName === 'h2') && parent) {
        headingSections.push({
          headingNode: node,
          headingIndex: index,
          parent: parent,
          level: parseInt(node.tagName.charAt(1)), // 1 for h1, 2 for h2
        });
      }
    });

    // Debug: Log if heading sections found
    if (headingSections.length > 0) {
      console.log('[rehype-toggleable-heading] Found', headingSections.length, 'heading sections (H1/H2)');
    }

    // Second pass: wrap each heading section
    // Process in reverse order to maintain indices
    for (let i = headingSections.length - 1; i >= 0; i--) {
      const { headingNode, headingIndex, parent, level } = headingSections[i];

      if (!parent || headingIndex === undefined) {
        continue;
      }

      // Find the end of this section (next heading of same or higher level, or end of parent)
      // endIndex should point to the last element BEFORE the next heading of same or higher level
      let endIndex = headingIndex;
      
      // Check if there are any children after this heading
      if (headingIndex + 1 < parent.children.length) {
        for (let j = headingIndex + 1; j < parent.children.length; j++) {
          const child = parent.children[j];
          
          // Skip if this child is already wrapped (has data-toggleable-heading)
          if (child.type === 'element' && 
              child.properties && 
              child.properties['data-toggleable-heading']) {
            // This is already a wrapped heading section, stop here
            endIndex = j - 1;
            break;
          }
          
          // Check if this is a heading element
          if (child.type === 'element' && child.tagName && /^h[1-6]$/.test(child.tagName)) {
            const childLevel = parseInt(child.tagName.charAt(1));
            // Stop if we hit a heading of same or higher level
            // endIndex should be j - 1 (the element before this heading)
            if (childLevel <= level) {
              endIndex = j - 1;
              break;
            }
          }
          endIndex = j;
        }
      }

      // Ensure endIndex is at least headingIndex (in case there are no children)
      if (endIndex < headingIndex) {
        endIndex = headingIndex;
      }

      // Get all children in this section
      const sectionChildren = parent.children.slice(headingIndex, endIndex + 1);
      const contentChildren = sectionChildren.slice(1); // Everything except the heading
      
      // Debug log
      console.log(`[rehype-toggleable-heading] Wrapping ${headingNode.tagName} at index ${headingIndex}, endIndex: ${endIndex}, contentChildren: ${contentChildren.length}`);

      // Create wrapper div
      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['toggleable-heading-section'],
          'data-toggleable-heading': 'true',
        },
        children: [
          // Header with H1 and toggle button
          {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['toggleable-heading-header'],
            },
            children: [
              {
                type: 'element',
                tagName: 'button',
                properties: {
                  type: 'button',
                  className: ['toggleable-heading-button'],
                  'aria-expanded': 'true',
                  'aria-label': 'Toggle section',
                },
                children: [
                  {
                    type: 'element',
                    tagName: 'svg',
                    properties: {
                      className: ['toggleable-heading-icon'],
                      width: '20',
                      height: '20',
                      viewBox: '0 0 20 20',
                      fill: 'none',
                      'aria-hidden': 'true',
                    },
                    children: [
                      {
                        type: 'element',
                        tagName: 'path',
                        properties: {
                          d: 'M6 8l4 4 4-4',
                          stroke: 'currentColor',
                          'stroke-width': '2',
                          'stroke-linecap': 'round',
                          'stroke-linejoin': 'round',
                        },
                      },
                    ],
                  },
                  headingNode, // The heading element (H1 or H2)
                ],
              },
            ],
          },
          // Content wrapper
          {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['toggleable-heading-content'],
            },
            children: contentChildren,
          },
        ],
      };

      // Replace the section with the wrapper
      parent.children.splice(headingIndex, endIndex - headingIndex + 1, wrapper);
    }
  };
}
