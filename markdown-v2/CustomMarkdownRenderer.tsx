import React, { useState, useEffect, useCallback, useMemo, useId, useRef } from 'react';
import type { Token, DirectiveToken, HtmlBlockToken, RenderContext } from './types';
import { parseMarkdown } from './parser';
import { renderInline, renderTable, renderList, extractHeaders } from './renderers';
import { CodeBlock } from './ui-components';
import DirectiveRenderer from './DirectiveRenderer';
import RawHtmlRenderer from './RawHtmlRenderer';
import { RenderContextProvider } from './context';
import { scrollToId, resetScopeCounter, parseCssString, parseHtmlAttrs } from './utils';

interface CustomMarkdownRendererProps {
  content: string;
}

/**
 * V2 CustomMarkdownRenderer — main orchestrator.
 *
 * Pipeline:
 *   content (string)
 *     → parseMarkdown() → allElements (Token[])
 *     → processAndRenderElements() → React tree
 *
 * Note: Tailwind CDN injection is NOT handled here.
 * Use NRpreviewer (which wraps this) or call useLazyTailwindCDN yourself.
 */
const CustomMarkdownRenderer: React.FC<CustomMarkdownRendererProps> = ({ content: initialContent }) => {
  const [modals, setModals] = useState<Record<string, boolean>>({});
  const baseId = useId().replace(/:/g, '');
  const articleClass = `scope-${baseId}`;

  // Ref to hold the latest context — avoids stale closures in memoized renderElement
  const contextRef = useRef<RenderContext>(null!);

  // Reset the scope counter before parsing so IDs are stable across SSR/CSR
  resetScopeCounter();

  // Parse the markdown into AST — memoized to avoid re-parsing on every render
  const allElements = useMemo(() => parseMarkdown(initialContent), [initialContent]);

  // Scroll to hash on load and hash changes
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const parts = hash.split('#');
        const id = parts[parts.length - 1];
        scrollToId(id);
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [initialContent]);

  // ── Render a single AST element ──
  const renderElement = useCallback(
    (element: Token, index: number, _depth: number = 0): React.ReactNode => {
      switch (element.type) {
        case 'header': {
          const HeaderTag = `h${element.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
          let text = element.text;

          // Alignment modifiers on headers
          const alignCenter = text.match(/^->\s*(.+?)\s*<-\s*$/);
          const alignRight = text.match(/^->\s*(.+?)\s*->\s*$/);
          if (alignCenter) {
            text = alignCenter[1];
          } else if (alignRight) {
            text = alignRight[1];
          }

          const userClasses = element.classes || '';
          let headerClasses = `md-h${element.level}`;

          if (alignCenter) headerClasses += ' text-center';
          if (alignRight) headerClasses += ' text-right';
          if (userClasses) headerClasses += ` ${userClasses}`;

          return React.createElement(
            HeaderTag,
            { key: index, id: element.id, className: headerClasses },
            renderInline(text)
          );
        }

        case 'paragraph': {
          const lines = element.content.split('\n');
          const processedContent = lines.map((line, lineIndex) => {
            const hardBreakMatch = line.match(/^(.*?)(\s{2,})$/);
            if (hardBreakMatch) {
              return (
                <React.Fragment key={lineIndex}>
                  {renderInline(hardBreakMatch[1])}
                  <br />
                </React.Fragment>
              );
            }
            const isLastLine = lineIndex === lines.length - 1;
            return (
              <React.Fragment key={lineIndex}>
                {renderInline(line)}
                {!isLastLine && ' '}
              </React.Fragment>
            );
          });

          const pUserClasses = element.classes || '';
          let pClasses = 'md-p';
          if (pUserClasses) pClasses += ` ${pUserClasses}`;
          if (element.align) pClasses += ` text-${element.align}`;

          return (
            <p key={index} id={element.id} className={pClasses}>
              {processedContent}
            </p>
          );
        }

        case 'codeblock':
          return (
            <CodeBlock
              key={index}
              code={element.content}
              language={element.language}
              title={element.title}
            />
          );

        case 'directive':
          return (
            <DirectiveRenderer
              key={index}
              element={element}
              context={contextRef.current}
              index={index}
              allElements={allElements}
            />
          );

        case 'html': {
          let processedContent = element.content;
          let globalStyles = '';

          // Extract <style> blocks and inject them globally into <head>
          processedContent = processedContent.replace(
            /<style(?:\s+[^>]*)?>([\s\S]*?)<\/style>/gi,
            (_match: string, cssContent: string) => {
              globalStyles += cssContent + '\n';
              return '';
            }
          );

          const wrapperClassName = 'w-full my-4';

          return (
            <RawHtmlRenderer
              key={index}
              content={processedContent}
              globalStyles={globalStyles || undefined}
              wrapperClassName={wrapperClassName}
            />
          );
        }

        case 'html-block': {
          const htmlBlock = element as HtmlBlockToken;
          const props = parseHtmlAttrs(htmlBlock.attrs);
          return React.createElement(
            htmlBlock.tag,
            { key: index, ...props },
            ...processAndRenderElements(htmlBlock.children, _depth + 1)
          );
        }

        case 'image':
          return (
            <img
              key={index}
              alt={element.alt}
              src={element.src}
              style={element.style}
              className="max-w-full h-auto"
            />
          );

        case 'table':
          return <div key={index}>{renderTable(element.content)}</div>;

        case 'list':
          return <div key={index}>{renderList(element.content)}</div>;

        case 'blockquote':
          return (
            <blockquote key={index} className={`border-l-4 border-accent-primary/30 pl-4 italic text-text-secondary my-4 text-sm sm:text-base${element.classes ? ` ${element.classes}` : ''}`}>
              {renderInline(element.content)}
            </blockquote>
          );

        case 'hr':
          return <hr key={index} className="my-8 border-border" />;

        case 'toc':
          return <div key={index}>{generateToc(allElements)}</div>;

        default:
          return null;
      }
    },
    [allElements]
  );

  // ── Process elements with card batching ──
  const processAndRenderElements = useCallback(
    (elements: Token[], depth: number = 0): React.ReactNode[] => {
      const result: React.ReactNode[] = [];
      let i = 0;

      while (i < elements.length) {
        const el = elements[i];

        // Batch consecutive cards into a responsive grid
        if (el.type === 'directive' && ['card', 'card-m', 'card-b'].includes(el.directiveType)) {
          const cards: Token[] = [];
          while (
            i < elements.length &&
            elements[i].type === 'directive' &&
            ['card', 'card-m', 'card-b'].includes((elements[i] as any).directiveType)
          ) {
            cards.push(elements[i]);
            i++;
          }

          if (cards.length === 1 || (cards[0] as DirectiveToken).props?.batch === 'off') {
            for (let c = 0; c < cards.length; c++) {
              result.push(renderElement(cards[c], result.length, depth));
            }
          } else {
            // Extract justify-* classes from the first card to apply on the wrapper
            const firstCardClass = (cards[0] as DirectiveToken).props?.['class'] || '';
            const justifyClasses = firstCardClass.match(/\bjustify-\S+/g) || [];
            const wrapperJustify = justifyClasses.length > 0 ? justifyClasses.join(' ') : '';

            result.push(
              <div key={`card-grid-${result.length}`} className={`not-prose flex flex-wrap gap-6 my-6 ${wrapperJustify}`}>
                {cards.map((card, ci) => (
                  <React.Fragment key={ci}>{renderElement(card, ci, depth)}</React.Fragment>
                ))}
              </div>
            );
          }
        } else {
          result.push(renderElement(el, result.length, depth));
          i++;
        }
      }

      return result;
    },
    [renderElement]
  );

  // ── Generate TOC from headers ──
  const generateToc = (elements: Token[]): React.ReactNode => {
    const headers = extractHeaders(elements);
    if (headers.length === 0) return null;

    return (
      <nav className="not-prose my-6 p-4 rounded-2xl border border-border bg-background-primary/5">
        <div className="text-base font-bold mb-3">Table of Contents</div>
        <ul className="space-y-1 list-none p-0 m-0">
          {headers.map((h, i) => {
            if (h.type !== 'header') return null;
            const indentClass = h.level <= 2 ? 'pl-0' : h.level === 3 ? 'pl-4' : h.level === 4 ? 'pl-8' : 'pl-12';
            return (
              <li key={i} className={`${indentClass} text-sm sm:text-base`}>
                <a
                  href={`#${h.id}`}
                  className="text-accent-primary hover:text-accent-primary/80 no-underline hover:underline transition-colors"
                  onClick={e => {
                    e.preventDefault();
                    scrollToId(h.id);
                  }}
                >
                  {renderInline(h.text.replace(/->|<-/g, '').trim())}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  };

  // Build the context object for directives
  const contextForDirectives: RenderContext = {
    modals,
    setModals,
    articleClass,
    allElements,
    parseMarkdown,
    renderElement,
    renderInline,
    processAndRenderElements,
  };

  // Keep the ref in sync so memoized renderElement always reads fresh state
  contextRef.current = contextForDirectives;

  return (
    <RenderContextProvider value={contextForDirectives}>
      {processAndRenderElements(allElements)}
    </RenderContextProvider>
  );
};

export default CustomMarkdownRenderer;
