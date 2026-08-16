// ============================================================
// Vue RawHtmlRenderer — thin wrapper around the vanilla raw-HTML
// renderer. Injects <style> blocks globally and force-executes
// <script> tags.
// ============================================================

import { defineComponent, h, onMounted, ref, watch } from 'vue';
import { renderHtmlString } from '../vanilla/renderer';
import { scanTailwindCDN } from './useTailwindCDN';

const RawHtmlRenderer = defineComponent({
  name: 'RawHtmlRenderer',
  props: {
    content: { type: String, required: true },
    wrapperClassName: { type: String, default: 'nr-raw-html' },
  },
  setup(props) {
    const container = ref<HTMLElement | null>(null);

    const render = () => {
      const el = container.value;
      if (!el) return;
      el.replaceChildren();
      el.appendChild(renderHtmlString(props.content));
      scanTailwindCDN();
    };

    onMounted(render);
    watch(() => props.content, render);

    return () => h('div', { ref: container, class: props.wrapperClassName });
  },
});

export default RawHtmlRenderer;