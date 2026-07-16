// ============================================================
// Vue CustomMarkdownRenderer — main orchestrator
// ============================================================

import { defineComponent, h, ref, computed, onMounted, onUnmounted, provide, type PropType, type VNode } from 'vue';
import type { Token, DirectiveToken, HtmlBlockToken } from '../core/types';
import type { RenderContext } from './types';
import { parseMarkdown } from '../core/parser';
import { renderInline, renderTable, renderList, extractHeaders } from './renderers';
import { CodeBlock } from './ui-components';
import DirectiveRenderer from './DirectiveRenderer';
import RawHtmlRenderer from './RawHtmlRenderer';
import { RenderContextKey } from './context';
import { scrollToId, resetScopeCounter, parseHtmlAttrs } from '../core/utils';

const CustomMarkdownRenderer = defineComponent({
  name: 'CustomMarkdownRenderer',
  props: {
    content: { type: String, required: true },
  },
  setup(props) {
    const modals = ref<Record<string, boolean>>({});
    const baseId = Math.random().toString(36).slice(2, 9);
    const articleClass = `scope-${baseId}`;

    resetScopeCounter();

    const allElements = computed(() => parseMarkdown(props.content));

    // Scroll to hash on load and hash changes
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const parts = hash.split('#');
        const id = parts[parts.length - 1];
        scrollToId(id);
      }
    };

    onMounted(() => {
      handleHashChange();
      window.addEventListener('hashchange', handleHashChange);
    });

    onUnmounted(() => {
      window.removeEventListener('hashchange', handleHashChange);
    });

    // ── Generate TOC from headers ──
    const generateToc = (elements: Token[]): VNode | null => {
      const headers = extractHeaders(elements);
      if (headers.length === 0) return null;

      return h('nav', { class: 'not-prose my-6 p-4 rounded-2xl border border-border bg-background-primary/5' }, [
        h('div', { class: 'text-base font-bold mb-3' }, 'Table of Contents'),
        h('ul', { class: 'space-y-1 list-none p-0 m-0' }, headers.map((h_token, i) => {
          if (h_token.type !== 'header') return null;
          const indentClass = h_token.level <= 2 ? 'pl-0' : h_token.level === 3 ? 'pl-4' : h_token.level === 4 ? 'pl-8' : 'pl-12';
          return h('li', { key: i, class: `${indentClass} text-sm sm:text-base` }, [
            h('a', {
              href: `#${h_token.id}`,
              class: 'text-accent-primary hover:text-accent-primary/80 no-underline hover:underline transition-colors',
              onClick: (e: Event) => {
                e.preventDefault();
                scrollToId(h_token.id);
              },
            }, renderInline(h_token.text.replace(/->|<-/g, '').trim())),
          ]);
        })),
      ]);
    };

    // ── Render a single AST element ──
    const renderElement = (element: Token, index: number, _depth: number = 0): VNode | null => {
      switch (element.type) {
        case 'header': {
          const tag = `h${element.level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
          let text = element.text;

          const alignCenter = text.match(/^->\s*(.+?)\s*<-\s*$/);
          const alignRight = text.match(/^->\s*(.+?)\s*->\s*$/);
          if (alignCenter) text = alignCenter[1];
          else if (alignRight) text = alignRight[1];

          const userClasses = element.classes || '';
          let headerClasses = `md-h${element.level}`;
          if (alignCenter) headerClasses += ' text-center';
          if (alignRight) headerClasses += ' text-right';
          if (userClasses) headerClasses += ` ${userClasses}`;

          return h(tag, { key: index, id: element.id, class: headerClasses }, renderInline(text));
        }

        case 'paragraph': {
          const lines = element.content.split('\n');
          const processedContent = lines.map((line, lineIndex) => {
            const hardBreakMatch = line.match(/^(.*?)(\s{2,})$/);
            if (hardBreakMatch) {
              return h('span', { key: lineIndex }, [
                renderInline(hardBreakMatch[1]),
                h('br'),
              ]);
            }
            const isLastLine = lineIndex === lines.length - 1;
            return h('span', { key: lineIndex }, [
              renderInline(line),
              !isLastLine && ' ',
            ]);
          });

          const pUserClasses = element.classes || '';
          let pClasses = 'md-p';
          if (pUserClasses) pClasses += ` ${pUserClasses}`;
          if (element.align) pClasses += ` text-${element.align}`;

          return h('p', { key: index, id: element.id, class: pClasses }, processedContent);
        }

        case 'codeblock':
          return h(CodeBlock, {
            key: index,
            code: element.content,
            language: element.language,
            title: element.title,
          });

        case 'directive':
          return h(DirectiveRenderer, {
            key: index,
            element,
            context: contextForDirectives,
            index,
            allElements: allElements.value,
          });

        case 'html': {
          let processedContent = element.content;
          let globalStyles = '';

          processedContent = processedContent.replace(
            /<style(?:\s+[^>]*)?>([\s\S]*?)<\/style>/gi,
            (_match: string, cssContent: string) => {
              globalStyles += cssContent + '\n';
              return '';
            }
          );

          return h(RawHtmlRenderer, {
            key: index,
            content: processedContent,
            globalStyles: globalStyles || undefined,
            wrapperClassName: 'w-full my-4',
          });
        }

        case 'html-block': {
          const htmlBlock = element as HtmlBlockToken;
          const rawProps = parseHtmlAttrs(htmlBlock.attrs);
          const props: Record<string, any> = {};
          for (const [key, value] of Object.entries(rawProps)) {
            if (key === 'class') props['class'] = value;
            else props[key] = value;
          }

          return h(htmlBlock.tag, { key: index, ...props },
            processAndRenderElements(htmlBlock.children, _depth + 1)
          );
        }

        case 'image':
          return h('img', {
            key: index,
            alt: element.alt,
            src: element.src,
            style: element.style,
            class: 'max-w-full h-auto',
          });

        case 'table':
          return h('div', { key: index }, renderTable(element.content));

        case 'list':
          return h('div', { key: index }, renderList(element.content));

        case 'blockquote':
          return h('blockquote', {
            key: index,
            class: `border-l-4 border-accent-primary/30 pl-4 italic text-text-secondary my-4 text-sm sm:text-base${element.classes ? ` ${element.classes}` : ''}`,
          }, renderInline(element.content));

        case 'hr':
          return h('hr', { key: index, class: 'my-8 border-border' });

        case 'toc': {
          const toc = generateToc(allElements.value);
          return toc ? h('div', { key: index }, toc) : null;
        }

        default:
          return null;
      }
    };

    // ── Process elements with card batching ──
    const processAndRenderElements = (elements: Token[], depth: number = 0): VNode[] => {
      const result: VNode[] = [];
      let i = 0;

      while (i < elements.length) {
        const el = elements[i];

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
            for (let c = 0; c < cards.length; c++) {
              result.push(renderElement(cards[c], result.length, depth) as VNode);
            }
          } else {
            const firstCardClass = (cards[0] as DirectiveToken).props?.['class'] || '';
            const justifyClasses = firstCardClass.match(/\bjustify-\S+/g) || [];
            const wrapperJustify = justifyClasses.length > 0 ? justifyClasses.join(' ') : '';

            result.push(h('div', {
              key: `card-grid-${result.length}`,
              class: `not-prose flex flex-wrap gap-6 my-6 ${wrapperJustify}`,
            }, cards.map((card, ci) => {
              const rendered = renderElement(card, ci, depth);
              return rendered ? h('span', { key: ci }, rendered) : null;
            })));
          }
        } else {
          result.push(renderElement(el, result.length, depth) as VNode);
          i++;
        }
      }

      return result;
    };

    // Build the context object for directives
    const setModals = (value: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => {
      if (typeof value === 'function') {
        modals.value = value(modals.value);
      } else {
        modals.value = value;
      }
    };

    const contextForDirectives: RenderContext = {
      modals,
      setModals,
      articleClass,
      allElements: allElements.value,
      parseMarkdown,
      renderElement,
      renderInline,
      processAndRenderElements,
    };

    provide(RenderContextKey, contextForDirectives);

    return () => h('div', { class: articleClass },
      processAndRenderElements(allElements.value)
    );
  },
});

export default CustomMarkdownRenderer;
