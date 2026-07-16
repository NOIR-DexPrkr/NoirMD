// ============================================================
// Vue UI Components — Icon, CodeBlock, Admonition, Details, Modal
// ============================================================

import { h, ref, defineComponent, type VNode, type PropType } from 'vue';
import hljs from './highlightSetup';
import { renderInline } from './renderers';
import type { CSSProperties } from '../core/types';

// ─────────────────────────────────────────────
// IconRenderer — Material Icons by name or codepoint
// ─────────────────────────────────────────────

export const IconRenderer = defineComponent({
  name: 'IconRenderer',
  props: {
    iconName: { type: String, required: true },
    extraClasses: { type: String, default: '' },
  },
  setup(props) {
    return () => {
      if (!props.iconName) return null;
      const baseClass = `material-symbols-rounded !text-[1em] leading-none align-top ${props.extraClasses}`;
      const isCodepoint = /^[eE][0-9a-fA-F]{3,4}$/.test(props.iconName);

      if (isCodepoint) {
        return h('span', {
          class: baseClass,
          innerHTML: `&#x${props.iconName};`,
          'aria-hidden': 'true',
        });
      }

      return h('span', { class: baseClass, 'aria-hidden': 'true' }, props.iconName);
    };
  },
});

// ─────────────────────────────────────────────
// CodeBlock — synchronous syntax highlighting + copy
// ─────────────────────────────────────────────

export const CodeBlock = defineComponent({
  name: 'CodeBlock',
  props: {
    code: { type: String, required: true },
    language: { type: String, default: '' },
    title: { type: String, default: undefined },
  },
  setup(props) {
    const copied = ref(false);
    let timer: ReturnType<typeof setTimeout> | null = null;

    const lang = () => props.language?.split(/[\s{]/)[0]?.trim() || '';

    const html = () => {
      try {
        if (lang() && hljs.getLanguage(lang())) {
          return hljs.highlight(props.code, { language: lang() }).value;
        }
        return hljs.highlightAuto(props.code).value;
      } catch {
        return '';
      }
    };

    const handleCopy = () => {
      navigator.clipboard.writeText(props.code);
      copied.value = true;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => { copied.value = false; }, 1800);
    };

    return () => h('div', { class: 'not-prose my-4 rounded-2xl border border-border overflow-hidden bg-background-secondary-solid/5 relative' }, [
      props.title && h('div', { class: 'flex items-center gap-2 px-4 py-2 border-b border-border bg-background-secondary-solid/10 text-xs sm:text-sm font-mono text-text-secondary' }, [
        h('span', { class: 'material-symbols-rounded text-base' }, 'description'),
        props.title,
      ]),
      h('div', { class: 'overflow-auto [&_pre]:m-0 [&_pre]:p-4 [&_pre]:text-xs sm:[&_pre]:text-sm' }, [
        h('pre', { class: 'm-0' }, [
          h('code', {
            class: `language-${lang() || 'plaintext'}`,
            innerHTML: html(),
          }),
        ]),
      ]),
      h('button', {
        class: 'absolute top-2 right-2 p-1.5 rounded-lg bg-background-secondary-solid/20 hover:bg-background-secondary-solid/40 transition-colors cursor-pointer border-none text-text-secondary hover:text-text-primary',
        onClick: handleCopy,
        title: 'Copy code',
      }, [
        h('span', { class: 'material-symbols-rounded', style: { fontSize: '1rem' } },
          copied.value ? 'check' : 'content_copy'
        ),
      ]),
    ]);
  },
});

// ─────────────────────────────────────────────
// Admonition — styled alert box
// ─────────────────────────────────────────────

const defaultIcons: Record<string, string> = {
  note: 'info',
  info: 'lightbulb',
  warning: 'warning',
  danger: 'report',
  greentext: 'subdirectory_play_arrow',
};

const typeClasses: Record<string, string> = {
  note: 'border-info/20 bg-info/5 text-info',
  info: 'border-info/30 bg-info/10 text-info',
  warning: 'border-amber-500/30 bg-amber-500/10 text-amber-500',
  danger: 'border-danger/30 bg-danger/10 text-danger',
  greentext: 'border-success/30 bg-success/10 text-success',
};

