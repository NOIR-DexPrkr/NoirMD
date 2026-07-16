import React, { useId } from 'react';
import type { DirectiveComponentProps } from '../types';
import { IconRenderer, Modal } from '../ui-components';

/**
 * Modal Directive — button that opens a modal with content.
 * Uses Tailwind with override pattern + Base UI Dialog.
 *
 * V2 syntax:
 *   :::modal {title="My Modal" label="Open Modal" icon="open_in_new" class="text-lg"}
 *   Modal content here
 *   :::
 */
const ModalDirective: React.FC<DirectiveComponentProps> = ({
  props,
  renderSlot,
  context,
}) => {
  const stableId = useId();
  const modalId = `modal-${props.id || stableId}`;
  const label = props.label || props.title || 'Open';
  const modalTitle = props.title || 'Modal';
  const customClass = props.class || '';

  // Smart size detection — only add default if user didn't provide one
  const hasSizeClass = /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/.test(customClass);
  const sizeClass = hasSizeClass ? '' : 'text-sm';

  // Smart display detection
  const hasDisplayClass = /\b(flex|inline-flex|block|inline-block|grid|inline-grid|hidden)\b/.test(customClass);
  const displayClass = hasDisplayClass ? '' : 'inline-flex';

  // Smart margin — inline vs block
  const isInlineFlex = /\binline-flex\b/.test(customClass);
  const marginClass = isInlineFlex ? 'my-1 mx-1' : 'my-4';

  // Base button styles (Tailwind puro)
  const btnBase = `${displayClass} items-center w-fit ${marginClass} ${sizeClass} px-4 py-2 rounded-xl font-bold no-underline gap-2 transition-all hover:scale-105 active:scale-95 border border-border bg-background-primary/5 hover:bg-background-primary/10 text-text-primary hover:text-text-primary`.replace(/\s+/g, ' ');
  const btnClass = `${btnBase} ${customClass}`.trim();

  // Resolve position shorthand → text classes for wrapper
  const positionMap: Record<string, string> = {
    '#left': 'text-left',
    '#center': 'text-center',
    '#right': 'text-right',
  };
  const wrapperClass = customClass
    .split(/\s+/)
    .map(c => positionMap[c] || c)
    .join(' ');

  const handleOpen = () => {
    context.setModals(prev => ({ ...prev, [modalId]: true }));
  };

  const handleClose = () => {
    context.setModals(prev => ({ ...prev, [modalId]: false }));
  };

  return (
    <div className={`not-prose ${wrapperClass}`.trim()}>
      <button className={btnClass} onClick={handleOpen}>
        {props.icon && <IconRenderer iconName={props.icon} />}
        {label}
      </button>

      <Modal
        title={modalTitle}
        isOpen={!!context.modals[modalId]}
        onClose={handleClose}
      >
        {renderSlot('default')}
      </Modal>
    </div>
  );
};

export default ModalDirective;
