// ============================================================
// Keys Directive (vanilla)
//
// Renders keyboard shortcut text as <kbd> chips.
// The directive detects the keys by splitting the content on "+".
//
//   :::keys
//   CTRL + SHIFT + DEL
//   :::
// ============================================================

import type { DirectiveRendererFn } from './index';

const keysDirective: DirectiveRendererFn = ({ props, slots }) => {
  const wrap = document.createElement('div');
  wrap.className = 'nr-keys';

  if (props.class) wrap.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) wrap.setAttribute('style', props.style);

  const sizeClass = props.size ? ` nr-kbd--${props.size}` : '';

  const parts = (slots.default || '')
    .split('+')
    .map(p => p.trim())
    .filter(Boolean);

  parts.forEach((part, i) => {
    if (i > 0) {
      const sep = document.createElement('span');
      sep.className = 'nr-keys__sep';
      sep.textContent = '+';
      wrap.appendChild(sep);
    }
    const kbd = document.createElement('kbd');
    kbd.className = `nr-kbd${sizeClass}`;
    kbd.textContent = part;
    wrap.appendChild(kbd);
  });

  return wrap;
};

export default keysDirective;