// ============================================================
// Vue NRpreviewer — drop-in markdown/HTML preview component
// ============================================================

import { defineComponent, h, onMounted, onUnmounted, ref, type PropType } from 'vue';
import CustomMarkdownRenderer from './CustomMarkdownRenderer';
import RawHtmlRenderer from './RawHtmlRenderer';
import { useLazyTailwindCDN } from './useTailwindCDN';

const NRpreviewer = defineComponent({
  name: 'NRpreviewer',
  props: {
    content: { type: String, default: undefined },
    html: { type: String, default: undefined },
    tailwindCDN: { type: Boolean, default: false },
    className: { type: String, default: undefined },
    style: { type: Object as PropType<Record<string, string>>, default: undefined },
  },
  setup(props) {
    const tailwindEnabled = ref(props.tailwindCDN);

    // Guard: only run CDN injection on the client to avoid SSR errors
    if (typeof window !== 'undefined') {
      useLazyTailwindCDN(tailwindEnabled);
    }

    return () => {
      const wrapperClass = `nr-prose${props.className ? ` ${props.className}` : ''}`;

      if (props.content) {
        return h('div', { class: wrapperClass, style: props.style }, [
          h(CustomMarkdownRenderer, { content: props.content }),
        ]);
      }

      if (props.html) {
        return h('div', { class: wrapperClass, style: props.style }, [
          h(RawHtmlRenderer, {
            content: props.html,
            wrapperClassName: 'nr-preview-html',
          }),
        ]);
      }

      return null;
    };
  },
});

export default NRpreviewer;
