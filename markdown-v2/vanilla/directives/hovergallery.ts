// ============================================================
// Hover Gallery Directive (vanilla)
//
// Image gallery where hovering a thumbnail expands it to fill
// the whole gallery.
//
//   :::hover-gallery {aspect="16/9"}
//   ![alt](https://example.com/1.webp)
//   ![alt](https://example.com/2.webp)
//   :::
// ============================================================

import type { DirectiveRendererFn } from './index';

const IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

const hovergalleryDirective: DirectiveRendererFn = ({ props, slots }) => {
  const images: { src: string; alt: string }[] = [];
  const raw = slots.default || '';
  let m: RegExpExecArray | null;
  IMG_RE.lastIndex = 0;
  while ((m = IMG_RE.exec(raw)) !== null) {
    images.push({ src: m[2].split('#')[0].trim(), alt: m[1].trim() || 'gallery image' });
  }

  if (images.length === 0) {
    return document.createDocumentFragment();
  }

  const figure = document.createElement('figure');
  figure.className = 'nr-hover-gallery';
  if (props.aspect) figure.style.aspectRatio = props.aspect;

  if (props.class) figure.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) figure.setAttribute('style', props.style);

  for (const img of images) {
    const el = document.createElement('img');
    el.src = img.src;
    el.alt = img.alt;
    el.loading = 'lazy';
    figure.appendChild(el);
  }

  return figure;
};

export default hovergalleryDirective;