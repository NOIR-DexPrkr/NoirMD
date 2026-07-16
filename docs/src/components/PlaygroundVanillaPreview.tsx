import React, { useRef, useEffect, useState } from 'react';
import { renderMarkdownString } from '@noirmd/previewer/vanilla';
import '@noirmd/previewer/vanilla/vanilla.css';

interface Props {
  initialContent: string;
}

export default function PlaygroundVanillaPreview({ initialContent }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState(initialContent);

  useEffect(() => {
    const handler = (e: Event) => {
      const md = (e as CustomEvent).detail?.markdown;
      if (typeof md === 'string') setContent(md);
    };
    window.addEventListener('playground-change', handler);
    return () => window.removeEventListener('playground-change', handler);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.innerHTML = '';
    const el = renderMarkdownString(content);
    containerRef.current.appendChild(el);
  }, [content]);

  return <div ref={containerRef} className="nr-prose" />;
}
