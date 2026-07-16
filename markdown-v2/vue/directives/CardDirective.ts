// ============================================================
// Card Directive (Vue)
// ============================================================

import { defineComponent, h, ref } from 'vue';
import type { DirectiveComponentProps } from '../types';
import { IconRenderer, Modal } from '../ui-components';
import { parseCssString } from '../../core/utils';
import { useRenderContext } from '../context';

const CardDirective = defineComponent({
  name: 'CardDirective',
  props: {
    directiveType: String,
    props: Object,
    slots: Object,
    renderSlot: Function,
    context: Object,
    index: [String, Number],
    allElements: Array,
    options: { type: Object, default: () => ({}) },
  },
  setup(props) {
    return () => {
      const p = props as DirectiveComponentProps;
      const ctx = useRenderContext();
      const { title, image, icon, class: customClass, url, target } = p.props;
      const hasDescription = !!p.slots.description;
      const { isSingleCard } = (p.options || {}) as { isSingleCard?: boolean };

      const isModal = p.directiveType === 'card-m';
      const isLink = p.directiveType === 'card-b';

      const modalId = `modal-card-${p.props.id || Math.random().toString(36).slice(2, 9)}`;
      const inlineStyles = p.props.style ? parseCssString(p.props.style) : {};

      const description = hasDescription ? p.renderSlot('description') : null;
      const content = p.renderSlot('content') || p.renderSlot('default');

      const handleClick = isModal
        ? (e: Event) => {
            e.preventDefault();
            e.stopPropagation();
            ctx.setModals(prev => ({ ...prev, [modalId]: true }));
          }
        : isLink && url
          ? () => window.open(url, '_blank')
          : undefined;

      const card = h('div', {
        class: `flex flex-col h-full rounded-3xl transition-all relative overflow-hidden group border min-w-[18rem] w-[18rem] max-w-[20rem] ${isModal || isLink ? 'cursor-pointer !border-accent-primary/10 hover:border-accent-primary/50' : 'border-border'} ${customClass || ''}`.trim(),
        style: inlineStyles,
        onClick: handleClick,
        role: isModal ? 'button' : undefined,
        tabIndex: isModal ? 0 : undefined,
        onKeyDown: isModal
          ? (e: KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                ctx.setModals(prev => ({ ...prev, [modalId]: true }));
              }
            }
          : undefined,
      }, [
        // Image banner
        image && h('div', {
          class: `w-full ${isSingleCard ? 'h-[240px]' : 'h-[160px]'} overflow-hidden relative transition-all duration-500`,
        }, [
          h('img', { src: image, alt: title || '', class: 'w-full h-full object-cover !m-0' }),
          h('div', { class: 'absolute inset-0 bg-gradient-to-t from-background-primary/40 to-transparent' }),
        ]),

        // Content body
        h('div', {
          class: `flex flex-col flex-1 bg-background-primary/80 rounded-t-xl p-6 relative ${image ? '-mt-10' : ''} border-t border-white/5 shadow-2xl`,
        }, [
          // Header: Icon + Title
          (icon || title) && h('div', { class: 'flex items-center gap-3 mb-3' }, [
            icon && h('div', {
              class: 'w-10 h-10 text-[1.6em] rounded-xl bg-accent-primary/20 flex items-center justify-center shrink-0 text-accent-primary',
            }, h(IconRenderer, { iconName: icon })),
            h('h3', { class: 'text-base font-black tracking-tight leading-tight !m-0' }, title),
          ]),

          // Content Body
          h('div', { class: 'flex-1 flex flex-col gap-2' }, [
            description && h('div', { class: 'text-sm opacity-80 leading-relaxed font-medium' }, description),
            p.directiveType === 'card' && content && content.length > 0
              ? h('div', { class: 'mt-2' }, content)
              : null,
          ]),

          // Bottom: Action Link
          (isModal || isLink) && h('div', { class: 'mt-6 flex justify-end' }, [
            isLink && url
              ? h('a', {
                  href: url,
                  target: '_blank',
                  rel: 'noopener noreferrer',
                  class: 'bg-accent-primary/20 hover:bg-accent-primary/30 px-4 py-2 rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 group-hover:text-accent-primary transition-all no-underline',
                  onClick: (e: Event) => e.stopPropagation(),
                }, [h(IconRenderer, { iconName: 'open_in_new' }), ' Link'])
              : isModal
                ? h('div', {
                    class: 'bg-accent-primary/20 hover:bg-accent-primary/30 px-4 py-2 cursor-pointer rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest opacity-50 group-hover:opacity-100 group-hover:text-accent-primary transition-all',
                  }, [h(IconRenderer, { iconName: 'arrow_forward' }), ' Abrir'])
                : null,
          ]),
        ]),
      ]);

      // For card-m: attach modal
      if (isModal) {
        const modalContent = p.renderSlot('content') || p.renderSlot('default');
        return h('div', null, [
          card,
          h(Modal, {
            title: title || 'Detalles',
            isOpen: !!ctx.modals.value[modalId],
            onClose: () => ctx.setModals(prev => ({ ...prev, [modalId]: false })),
          }, [
            h('div', { class: 'prose prose-sm max-w-none' }, modalContent),
          ]),
        ]);
      }

      return card;
    };
  },
});

export default CardDirective;
