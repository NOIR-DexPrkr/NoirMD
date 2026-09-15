// ============================================================
// Card Directive (vanilla)
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createIcon, createModal } from '../components';
import { applyBaseProps, openModal } from '../utils';

const cardDirective: DirectiveRendererFn = ({
  directiveType,
  props,
  slots,
  renderSlot,
  options,
}) => {
  const { title, image, icon, url, target } = props;
  const customClass = props.class || '';
  const hasDescription = !!slots.description;
  const { isSingleCard } = (options || {}) as { isSingleCard?: boolean };

  const isModal = directiveType === 'card-m';
  const isLink = directiveType === 'card-b';

  const card = document.createElement('div');
  card.className = `nr-card${isModal || isLink ? ' nr-card--interactive' : ''} ${customClass}`.trim();
  applyBaseProps(card, props);

  // Image banner
  if (image) {
    const imgWrap = document.createElement('div');
    imgWrap.className = `nr-card__image${isSingleCard ? ' nr-card__image--tall' : ''}`;
    const img = document.createElement('img');
    img.src = image;
    img.alt = title || '';
    img.className = 'nr-card__img';

    // Detect tall images and enable scroll-on-hover
    img.addEventListener('load', () => {
      const containerWidth = imgWrap.offsetWidth;
      const containerHeight = imgWrap.offsetHeight;
      if (!containerWidth || !containerHeight) return;
      const scale = containerWidth / img.naturalWidth;
      const scaledHeight = img.naturalHeight * scale;

      if (scaledHeight > containerHeight * 1.2) {
        const scrollDist = -(scaledHeight - containerHeight);
        imgWrap.style.setProperty('--nr-scroll-y', `${scrollDist}px`);
        imgWrap.classList.add('nr-card__image--scrollable');
      }
    }, { once: true });

    imgWrap.appendChild(img);
    const gradient = document.createElement('div');
    gradient.className = 'nr-card__gradient';
    imgWrap.appendChild(gradient);
    card.appendChild(imgWrap);
  }

  // Content body
  const body = document.createElement('div');
  body.className = `nr-card__body${image ? ' nr-card__body--overlap' : ''}`;

  // Header: Icon + Title
  if (icon || title) {
    const header = document.createElement('div');
    header.className = 'nr-card__header';
    if (icon) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'nr-card__icon-wrap';
      iconWrap.appendChild(createIcon(icon));
      header.appendChild(iconWrap);
    }
    if (title) {
      const h3 = document.createElement('h3');
      h3.className = 'nr-card__title';
      h3.textContent = title;
      header.appendChild(h3);
    }
    body.appendChild(header);
  }

  // Description
  if (hasDescription) {
    const desc = document.createElement('div');
    desc.className = 'nr-card__description';
    desc.appendChild(renderSlot('description'));
    body.appendChild(desc);
  }

  // Content (for card type)
  if (directiveType === 'card') {
    const contentSlot = renderSlot('content') || renderSlot('default');
    if (contentSlot.childNodes.length > 0) {
      const contentDiv = document.createElement('div');
      contentDiv.className = 'nr-card__content';
      contentDiv.appendChild(contentSlot);
      body.appendChild(contentDiv);
    }
  }

  // Action link for card-m / card-b
  if (isModal || isLink) {
    const action = document.createElement('div');
    action.className = 'nr-card__action';

    if (isLink && url) {
      const a = document.createElement('a');
      a.href = url;
      a.target = target || '_blank';
      a.rel = 'noopener noreferrer';
      a.className = 'nr-card__action-link';
      a.appendChild(createIcon('open_in_new'));
      a.appendChild(document.createTextNode(' Link'));
      action.appendChild(a);
    } else if (isModal) {
      const modalBtn = document.createElement('div');
      modalBtn.className = 'nr-card__action-link';
      modalBtn.appendChild(createIcon('arrow_forward'));
      modalBtn.appendChild(document.createTextNode(' Abrir'));
      action.appendChild(modalBtn);
    }

    body.appendChild(action);
  }

  card.appendChild(body);

  // For card-m: attach modal
  if (isModal) {
    const dialog = createModal(title || 'Detalles');
    const modalBody = dialog.querySelector('.nr-modal__body');
    if (modalBody) {
      // Wrap in .nr-prose so the teleported content keeps module
      // typography and tokens once the dialog moves to <body>.
      const prose = document.createElement('div');
      prose.className = 'nr-prose';
      prose.appendChild(renderSlot('content') || renderSlot('default'));
      modalBody.appendChild(prose);
    }

    card.addEventListener('click', () => openModal(dialog));

    // Return fragment with card + dialog
    const frag = document.createDocumentFragment();
    frag.appendChild(card);
    frag.appendChild(dialog);
    return frag;
  }

  // For card-b: click opens URL
  if (isLink && url) {
    card.addEventListener('click', () => window.open(url, target || '_blank'));
  }

  return card;
};

export default cardDirective;
