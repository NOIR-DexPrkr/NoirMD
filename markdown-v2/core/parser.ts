import type { Token, DirectiveToken, HtmlBlockToken, CSSProperties } from './types';
import { generateId, generateScopeId, parseProps, extractAttributes } from './utils';

/**
 * V2 Markdown Parser — line-by-line state machine (framework-agnostic).
 */
export function parseMarkdown(markdown: string): Token[] {
  if (!markdown) return [];
  const lines = markdown.replace(/\r\n/g, '\n').replace(/\r/g, '').split('\n');
  const result: Token[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();
    let match: RegExpMatchArray | null;

    // ── Headers: ## Title ──
    if ((match = trimmed.match(/^(#{1,6})\s+(.+)$/))) {
      const level = match[1].length;
      const rawText = match[2];
      const { text, classes, id: customId } = extractAttributes(rawText);
      const id = customId || generateId(text.replace(/->|<-/g, ''));
      result.push({ type: 'header', level, text, id, classes: classes || undefined });
      i++;
      continue;
    }

    // ── Aligned paragraph: -> text <- or -> text -> ──
    if ((match = trimmed.match(/^->\s*(.+?)\s*(<-|->)\s*$/))) {
      const content = match[1];
      const align = match[2] === '<-' ? 'center' : 'right';
      result.push({ type: 'paragraph', content, align });
      i++;
      continue;
    }

    // ── Code block: ```lang title="name" ──
    if (trimmed.startsWith('```')) {
      const fenceHeader = trimmed.slice(3).trim();
      const titleMatch = fenceHeader.match(/title=["']([^"']*)["']/);
      const lang = fenceHeader.replace(/title=["'][^"']*["']/, '').trim();
      const title = titleMatch ? titleMatch[1] : undefined;
      const content: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        content.push(lines[i]);
        i++;
      }
      result.push({ type: 'codeblock', language: lang, title, content: content.join('\n') });
      i++; // skip closing ```
      continue;
    }

    // ── Directive: :::type {props} ... ::: ──
    if (trimmed.startsWith(':::')) {
      const rest = trimmed.slice(3).trim();

      // Bare closing marker
      if (rest === '') {
        result.push({ type: 'paragraph', content: line });
        i++;
        continue;
      }

      const typeMatch = rest.match(/^([\w-]+)/);
      const directiveType = typeMatch ? typeMatch[1] : 'custom';

      // Lookahead: find the matching closing :::
      let j = i + 1;
      let nestedLevel = 0;
      let foundClose = false;

      while (j < lines.length) {
        const currentTrimmed = lines[j].trim();
        if (currentTrimmed === ':::') {
          if (nestedLevel === 0) {
            foundClose = true;
            break;
          } else {
            nestedLevel--;
          }
        } else if (currentTrimmed.startsWith(':::')) {
          // Opening a nested directive
          nestedLevel++;
        }
        j++;
      }

      if (foundClose) {
        // Collect raw content lines (between opening and closing)
        const contentLines: string[] = [];
        for (let k = i + 1; k < j; k++) {
          contentLines.push(lines[k]);
        }
        const rawContent = contentLines.join('\n');

        // Parse the directive header (everything after the type name)
        const headerRest = typeMatch ? rest.slice(directiveType.length).trim() : rest;

        // Extract {props} block
        let propsString = '';
        let shortForm = '';
        const propsBlockMatch = headerRest.match(/^\{([^]*)\}\s*$/);
        if (propsBlockMatch) {
          propsString = propsBlockMatch[1];
        } else if (headerRest) {
          // Short-form: bare text after type → becomes title prop
          shortForm = headerRest;
        }

        const props = parseProps(propsString);
        if (shortForm && !props['title']) {
          props['title'] = shortForm;
        }

        // Split content into slots
        const slots = splitSlots(rawContent);

        result.push({
          type: 'directive',
          directiveType,
          props,
          slots,
          scopeId: generateScopeId(),
        } as DirectiveToken);

        i = j + 1;
        continue;
      } else {
        // Unclosed directive — render as plain text
        result.push({ type: 'paragraph', content: line });
        i++;
        continue;
      }
    }

    // ── Image: ![alt](src#float#3d){w:h} ──
    if ((match = trimmed.match(/^(.*?)!\[([^\]]*)\]\(([^)]+?)\)(?:\{([^}]+?)\})?(.*)$/))) {
      const [, preText, alt, srcAndFloat, size, postText] = match;

      if (preText.trim()) {
        result.push({ type: 'paragraph', content: preText.trim() });
      }

      let src = srcAndFloat;
      const style: CSSProperties = {};
      if (src.includes('#left')) {
        src = src.replace('#left', '');
        style.float = 'left';
        style.margin = '0 1em 1em 0';
      } else if (src.includes('#right')) {
        src = src.replace('#right', '');
        style.float = 'right';
        style.margin = '0 0 1em 1em';
      } else if (src.includes('#center')) {
        src = src.replace('#center', '');
        style.display = 'block';
        style.margin = '0 auto 1em auto';
      }
      if (size) {
        const [width, height] = size.split(':');
        if (width) style.width = width.trim();
        if (height) style.height = height.trim();
      }
      result.push({ type: 'image', alt, src, style });

      if (postText.trim()) {
        result.push({ type: 'paragraph', content: postText.trim() });
      }
      i++;
      continue;
    }

    // ── Table: | cell | cell | ──
    if (trimmed.includes('|') && i + 1 < lines.length && lines[i + 1].includes('---')) {
      const tableLines = [line];
      i++;
      tableLines.push(lines[i]);
      i++;
      while (i < lines.length && lines[i].trim().includes('|')) {
        tableLines.push(lines[i]);
        i++;
      }
      result.push({ type: 'table', content: tableLines.join('\n') });
      continue;
    }

    // ── List: - item or 1. item ──
    if ((match = trimmed.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/))) {
      const listItems = [line];
      i++;
      while (i < lines.length) {
        const nextLine = lines[i];
        const nextTrimmed = nextLine.trim();
        if (
          nextTrimmed.match(/^(\s*)([-*+]|\d+\.)\s+(.+)$/) ||
          nextTrimmed === '' ||
          nextLine.startsWith('  ')
        ) {
          listItems.push(nextLine);
          i++;
        } else {
          break;
        }
      }
      result.push({ type: 'list', content: listItems.join('\n') });
      continue;
    }

    // ── Blockquote: > text ──
    if (trimmed.startsWith('>')) {
      const quoteLines = [line];
      i++;
      while (i < lines.length && (lines[i].trim().startsWith('>') || lines[i].trim() === '')) {
        quoteLines.push(lines[i]);
        i++;
      }
      const rawQuote = quoteLines.join('\n').replace(/^>\s?/gm, '');
      const { text, classes, id } = extractAttributes(rawQuote);
      result.push({ type: 'blockquote', content: text, classes: classes || undefined, id });
      continue;
    }

    // ── Horizontal rule: --- or ___ or *** ──
    if (/^(---|___|(\*\s*){3,})\s*$/.test(trimmed)) {
      result.push({ type: 'hr' });
      i++;
      continue;
    }

    // ── TOC: [TOC] or [TOC2] ──
    if (/^\[TOC\d?\]\s*$/.test(trimmed)) {
      result.push({ type: 'toc' });
      i++;
      continue;
    }

    // ── Empty line ──
    if (trimmed === '') {
      i++;
      continue;
    }

    // ── HTML Block: <tag ...> ──
    let tagStartMatch = trimmed.match(/^<([a-zA-Z][\w-]*)/);
    if (tagStartMatch) {
      const tagName = tagStartMatch[1].toLowerCase();

      const voidElements = new Set([
        'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
        'link', 'meta', 'param', 'source', 'track', 'wbr'
      ]);

      const remainingText = lines.slice(i).join('\n');

      // Find the full opening tag even with multi-line attributes
      const openTagRegex = new RegExp(`^\\s*<${tagName}\\b([^>]*?)>`, 'i');
      const openTagMatch = remainingText.match(openTagRegex);

      if (openTagMatch) {
        const fullOpenTag = openTagMatch[0];
        const attrs = openTagMatch[1].replace(/\s+/g, ' ').trim();

        const isSelfClosing = fullOpenTag.endsWith('/>') || voidElements.has(tagName);

        if (isSelfClosing) {
          const blockText = remainingText.substring(0, openTagMatch.index! + fullOpenTag.length);
          const consumedLines = blockText.split('\n').length;

          result.push({
            type: 'html-block',
            tag: tagName,
            attrs: attrs,
            children: [] // No children
          } as HtmlBlockToken);

          i += consumedLines;
          continue;
        } else {
          // Tag with content — search for its closing tag
          let nestedLevel = 0;
          let closeIndex = -1;
          let closeTagLength = 0;

          const tagRegex = new RegExp(`</?${tagName}\\b[^>]*>`, 'gi');
          tagRegex.lastIndex = openTagMatch.index! + fullOpenTag.length;

          let execMatch;
          while ((execMatch = tagRegex.exec(remainingText)) !== null) {
            if (execMatch[0].startsWith('</')) {
              nestedLevel--;
              if (nestedLevel < 0) {
                closeIndex = execMatch.index;
                closeTagLength = execMatch[0].length;
                break;
              }
            } else {
              if (!execMatch[0].endsWith('/>')) {
                nestedLevel++;
              }
            }
          }

          if (closeIndex !== -1) {
            const fullBlock = remainingText.substring(0, closeIndex + closeTagLength);
            const consumedLines = fullBlock.split('\n').length;

            // style/script blocks should not be parsed as Markdown
            if (tagName === 'style' || tagName === 'script') {
              result.push({
                type: 'html',
                content: fullBlock,
                scopeId: generateScopeId(),
              });
            } else {
              const innerContent = remainingText.substring(openTagMatch.index! + fullOpenTag.length, closeIndex);
              result.push({
                type: 'html-block',
                tag: tagName,
                attrs: attrs,
                children: parseMarkdown(innerContent)
              } as HtmlBlockToken);
            }

            i += consumedLines;
            continue;
          } else {
            // Fallback: unclosed tag → treat as self-closing to avoid consuming the whole document
            const blockText = remainingText.substring(0, openTagMatch.index! + fullOpenTag.length);
            const consumedLines = blockText.split('\n').length;

            result.push({
              type: 'html-block',
              tag: tagName,
              attrs: attrs,
              children: []
            } as HtmlBlockToken);

            i += consumedLines;
            continue;
          }
        }
      }
    }

    // ── Paragraph (default) ──
    const paragraphLines = [line];
    i++;
    while (i < lines.length) {
      const nextLine = lines[i];
      const nextTrimmed = nextLine.trim();
      if (
        nextTrimmed === '' ||
        nextTrimmed.startsWith('#') ||
        nextTrimmed.startsWith(':::') ||
        nextTrimmed.includes('|') ||
        nextTrimmed.match(/^(\s*)([-*+]|\d+\.)\s+/) ||
        nextTrimmed.startsWith('>') ||
        nextTrimmed.startsWith('```') ||
        nextTrimmed.startsWith('->') ||
        nextTrimmed.match(/^<([a-zA-Z][\w-]*)\b/)
      ) {
        break;
      }
      paragraphLines.push(nextLine);
      i++;
    }
    const rawParagraph = paragraphLines.join('\n').trim();
    const { text, classes, id } = extractAttributes(rawParagraph);
    result.push({ type: 'paragraph', content: text, classes: classes || undefined, id });
  }

  return result;
}

