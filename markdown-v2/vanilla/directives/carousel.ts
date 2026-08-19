// ============================================================
// Carousel Directive (vanilla)
//
// Image carousel with prev/next arrows and dot navigation.
// Slides are detected from markdown images inside the slot.
// Navigation wraps around (infinite loop) and transitions are
// animated via a CSS transform on the track.
//
//   :::carousel {height="400px"}
//   ![alt](https://example.com/1.webp)
//   ![alt](https://example.com/2.webp)
//   :::
// ============================================================

import type { DirectiveRendererFn } from './index';

const IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

const carouselDirective: DirectiveRendererFn = ({ props, slots }) => {
  const images: { src: string; alt: string }[] = [];
  const raw = slots.default || '';
  let m: RegExpExecArray | null;
  IMG_RE.lastIndex = 0;
  while ((m = IMG_RE.exec(raw)) !== null) {
    images.push({ src: m[2].split('#')[0].trim(), alt: m[1].trim() || 'carousel image' });
  }

  if (images.length === 0) {
    return document.createDocumentFragment();
  }

  const wrap = document.createElement('div');
  wrap.className = 'nr-carousel';
  wrap.tabIndex = 0;
  wrap.setAttribute('aria-label', 'Image carousel');

  if (props.class) wrap.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) wrap.setAttribute('style', props.style);
  if (props.width) wrap.style.width = props.width;
  if (props.float) {
    if (props.float === 'left' || props.float === 'right') {
      wrap.style.float = props.float;
      if (!props.width) wrap.style.maxWidth = '50%';
      wrap.style.marginInlineStart = props.float === 'right' ? '1rem' : '';
      wrap.style.marginInlineEnd = props.float === 'left' ? '1rem' : '';
    } else if (props.float === 'center') {
      wrap.style.marginInline = 'auto';
    }
  }

  const viewport = document.createElement('div');
  viewport.className = 'nr-carousel__viewport';
  if (props.height) viewport.style.height = props.height;
  if (props.aspect) viewport.style.aspectRatio = props.aspect;

  const track = document.createElement('div');
  track.className = 'nr-carousel__track';

  const items: HTMLElement[] = [];
  for (const img of images) {
    const item = document.createElement('div');
    item.className = 'nr-carousel__item';
    const el = document.createElement('img');
    el.src = img.src;
    el.alt = img.alt;
    el.loading = 'lazy';
    item.appendChild(el);
    track.appendChild(item);
    items.push(item);
  }
  viewport.appendChild(track);
  wrap.appendChild(viewport);

  const total = items.length;
  let index = 0;

  const goTo = (i: number) => {
    index = ((i % total) + total) % total;
    track.style.transform = `translateX(-${index * 100}%)`;
    items.forEach((it, j) => it.classList.toggle('nr-carousel__item--active', j === index));
    dots.forEach((d, j) => d.classList.toggle('nr-carousel__dot--active', j === index));
  };

  const prev = document.createElement('button');
  prev.className = 'nr-carousel__nav nr-carousel__nav--prev';
  prev.setAttribute('aria-label', 'Previous slide');
  prev.textContent = '❮';
  prev.addEventListener('click', () => goTo(index - 1));

  const next = document.createElement('button');
  next.className = 'nr-carousel__nav nr-carousel__nav--next';
  next.setAttribute('aria-label', 'Next slide');
  next.textContent = '❯';
  next.addEventListener('click', () => goTo(index + 1));

  const dots: HTMLButtonElement[] = [];
  const dotsBox = document.createElement('div');
  dotsBox.className = 'nr-carousel__dots';
  images.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'nr-carousel__dot';
    dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
    dot.addEventListener('click', () => goTo(i));
    dotsBox.appendChild(dot);
    dots.push(dot);
  });

  wrap.append(prev, next, dotsBox);

  wrap.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      goTo(index - 1);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      goTo(index + 1);
    }
  });

  goTo(0);

  return wrap;
};

export default carouselDirective;