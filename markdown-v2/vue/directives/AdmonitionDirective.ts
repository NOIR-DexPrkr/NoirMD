// ============================================================
// Admonition Directive (Vue)
// ============================================================

import { defineComponent, h } from 'vue';
import type { DirectiveComponentProps } from '../types';
import { Admonition } from '../ui-components';
import { parseCssString } from '../../core/utils';

const AdmonitionDirective = defineComponent({
  name: 'AdmonitionDirective',
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
      return h(Admonition, {
        type: p.directiveType,
        title: p.props.title,
        icon: p.props.icon,
        class: p.props.class,
        style: p.props.style ? parseCssString(p.props.style) : undefined,
      }, p.renderSlot('default'));
    };
  },
});

export default AdmonitionDirective;
