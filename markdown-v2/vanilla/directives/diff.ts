// ============================================================
// Diff Directive (vanilla)
//
// Before/after image comparison slider. Drag the handle (or
// click anywhere on the figure), or use arrow keys when focused.
// The split position is driven by the --nr-diff-pos custom
// property, updated via pointer events for reliable dragging.
//
//   :::diff {before="https://example.com/a.webp" after="https://example.com/b.webp"}
//   :::
//
// ...or with two markdown images inside the slot (first = before):
//
//   :::diff
//   ![Antes](https://example.com/a.webp)
//   ![Después](https://example.com/b.webp)
//   :::
// ============================================================

import type { DirectiveRendererFn } from './index';

const IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

const diffDirective: DirectiveRendererFn = ({ props, slots }) => {
  let before = (props.before || '').split('#')[0].trim();
  let after = (props.after || '').split('#')[0].trim();

  if (!before || !after) {
    const urls: string[] = [];
    const raw = slots.default || '';
    let m: RegExpExecArray | null;
    IMG_RE.lastIndex = 0;
    while ((m = IMG_RE.exec(raw)) !== null) {
      urls.push(m[2].split('#')[0].trim());
    }
    if (!before && urls.length > 0) before = urls[0];
    if (!after && urls.length > 1) after = urls[1];
  }

  if (!before || !after) {
    return document.createDocumentFragment();
  }

  const figure = document.createElement('figure');
  figure.className = 'nr-diff';
  figure.tabIndex = 0;
  figure.setAttribute('aria-label', 'Image comparison slider');

  if (props.class) figure.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) figure.setAttribute('style', props.style);
  if (props.aspect) figure.style.aspectRatio = props.aspect;
  if (props.height) figure.style.height = props.height;
  if (props.width) figure.style.width = props.width;
  if (props.float) {
    if (props.float === 'left' || props.float === 'right') {
      figure.style.float = props.float;
      if (!props.width) figure.style.maxWidth = '50%';
      figure.style.marginInlineStart = props.float === 'right' ? '1rem' : '';
      figure.style.marginInlineEnd = props.float === 'left' ? '1rem' : '';
    } else if (props.float === 'center') {
      figure.style.marginInline = 'auto';
    }
  }

  const beforeItem = document.createElement('div');
  beforeItem.className = 'nr-diff__item nr-diff__item--before';
  beforeItem.setAttribute('role', 'img');
  beforeItem.tabIndex = 0;
  const beforeImg = document.createElement('img');
  beforeImg.src = before;
  beforeImg.alt = 'before';
  beforeItem.appendChild(beforeImg);

  const afterItem = document.createElement('div');
  afterItem.className = 'nr-diff__item nr-diff__item--after';
  afterItem.setAttribute('role', 'img');
  const afterImg = document.createElement('img');
  afterImg.src = after;
  afterImg.alt = 'after';
  afterItem.appendChild(afterImg);

  const resizer = document.createElement('div');
  resizer.className = 'nr-diff__resizer';
  resizer.setAttribute('aria-label', 'Drag to compare');
  resizer.title = 'Drag to compare';

  figure.append(beforeItem, afterItem, resizer);

  let pos = 50;

  const applyPos = () => {
    figure.style.setProperty('--nr-diff-pos', `${pos}%`);
  };

  const setPosFromClientX = (clientX: number) => {
    const rect = figure.getBoundingClientRect();
    if (rect.width === 0) return;
    pos = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    applyPos();
  };

  resizer.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    resizer.setPointerCapture(e.pointerId);
    setPosFromClientX(e.clientX);
  });

  resizer.addEventListener('pointermove', (e) => {
    if (e.buttons & 1) setPosFromClientX(e.clientX);
  });

  resizer.addEventListener('pointerup', (e) => {
    if (resizer.hasPointerCapture(e.pointerId)) {
      resizer.releasePointerCapture(e.pointerId);
    }
  });

  figure.addEventListener('click', (e) => {
    if (e.target === resizer) return;
    setPosFromClientX(e.clientX);
  });

  figure.addEventListener('keydown', (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return;
    e.preventDefault();
    pos = Math.min(100, Math.max(0, pos + (e.key === 'ArrowRight' ? 5 : -5)));
    applyPos();
  });

  applyPos();

  return figure;
};

export default diffDirective;