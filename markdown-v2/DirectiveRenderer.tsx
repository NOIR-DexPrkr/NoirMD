import React from 'react';
import type { DirectiveComponentProps, DirectiveToken, RenderContext, Token } from './types';
import directiveRegistry from './directives';

interface DirectiveRendererProps {
  element: DirectiveToken;
  context: RenderContext;
  index: number;
  allElements: Token[];
}

/**
 * DirectiveRenderer — looks up a directive type in the registry
 * and dispatches to the appropriate component with unified props.
 */
const DirectiveRenderer: React.FC<DirectiveRendererProps> = ({
  element,
  context,
  index,
  allElements,
}) => {
  const { directiveType, props, slots, scopeId } = element;

  // Look up the directive component in the registry
  const Component = directiveRegistry[directiveType];

  // Convenience: render a named slot as parsed markdown
  const renderSlot = (name: string): React.ReactNode => {
    const slotContent = slots[name];
    if (!slotContent) return null;
    const parsed = context.parseMarkdown(slotContent);
    return context.processAndRenderElements(parsed);
  };

  const directiveProps: DirectiveComponentProps = {
    directiveType,
    props,
    slots,
    renderSlot,
    context,
    index,
    allElements,
  };

  if (Component) {
    return <Component key={index} {...directiveProps} />;
  }

  // Fallback: unknown directive → render as a div with default slot
  return (
    <div key={index} className={`my-4 p-4 rounded-2xl border border-border bg-background-primary/5`}>
      {renderSlot('default')}
    </div>
  );
};

export default DirectiveRenderer;
