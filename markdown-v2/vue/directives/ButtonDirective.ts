// ============================================================
// Button Directive (Vue)
// ============================================================

import { defineComponent, h, type VNode } from 'vue';
import type { DirectiveComponentProps } from '../types';
import { IconRenderer } from '../ui-components';

const ButtonDirective = defineComponent({
  name: 'ButtonDirective',
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
      const url = p.props.url || p.props.href || '#';
      const label = p.props.label;
      const icon = p.props.icon || 'near_me';
      const target = p.props.target || '_blank';
      const customClass = p.props.class || '';

      // Smart size detection
      const hasSizeClass = /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/.test(customClass);
      const sizeClass = hasSizeClass ? '' : 'text-sm';

      // Smart display detection
      const hasDisplayClass = /\b(flex|inline-flex|block|inline-block|grid|inline-grid|hidden)\b/.test(customClass);
      const displayClass = hasDisplayClass ? '' : 'inline-flex';

      // Smart margin
      const isInline = !customClass || !/\b(flex|block|grid)\b/.test(customClass) || /\binline-flex\b/.test(customClass);
      const marginClass = isInline ? 'my-1 mx-1' : 'my-4';

      const btnBase = `${displayClass} items-center w-fit ${marginClass} ${sizeClass} px-4 py-2 rounded-xl font-bold no-underline gap-2 transition-all hover:scale-105 active:scale-95 border border-border bg-background-primary/5 hover:bg-background-primary/10 text-text-primary hover:text-text-primary`.replace(/\s+/g, ' ');
      const btnClass = `${btnBase} ${customClass}`.trim();

      // Resolve position shorthand
      const positionMap: Record<string, string> = {
        '#left': 'flex justify-start',
        '#center': 'flex justify-center',
        '#right': 'flex justify-end',
      };
      const wrapperClass = customClass
        .split(/\s+/)
        .map(c => positionMap[c] || c)
        .join(' ');

      // If label is provided, use it directly
      if (label) {
        return h('div', { class: `not-prose ${wrapperClass}`.trim() }, [
          h('a', {
            href: url,
            target,
            rel: 'noopener noreferrer',
            class: btnClass,
          }, [
            h(IconRenderer, { iconName: icon }),
            label,
          ]),
        ]);
      }

      // Otherwise, render slot content
      const slotContent = p.renderSlot('default');

      // Helper to find links in VNode tree
      const findLinks = (vnodes: VNode[]): VNode[] => {
        const links: VNode[] = [];
        for (const vnode of vnodes) {
          if (!vnode) continue;
          if (typeof vnode.type === 'string' && vnode.type === 'a') {
            links.push(vnode);
          }
          if (vnode.children && Array.isArray(vnode.children)) {
            links.push(...findLinks(vnode.children as VNode[]));
          }
        }
        return links;
      };

      const links = findLinks(Array.isArray(slotContent) ? slotContent : [slotContent]);

      if (links.length > 0) {
        return h('div', { class: `not-prose ${wrapperClass}`.trim() }, links.map((link, i) => {
          const linkChildren: any[] = Array.isArray(link.children)
            ? link.children
            : link.children != null
              ? [link.children]
              : [];
          return h('a', {
            key: i,
            ...(link.props || {}),
            class: `${(link.props?.class as string) || ''} ${btnClass}`.trim(),
            target,
            rel: 'noopener noreferrer',
          }, [
            h(IconRenderer, { iconName: icon }),
            ...linkChildren,
          ]);
        }));
      }

      // Fallback: wrap content in an anchor
      return h('div', { class: `not-prose ${wrapperClass}`.trim() }, [
        h('a', {
          href: url,
          target,
          rel: 'noopener noreferrer',
          class: btnClass,
        }, [
          h(IconRenderer, { iconName: icon }),
          slotContent,
        ]),
      ]);
    };
  },
});

export default ButtonDirective;
