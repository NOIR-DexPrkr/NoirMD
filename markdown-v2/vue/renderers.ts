// ============================================================
// Vue Renderers — inline, table, list rendering using h()
// ============================================================

import { h, type VNode } from 'vue';
import type { Token } from '../core/types';

/**
 * Render inline markdown formatting into VNodes.
 * Supports: bold, italic, bold-italic, strikethrough, code, highlight,
 * spoiler, color text, underline, icons, links, raw HTML tags.
 */
export function renderInline(text: string): VNode[] {
  if (!text) return [];

  const parsePart = (part: string, key: string): VNode => {
    let match: RegExpMatchArray | null;

    // Icon: |[[icon-name]]|
    if ((match = part.match(/^\|\[([^\]]+)\]\|$/))) {
      return h('span', {
        class: 'nr-icon material-symbols-rounded',
        'aria-hidden': 'true',
        innerHTML: /^[eE][0-9a-fA-F]{3,4}$/.test(match[1])
          ? `&#x${match[1]};`
          : undefined,
        key,
      }, /^[eE][0-9a-fA-F]{3,4}$/.test(match[1]) ? undefined : match[1]);
    }

    // Underline: !~content~!
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
      return h('span', {
        key,
        style: { textDecoration: `${type} ${decorationStyle} ${color}`, textDecorationThickness: 'auto' },
      }, renderInline(innerText));
    }

    // Color text: %color%text%%
    if ((match = part.match(/%([^%\s]+?)%([\s\S]+?)%%/))) {
      return h('span', { key, style: { color: match[1] } }, renderInline(match[2]));
    }

    // Spoiler: !>text<!
    if ((match = part.match(/^!>([^<]+?)<!$/))) {
      return h('span', {
        key,
        class: 'bg-text-primary text-bg-primary px-1 rounded hover:bg-transparent transition-colors cursor-pointer',
      }, renderInline(match[1]));
    }

    // Highlight: ==text==
    if ((match = part.match(/^==(.+?)==$/))) {
      return h('mark', {
        key,
        class: 'bg-yellow-500/20 text-inherit px-0.5 rounded',
      }, renderInline(match[1]));
    }

    // Bold-italic: ***text***
    if ((match = part.match(/^\*\*\*(.+?)\*\*\*$/))) {
      return h('strong', { key }, h('em', renderInline(match[1])));
    }

    // Bold: **text**
    if ((match = part.match(/^\*\*(.+?)\*\*$/))) {
      return h('strong', { key }, renderInline(match[1]));
    }

    // Italic: _text_
    if ((match = part.match(/^_(.+?)_$/))) {
      return h('em', { key }, renderInline(match[1]));
    }

    // Strikethrough: ~~text~~
    if ((match = part.match(/^~~(.+?)~~$/))) {
      return h('del', { key }, renderInline(match[1]));
    }

    // Inline code: `code`
    if ((match = part.match(/^`([^`]+)`$/))) {
      return h('code', {
        key,
        class: 'text-[0.875em] font-mono bg-background-secondary/50 px-1.5 py-0.5 rounded text-text-primary',
      }, match[1]);
    }

    // Link: [text](url)
    if ((match = part.match(/^\[([^\]]+?)\]\(([^)]+?)\)$/))) {
      return h('a', {
        key,
        href: match[2],
        class: 'text-accent-primary underline decoration-accent-primary/40 hover:decoration-accent-primary transition-colors',
        target: '_blank',
        rel: 'noopener noreferrer',
      }, renderInline(match[1]));
    }

    // Raw HTML tag: <tag>...</tag>
    if (part.startsWith('<') && part.endsWith('>')) {
      return h('span', { key, innerHTML: part });
    }

    return h('span', { key }, part);
  };

  const regex =
    /(\|\[[^\]]+\]\||\*\*\*.+?\*\*\*|\*\*.+?\*\*|_.+?_|~~.+?~~|`[^`]+?`|!~.+?~!|%[^%\s]+?%[\s\S]+?%%|!>.+?<!|==.+?==|\[[^\]]+?\]\([^)]+?\)|<[^>]+>)/g;

  const elements: VNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(h('span', { key: `text-${keyCounter++}` }, text.slice(lastIndex, match.index)));
    }
    elements.push(parsePart(match[0], `inline-${keyCounter++}`));
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    elements.push(h('span', { key: `text-${keyCounter++}` }, text.slice(lastIndex)));
  }

  return elements;
}

/**
 * Render a pipe-delimited markdown table.
 */
export function renderTable(content: string): VNode {
  const rows = content.split('\n').filter(r => r.trim());
  if (rows.length < 2) return h('p', content);

  const parseRow = (row: string) =>
    row.split('|').map(c => c.trim()).filter(Boolean);

  const headerCells = parseRow(rows[0]);
  const bodyRows = rows.slice(2).map(parseRow);

  return h('div', { class: 'overflow-x-auto' }, [
    h('table', { class: 'w-full text-sm sm:text-base border-collapse my-4' }, [
      h('thead', [
        h('tr', headerCells.map((cell, ci) =>
          h('th', {
            key: ci,
            class: 'border border-border px-3 py-2 bg-background-secondary-solid/10 text-left font-bold',
          }, renderInline(cell))
        )),
      ]),
      h('tbody', bodyRows.map((cells, ri) =>
        h('tr', { key: ri }, cells.map((cell, ci) =>
          h('td', { key: ci, class: 'border border-border px-3 py-2' }, renderInline(cell))
        ))
      )),
    ]),
  ]);
}

/**
 * Render a markdown list (ordered or unordered).
 */
export function renderList(content: string): VNode {
  const lines = content.split('\n');
  const items: { indent: number; marker: string; text: string }[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const match = line.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
    if (match) {
      items.push({ indent: match[1].length, marker: match[2], text: match[3] });
    }
  }

  if (items.length === 0) return h('p', content);

  const isOrdered = /^\d+\.$/.test(items[0].marker);
  const tag = isOrdered ? 'ol' : 'ul';

  return h(tag, {
    class: `${isOrdered ? 'list-decimal' : 'list-disc'} pl-6 my-3 space-y-1 text-sm sm:text-base`,
  }, items.map((item, index) =>
    h('li', { key: index, class: 'leading-relaxed' }, renderInline(item.text))
  ));
}

/**
 * Extract all header tokens from an AST for TOC generation.
 */
export function extractHeaders(elements: Token[]): Token[] {
  return elements.filter((el): el is Token & { type: 'header' } => el.type === 'header');
}
