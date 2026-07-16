import React from 'react';
import type { DirectiveComponentProps } from '../types';
import { IconRenderer } from '../ui-components';

/**
 * Button Directive — styled link button (Tailwind with override pattern).
 *
 * V2 syntax:
 *   :::button {url="https://example.com" label="Click Me" icon="arrow_forward" class="text-lg"}
 *   :::
 *
 *   Or with content as label:
 *   :::button {url="https://example.com" icon="star"}
 *   Click Me
 *   :::
 */
const ButtonDirective: React.FC<DirectiveComponentProps> = ({
  props,
  renderSlot,
}) => {
  const url = props.url || props.href || '#';
  const label = props.label;
  const icon = props.icon || 'near_me';
  const target = props.target || '_blank';
  const customClass = props.class || '';

  // Smart size detection — only add default if user didn't provide one
  const hasSizeClass = /\btext-(xs|sm|base|lg|xl|[2-9]xl)\b/.test(customClass);
  const sizeClass = hasSizeClass ? '' : 'text-sm';

  // Smart display detection
  const hasDisplayClass = /\b(flex|inline-flex|block|inline-block|grid|inline-grid|hidden)\b/.test(customClass);
  const displayClass = hasDisplayClass ? '' : 'inline-flex';

  // Smart margin — inline vs block
  const isInline = !customClass || !/\b(flex|block|grid)\b/.test(customClass) || /\binline-flex\b/.test(customClass);
  const marginClass = isInline ? 'my-1 mx-1' : 'my-4';

  // Base button styles (Tailwind puro)
  const btnBase = `${displayClass} items-center w-fit ${marginClass} ${sizeClass} px-4 py-2 rounded-xl font-bold no-underline gap-2 transition-all hover:scale-105 active:scale-95 border border-border bg-background-primary/5 hover:bg-background-primary/10 text-text-primary hover:text-text-primary`.replace(/\s+/g, ' ');
  const btnClass = `${btnBase} ${customClass}`.trim();

  // Resolve position shorthand → flex classes for button wrapper
  const positionMap: Record<string, string> = {
    '#left': 'flex justify-start',
    '#center': 'flex justify-center',
    '#right': 'flex justify-end',
  };
  const wrapperClass = customClass
    .split(/\s+/)
    .map(c => positionMap[c] || c)
    .join(' ');

  // If label is provided, use it directly (no slot rendering needed)
  if (label) {
    return (
      <div className={`not-prose ${wrapperClass}`.trim()}>
        <a
          href={url}
          target={target}
          rel="noopener noreferrer"
          className={btnClass}
        >
          <IconRenderer iconName={icon} />
          {label}
        </a>
      </div>
    );
  }

  // Otherwise, render slot content (which may contain links)
  const slotContent = renderSlot('default');
  const findLinks = (element: React.ReactNode): React.ReactElement<any>[] => {
    if (!element) return [];
    if (React.isValidElement(element) && (element.type as any) === 'a') {
      return [element as React.ReactElement<any>];
    }
    if (Array.isArray(element)) {
      return element.flatMap(findLinks);
    }
    if (React.isValidElement(element) && (element.props as any).children) {
      return findLinks((element.props as any).children);
    }
    return [];
  };

  const links = findLinks(slotContent);

  if (links.length > 0) {
    return (
      <div className={`not-prose ${wrapperClass}`.trim()}>
        {links.map((link, index) =>
          React.cloneElement(
            link,
            {
              key: index,
              className: `${(link.props as any).className || ''} ${btnClass}`.trim(),
              target: target,
              rel: 'noopener noreferrer',
            },
            <>
              <IconRenderer iconName={icon} />
              {(link.props as any).children}
            </>
          )
        )}
      </div>
    );
  }

  // Fallback: wrap content in an anchor
  return (
    <div className={`not-prose ${wrapperClass}`.trim()}>
      <a href={url} target={target} rel="noopener noreferrer" className={btnClass}>
        <IconRenderer iconName={icon} />
        {slotContent}
      </a>
    </div>
  );
};

export default ButtonDirective;
