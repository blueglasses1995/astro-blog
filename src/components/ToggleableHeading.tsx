import { useEffect } from 'react';

interface ToggleableHeadingProps {
  className?: string;
}

/**
 * Lightweight component to make H2 headings toggleable.
 * Finds all elements with data-toggleable-heading attribute and adds toggle functionality.
 *
 * Expected DOM structure (produced by rehype-toggleable-heading):
 *   .toggleable-heading-header
 *     button.toggleable-heading-button > svg.toggleable-heading-icon
 *     h2 (sibling of button, NOT child)
 */
export function ToggleableHeading({ className }: ToggleableHeadingProps) {
  useEffect(() => {
    const initToggleableHeadings = () => {
      const sections = document.querySelectorAll('[data-toggleable-heading]');

      if (sections.length === 0) {
        setTimeout(initToggleableHeadings, 100);
        return;
      }

      sections.forEach((section) => {
        if ((section as HTMLElement).dataset.toggleableHeadingInitialized === 'true') {
          return;
        }

        const header = section.querySelector('.toggleable-heading-header') as HTMLElement;
        const button = section.querySelector('.toggleable-heading-button') as HTMLButtonElement;
        const content = section.querySelector('.toggleable-heading-content') as HTMLElement;
        const icon = section.querySelector('.toggleable-heading-icon') as SVGElement;

        if (!header || !button || !content || !icon) {
          return;
        }

        (section as HTMLElement).dataset.toggleableHeadingInitialized = 'true';

        let isExpanded = true;

        content.style.maxHeight = 'none';
        content.style.overflow = 'hidden';
        content.style.transition = 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out';
        content.style.opacity = '1';

        const sectionEl = section as HTMLElement;

        const toggle = () => {
          isExpanded = !isExpanded;

          if (isExpanded) {
            content.style.maxHeight = 'none';
            content.style.opacity = '1';
            button.setAttribute('aria-expanded', 'true');
            icon.style.transform = 'rotate(0deg)';
            sectionEl.removeAttribute('data-collapsed');
          } else {
            const currentHeight = content.scrollHeight;
            content.style.maxHeight = currentHeight + 'px';
            requestAnimationFrame(() => {
              content.style.maxHeight = '0px';
            });
            content.style.opacity = '0';
            button.setAttribute('aria-expanded', 'false');
            icon.style.transform = 'rotate(-90deg)';
            sectionEl.setAttribute('data-collapsed', 'true');
          }
        };

        // Click handler on the entire header area.
        // HeadingLinkIcon calls e.stopPropagation() so it won't trigger this.
        header.addEventListener('click', (e) => {
          // Skip if user clicked the heading-link-icon (copy link button)
          if ((e.target as HTMLElement).closest('.heading-link-icon')) return;
          toggle();
        });

        // Keyboard accessibility on the button element
        button.addEventListener('keydown', (e: KeyboardEvent) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            toggle();
          }
        });

        icon.style.transition = 'transform 0.3s ease-in-out';
        icon.style.transform = 'rotate(0deg)';
      });
    };

    initToggleableHeadings();
    const timeout1 = setTimeout(initToggleableHeadings, 50);
    const timeout2 = setTimeout(initToggleableHeadings, 200);
    const timeout3 = setTimeout(initToggleableHeadings, 500);
    const timeout4 = setTimeout(initToggleableHeadings, 1000);

    const observer = new MutationObserver(() => {
      window.requestAnimationFrame(initToggleableHeadings);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      clearTimeout(timeout3);
      clearTimeout(timeout4);
      observer.disconnect();
      const sections = document.querySelectorAll('[data-toggleable-heading]');
      sections.forEach((section) => {
        delete (section as HTMLElement).dataset.toggleableHeadingInitialized;
      });
    };
  }, []);

  return <span className={className} data-toggleable-heading-init style={{ display: 'none' }} />;
}
