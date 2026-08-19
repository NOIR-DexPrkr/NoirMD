// ============================================================
// Rich List Directive (vanilla)
//
// Rich list rows (daisyUI "list") with avatar, title, subtitle,
// description and optional action buttons.
//
//   :::richlist
//   :::richlist-item
//   {title="Dio Lupa" subtitle="Remaining Reason" image="https://..." icon="play_arrow" icon2="favorite"}
//   Description text with **markdown** support.
//   :::
//   :::
//
// Action buttons accept:
//   url / url2   → open a new tab when the icon / icon2 button is clicked
//   event / event2 → bind a global function to the icon / icon2 button,
//                    e.g. event="click: playSound" (see events.ts)
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createIcon } from '../components';
import { bindEventProp } from './events';

export const richlistItemDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const li = document.createElement('li');
  li.className = 'nr-richlist__item';

  if (props.class) li.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) li.setAttribute('style', props.style);

  if (props.image) {
    const thumb = document.createElement('div');
    thumb.className = 'nr-richlist__thumb';
    const img = document.createElement('img');
    img.src = props.image;
    img.alt = props.title || 'list item';
    img.loading = 'lazy';
    thumb.appendChild(img);
    li.appendChild(thumb);
  }

  if (props.title || props.subtitle) {
    const main = document.createElement('div');
    main.className = 'nr-richlist__main';
    if (props.title) {
      const title = document.createElement('div');
      title.className = 'nr-richlist__title';
      title.textContent = props.title;
      main.appendChild(title);
    }
    if (props.subtitle) {
      const subtitle = document.createElement('div');
      subtitle.className = 'nr-richlist__subtitle';
      subtitle.textContent = props.subtitle;
      main.appendChild(subtitle);
    }
    li.appendChild(main);
  }

  const descFrag = renderSlot('default');
  if (descFrag.childNodes.length > 0) {
    const desc = document.createElement('p');
    desc.className = 'nr-richlist__desc';
    desc.appendChild(descFrag);
    li.appendChild(desc);
  }

  const actions = [
    { icon: props.icon, url: props.url, event: props.event },
    { icon: props.icon2, url: props.url2, event: props.event2 },
  ].filter((a) => !!a.icon);

  if (actions.length > 0) {
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'nr-richlist__actions';
    for (const { icon, url, event } of actions) {
      const btn = document.createElement('button');
      btn.className = 'nr-richlist__action';
      btn.type = 'button';
      btn.setAttribute('aria-label', icon as string);
      btn.appendChild(createIcon(icon as string));
      if (event) {
        bindEventProp(btn, event);
      } else if (url) {
        btn.addEventListener('click', () => window.open(url as string, '_blank'));
      }
      actionsDiv.appendChild(btn);
    }
    li.appendChild(actionsDiv);
  }

  return li;
};

const richlistDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const ul = document.createElement('ul');
  ul.className = 'nr-richlist';

  if (props.class) ul.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) ul.setAttribute('style', props.style);

  ul.appendChild(renderSlot('default'));
  return ul;
};

export default richlistDirective;