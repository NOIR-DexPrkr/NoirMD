// ============================================================
// Vue NRpreviewer — drop-in markdown/HTML preview component
// ============================================================

import { defineComponent, h, ref, type PropType } from 'vue';
import CustomMarkdownRenderer from './CustomMarkdownRenderer';
import RawHtmlRenderer from './RawHtmlRenderer';
import { useLazyTailwindCDN } from './useTailwindCDN';

export interface NRpreviewerProps {
  /** Markdown string to render */
  content?: string;
  /** Raw HTML string to render (used when content is not provided) */
  html?: string;
  /** Inject Tailwind v4 browser CDN at runtime for user-authored Tailwind classes. Default: false */
  tailwindCDN?: boolean;
  /** Additional CSS class on the wrapper element */
  className?: string;
  /** Inline styles on the wrapper element */
  style?: Record<string, string>;
}

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
          h(RawHtmlRenderer, { content: props.html }),
        ]);
      }

      return null;
    };
  },
});

export default NRpreviewer;