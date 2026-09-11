// ============================================================
// Button Directive (vanilla)
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createIcon } from '../components';
import { applyBaseProps, applyColor, applyAlignClass, resolveIcon } from '../utils';

const buttonDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const url = props.url || props.href || '#';
  const label = props.label || props.title;
  const iconName = resolveIcon(props.icon, 'touch_app');
  const target = props.target || '_blank';
  const align = props.align || 'left';

  // Wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'nr-button-wrap';
  applyAlignClass(wrapper, 'nr-button-wrap', align);

  // If label is provided, use it directly
  if (label) {
    const a = document.createElement('a');
    a.href = url;
    a.target = target;
    if (target === '_blank') a.rel = 'noopener noreferrer';
    a.className = 'nr-button nr-button--default';
    applyColor(a, props.color, 'nr-button');
    applyBaseProps(a, props);
    if (iconName) a.appendChild(createIcon(iconName));
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
      applyColor(link, props.color, 'nr-button');
      if (iconName) link.prepend(createIcon(iconName));
      applyBaseProps(link, props);
    });
    wrapper.appendChild(slotContent);
  } else {
    // Fallback: wrap in an <a> tag
    const a = document.createElement('a');
    a.href = url;
    a.target = target;
    if (target === '_blank') a.rel = 'noopener noreferrer';
    a.className = 'nr-button nr-button--default';
    applyColor(a, props.color, 'nr-button');
    applyBaseProps(a, props);
    if (iconName) a.appendChild(createIcon(iconName));
    a.appendChild(slotContent);
    wrapper.appendChild(a);
  }

  return wrapper;
};

export default buttonDirective;
