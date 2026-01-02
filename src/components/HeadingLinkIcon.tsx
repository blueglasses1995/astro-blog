import { useEffect } from 'react';

interface HeadingLinkIconProps {
  className?: string;
}

/**
 * Adds a link icon to the left of h1, h2, h3, h4, h5, h6 headings.
 * Clicking the icon copies the URL with the heading's ID to the clipboard.
 */
export function HeadingLinkIcon({ className }: HeadingLinkIconProps) {
  useEffect(() => {
    const initHeadingIcons = () => {
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');

      headings.forEach((heading) => {
        // Skip if already processed
        if ((heading as HTMLElement).dataset.headingLinkInitialized === 'true') {
          return;
        }

        const id = heading.getAttribute('id');
        if (!id) return;

        // Mark as initialized
        (heading as HTMLElement).dataset.headingLinkInitialized = 'true';

        // Create link icon button
        const iconButton = document.createElement('button');
      iconButton.className = 'heading-link-icon inline-flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors';
      iconButton.setAttribute('aria-label', 'Copy link to this section');
      iconButton.setAttribute('type', 'button');
      iconButton.style.transition = 'opacity 0.2s ease-in-out, color 0.2s ease-in-out';

      // Create SVG icon
      const iconSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      iconSvg.setAttribute('width', '16');
      iconSvg.setAttribute('height', '16');
      iconSvg.setAttribute('viewBox', '0 0 24 24');
      iconSvg.setAttribute('fill', 'none');
      iconSvg.setAttribute('stroke', 'currentColor');
      iconSvg.setAttribute('stroke-width', '2');
      iconSvg.setAttribute('stroke-linecap', 'round');
      iconSvg.setAttribute('stroke-linejoin', 'round');
      iconSvg.style.verticalAlign = 'middle';

      // Create path element for link icon
      const path1 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path1.setAttribute('d', 'M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71');
      const path2 = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path2.setAttribute('d', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71');

      iconSvg.appendChild(path1);
      iconSvg.appendChild(path2);
      iconButton.appendChild(iconSvg);

      // Add click handler to copy URL
      iconButton.addEventListener('click', async (e) => {
        e.preventDefault();
        e.stopPropagation();

        // Construct full URL with hash fragment
        const url = `${window.location.origin}${window.location.pathname}#${id}`;
        
        try {
          await navigator.clipboard.writeText(url);
          
          // Visual feedback
          const originalOpacity = iconButton.style.opacity;
          iconButton.style.opacity = '1';
          iconButton.style.color = 'hsl(var(--primary))';
          
          // Show temporary tooltip or change icon
          const originalAriaLabel = iconButton.getAttribute('aria-label');
          iconButton.setAttribute('aria-label', 'Copied!');
          
          setTimeout(() => {
            iconButton.style.opacity = originalOpacity || '';
            iconButton.style.color = '';
            iconButton.setAttribute('aria-label', originalAriaLabel || 'Copy link to this section');
          }, 2000);
        } catch (err) {
          console.error('Failed to copy URL:', err);
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = url;
          textArea.style.position = 'fixed';
          textArea.style.opacity = '0';
          document.body.appendChild(textArea);
          textArea.select();
          try {
            document.execCommand('copy');
            iconButton.style.opacity = '1';
            iconButton.style.color = 'hsl(var(--primary))';
            const originalAriaLabel = iconButton.getAttribute('aria-label');
            iconButton.setAttribute('aria-label', 'Copied!');
            setTimeout(() => {
              iconButton.style.opacity = '';
              iconButton.style.color = '';
              iconButton.setAttribute('aria-label', originalAriaLabel || 'Copy link to this section');
            }, 2000);
          } catch (fallbackErr) {
            console.error('Fallback copy failed:', fallbackErr);
          }
          document.body.removeChild(textArea);
        }
      });

        // Insert icon at the beginning of heading
        // CSS already handles flex layout, so we just insert the icon
        heading.insertBefore(iconButton, heading.firstChild);
      });
    };

    // Initialize immediately and after delays to handle dynamic content
    initHeadingIcons();
    setTimeout(initHeadingIcons, 50);
    setTimeout(initHeadingIcons, 200);
    setTimeout(initHeadingIcons, 500);

    // Observe DOM changes
    const observer = new MutationObserver(() => {
      initHeadingIcons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup function
    return () => {
      observer.disconnect();
      const headings = document.querySelectorAll('h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]');
      headings.forEach((heading) => {
        delete (heading as HTMLElement).dataset.headingLinkInitialized;
        const icon = heading.querySelector('.heading-link-icon');
        if (icon) {
          icon.remove();
        }
        heading.classList.remove('group');
      });
    };
  }, []);

  // Render a hidden element so Astro recognizes this as an island
  return <span className={className} data-heading-link-init style={{ display: 'none' }} />;
}
