import React from 'react';
import type { DirectiveComponentProps } from '../types';
import { parseCssString } from '../../core/utils';

/**
 * Wrapper Directive — generic layout/styling wrapper for backward compatibility.
 * Consolidates 'div', 'raw', 'style', 'custom' directives.
 * Passes through all recognized props to a `<div>`.
 */
const WrapperDirective: React.FC<DirectiveComponentProps> = ({
  props,
  renderSlot,
}) => {
  const className = props.class || '';
  const id = props.id || '';

  // Parse inline styles from the `style` prop
  const inlineStyle = props.style ? parseCssString(props.style) : {};

  // Build wrapper props
  const wrapperProps: Record<string, any> = {};
  if (className) wrapperProps.className = className;
  if (id) wrapperProps.id = id;
  if (Object.keys(inlineStyle).length > 0) wrapperProps.style = inlineStyle;

  // Support arbitrary data-* attributes
  for (const [key, value] of Object.entries(props)) {
    if (key.startsWith('data-')) {
      wrapperProps[key] = value;
    }
  }

  return <div {...wrapperProps}>{renderSlot('default')}</div>;
};

export default WrapperDirective;
