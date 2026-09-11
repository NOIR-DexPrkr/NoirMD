// ============================================================
// Modal Directive (vanilla)
// ============================================================

import type { DirectiveRendererFn } from './index';
import { createIcon, createModal } from '../components';
import { applyBaseProps, applyColor, applyAlignClass, resolveIcon, openModal } from '../utils';

const modalDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const label = props.label || props.title || 'Open';
  const modalTitle = props.title || 'Modal';
  const align = props.align || 'left';
  const iconName = resolveIcon(props.icon, 'open_in_full');

  // Wrapper
  const wrapper = document.createElement('div');
  wrapper.className = 'nr-modal-trigger';
  applyAlignClass(wrapper, 'nr-modal-trigger', align);

  // Button to open modal
  const btn = document.createElement('button');
  btn.className = 'nr-button nr-button--default';
  btn.setAttribute('aria-haspopup', 'dialog');
  applyColor(btn, props.color, 'nr-button');
  applyBaseProps(btn, props);

  if (iconName) btn.appendChild(createIcon(iconName));
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

  btn.addEventListener('click', () => openModal(dialog));

  wrapper.appendChild(btn);
  wrapper.appendChild(dialog);

  return wrapper;
};

export default modalDirective;
