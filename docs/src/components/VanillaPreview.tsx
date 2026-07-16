import React, { useRef, useEffect } from 'react';
import { renderMarkdownString } from '@noirmd/previewer/vanilla';
import '@noirmd/previewer/vanilla/vanilla.css';

interface VanillaPreviewProps {
  content: string;
  className?: string;
}

export default function VanillaPreview({ content, className = '' }: VanillaPreviewProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Clear previous content
    containerRef.current.innerHTML = '';

    // Render markdown using vanilla renderer
    const el = renderMarkdownString(content);
    containerRef.current.appendChild(el);
  }, [content]);

  return (
    <div
      ref={containerRef}
      className={`nr-prose ${className}`}
    />
  );
}
