// ============================================================
// Details Directive (Vue)
// ============================================================

import { defineComponent, h } from 'vue';
import type { DirectiveComponentProps } from '../types';
import { Details } from '../ui-components';
import { parseCssString } from '../../core/utils';

const DetailsDirective = defineComponent({
  name: 'DetailsDirective',
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
      return h(Details, {
        title: p.props.title || 'Details',
        icon: p.props.icon,
        defaultOpen: p.props.defaultOpen === 'true',
        class: p.props.class,
        style: p.props.style ? parseCssString(p.props.style) : undefined,
      }, p.renderSlot('default'));
    };
  },
});

export default DetailsDirective;
