// ============================================================
// Wrapper Directive (Vue)
// ============================================================

import { defineComponent, h } from 'vue';
import type { DirectiveComponentProps } from '../types';
import { parseCssString } from '../../core/utils';

const WrapperDirective = defineComponent({
  name: 'WrapperDirective',
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
      const className = p.props.class || '';
      const id = p.props.id || '';
      const inlineStyle = p.props.style ? parseCssString(p.props.style) : {};

      const wrapperProps: Record<string, any> = {};
      if (className) wrapperProps.class = className;
      if (id) wrapperProps.id = id;
      if (Object.keys(inlineStyle).length > 0) wrapperProps.style = inlineStyle;

      // Support arbitrary data-* attributes
      for (const [key, value] of Object.entries(p.props)) {
        if (key.startsWith('data-')) {
          wrapperProps[key] = value;
        }
      }

      return h('div', wrapperProps, p.renderSlot('default'));
    };
  },
});

export default WrapperDirective;
