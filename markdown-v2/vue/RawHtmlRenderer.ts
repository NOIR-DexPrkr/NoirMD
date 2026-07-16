// ============================================================
// Vue RawHtmlRenderer — renders raw HTML with script execution
// ============================================================

import { defineComponent, h, ref, onMounted, type PropType } from 'vue';
import { scanTailwindCDN } from './useTailwindCDN';

const RawHtmlRenderer = defineComponent({
  name: 'RawHtmlRenderer',
  props: {
    content: { type: String, required: true },
    globalStyles: { type: String, default: undefined },
    wrapperClassName: { type: String, required: true },
  },
  setup(props) {
    const containerRef = ref<HTMLElement | null>(null);

    onMounted(() => {
      if (!containerRef.value) return;

      // Force-execute injected scripts
      const scripts = containerRef.value.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });

      scanTailwindCDN();
    });

    return () => {
      const children: any[] = [
        h('div', { innerHTML: props.content }),
      ];

      return h('div', { ref: containerRef, class: props.wrapperClassName }, children);
    };
  },
});

export default RawHtmlRenderer;
