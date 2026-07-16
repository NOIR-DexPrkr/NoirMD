// ============================================================
// Vanilla Markdown Renderer
//
// Pipeline: Token[] → processElements() → HTMLElement
// No React, no Tailwind. Pure DOM + CSS classes.
// ============================================================

import type { Token, DirectiveToken, HtmlBlockToken, HtmlToken } from '../core/types';
import { parseMarkdown } from '../core/parser';
import { scrollToId, parseHtmlAttrs } from '../core/utils';
import { renderInline } from './inline';
import {
  createCodeBlock,
  createTable,
  createList,
  createTOC,
  createBlockquote,
} from './components';
import directiveRegistry, { type VanillaRenderContext, type DirectiveProps } from './directives';

/**
 * Render parsed markdown tokens into an HTMLElement.
 *
 * @param tokens - Array of tokens from `parseMarkdown()`
 * @returns The root `<article class="nr-prose">` element
 */
export function renderTokens(tokens: Token[]): HTMLElement {
  const article = document.createElement('article');
  article.className = 'nr-prose';

  const ctx: VanillaRenderContext = {
    parseMarkdown,
    renderElements: (tks) => renderTokensInner(tks, ctx),
    renderInline,
    renderMarkdown: (md: string) => renderTokensInner(parseMarkdown(md), ctx),
  };

  article.appendChild(processElements(tokens, ctx, tokens));
  return article;
}

/**
 * Convenience: parse markdown string and render directly.
 */
export function renderMarkdownString(markdown: string): HTMLElement {
  const tokens = parseMarkdown(markdown);
  return renderTokens(tokens);
}

/**
 * Render tokens into an HTMLElement (internal, creates a container).
 */
function renderTokensInner(tokens: Token[], ctx: VanillaRenderContext): HTMLElement {
  const container = document.createElement('div');
  container.appendChild(processElements(tokens, ctx, tokens));
  return container;
}

/**
 * Process an array of tokens into a DocumentFragment.
 */
function processElements(
  elements: Token[],
  ctx: VanillaRenderContext,
  allElements: Token[],
): DocumentFragment {
  const fragment = document.createDocumentFragment();
  let i = 0;

  while (i < elements.length) {
    const el = elements[i];

    // Batch consecutive cards into a grid
    if (el.type === 'directive' && ['card', 'card-m', 'card-b'].includes(el.directiveType)) {
      const cards: Token[] = [];
      while (
        i < elements.length &&
        elements[i].type === 'directive' &&
        ['card', 'card-m', 'card-b'].includes((elements[i] as DirectiveToken).directiveType)
      ) {
        cards.push(elements[i]);
        i++;
      }

      if (cards.length === 1 || (cards[0] as DirectiveToken).props?.batch === 'off') {
        for (const card of cards) {
          const rendered = renderElement(card, ctx, allElements);
          if (rendered) fragment.appendChild(rendered);
        }
      } else {
        const grid = document.createElement('div');
        grid.className = 'nr-card-grid';
        for (const card of cards) {
          const rendered = renderElement(card, ctx, allElements);
          if (rendered) grid.appendChild(rendered);
        }
        fragment.appendChild(grid);
      }
    } else {
      const rendered = renderElement(el, ctx, allElements);
      if (rendered) fragment.appendChild(rendered);
      i++;
    }
  }

  return fragment;
}

/**
 * Render a single token into a Node.
 */
