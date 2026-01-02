import { useEffect } from 'react';

interface ToggleableCodeBlockProps {
  className?: string;
  previewLines?: number;
}

/**
 * Lightweight component to make code blocks toggleable.
 * Finds all elements with data-toggleable-code attribute and adds toggle functionality.
 * Default shows first 3-5 lines, expands on "もっと見る" button click.
 */
export function ToggleableCodeBlock({ 
  className, 
  previewLines = 5 
}: ToggleableCodeBlockProps) {
  useEffect(() => {
    const MIN_TOGGLE_LINES = 10; // 10行以内の場合は「もっと見る」ボタンを表示せず、全表示

    const initBlock = (block: Element) => {
      if ((block as HTMLElement).dataset.toggleableCodeInitialized === 'true') {
        console.log('[ToggleableCodeBlock] Block already initialized, skipping');
        return;
      }

      // Find the code block element (could be <pre> or <figure class="expressive-code">)
      const pre = block.querySelector('pre') as HTMLElement | null;
      const figure = block.querySelector('figure.expressive-code') as HTMLElement | null;
      const codeBlock: HTMLElement | null = pre || figure; // Use whichever exists
      const button = block.querySelector('button.toggleable-code-button') as HTMLButtonElement | null;
      
      console.log('[ToggleableCodeBlock] Initializing block:', { 
        hasPre: !!pre, 
        hasFigure: !!figure,
        hasCodeBlock: !!codeBlock,
        hasButton: !!button,
        blockClass: block.className 
      });
      
      if (!codeBlock || !button) {
        console.warn('[ToggleableCodeBlock] Missing elements:', { codeBlock: !!codeBlock, button: !!button });
        return;
      }
      
      // TypeScript: codeBlock and button are guaranteed to be non-null after this point
      const codeBlockElement: HTMLElement = codeBlock;
      const buttonElement: HTMLButtonElement = button;

      // Mark initialized early to avoid duplicate listeners during MutationObserver churn
      (block as HTMLElement).dataset.toggleableCodeInitialized = 'true';

      // Get line count (Expressive Code uses .ec-line wrappers)
      const expressiveLines = codeBlockElement.querySelectorAll('.ec-line');
      const codeElement = codeBlockElement.querySelector('code');

      const rawText = (codeElement?.textContent ?? codeBlockElement.textContent ?? '').replace(/\n+$/, '');
      const plainLines = rawText.trim().length === 0 ? [] : rawText.split('\n');
      const totalLines = expressiveLines.length > 0 ? expressiveLines.length : plainLines.length;

      console.log('[ToggleableCodeBlock] Line count:', { 
        totalLines, 
        expressiveLines: expressiveLines.length, 
        plainLines: plainLines.length 
      });

      // If code is short (10 lines or less), show all lines and hide toggle button
      if (totalLines <= MIN_TOGGLE_LINES) {
        console.log('[ToggleableCodeBlock] Code is short, hiding button');
        buttonElement.style.display = 'none';
        // Remove all height/overflow restrictions to show full content
        codeBlockElement.style.maxHeight = '';
        codeBlockElement.style.overflow = '';
        codeBlockElement.style.transition = '';
        codeBlockElement.style.removeProperty('overflow'); // Remove any inline overflow styles
        return;
      }

      console.log('[ToggleableCodeBlock] Code is long, setting up toggle');

      // Calculate preview height
      const computePreviewHeight = () => {
        let previewHeight = 0;
        if (expressiveLines.length > 0) {
          const idx = Math.min(previewLines, expressiveLines.length) - 1;
          const lastLine = expressiveLines[idx] as HTMLElement | undefined;
          if (lastLine) {
            const codeBlockRect = codeBlockElement.getBoundingClientRect();
            const lineRect = lastLine.getBoundingClientRect();
            previewHeight = Math.max(0, lineRect.bottom - codeBlockRect.top);
          }
        }
        if (previewHeight <= 0) {
          const computed = window.getComputedStyle(codeBlockElement);
          const lineHeight = Number.parseFloat(computed.lineHeight || '24') || 24;
          previewHeight = previewLines * lineHeight;
        }
        return previewHeight;
      };

      // Initialize collapsed state
      const applyCollapsed = () => {
        const previewHeight = computePreviewHeight();
        codeBlockElement.style.maxHeight = `${previewHeight}px`;
        // Expressive Code sets overflow rules; force hidden with !important
        codeBlockElement.style.setProperty('overflow', 'hidden', 'important');
        codeBlockElement.style.transition = 'max-height 0.25s ease-in-out';
        buttonElement.textContent = 'もっと見る';
      };

      const applyExpanded = () => {
        // Use current scrollHeight (layout/fonts may change after load)
        const fullHeight = codeBlockElement.scrollHeight;
        codeBlockElement.style.maxHeight = `${fullHeight}px`;
        codeBlockElement.style.setProperty('overflow', 'hidden', 'important');
        buttonElement.textContent = '折りたたむ';
      };

      let isExpanded = false;
      applyCollapsed();

      buttonElement.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('[ToggleableCodeBlock] Button clicked, current state:', isExpanded);
        isExpanded = !isExpanded;
        if (isExpanded) {
          console.log('[ToggleableCodeBlock] Expanding');
          applyExpanded();
        } else {
          console.log('[ToggleableCodeBlock] Collapsing');
          applyCollapsed();
        }
      };
      
      console.log('[ToggleableCodeBlock] Toggle button initialized successfully');
    };

    const initAll = () => {
      const blocks = document.querySelectorAll('[data-toggleable-code]');
      console.log('[ToggleableCodeBlock] Found', blocks.length, 'blocks with data-toggleable-code');
      blocks.forEach(initBlock);
    };

    // Run once now, and again shortly after to allow Expressive Code to finish enhancing
    initAll();
    const t1 = window.setTimeout(initAll, 50);
    const t2 = window.setTimeout(initAll, 250);
    const t3 = window.setTimeout(initAll, 500);
    const t4 = window.setTimeout(initAll, 1000);

    // Observe DOM changes (Expressive Code injects/updates markup after hydration)
    const observer = new MutationObserver(() => {
      // Defer to next frame to avoid measuring during mutations
      window.requestAnimationFrame(initAll);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
      observer.disconnect();
      document.querySelectorAll('[data-toggleable-code]').forEach((block) => {
        delete (block as HTMLElement).dataset.toggleableCodeInitialized;
      });
    };
  }, [previewLines]);

  // Render a tiny hidden node so Astro mounts this island and runs the effect.
  return <span className={className} data-toggleable-code-root style={{ display: 'none' }} />;
}
