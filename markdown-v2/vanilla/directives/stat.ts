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

// Predefined theme tokens that map to CSS classes
const STAT_THEME_TOKENS = new Set([
  'primary', 'secondary', 'info', 'success', 'warning', 'error',
]);

/**
 * Check if a value looks like a valid CSS color (not a theme token).
 * Accepts: named colors (blue, red), hex (#fff, #ff0000), rgb/rgba, hsl/hsla, oklch, etc.
 */
function isArbitraryColor(value: string): boolean {
  if (STAT_THEME_TOKENS.has(value)) return false;
  // Quick heuristic: hex, rgb, hsl, oklch, or a known CSS color name
  if (/^(#|rgb|hsl|oklch|oklab|lab|lch|color\()/i.test(value)) return true;
  // Named CSS colors (common ones)
  if (/^[a-zA-Z]+$/.test(value)) return true;
  return false;
}

const statDirective: DirectiveRendererFn = ({ props }) => {
  const isThemeToken = STAT_THEME_TOKENS.has(props.color || '');
  const colorClass = isThemeToken ? ` nr-stat--${props.color}` : '';
  const stat = document.createElement('div');
  stat.className = `nr-stat${colorClass}`;

  if (props.class) stat.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) stat.setAttribute('style', props.style);

  // Apply arbitrary color via inline style
  const useInlineColor = props.color && isArbitraryColor(props.color) && !isThemeToken;

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