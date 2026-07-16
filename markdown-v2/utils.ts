import React from 'react';

/**
 * Parse an inline CSS string (e.g. "color: red; padding: 1rem") into a React.CSSProperties object.
 */
export function parseCssString(cssText: string): React.CSSProperties {
  if (!cssText) return {};
  return cssText
    .split(';')
    .filter(Boolean)
    .reduce<Record<string, string>>((styleObj, styleString) => {
      const parts = styleString.split(':');
      if (parts.length < 2) return styleObj;
      const key = parts[0].trim().replace(/-([a-z])/g, (_, g) => g.toUpperCase());
      const value = parts.slice(1).join(':').trim();
      styleObj[key] = value;
      return styleObj;
    }, {}) as React.CSSProperties;
}

/**
 * Generate a URL-safe slug from text (NFD decomposition, strip accents, lowercase, hyphenate).
 */
export function generateId(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

/**
 * Smooth-scroll to an element by its ID.
 */
export function scrollToId(id: string): void {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Parse attribute suffix like `##{.my-class #my-id}` from a text line.
 * Returns the cleaned text, extracted classes, and id.
 */
export function extractAttributes(text: string): { text: string; classes: string; id: string } {
  const match = text.match(/^(.*?)\s*##\{([^}]*)\}\s*$/);
  if (!match) return { text, classes: '', id: '' };

  const rawAttrs = match[2];
  const cleanedText = match[1];

  const classList: string[] = [];
  let id = '';

  // 1. Parse key="value" attributes (e.g., class="mt-0 px-4", id="section")
  for (const [, key, value] of rawAttrs.matchAll(/([\w-]+)="([^"]*)"/g)) {
    if (key === 'class') {
      classList.push(...value.split(/\s+/).filter(Boolean));
    } else if (key === 'id') {
      id = value;
    }
  }

  // 2. Parse shorthand tokens: .className and #id (from remaining content)
  // Supports classes with / (opacity), ! (important), . (arbitrary values)
  const stripped = rawAttrs.replace(/[\w-]+="[^"]*"/g, '');
  for (const token of stripped.split(/\s+/).filter(Boolean)) {
    if (token.startsWith('.')) classList.push(token.slice(1));
    else if (token.startsWith('#') && !id) id = token.slice(1);
  }

  return { text: cleanedText, classes: classList.join(' '), id };
}

let _scopeCounter = 0;
export function resetScopeCounter(): void {
  _scopeCounter = 0;
}

/**
 * Generate a unique scope ID for CSS isolation.
 */
export function generateScopeId(): string {
  return `scope-${++_scopeCounter}`;
}

/**
 * Parse props from a `{key="value" key2="value2"}` string.
 * Also supports `.className` shorthand → adds to `class` prop.
 * Also supports `#id` shorthand → adds to `id` prop.
 */
export function parseProps(propsString: string): Record<string, string> {
  const props: Record<string, string> = {};
  if (!propsString?.trim()) return props;

  // Match key="value" or key='value' pairs
  const pairRegex = /(\w[\w-]*)=(?:"([^"]*)"|'([^']*)')/g;
  let match;
  while ((match = pairRegex.exec(propsString)) !== null) {
    const key = match[1];
    const value = match[2] ?? match[3] ?? '';
    props[key] = value;
  }

  // Extract .className shorthand (supports / for opacity, ! for important, . for arbitrary values)
  const classMatches = propsString.match(/\.([a-zA-Z0-9_!/.\-]+)/g);
  if (classMatches) {
    const existing = props['class'] || '';
    const newClasses = classMatches.map(c => c.substring(1)).join(' ');
    props['class'] = existing ? `${existing} ${newClasses}` : newClasses;
  }

  // Extract #id shorthand (only if not inside a key="value" pair)
  const idMatch = propsString.match(/#([a-zA-Z0-9_-]+)(?=\s|}|$)/);
  if (idMatch && !props['id']) {
    props['id'] = idMatch[1];
  }

  return props;
}

/**
 * Parse raw HTML attributes string (e.g. `class="..." style="..." data-foo="..."`)
 * into a React props object, renaming `class` to `className`.
 */
export function parseHtmlAttrs(attrsString: string): Record<string, any> {
  const props: Record<string, any> = {};
  if (!attrsString?.trim()) return props;

  const pairRegex = /([a-zA-Z0-9_-]+)(?:=(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = pairRegex.exec(attrsString)) !== null) {
    let key = match[1];
    const value = match[2] ?? match[3] ?? match[4] ?? true;

    if (key === 'class') key = 'className';
    else if (key === 'for') key = 'htmlFor';
    else if (key === 'tabindex') key = 'tabIndex';
    
    // React expects style to be an object
    if (key === 'style' && typeof value === 'string') {
      props[key] = parseCssString(value);
    } else {
      props[key] = value;
    }
  }

  return props;
}
