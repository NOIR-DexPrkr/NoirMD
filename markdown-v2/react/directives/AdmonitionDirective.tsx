import React from 'react';
import type { DirectiveComponentProps } from '../types';
import { Admonition } from '../ui-components';
import { parseCssString } from '../../core/utils';

/**
 * Admonition Directive — renders note, info, warning, danger, greentext boxes.
 *
 * V2 syntax:
 *   :::note {title="My Note" icon="info"}
 *   Content here
 *   :::
 *
 *   :::warning Short title text
 *   Content here
 *   :::
 */
const AdmonitionDirective: React.FC<DirectiveComponentProps> = ({
  directiveType,
  props,
  renderSlot,
}) => {
  return (
    <Admonition
      type={directiveType}
      title={props.title}
      icon={props.icon}
      className={props.class}
      style={props.style ? parseCssString(props.style) : undefined}
    >
      {renderSlot('default')}
    </Admonition>
  );
};

export default AdmonitionDirective;
