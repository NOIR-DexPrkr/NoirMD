import React, { useEffect, useRef } from 'react';
import { renderMarkdownString } from '../vanilla/renderer';
import { scrollToId } from '../core/utils';
import { scanTailwindCDN } from './useTailwindCDN';

interface CustomMarkdownRendererProps {
  content: string;
}

/**
 * CustomMarkdownRenderer — thin React wrapper around the vanilla renderer.
 *
 * Pipeline:
 *   content (string) → renderMarkdownString() → HTMLElement → mounted
 *
 * The vanilla engine handles all rendering, directives and events;
 * React only owns the mount point. Note: rendering happens on the
 * client (useEffect); the server render is an empty placeholder.
 */
const CustomMarkdownRenderer: React.FC<CustomMarkdownRendererProps> = ({ content }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Clear previous content and mount the vanilla-rendered element
    container.replaceChildren();
    container.appendChild(renderMarkdownString(content));

    // Resolve any Tailwind classes in user-authored content (no-op if CDN not loaded)
    scanTailwindCDN();

    // Scroll to hash on load and hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const parts = hash.split('#');
        scrollToId(parts[parts.length - 1]);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [content]);

  return <div ref={containerRef} />;
};

export default CustomMarkdownRenderer;