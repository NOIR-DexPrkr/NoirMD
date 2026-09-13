// ============================================================
// Wrapper Directive (vanilla) — ⚠️ DEPRECATED / LEGACY ONLY
//
// Legacy wrapper for: div, style, custom, raw
//
// These directives are NOT part of the public API anymore and must
// NOT be documented in the guides (`markdown-v2/guide/**`), in
// `docs-site/public/llms.txt` or in the README. They stay in the
// registry only so old markdown keeps rendering — all four share
// this exact implementation.
//
// Use native HTML blocks inside markdown instead:
//   - CSS        → `<style>…</style>` (injected globally in <head>)
//   - raw markup → plain HTML written directly in the markdown
//
// TODO: remove once legacy content is migrated.
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
