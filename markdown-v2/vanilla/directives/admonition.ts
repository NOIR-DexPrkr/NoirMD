// ============================================================
// Admonition Directive (vanilla)
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createAdmonition } from '../components';
import { applyBaseProps } from '../utils';

const admonitionDirective: DirectiveRendererFn = ({ directiveType, props, renderSlot }) => {
  const el = createAdmonition(directiveType, props.title, props.icon);
  applyBaseProps(el, props);

  // Append default slot content into the body
  const body = el.querySelector('.nr-admonition__body');
  if (body) {
    body.appendChild(renderSlot('default'));
  }

  return el;
};

export default admonitionDirective;
