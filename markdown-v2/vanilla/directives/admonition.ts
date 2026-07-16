// ============================================================
// Admonition Directive (vanilla)
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createAdmonition } from '../components';

const admonitionDirective: DirectiveRendererFn = ({ directiveType, props, renderSlot }) => {
  const el = createAdmonition(directiveType, props.title, props.icon);

  if (props.class) el.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) el.setAttribute('style', props.style);

  // Append default slot content into the body
  const body = el.querySelector('.nr-admonition__body');
  if (body) {
    body.appendChild(renderSlot('default'));
  }

  return el;
};

export default admonitionDirective;
