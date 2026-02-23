import { visit } from 'unist-util-visit';

/**
 * Rehype plugin to make H2 headings toggleable.
 * Wraps each heading and its content (until the next heading of same or higher level) in a toggleable container.
 *
 * Structure:
 *   <div class="toggleable-heading-section toggleable-heading-level-2">
 *     <div class="toggleable-heading-header">
 *       <button class="toggleable-heading-button" aria-expanded="true" aria-label="Toggle section">
 *         <svg class="toggleable-heading-icon">...</svg>
 *       </button>
 *       <h2 id="...">Heading text</h2>   ← heading is a SIBLING of the button
 *     </div>
 *     <div class="toggleable-heading-content">...</div>
 *   </div>
 *
 * This structure avoids nesting a <button> (HeadingLinkIcon) inside another <button>.
 */
export function rehypeToggleableHeading() {
  return (tree) => {
    const headingSections = [];

    // Collect H2 elements (H1 is reserved for the page title in the template)
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName === 'h2' && parent) {
        headingSections.push({
          headingNode: node,
          headingIndex: index,
          parent: parent,
          level: 2,
        });
      }
    });

    // Process in reverse order to maintain indices
    for (let i = headingSections.length - 1; i >= 0; i--) {
      const { headingNode, headingIndex, parent, level } = headingSections[i];

      if (!parent || headingIndex === undefined) {
        continue;
      }

      // Find the end of this section: next H2 or H1
      let endIndex = headingIndex;

      if (headingIndex + 1 < parent.children.length) {
        for (let j = headingIndex + 1; j < parent.children.length; j++) {
          const child = parent.children[j];

          // Check if already wrapped
          if (child.type === 'element' &&
              child.properties &&
              child.properties['data-toggleable-heading']) {
            endIndex = j - 1;
            break;
          }

          // Check if heading of same or higher level
          if (child.type === 'element' && child.tagName && /^h[12]$/.test(child.tagName)) {
            endIndex = j - 1;
            break;
          }
          endIndex = j;
        }
      }

      if (endIndex < headingIndex) {
        endIndex = headingIndex;
      }

      const sectionChildren = parent.children.slice(headingIndex, endIndex + 1);
      const contentChildren = sectionChildren.slice(1);

      // Create wrapper: button is SIBLING of heading (not parent)
      const wrapper = {
        type: 'element',
        tagName: 'div',
        properties: {
          className: ['toggleable-heading-section', `toggleable-heading-level-${level}`],
          'data-toggleable-heading': 'true',
          'data-heading-level': String(level),
        },
        children: [
          // Header: toggle button + heading as siblings
          {
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['toggleable-heading-header'],
            },
            children: [
              // Toggle button (icon only)
              {
                type: 'element',
                tagName: 'button',
                properties: {
                  type: 'button',
                  className: ['toggleable-heading-button', `toggleable-heading-button-h${level}`],
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
                ],
              },
              // Heading element (sibling, not child of button)
              headingNode,
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

      parent.children.splice(headingIndex, endIndex - headingIndex + 1, wrapper);
    }
  };
}
