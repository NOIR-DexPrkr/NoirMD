// ============================================================
// Wrapper Directive (vanilla)
//
// Generic layout wrapper for: div, style, custom, raw
// ============================================================

import type { DirectiveRendererFn } from './index';
import { parseCssString } from '../../core/utils';

const wrapperDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const el = document.createElement('div');
  el.className = 'nr-wrapper';

  if (props.class) el.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.id) el.id = props.id;

  // Inline styles
  if (props.style) {
    const styles = parseCssString(props.style);
    for (const [key, value] of Object.entries(styles)) {
      el.style.setProperty(key, String(value));
    }
  }

  // data-* attributes
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('data-')) {
      el.setAttribute(key, value);
    }
  }

  el.appendChild(renderSlot('default'));
  return el;
};

export default wrapperDirective;
