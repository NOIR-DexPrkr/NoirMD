// ============================================================
// Modal Directive (vanilla)
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createIcon, createModal } from '../components';

const modalDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const label = props.label || props.title || 'Open';
  const modalTitle = props.title || 'Modal';
  const customClass = props.class || '';

  // Wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'nr-modal-trigger';

  // Button to open modal
  const btn = document.createElement('button');
  btn.className = `nr-button nr-button--default`;
  if (customClass) btn.classList.add(...customClass.split(/\s+/).filter(Boolean));

  const icon = props.icon || 'open_in_new';
  if (icon) btn.appendChild(createIcon(icon));
  btn.appendChild(document.createTextNode(label));

  // Create the native dialog
  const dialog = createModal(modalTitle);
  const body = dialog.querySelector('.nr-modal__body');
  if (body) {
    // Wrap in .nr-prose so the teleported content keeps module
    // typography and tokens once the dialog moves to <body>.
    const prose = document.createElement('div');
    prose.className = 'nr-prose';
    prose.appendChild(renderSlot('default'));
    body.appendChild(prose);
  }

  btn.addEventListener('click', () => {
    if (!dialog.open) {
      document.body.appendChild(dialog); // append to body for proper layering
      dialog.showModal();
      dialog.addEventListener('close', () => {
        dialog.remove();
      }, { once: true });
    }
  });

  wrapper.appendChild(btn);
  wrapper.appendChild(dialog);

  return wrapper;
};

export default modalDirective;
