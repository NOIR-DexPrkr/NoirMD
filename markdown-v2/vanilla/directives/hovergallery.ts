// ============================================================
// Hover Gallery Directive (vanilla)
//
// Image gallery where hovering across the gallery smoothly
// crossfades between images — like a macOS dock but for photos.
//
//   :::hover-gallery {aspect="16/9"}
//   ![alt](https://example.com/1.webp)
//   ![alt](https://example.com/2.webp)
//   :::
// ============================================================

import type { DirectiveRendererFn } from './index';

const IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;
const MAX_IMAGES = 10;

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

  const count = Math.min(images.length, MAX_IMAGES);

  // ── Container ───────────────────────────────────────────
  const figure = document.createElement('figure');
  figure.className = 'nr-hover-gallery';
  if (props.aspect) figure.style.aspectRatio = props.aspect;
  if (props.class) figure.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) figure.setAttribute('style', (figure.getAttribute('style') || '') + ';' + props.style);

  // ── Image elements (stacked, absolutely positioned) ─────
  const imgEls: HTMLImageElement[] = [];
  for (let i = 0; i < count; i++) {
    const el = document.createElement('img');
    el.src = images[i].src;
    el.alt = images[i].alt;
    el.loading = 'lazy';
    el.draggable = false;
    if (i === 0) el.classList.add('nr-hg-active');
    imgEls.push(el);
    figure.appendChild(el);
  }

  // ── Invisible trigger strips (divide width evenly) ──────
  for (let i = 0; i < count; i++) {
    const strip = document.createElement('div');
    strip.className = 'nr-hg-trigger';
    strip.style.left = `${(i / count) * 100}%`;
    strip.style.width = `${(1 / count) * 100}%`;

    strip.addEventListener('mouseenter', () => {
      for (let j = 0; j < imgEls.length; j++) {
        imgEls[j].classList.toggle('nr-hg-active', j === i);
      }
      for (let j = 0; j < dotEls.length; j++) {
        dotEls[j].classList.toggle('nr-hg-dot-active', j === i);
      }
    });

    figure.appendChild(strip);
  }

  // Reset to first image when mouse leaves the gallery
  figure.addEventListener('mouseleave', () => {
    for (let j = 0; j < imgEls.length; j++) {
      imgEls[j].classList.toggle('nr-hg-active', j === 0);
    }
    for (let j = 0; j < dotEls.length; j++) {
      dotEls[j].classList.toggle('nr-hg-dot-active', j === 0);
    }
  });

  // ── Indicator dots ──────────────────────────────────────
  const dotContainer = document.createElement('div');
  dotContainer.className = 'nr-hg-dots';
  const dotEls: HTMLSpanElement[] = [];
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('span');
    if (i === 0) dot.classList.add('nr-hg-dot-active');
    dotEls.push(dot);
    dotContainer.appendChild(dot);
  }
  figure.appendChild(dotContainer);

  return figure;
};

export default hovergalleryDirective;