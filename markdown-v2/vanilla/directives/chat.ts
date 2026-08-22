// ============================================================
// Chat Directive (vanilla)
//
// Chat bubbles built from nested chat-item directives.
//
//   :::chat
//   :::chat-item {side="start" name="Obi-Wan" time="12:45" avatar="https://..."}
//   You were the Chosen One!
//   :::
//   :::chat-item {side="end" name="Anakin" time="12:46" avatar="https://..." color="primary"}
//   I hate you!
//   :::
//   :::
// ============================================================

import type { DirectiveRendererFn } from './index';

// Predefined theme tokens that map to CSS classes
const CHAT_THEME_TOKENS = new Set([
  'primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error',
]);

/**
 * Check if a value is an arbitrary CSS color (not a theme token).
 */
function isArbitraryColor(value: string): boolean {
  if (CHAT_THEME_TOKENS.has(value)) return false;
  if (/^(#|rgb|hsl|oklch|oklab|lab|lch|color\()/i.test(value)) return true;
  if (/^[a-zA-Z]+$/.test(value)) return true;
  return false;
}

export const chatItemDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const side = props.side === 'end' ? 'end' : 'start';
  const wrap = document.createElement('div');
  wrap.className = `nr-chat nr-chat--${side}`;

  if (props.class) wrap.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) wrap.setAttribute('style', props.style);

  const header = document.createElement('div');
  header.className = 'nr-chat__header';
  if (props.name) {
    const name = document.createElement('span');
    name.className = 'nr-chat__name';
    name.textContent = props.name;
    header.appendChild(name);
  }
  if (props.time) {
    const time = document.createElement('time');
    time.className = 'nr-chat__time';
    time.textContent = props.time;
    header.appendChild(time);
  }
  if (header.childNodes.length > 0) wrap.appendChild(header);

  if (props.avatar) {
    const avatar = document.createElement('div');
    avatar.className = 'nr-chat__avatar';
    const img = document.createElement('img');
    img.src = props.avatar;
    img.alt = props.name || 'avatar';
    avatar.appendChild(img);
    wrap.appendChild(avatar);
  }

  const isThemeToken = CHAT_THEME_TOKENS.has(props.color || '');
  const colorClass = isThemeToken ? ` nr-chat__bubble--${props.color}` : '';
  const bubble = document.createElement('div');
  bubble.className = `nr-chat__bubble${colorClass}`;

  // Apply arbitrary color via inline style (background + contrasting text)
  if (props.color && isArbitraryColor(props.color) && !isThemeToken) {
    bubble.style.background = props.color;
    bubble.style.color = 'white';
  }

  bubble.appendChild(renderSlot('default'));
  wrap.appendChild(bubble);

  if (props.footer) {
    const footer = document.createElement('div');
    footer.className = 'nr-chat__footer';
    footer.textContent = props.footer;
    wrap.appendChild(footer);
  }

  return wrap;
};

const chatDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const wrap = document.createElement('div');
  wrap.className = 'nr-chat';

  if (props.class) wrap.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) wrap.setAttribute('style', props.style);

  wrap.appendChild(renderSlot('default'));
  return wrap;
};

export default chatDirective;