// ─────────────────────────────────────────────
// Slot splitting
// ─────────────────────────────────────────────

/**
 * Split directive content into named slots.
 * A line that is exactly `#slotname` starts a new slot.
 * Content before any `#slotname` goes into the "default" slot.
 *
 * IMPORTANT: This is nesting-aware — `#slotname` markers inside nested
 * directives (:::child ... :::) are NOT treated as slot boundaries of
 * the outer directive. Only `#slotname` at depth 0 are considered.
 */
function splitSlots(rawContent: string): Record<string, string> {
  const slots: Record<string, string> = {};
  const lines = rawContent.split('\n');
  let currentSlot = 'default';
  let buffer: string[] = [];
  let nestingDepth = 0;

  for (const line of lines) {
    const trimmed = line.trim();

    // Track nesting of directives
    if (trimmed.startsWith(':::')) {
      const rest = trimmed.slice(3).trim();
      if (rest === '') {
        // Closing marker (bare :::)
        nestingDepth = Math.max(0, nestingDepth - 1);
      } else {
        nestingDepth++;
      }
    }

    // Only consider slot boundaries at depth 0
    if (nestingDepth === 0 && trimmed.match(/^#([\w-]+)$/)) {
      // Save previous slot
      if (buffer.length > 0 || currentSlot !== 'default') {
        slots[currentSlot] = buffer.join('\n').trim();
      }
      currentSlot = trimmed.slice(1);
      buffer = [];
    } else {
      buffer.push(line);
    }
  }

  // Save last slot
  slots[currentSlot] = buffer.join('\n').trim();

  return slots;
}