function renderElement(
  element: Token,
  ctx: VanillaRenderContext,
  allElements: Token[],
): Node | null {
  switch (element.type) {
    case 'header': {
      const tag = `h${element.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
      let text = element.text;

      // Alignment modifiers
      const alignCenter = text.match(/^->\s*(.+?)\s*<-\s*$/);
      const alignRight = text.match(/^->\s*(.+?)\s*->\s*$/);
      if (alignCenter) text = alignCenter[1];
      else if (alignRight) text = alignRight[1];

      const h = document.createElement(tag);
      h.id = element.id;
      let cls = `md-h${element.level}`;
      if (alignCenter) cls += ' text-center';
      if (alignRight) cls += ' text-right';
      if (element.classes) cls += ` ${element.classes}`;
      h.className = cls;
      h.appendChild(renderInline(text));
      return h;
    }

    case 'paragraph': {
      const p = document.createElement('p');
      let cls = 'md-p';
      if (element.classes) cls += ` ${element.classes}`;
      if (element.align) cls += ` text-${element.align}`;
      p.className = cls;
      if (element.id) p.id = element.id;

      const lines = element.content.split('\n');
      for (let li = 0; li < lines.length; li++) {
        const line = lines[li];
        const hardBreakMatch = line.match(/^(.*?)(\s{2,})$/);
        if (hardBreakMatch) {
          p.appendChild(renderInline(hardBreakMatch[1]));
          p.appendChild(document.createElement('br'));
        } else {
          p.appendChild(renderInline(line));
          if (li < lines.length - 1) {
            p.appendChild(document.createTextNode(' '));
          }
        }
      }
      return p;
    }

    case 'codeblock':
      return createCodeBlock(element.content, element.language, element.title);

    case 'directive':
      return renderDirective(element, ctx, allElements);

    case 'html': {
      const el = element as HtmlToken;
      let processedContent = el.content;

      // Extract <style> blocks and inject globally
      processedContent = processedContent.replace(
        /<style(?:\s+[^>]*)?>([\s\S]*?)<\/style>/gi,
        (_match: string, cssContent: string) => {
          const styleEl = document.createElement('style');
          styleEl.setAttribute('data-nr-global', '');
          styleEl.textContent = cssContent;
          document.head.appendChild(styleEl);
          return '';
        }
      );

      const wrapper = document.createElement('div');
      wrapper.className = 'nr-raw-html';
      wrapper.innerHTML = processedContent;

      // Force-execute injected scripts
      const scripts = wrapper.querySelectorAll('script');
      scripts.forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr =>
          newScript.setAttribute(attr.name, attr.value)
        );
        newScript.textContent = oldScript.textContent;
        oldScript.parentNode?.replaceChild(newScript, oldScript);
      });

      return wrapper;
    }

    case 'html-block': {
      const htmlBlock = element as HtmlBlockToken;
      const rawProps = parseHtmlAttrs(htmlBlock.attrs);

      const el = document.createElement(htmlBlock.tag);
      // Apply attributes (keep as-is, no React renaming needed)
      for (const [key, value] of Object.entries(rawProps)) {
        if (key === 'style' && typeof value === 'object') {
          for (const [prop, val] of Object.entries(value)) {
            el.style.setProperty(prop, String(val));
          }
        } else if (value === true) {
          el.setAttribute(key, '');
        } else {
          el.setAttribute(key, String(value));
        }
      }

      // Recurse children
      const childFrag = processElements(htmlBlock.children, ctx, allElements);
      el.appendChild(childFrag);
      return el;
    }

    case 'image': {
      const img = document.createElement('img');
      img.src = element.src;
      img.alt = element.alt;
      img.className = 'nr-image';
      if (element.style) {
        for (const [key, value] of Object.entries(element.style)) {
          img.style.setProperty(key, String(value));
        }
      }
      return img;
    }

    case 'table':
      return createTable(element.content, renderInline);

    case 'list':
      return createList(element.content, renderInline);

    case 'blockquote':
      return createBlockquote(element.content, element.classes, renderInline);

    case 'hr': {
      const hr = document.createElement('hr');
      hr.className = 'nr-hr';
      return hr;
    }

    case 'toc': {
      const headers = allElements.filter((e): e is Token & { type: 'header' } => e.type === 'header');
      return createTOC(headers.map(h => ({ level: h.level, text: h.text, id: h.id })), renderInline);
    }

    default:
      return null;
  }
}

/**
 * Render a directive token.
 */
function renderDirective(
  element: DirectiveToken,
  ctx: VanillaRenderContext,
  allElements: Token[],
): Node | null {
  const { directiveType, props, slots, scopeId } = element;

  const renderer = directiveRegistry[directiveType];

  // renderSlot helper: parse slot content as markdown and render
  const renderSlot = (name: string): DocumentFragment => {
    const frag = document.createDocumentFragment();
    const slotContent = slots[name];
    if (!slotContent) return frag;
    const tokens = ctx.parseMarkdown(slotContent);
    frag.appendChild(ctx.renderElements(tokens));
    return frag;
  };

  const directiveProps: DirectiveProps = {
    directiveType,
    props,
    slots,
    renderSlot,
    context: ctx,
    index: 0,
    allElements,
    renderInline,
    renderMarkdown: ctx.renderMarkdown,
  };

  if (renderer) {
    return renderer(directiveProps);
  }

  // Fallback: unknown directive → render as a div with default slot
  const fallback = document.createElement('div');
  fallback.className = 'nr-unknown-directive';
  fallback.appendChild(renderSlot('default'));
  return fallback;
}
