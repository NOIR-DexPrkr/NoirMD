// ============================================================
// Slide Directive (Vue)
// ============================================================

import { defineComponent, h, ref, onMounted, onUnmounted, nextTick } from 'vue';
import type { DirectiveComponentProps } from '../types';
import type { Token } from '../../core/types';
import { parseCssString } from '../../core/utils';

let slideCounter = 0;

const SlideDirective = defineComponent({
  name: 'SlideDirective',
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
    const current = ref(0);
    const maxH = ref(0);
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let slideEls: HTMLElement[] = [];

    const measureAndSetHeight = () => {
      let h = 0;
      for (const el of slideEls) {
        h = Math.max(h, el.offsetHeight);
      }
      if (h > 0) maxH.value = h;
    };

    onMounted(() => {
      nextTick(() => {
        measureAndSetHeight();
        if (document.fonts?.ready) {
          document.fonts.ready.then(measureAndSetHeight);
        }
      });
    });

    onUnmounted(() => {
      if (intervalId) clearInterval(intervalId);
    });

    return () => {
      const p = props as DirectiveComponentProps;
      const ctx = p.context;
      const rawContent = p.slots.default || '';
      const lines = rawContent
        .split('\n')
        .map((l: string) => l.trim())
        .filter(Boolean);

      if (lines.length === 0) return h('div');

      const elements: Token[][] = lines.map((line: string) => ctx.parseMarkdown(line));

      const interval = parseInt(p.props.interval || '3000', 10);
      const speed = parseInt(p.props.speed || '500', 10);
      const rawClass = p.props.class || '';
      const inlineStyle = p.props.style ? parseCssString(p.props.style) : {};

      const scopeClass = `sld-${++slideCounter}`;

      // Start rotation if not already running
      if (lines.length > 1 && !intervalId) {
        intervalId = setInterval(() => {
          current.value = (current.value + 1) % elements.length;
        }, interval);
      }

      const textSizeMap: Record<string, string> = {
        'text-xs': '0.75rem', 'text-sm': '0.875rem', 'text-base': '1rem',
        'text-lg': '1.125rem', 'text-xl': '1.25rem', 'text-2xl': '1.5rem',
        'text-3xl': '1.875rem', 'text-4xl': '2.25rem', 'text-5xl': '3rem',
        'text-6xl': '3.75rem', 'text-7xl': '4.5rem', 'text-8xl': '6rem',
        'text-9xl': '8rem',
      };
      const textSizeMatch = rawClass.match(/\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/);
      const forcedFontSize = textSizeMatch ? textSizeMap[textSizeMatch[0]] : null;
      const className = textSizeMatch
        ? rawClass.replace(textSizeMatch[0], '').replace(/\s+/g, ' ').trim()
        : rawClass;

      return h('div', {
        class: 'not-prose',
        style: { height: maxH.value || 'auto', position: 'relative', overflow: 'hidden', ...inlineStyle },
      }, [
        forcedFontSize && h('style', `.${scopeClass} * { font-size: ${forcedFontSize} !important; line-height: normal !important; }`),
        h('div', {
          style: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            transition: `transform ${speed}ms cubic-bezier(0.16, 1, 0.3, 1)`,
            transform: `translateY(${-current.value * maxH.value}px)`,
          },
        }, elements.map((tokens: Token[], i: number) =>
          h('div', {
            key: i,
            ref: (el: any) => { slideEls[i] = el?.$el || el; },
            style: maxH.value
              ? { height: maxH.value, display: 'flex', alignItems: 'center', overflow: 'hidden' }
              : { display: 'flex', alignItems: 'center' },
          }, [
            h('div', {
              class: `${scopeClass} ${className}`.trim(),
              style: { width: '100%' },
            }, ctx.processAndRenderElements(tokens)),
          ])
        )),
      ]);
    };
  },
});

export default SlideDirective;
