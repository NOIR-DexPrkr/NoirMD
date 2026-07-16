// ============================================================
// Modal Directive (Vue)
// ============================================================

import { defineComponent, h } from 'vue';
import type { DirectiveComponentProps } from '../types';
import { IconRenderer, Modal } from '../ui-components';
import { useRenderContext } from '../context';

const ModalDirective = defineComponent({
  name: 'ModalDirective',
  props: {
    directiveType: String,
    props: Object,
    slots: Object,
    renderSlot: Function,
    context: Object,
    index: [String, Number],
    allElements: Array,
    options: Object,
  },
  setup(props) {
    return () => {
      const p = props as DirectiveComponentProps;
      const ctx = useRenderContext();
      const modalId = `modal-${p.props.id || Math.random().toString(36).slice(2, 9)}`;
      const label = p.props.label || p.props.title || 'Open';
      const modalTitle = p.props.title || 'Modal';
      const customClass = p.props.class || '';

      // Smart size detection
      const hasSizeClass = /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/.test(customClass);
      const sizeClass = hasSizeClass ? '' : 'text-sm';

      // Smart display detection
      const hasDisplayClass = /\b(flex|inline-flex|block|inline-block|grid|inline-grid|hidden)\b/.test(customClass);
      const displayClass = hasDisplayClass ? '' : 'inline-flex';

      // Smart margin
      const isInlineFlex = /\binline-flex\b/.test(customClass);
      const marginClass = isInlineFlex ? 'my-1 mx-1' : 'my-4';

      const btnBase = `${displayClass} items-center w-fit ${marginClass} ${sizeClass} px-4 py-2 rounded-xl font-bold no-underline gap-2 transition-all hover:scale-105 active:scale-95 border border-border bg-background-primary/5 hover:bg-background-primary/10 text-text-primary hover:text-text-primary`.replace(/\s+/g, ' ');
      const btnClass = `${btnBase} ${customClass}`.trim();

      // Resolve position shorthand
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
        ctx.setModals(prev => ({ ...prev, [modalId]: true }));
      };

      const handleClose = () => {
        ctx.setModals(prev => ({ ...prev, [modalId]: false }));
      };

      return h('div', { class: `not-prose ${wrapperClass}`.trim() }, [
        h('button', { class: btnClass, onClick: handleOpen }, [
          p.props.icon && h(IconRenderer, { iconName: p.props.icon }),
          label,
        ]),
        h(Modal, {
          title: modalTitle,
          isOpen: !!ctx.modals.value[modalId],
          onClose: handleClose,
        }, p.renderSlot('default')),
      ]);
    };
  },
});

export default ModalDirective;
