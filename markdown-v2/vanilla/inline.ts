// ============================================================
// Vanilla Inline Renderer
//
// Parses inline markdown formatting into DOM nodes.
// Returns a DocumentFragment.
// ============================================================

import { createIcon } from './components';

/**
 * Render inline markdown text into a DocumentFragment.
 *
 * Supports: bold, italic, bold-italic, strikethrough, code, highlight,
 * spoiler, color text, underline, icons, links, raw HTML tags.
 */
export function renderInline(text: string): DocumentFragment {
  const fragment = document.createDocumentFragment();
  if (!text) return fragment;

  const regex =
    /(\|\[[^\]]+\]\||\*\*\*.+?\*\*\*|\*\*.+?\*\*|_.+?_|~~.+?~~|`[^`]+?`|!~.+?~!|%[^%\s]+?%[\s\S]+?%%|!>.+?<!|==.+?==|\[[^\]]+?\]\([^)]+?\)|<[^>]+>)/g;

  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    // Append text before this match
    if (match.index > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }

    fragment.appendChild(parseInlinePart(match[0]));
    lastIndex = regex.lastIndex;
  }

  // Append remaining text
  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }

  return fragment;
}

/**
 * Parse a single inline markdown token into a DOM node.
 */
function parseInlinePart(part: string): Node {
  let match: RegExpMatchArray | null;

  // Icon: |[[icon-name]]|
  if ((match = part.match(/^\|\[([^\]]+)\]\|$/))) {
    return createIcon(match[1]);
  }

  // Underline: !~content~!  (supports params: !~color;style;type;text~!)
  if ((match = part.match(/^!~(.+?)~!$/))) {
    const content = match[1];
    const parts = content.split(';');
    let color = 'currentColor';
    let decorationStyle = 'solid';
    let type = 'underline';
    let textIndex = 0;

    if (
      parts[textIndex]?.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/) ||
      ['red', 'blue', 'green', 'purple', 'orange', 'yellow', 'pink'].includes(parts[textIndex])
    ) {
      color = parts[textIndex++];
    }
    if (['solid', 'double', 'dotted', 'dashed', 'wavy'].includes(parts[textIndex])) {
      decorationStyle = parts[textIndex++];
    }
    if (['underline', 'line-through', 'overline', 'both'].includes(parts[textIndex])) {
      type = parts[textIndex] === 'both' ? 'underline line-through' : parts[textIndex++];
    }
    const innerText = parts.slice(textIndex).join(';');

    const span = document.createElement('span');
    span.className = 'nr-underline';
    span.style.textDecoration = `${type} ${decorationStyle} ${color}`;
    span.style.textDecorationThickness = 'auto';
    span.appendChild(renderInline(innerText));
    return span;
  }

  // Color text: %color%text%%
  if ((match = part.match(/%([^%\s]+?)%([\s\S]+?)%%/))) {
    const span = document.createElement('span');
    span.style.color = match[1];
    span.appendChild(renderInline(match[2]));
    return span;
  }

  // Spoiler: !>text<!
  if ((match = part.match(/^!>([^<]+?)<!$/))) {
    const span = document.createElement('span');
    span.className = 'nr-spoiler';
    span.appendChild(renderInline(match[1]));
    return span;
  }

  // Highlight: ==text==
  if ((match = part.match(/^==(.+?)==$/))) {
    const mark = document.createElement('mark');
    mark.className = 'nr-highlight';
    mark.appendChild(renderInline(match[1]));
    return mark;
  }

  // Bold-italic: ***text***
  if ((match = part.match(/^\*\*\*(.+?)\*\*\*$/))) {
    const strong = document.createElement('strong');
    const em = document.createElement('em');
    em.appendChild(renderInline(match[1]));
    strong.appendChild(em);
    return strong;
  }

  // Bold: **text**
  if ((match = part.match(/^\*\*(.+?)\*\*$/))) {
    const strong = document.createElement('strong');
    strong.appendChild(renderInline(match[1]));
    return strong;
  }

  // Italic: _text_
  if ((match = part.match(/^_(.+?)_$/))) {
    const em = document.createElement('em');
    em.appendChild(renderInline(match[1]));
    return em;
  }

  // Strikethrough: ~~text~~
  if ((match = part.match(/^~~(.+?)~~$/))) {
    const del = document.createElement('del');
    del.appendChild(renderInline(match[1]));
    return del;
  }

  // Inline code: `code`
  if ((match = part.match(/^`([^`]+)`$/))) {
    const code = document.createElement('code');
    code.className = 'nr-inline-code';
    code.textContent = match[1];
    return code;
  }

  // Link: [text](url)
  if ((match = part.match(/^\[([^\]]+?)\]\(([^)]+?)\)$/))) {
    const a = document.createElement('a');
    a.className = 'nr-link';
    a.href = match[2];
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.appendChild(renderInline(match[1]));
    return a;
  }

  // Raw HTML tag: <tag>...</tag>
  if (part.startsWith('<') && part.endsWith('>')) {
    const span = document.createElement('span');
    span.innerHTML = part;
    return span;
  }

  // Fallback: plain text
  return document.createTextNode(part);
}
