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
import { isThemeToken, isArbitraryColor, applyBaseProps } from '../utils';

const statDirective: DirectiveRendererFn = ({ props }) => {
  const statIsThemeToken = isThemeToken(props.color);
  const colorClass = statIsThemeToken ? ` nr-stat--${props.color}` : '';
  const stat = document.createElement('div');
  stat.className = `nr-stat${colorClass}`;
  applyBaseProps(stat, props);

  // Apply arbitrary color via inline style
  const useInlineColor = props.color && isArbitraryColor(props.color) && !statIsThemeToken;

  if (props.icon) {
    const figure = document.createElement('div');
    figure.className = 'nr-stat__figure';
    if (useInlineColor) figure.style.color = props.color!;
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
    if (useInlineColor) value.style.color = props.color!;
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