export const Admonition = defineComponent({
  name: 'Admonition',
  props: {
    type: { type: String, default: 'note' },
    title: { type: String, default: undefined },
    icon: { type: String, default: undefined },
    class: { type: String, default: '' },
    style: { type: Object as PropType<CSSProperties>, default: undefined },
  },
  setup(props, { slots }) {
    return () => {
      const iconToRender = props.icon || defaultIcons[props.type] || 'info';
      const cls = `not-prose rounded-2xl mb-6 border shadow-xs p-4 ${typeClasses[props.type] || typeClasses.note} ${props.class}`;

      return h('div', { class: cls, style: props.style }, [
        props.title && h('h5', { class: 'font-bold text-base mb-2 m-0 flex items-center gap-2' }, [
          h(IconRenderer, { iconName: iconToRender, extraClasses: 'shrink-0' }),
          h('span', props.title),
        ]),
        h('div', { class: 'text-sm leading-relaxed opacity-90' }, slots.default?.()),
      ]);
    };
  },
});

// ─────────────────────────────────────────────
// Details — collapsible section
// ─────────────────────────────────────────────

export const Details = defineComponent({
  name: 'Details',
  props: {
    title: { type: String, required: true },
    icon: { type: String, default: undefined },
    defaultOpen: { type: Boolean, default: false },
    class: { type: String, default: '' },
    style: { type: Object as PropType<CSSProperties>, default: undefined },
  },
  setup(props, { slots }) {
    const isOpen = ref(props.defaultOpen);
    const iconToRender = props.icon || 'play_arrow';

    return () => h('details', {
      class: `not-prose rounded-2xl border border-border mb-4 bg-background-primary/5 ${props.class}`,
      open: isOpen.value,
      style: props.style,
    }, [
      h('summary', {
        class: 'cursor-pointer p-4 font-bold flex items-center gap-2 list-none [&::-webkit-details-marker]:hidden hover:text-accent-primary transition-colors',
        onClick: (e: Event) => {
          e.preventDefault();
          isOpen.value = !isOpen.value;
        },
      }, [
        h(IconRenderer, {
          iconName: iconToRender,
          extraClasses: `transition-transform ${isOpen.value ? 'rotate-90' : ''}`,
        }),
        h('span', props.title),
      ]),
      isOpen.value && h('div', {
        class: 'px-4 pb-4 border-t border-border pt-3 text-sm leading-relaxed opacity-90 overflow-hidden min-w-0',
      }, slots.default?.()),
    ]);
  },
});

// ─────────────────────────────────────────────
// Modal — native <dialog>
// ─────────────────────────────────────────────

export const Modal = defineComponent({
  name: 'Modal',
  props: {
    title: { type: String, required: true },
    isOpen: { type: Boolean, required: true },
    onClose: { type: Function as PropType<() => void>, required: true },
  },
  setup(props, { slots }) {
    let dialogEl: HTMLDialogElement | null = null;

    const showDialog = () => {
      if (dialogEl && !dialogEl.open) {
        document.body.appendChild(dialogEl);
        dialogEl.showModal();
      }
    };

    const closeDialog = () => {
      if (dialogEl) {
        dialogEl.close();
      }
    };

    return () => {
      const dialog = h('dialog', {
        ref: (el: any) => { dialogEl = el?.$el || el; },
        class: 'nr-modal',
        onClick: (e: Event) => {
          if (e.target === dialogEl) closeDialog();
        },
        onClosed: () => {
          dialogEl?.remove();
          props.onClose();
        },
      }, [
        h('div', { class: 'nr-modal__popup' }, [
          h('div', { class: 'nr-modal__header' }, [
            h('h2', { class: 'nr-modal__title' }, props.title),
            h('button', {
              class: 'nr-modal__close',
              onClick: closeDialog,
            }, [
              h('span', { class: 'material-symbols-rounded' }, 'close'),
            ]),
          ]),
          h('div', { class: 'nr-modal__body' }, slots.default?.()),
        ]),
      ]);

      // Watch for isOpen changes
      if (props.isOpen) {
        // Use nextTick to ensure dialog is in DOM
        Promise.resolve().then(showDialog);
      }

      return dialog;
    };
  },
});
