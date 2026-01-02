import { useEffect } from 'react';

interface ToggleableHeadingProps {
  className?: string;
}

/**
 * Lightweight component to make H1 headings toggleable.
 * Finds all elements with data-toggleable-heading attribute and adds toggle functionality.
 */
export function ToggleableHeading({ className }: ToggleableHeadingProps) {
  useEffect(() => {
    // Wait for DOM to be ready
    const initToggleableHeadings = () => {
      const sections = document.querySelectorAll('[data-toggleable-heading]');

      console.log('[ToggleableHeading] Found', sections.length, 'sections with data-toggleable-heading');

      if (sections.length === 0) {
        // Retry after a short delay if no sections found
        setTimeout(initToggleableHeadings, 100);
        return;
      }

      sections.forEach((section) => {
        // Skip if already initialized
        if ((section as HTMLElement).dataset.toggleableHeadingInitialized === 'true') {
          return;
        }

        const button = section.querySelector('.toggleable-heading-button') as HTMLButtonElement;
        const content = section.querySelector('.toggleable-heading-content') as HTMLElement;
        const icon = section.querySelector('.toggleable-heading-icon') as SVGElement;

        if (!button || !content || !icon) {
          console.warn('[ToggleableHeading] Missing elements:', { button: !!button, content: !!content, icon: !!icon });
          return;
        }

        console.log('[ToggleableHeading] Initializing section', section);

        // Mark as initialized
        (section as HTMLElement).dataset.toggleableHeadingInitialized = 'true';

        // Initialize state
        let isExpanded = true;
        
        // Store the full height
        const fullHeight = content.scrollHeight;
        
        // Set initial state
        content.style.maxHeight = fullHeight + 'px';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out';
        content.style.opacity = '1';

        const toggle = () => {
          isExpanded = !isExpanded;
          
          if (isExpanded) {
            // Expand: use current scrollHeight to accommodate dynamic content
            const currentHeight = content.scrollHeight;
            content.style.maxHeight = currentHeight + 'px';
            content.style.opacity = '1';
            button.setAttribute('aria-expanded', 'true');
            icon.style.transform = 'rotate(0deg)';
          } else {
            // Collapse
            content.style.maxHeight = '0px';
            content.style.opacity = '0';
            button.setAttribute('aria-expanded', 'false');
            icon.style.transform = 'rotate(-90deg)';
          }
        };

        // Add click handler
        button.addEventListener('click', toggle);

        // Add transition to icon
        icon.style.transition = 'transform 0.3s ease-in-out';
        icon.style.transform = 'rotate(0deg)';
      });
    };

    // Initialize immediately and also after delays to handle dynamic content
    initToggleableHeadings();
    const timeout1 = setTimeout(initToggleableHeadings, 50);
    const timeout2 = setTimeout(initToggleableHeadings, 200);
    const timeout3 = setTimeout(initToggleableHeadings, 500);
    const timeout4 = setTimeout(initToggleableHeadings, 1000);

    // Also observe DOM changes (in case content is loaded dynamically)
    const observer = new MutationObserver(() => {
      // Defer to next frame to avoid measuring during mutations
      window.requestAnimationFrame(initToggleableHeadings);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      observer.disconnect();
      const sections = document.querySelectorAll('[data-toggleable-heading]');
      sections.forEach((section) => {
        delete (section as HTMLElement).dataset.toggleableHeadingInitialized;
        const button = section.querySelector('.toggleable-heading-button');
        if (button) {
          const newButton = button.cloneNode(true) as HTMLButtonElement;
          button.replaceWith(newButton);
        }
      });
    };
  }, []);

  // Render a hidden element so Astro recognizes this as an island
  return <span className={className} data-toggleable-heading-init style={{ display: 'none' }} />;
}
