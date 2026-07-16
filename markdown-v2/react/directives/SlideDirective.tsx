import React, { useState, useEffect, useCallback, useRef, useLayoutEffect } from 'react';
import type { DirectiveComponentProps } from '../types';
import type { Token } from '../../core/types';
import { parseCssString } from '../../core/utils';

let slideCounter = 0;

/**
 * Slide Directive — single-line text carousel with slide-up rotation.
 *
 * V2 syntax:
 *   :::slide {class="text-2xl font-bold" interval="3000"}
 *   First line
 *   ## Header line
 *   **Bold** and _italic_ line
 *   :::
 *
 * Each line is parsed individually via parseMarkdown, so headers, inline
 * formatting, and even nested directives all render correctly.
 * Only one line is visible at a time, rotating upward with a smooth transition.
 *
 * Props:
 *   class    — Tailwind classes (applied to outer container)
 *   style    — Inline CSS
 *   interval — ms between rotations (default 3000)
 *   speed    — transition duration in ms (default 500)
 */
const SlideDirective: React.FC<DirectiveComponentProps> = ({
  props,
  context,
  slots,
}) => {
  const rawContent = slots.default || '';
  const lines = rawContent
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  // Parse each line independently — handles ## headers, **bold**, etc.
  const elements: Token[][] = lines.map(line => context.parseMarkdown(line));

  const [current, setCurrent] = useState(0);
  const interval = parseInt(props.interval || '3000', 10);
  const speed = parseInt(props.speed || '500', 10);

  // Refs for dynamic height measurement
  const elRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxH, setMaxH] = useState(0);

  // Measure ALL elements, keep the tallest as the fixed container height
  useLayoutEffect(() => {
    let h = 0;
    elRefs.current.forEach(el => {
      if (el) h = Math.max(h, el.offsetHeight);
    });
    if (h > 0) setMaxH(h);
  }, [elements]);

  const cycle = useCallback(() => {
    if (elements.length <= 1) return;
    setCurrent(prev => (prev + 1) % elements.length);
  }, [elements.length]);

  useEffect(() => {
    if (elements.length <= 1) return;
    const id = setInterval(cycle, interval);
    return () => clearInterval(id);
  }, [cycle, interval, elements.length]);

  if (elements.length === 0) return null;

  const rawClass = props.class || '';
  const inlineStyle = props.style ? parseCssString(props.style) : {};

  // Smart: detect text-size and force it on all children via scoped <style>
  // because Tailwind JIT can't see dynamically constructed classes like [&_*]:!text-2xl
  const textSizeMap: Record<string, string> = {
    'text-xs': '0.75rem', 'text-sm': '0.875rem', 'text-base': '1rem',
    'text-lg': '1.125rem', 'text-xl': '1.25rem', 'text-2xl': '1.5rem',
    'text-3xl': '1.875rem', 'text-4xl': '2.25rem', 'text-5xl': '3rem',
    'text-6xl': '3.75rem', 'text-7xl': '4.5rem', 'text-8xl': '6rem',
    'text-9xl': '8rem',
  };
  const textSizeMatch = rawClass.match(/\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/);
  const forcedFontSize = textSizeMatch ? textSizeMap[textSizeMatch[0]] : null;
  const scopeClass = `sld-${++slideCounter}`;
  // Strip the matched text-* class from the user's classes (it's handled by the style tag)
  const className = textSizeMatch
    ? rawClass.replace(textSizeMatch[0], '').replace(/\s+/g, ' ').trim()
    : rawClass;

  return (
    <div
      className="not-prose"
      style={{ height: maxH || 'auto', position: 'relative', overflow: 'hidden', ...inlineStyle }}
    >
      {forcedFontSize && (
        <style>{`.${scopeClass} * { font-size: ${forcedFontSize} !important; line-height: normal !important; }`}</style>
      )}
      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: 0,
          transition: `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
          transform: `translateY(${-current * maxH}px)`,
        }}
      >
        {elements.map((tokens, i) => (
          <div
            key={i}
            ref={el => { elRefs.current[i] = el; }}
            style={maxH ? { height: maxH, display: 'flex', alignItems: 'center', overflow: 'hidden' } : { display: 'flex', alignItems: 'center' }}
          >
            <div className={`${scopeClass} ${className}`} style={{ width: '100%' }}>
              {context.processAndRenderElements(tokens)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SlideDirective;
