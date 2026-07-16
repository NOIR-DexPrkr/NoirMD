// ============================================================
// Vue DirectiveRenderer — routes directive tokens to components
// ============================================================

import { defineComponent, h, type PropType } from 'vue';
import type { DirectiveToken, Token } from '../core/types';
import type { RenderContext } from './types';
import directiveRegistry from './directives';

const DirectiveRenderer = defineComponent({
  name: 'DirectiveRenderer',
  props: {
    element: { type: Object as PropType<DirectiveToken>, required: true },
    context: { type: Object as PropType<RenderContext>, required: true },
    index: { type: Number, required: true },
    allElements: { type: Array as PropType<Token[]>, required: true },
  },
  setup(props) {
    return () => {
      const { element, context, index, allElements } = props;
      const { directiveType, props: directiveProps, slots, scopeId } = element;

      // Look up the directive component in the registry
      const Component = directiveRegistry[directiveType];

      // Convenience: render a named slot as parsed markdown
      const renderSlot = (name: string) => {
        const slotContent = slots[name];
        if (!slotContent) return [];
        const parsed = context.parseMarkdown(slotContent);
        return context.processAndRenderElements(parsed);
      };

      const componentProps = {
        directiveType,
        props: directiveProps,
        slots,
        renderSlot,
        context,
        index,
        allElements,
      };

      if (Component) {
        return h(Component, componentProps);
      }

      // Fallback: unknown directive → render as a div with default slot
      return h('div', {
        key: index,
        class: 'my-4 p-4 rounded-2xl border border-border bg-background-primary/5',
      }, renderSlot('default'));
    };
  },
});

export default DirectiveRenderer;
