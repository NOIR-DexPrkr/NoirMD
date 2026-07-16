import React from 'react';
import type { Token } from './types';
import { IconRenderer } from './ui-components';

/**
 * Render inline markdown formatting into React elements.
 * Supports: bold, italic, bold-italic, strikethrough, code, highlight,
 * spoiler, color text, underline, icons, links, raw HTML tags.
 */
export function renderInline(text: string): React.ReactNode {
  if (!text) return text;

  const parsePart = (part: string, key: string): React.ReactNode => {
    let match: RegExpMatchArray | null;

    // Icon: |[[icon-name]]|
    if ((match = part.match(/^\|\[([^\]]+)\]\|$/))) {
      return <IconRenderer key={key} iconName={match[1]} />;
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
      return (
        <span
          key={key}
          style={{
            textDecoration: `${type} ${decorationStyle} ${color}`,
            textDecorationThickness: 'auto',
          }}
        >
          {renderInline(innerText)}
        </span>
      );
    }

    // Color text: %color%text%%
    if ((match = part.match(/%([^%\s]+?)%([\s\S]+?)%%/))) {
      return (
        <span key={key} style={{ color: match[1] }}>
          {renderInline(match[2])}
        </span>
      );
    }

    // Spoiler: !>text<!
    if ((match = part.match(/^!>([^<]+?)<!$/))) {
      return (
        <span key={key} className="bg-text-primary text-bg-primary px-1 rounded hover:bg-transparent transition-colors cursor-pointer">
          {renderInline(match[1])}
        </span>
      );
    }

    // Highlight: ==text==
    if ((match = part.match(/^==(.+?)==$/))) {
      return (
        <mark key={key} className="bg-yellow-500/20 text-inherit px-0.5 rounded">
          {renderInline(match[1])}
        </mark>
      );
    }

    // Bold-italic: ***text***
    if ((match = part.match(/^\*\*\*(.+?)\*\*\*$/))) {
      return (
        <strong key={key}>
          <em>{renderInline(match[1])}</em>
        </strong>
      );
    }

    // Bold: **text**
    if ((match = part.match(/^\*\*(.+?)\*\*$/))) {
      return <strong key={key}>{renderInline(match[1])}</strong>;
    }

    // Italic: _text_
    if ((match = part.match(/^_(.+?)_$/))) {
      return <em key={key}>{renderInline(match[1])}</em>;
    }

    // Strikethrough: ~~text~~
    if ((match = part.match(/^~~(.+?)~~$/))) {
      return <del key={key}>{renderInline(match[1])}</del>;
    }

    // Inline code: `code`
    if ((match = part.match(/^`([^`]+)`$/))) {
      return (
        <code key={key} className="text-[0.875em] font-mono bg-background-secondary/50 px-1.5 py-0.5 rounded text-text-primary">
          {match[1]}
        </code>
      );
    }

    // Link: [text](url)
    if ((match = part.match(/^\[([^\]]+?)\]\(([^)]+?)\)$/))) {
      return (
        <a
          key={key}
          href={match[2]}
          className="text-accent-primary underline decoration-accent-primary/40 hover:decoration-accent-primary transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {renderInline(match[1])}
        </a>
      );
    }

    // Raw HTML tag: <tag>...</tag>
    if (part.startsWith('<') && part.endsWith('>')) {
      return <span key={key} dangerouslySetInnerHTML={{ __html: part }} />;
    }

    return part;
  };

  const regex =
    /(\|\[[^\]]+\]\||\*\*\*.+?\*\*\*|\*\*.+?\*\*|_.+?_|~~.+?~~|`[^`]+?`|!~.+?~!|%[^%\s]+?%[\s\S]+?%%|!>.+?<!|==.+?==|\[[^\]]+?\]\([^)]+?\)|<[^>]+>)/g;

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let keyCounter = 0;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      elements.push(text.slice(lastIndex, match.index));
    }
    elements.push(parsePart(match[0], `inline-${keyCounter++}`));
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    elements.push(text.slice(lastIndex));
  }

  return elements;
}

/**
 * Render a pipe-delimited markdown table.
 */
export function renderTable(content: string): React.ReactNode {
  const rows = content.split('\n').filter(r => r.trim());
  if (rows.length < 2) return <p>{content}</p>;

  const parseRow = (row: string) =>
    row
      .split('|')
      .map(c => c.trim())
      .filter(Boolean);

  const headerCells = parseRow(rows[0]);
  const bodyRows = rows.slice(2).map(parseRow); // skip separator row

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm sm:text-base border-collapse my-4">
        <thead>
          <tr>
            {headerCells.map((cell, ci) => (
              <th key={ci} className="border border-border px-3 py-2 bg-background-secondary-solid/10 text-left font-bold">{renderInline(cell)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {bodyRows.map((cells, ri) => (
            <tr key={ri}>
              {cells.map((cell, ci) => (
                <td key={ci} className="border border-border px-3 py-2">{renderInline(cell)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Render a markdown list (ordered or unordered) with nesting support.
 */
export function renderList(content: string): React.ReactNode {
  const lines = content.split('\n');
  const items: { indent: number; marker: string; text: string }[] = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const match = line.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/);
    if (match) {
      items.push({
        indent: match[1].length,
        marker: match[2],
        text: match[3],
      });
    }
  }

  if (items.length === 0) return <p>{content}</p>;

  const isOrdered = /^\d+\.$/.test(items[0].marker);
  const Tag = isOrdered ? 'ol' : 'ul';

  return (
    <Tag className={`${isOrdered ? 'list-decimal' : 'list-disc'} pl-6 my-3 space-y-1 text-sm sm:text-base`}>
      {items.map((item, index) => (
        <li key={index} className="leading-relaxed">
          {renderInline(item.text)}
        </li>
      ))}
    </Tag>
  );
}

/**
 * Extract all header tokens from an AST for TOC generation.
 */
export function extractHeaders(elements: Token[]): Token[] {
  return elements.filter((el): el is Token & { type: 'header' } => el.type === 'header');
}
