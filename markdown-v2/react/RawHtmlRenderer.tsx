import React, { useRef, useEffect } from 'react';
import { scanTailwindCDN } from './useTailwindCDN';

interface RawHtmlRendererProps {
  content: string;
  globalStyles?: string;
  wrapperClassName: string;
}

/**
 * Renders raw HTML content with global CSS injection.
 * - `globalStyles`: unscoped CSS injected into <head> (cleans up on unmount)
 * Forces <script> execution by replacing script nodes after mount.
 * Triggers a Tailwind CDN re-scan after mount so that any Tailwind classes
 * present in the injected HTML are resolved (works with the Play CDN loaded
 * by useTailwindCDN in CustomMarkdownRenderer).
 */
const RawHtmlRenderer: React.FC<RawHtmlRendererProps> = ({
  content,
  globalStyles,
  wrapperClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Force-execute injected scripts by replacing them
  useEffect(() => {
    if (!containerRef.current) return;
    const scripts = containerRef.current.querySelectorAll('script');
    scripts.forEach(oldScript => {
      const newScript = document.createElement('script');
      Array.from(oldScript.attributes).forEach(attr =>
        newScript.setAttribute(attr.name, attr.value)
      );
      newScript.textContent = oldScript.textContent;
      oldScript.parentNode?.replaceChild(newScript, oldScript);
    });

    // ── Tailwind CDN re-scan ──
    // After the HTML is injected, trigger the CDN to pick up any new
    // Tailwind classes present in the dynamically-rendered content.
    scanTailwindCDN();
  }, [content]);

  // Inject <style global> into <head> and clean up on unmount
  useEffect(() => {
    if (!globalStyles) return;
    const styleEl = document.createElement('style');
    styleEl.setAttribute('data-global', '');
    styleEl.textContent = globalStyles;
    document.head.appendChild(styleEl);
    return () => {
      if (styleEl.parentNode) document.head.removeChild(styleEl);
    };
  }, [globalStyles]);

  return (
    <div className={wrapperClassName} ref={containerRef}>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default RawHtmlRenderer;

