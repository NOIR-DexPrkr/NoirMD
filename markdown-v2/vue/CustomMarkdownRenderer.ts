// ============================================================
// Vue CustomMarkdownRenderer — thin wrapper around the
// framework-agnostic vanilla renderer.
//
// Pipeline:
//   content (string) → renderMarkdownString() → HTMLElement → mounted
// ============================================================

import { defineComponent, h, onMounted, onUnmounted, ref, watch } from 'vue';
import { renderMarkdownString } from '../vanilla/renderer';
import { scrollToId } from '../core/utils';
import { scanTailwindCDN } from './useTailwindCDN';

const CustomMarkdownRenderer = defineComponent({
  name: 'CustomMarkdownRenderer',
  props: {
    content: { type: String, required: true },
  },
  setup(props) {
    const container = ref<HTMLElement | null>(null);

    // Mount (or re-mount) the vanilla-rendered element
    const render = () => {
      const el = container.value;
      if (!el) return;
      el.replaceChildren();
      el.appendChild(renderMarkdownString(props.content));
      scanTailwindCDN();
    };

    let cleanupHash: (() => void) | null = null;

    onMounted(() => {
      render();

      const handleHashChange = () => {
        const hash = window.location.hash;
        if (hash) {
          const parts = hash.split('#');
          scrollToId(parts[parts.length - 1]);
        }
      };
      handleHashChange();
      window.addEventListener('hashchange', handleHashChange);
      cleanupHash = () => window.removeEventListener('hashchange', handleHashChange);
    });

    watch(() => props.content, render);

    onUnmounted(() => {
      cleanupHash?.();
    });

    return () => h('div', { ref: container });
  },
});

export default CustomMarkdownRenderer;