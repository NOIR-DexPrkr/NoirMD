// ============================================================
// Slide Directive (vanilla)
//
// Single-line text carousel with CSS-driven slide-up rotation.
// ============================================================

import type { DirectiveRendererFn } from './index';
import { parseCssString } from '../../core/utils';

let slideCounter = 0;

const slideDirective: DirectiveRendererFn = ({
  props,
  slots,
  renderInline,
  renderMarkdown,
}) => {
  const rawContent = slots.default || '';
  const lines = rawContent
    .split('\n')
    .map(l => l.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    return document.createDocumentFragment();
  }

  const interval = parseInt(props.interval || '3000', 10);
  const speed = parseInt(props.speed || '500', 10);
  const rawClass = props.class || '';
  const inlineStyle = props.style ? parseCssString(props.style) : {};

  const scopeClass = `sld-${++slideCounter}`;

  // Container
  const container = document.createElement('div');
  container.className = 'nr-slide';
  Object.assign(container.style, {
    position: 'relative',
    overflow: 'hidden',
    ...inlineStyle,
  });

  // Inner track (holds all slides, animated via translateY)
  const track = document.createElement('div');
  track.className = 'nr-slide__track';
  track.style.transition = `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`;

  // Create slide elements
  const slideEls: HTMLElement[] = [];
  for (const line of lines) {
    const slideEl = document.createElement('div');
    slideEl.className = `nr-slide__item ${scopeClass} ${rawClass}`.trim();
    slideEl.style.display = 'flex';
    slideEl.style.alignItems = 'center';

    // Parse each line as markdown
    if (renderMarkdown) {
      const tokens = renderMarkdown(line);
      slideEl.appendChild(tokens);
    } else if (renderInline) {
      slideEl.appendChild(renderInline(line));
    }

    track.appendChild(slideEl);
    slideEls.push(slideEl);
  }

  container.appendChild(track);

  // Measure and animate
  let current = 0;
  let maxH = 0;

  const measureAndSetHeight = () => {
    maxH = 0;
    for (const el of slideEls) {
      maxH = Math.max(maxH, el.offsetHeight);
    }
    if (maxH > 0) {
      container.style.height = `${maxH}px`;
      for (const el of slideEls) {
        el.style.height = `${maxH}px`;
      }
    }
  };

  // Initial measurement after DOM attach
  requestAnimationFrame(() => {
    measureAndSetHeight();
    // Re-measure after fonts load
    if (document.fonts?.ready) {
      document.fonts.ready.then(measureAndSetHeight);
    }
  });

  // Rotation
  if (lines.length > 1) {
    setInterval(() => {
      current = (current + 1) % lines.length;
      track.style.transform = `translateY(${-current * maxH}px)`;
    }, interval);
  }

  return container;
};

export default slideDirective;
