// ============================================================
// Details Directive (vanilla)
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createDetails } from '../components';

const detailsDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const el = createDetails(
    props.title || 'Details',
    props.icon,
    props.defaultOpen === 'true',
  );

  if (props.class) el.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) el.setAttribute('style', props.style);

  // Append default slot into the body
  const body = el.querySelector('.nr-details__body');
  if (body) {
    body.appendChild(renderSlot('default'));
  }

  return el;
};

export default detailsDirective;
