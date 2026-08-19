// ============================================================
// Accordion Directive (vanilla)
//
// Collapsible accordion built from nested accordion-item
// directives. Radio mode (default) allows one open item at a
// time; checkbox mode allows multiple.
//
//   :::accordion {mode="radio"}
//   :::accordion-item {title="Question?" checked="true"}
//   Answer here.
//   :::
//   :::accordion-item {title="Another question?"}
//   Another answer.
//   :::
//   :::
// ============================================================

import type { DirectiveRendererFn } from './index';

let accordionCounter = 0;

export const accordionItemDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const item = document.createElement('div');
  item.className = 'nr-accordion__item';

  if (props.class) item.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) item.setAttribute('style', props.style);

  const input = document.createElement('input');
  input.type = 'radio';
  input.className = 'nr-accordion__input';
  if (props.checked === 'true' || props.checked === '') input.checked = true;
  if (props.value) input.value = props.value;
  input.setAttribute('aria-label', props.title || 'Accordion item');

  const title = document.createElement('div');
  title.className = 'nr-accordion__title';
  title.textContent = props.title || '';

  const content = document.createElement('div');
  content.className = 'nr-accordion__content';
  content.appendChild(renderSlot('default'));

  item.append(input, title, content);
  return item;
};

const accordionDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const wrap = document.createElement('div');
  wrap.className = 'nr-accordion';

  if (props.class) wrap.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) wrap.setAttribute('style', props.style);

  wrap.appendChild(renderSlot('default'));

  const mode = props.mode === 'checkbox' ? 'checkbox' : 'radio';
  const group = `nr-acc-${++accordionCounter}`;

  wrap.querySelectorAll<HTMLInputElement>('.nr-accordion__input').forEach(input => {
    input.type = mode;
    if (mode === 'radio') input.name = group;
  });

  return wrap;
};

export default accordionDirective;