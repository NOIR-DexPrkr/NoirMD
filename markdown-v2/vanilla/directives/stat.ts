// ============================================================
// Stat Directive (vanilla)
//
// Single stat card. Consecutive :::stat directives auto-batch
// into a horizontal grid (see renderer.ts).
//
//   :::stat {title="Total Likes" value="25.6K" desc="21% more than last month" icon="favorite" color="primary"}
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createIcon } from '../components';

const statDirective: DirectiveRendererFn = ({ props }) => {
  const colorClass = props.color ? ` nr-stat--${props.color}` : '';
  const stat = document.createElement('div');
  stat.className = `nr-stat${colorClass}`;

  if (props.class) stat.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) stat.setAttribute('style', props.style);

  if (props.icon) {
    const figure = document.createElement('div');
    figure.className = 'nr-stat__figure';
    figure.appendChild(createIcon(props.icon));
    stat.appendChild(figure);
  }

  if (props.title) {
    const title = document.createElement('div');
    title.className = 'nr-stat__title';
    title.textContent = props.title;
    stat.appendChild(title);
  }

  if (props.value) {
    const value = document.createElement('div');
    value.className = 'nr-stat__value';
    value.textContent = props.value;
    stat.appendChild(value);
  }

  if (props.desc) {
    const desc = document.createElement('div');
    desc.className = 'nr-stat__desc';
    desc.textContent = props.desc;
    stat.appendChild(desc);
  }

  return stat;
};

export default statDirective;