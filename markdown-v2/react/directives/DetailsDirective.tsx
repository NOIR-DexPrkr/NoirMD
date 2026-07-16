import React from 'react';
import type { DirectiveComponentProps } from '../types';
import { Details } from '../ui-components';
import { parseCssString } from '../../core/utils';

/**
 * Details Directive — collapsible section.
 *
 * V2 syntax:
 *   :::details {title="Click to expand" icon="expand_more" defaultOpen="true"}
 *   Hidden content here
 *   :::
 *
 *   :::details Short title
 *   Content
 *   :::
 */
const DetailsDirective: React.FC<DirectiveComponentProps> = ({
  props,
  renderSlot,
}) => {
  return (
    <Details
      title={props.title || 'Details'}
      icon={props.icon}
      defaultOpen={props.defaultOpen === 'true'}
      className={props.class}
      style={props.style ? parseCssString(props.style) : undefined}
    >
      {renderSlot('default')}
    </Details>
  );
};

export default DetailsDirective;
