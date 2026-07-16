// ============================================================
// Button Directive (vanilla)
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createIcon } from '../components';

const buttonDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const url = props.url || props.href || '#';
  const label = props.label;
  const icon = props.icon || 'near_me';
  const target = props.target || '_blank';
  const customClass = props.class || '';

  // Wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'nr-button-wrap';

  // If label is provided, use it directly
  if (label) {
    const a = document.createElement('a');
    a.href = url;
    a.target = target;
    a.rel = 'noopener noreferrer';
    a.className = 'nr-button nr-button--default';
    if (customClass) a.classList.add(...customClass.split(/\s+/).filter(Boolean));
    a.appendChild(createIcon(icon));
    a.appendChild(document.createTextNode(label));
    wrapper.appendChild(a);
    return wrapper;
  }

  // Otherwise render slot content
  const slotContent = renderSlot('default');

  // Check if slot contains <a> links — wrap each in a button style
  const links = slotContent.querySelectorAll('a');
  if (links.length > 0) {
    links.forEach(link => {
      link.classList.add('nr-button', 'nr-button--default');
      if (customClass) link.classList.add(...customClass.split(/\s+/).filter(Boolean));
    });
    wrapper.appendChild(slotContent);
  } else {
    // Fallback: wrap in an <a> tag
    const a = document.createElement('a');
    a.href = url;
    a.target = target;
    a.rel = 'noopener noreferrer';
    a.className = 'nr-button nr-button--default';
    if (customClass) a.classList.add(...customClass.split(/\s+/).filter(Boolean));
    a.appendChild(createIcon(icon));
    a.appendChild(slotContent);
    wrapper.appendChild(a);
  }

  return wrapper;
};

export default buttonDirective;
