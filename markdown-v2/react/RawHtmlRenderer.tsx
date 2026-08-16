import React, { useEffect, useRef } from 'react';
import { renderHtmlString } from '../vanilla/renderer';
import { scanTailwindCDN } from './useTailwindCDN';

interface RawHtmlRendererProps {
  content: string;
  wrapperClassName?: string;
}

/**
 * RawHtmlRenderer — thin React wrapper around the vanilla raw-HTML renderer.
 * Injects <style> blocks globally and force-executes <script> tags.
 */
const RawHtmlRenderer: React.FC<RawHtmlRendererProps> = ({
  content,
  wrapperClassName = 'nr-raw-html',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.replaceChildren();
    container.appendChild(renderHtmlString(content));
    scanTailwindCDN();
  }, [content]);

  return <div ref={containerRef} className={wrapperClassName} />;
};

export default RawHtmlRenderer;