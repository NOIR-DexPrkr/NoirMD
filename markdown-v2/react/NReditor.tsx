import React, { useRef, useState } from 'react';
import CodeMirror, { ReactCodeMirrorProps } from '@uiw/react-codemirror';
import { EditorView, Decoration, ViewPlugin, ViewUpdate, lineNumbers, scrollPastEnd, keymap } from '@codemirror/view';
import { customStreamParserV2 } from './custom-syntax';
import { RangeSetBuilder } from '@codemirror/state';
import { syntaxHighlighting, HighlightStyle, foldService, foldGutter, foldAll, unfoldAll } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';
import { useDebounce } from './useDebounce';
import CustomMarkdownRenderer from './CustomMarkdownRenderer';

export type EditorMode = 'editor' | 'split' | 'preview';

interface NReditorProps extends ReactCodeMirrorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  /** Debounce delay in ms for preview rendering. Default: 300 */
  debounceMs?: number;
  /** Inject Tailwind v4 browser CDN for preview. Default: false */
  tailwindCDN?: boolean;
}

const customSyntaxHighlighting = HighlightStyle.define([
  { tag: t.heading, fontWeight: 'bold', color: 'var(--tc-heading, #e2e8f0)' },
  { tag: t.quote, color: 'var(--tc-quote, #94a3b8)', fontStyle: 'italic' },
  { tag: t.meta, color: 'var(--tc-meta, #64748b)' },
  { tag: t.variableName, color: 'var(--tc-variable, #38bdf8)' },
  { tag: t.strong, fontWeight: 'bold' },
  { tag: t.emphasis, fontStyle: 'italic' },
  { tag: t.strikethrough, textDecoration: 'line-through' },
  { tag: t.link, color: 'var(--tc-link, #38bdf8)' },
  { tag: t.url, color: 'var(--tc-link, #38bdf8)' },
  { tag: t.comment, color: 'var(--tc-comment, #64748b)' },
  { tag: t.keyword, color: 'var(--tc-heading, #e2e8f0)', fontWeight: 'bold' },
  { tag: t.typeName, color: 'var(--tc-type, #a78bfa)' },
  { tag: t.string, color: 'var(--tc-string, #4ade80)' },
  { tag: t.attributeName, color: 'var(--tc-attribute, #fb923c)' },
  { tag: t.propertyName, color: '#0ea5e9' },
  { tag: t.className, color: '#f59e0b', fontStyle: 'italic' },
  { tag: t.special(t.emphasis), textDecoration: 'underline' },
  { tag: t.special(t.comment), backgroundColor: 'var(--tc-highlight-bg, rgba(255,255,255,0.05))', padding: '0 2px', borderRadius: '2px' },
]);

const customEditorTheme = EditorView.theme({
  '&': {
    color: 'var(--color-text-primary, #e2e8f0)',
    backgroundColor: 'transparent !important',
    height: '100%',
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '0',
  },
  '&.cm-focused': { outline: 'none' },
  '.cm-scroller': {
    overflow: 'auto !important',
    flex: '1',
    minHeight: '0',
    WebkitOverflowScrolling: 'touch',
  },
  '.cm-gutters': {
    backgroundColor: 'transparent !important',
    borderRight: '1px solid var(--color-border, #334155)',
    color: 'var(--color-text-secondary, #94a3b8)',
    opacity: 0.6,
    border: 'none',
  },
  '.cm-activeLineGutter': { backgroundColor: 'transparent' },
  '.cm-lineNumbers': { color: 'inherit' },
  '.cm-foldGutter': { padding: '0px', cursor: 'pointer' },
  '.cm-foldPlaceholder': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--color-border, #334155)',
    color: 'var(--tc-heading, #e2e8f0)',
    padding: '0 6px',
    borderRadius: '4px',
    margin: '0 4px',
    fontSize: '0.9em',
    fontWeight: 'bold',
  },
  '.dark .cm-foldPlaceholder': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  '.cm-activeLine': { backgroundColor: 'transparent' },
  '.cm-cursor': { borderLeftColor: 'var(--color-text-primary, #e2e8f0)' },
  '&.cm-focused .cm-selectionBackground, .cm-selectionBackground': {
    backgroundColor: 'var(--tc-selection-bg, rgba(56, 189, 248, 0.2)) !important',
  },
  '.cm-blockquote-line': {
    color: 'var(--tc-blockquote-color, #94a3b8)',
    fontStyle: 'italic',
    borderLeft: '2px solid var(--tc-blockquote-border, #334155)',
    paddingLeft: '10px',
  },
  '.cm-spoiler': {
    backgroundColor: 'var(--color-text-secondary, #94a3b8)',
    color: 'var(--color-text-secondary, #94a3b8)',
    borderRadius: '3px',
    padding: '0 2px',
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
  },
  '.cm-spoiler:hover': {
    backgroundColor: 'transparent',
    color: 'var(--color-text-primary, #e2e8f0)',
  },
  '.cm-admonition-bg': {
    borderLeft: 'none !important',
    marginLeft: '0px',
  },
  '.cm-admonition-button': { borderLeftColor: 'var(--tc-attribute, #fb923c)' },
  '.cm-admonition-modal': { borderLeftColor: 'var(--tc-variable, #38bdf8)' },
  '.cm-admonition-warning': { borderLeftColor: '#f59e0b' },
  '.cm-admonition-danger': { borderLeftColor: '#ef4444' },
  '.cm-raw-block': {
    fontFamily: 'monospace',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  '.dark .cm-raw-block': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
  },
  '.cm-admonition-depth-1': {
    boxShadow: 'inset 4px 0 0 hsl(20, 70%, 50%)',
    backgroundColor: 'hsla(20, 70%, 50%, 0.05)',
    paddingLeft: '12px !important',
  },
  '.cm-admonition-depth-2': {
    boxShadow: 'inset 4px 0 0 hsl(20, 70%, 50%), inset 8px 0 0 hsl(140, 70%, 50%)',
    backgroundColor: 'hsla(140, 70%, 50%, 0.05)',
    paddingLeft: '16px !important',
  },
  '.cm-admonition-depth-3': {
    boxShadow: 'inset 4px 0 0 hsl(20, 70%, 50%), inset 8px 0 0 hsl(140, 70%, 50%), inset 12px 0 0 hsl(200, 70%, 50%)',
    backgroundColor: 'hsla(200, 70%, 50%, 0.05)',
    paddingLeft: '20px !important',
  },
  '.cm-admonition-depth-4': {
    boxShadow: 'inset 4px 0 0 hsl(20, 70%, 50%), inset 8px 0 0 hsl(140, 70%, 50%), inset 12px 0 0 hsl(200, 70%, 50%), inset 16px 0 0 hsl(280, 70%, 50%)',
    backgroundColor: 'hsla(280, 70%, 50%, 0.05)',
    paddingLeft: '24px !important',
  },
  '.cm-admonition-depth-5': {
    boxShadow: 'inset 4px 0 0 hsl(340, 70%, 50%), inset 8px 0 0 hsl(140, 70%, 50%), inset 12px 0 0 hsl(200, 70%, 50%), inset 16px 0 0 hsl(280, 70%, 50%), inset 20px 0 0 hsl(340, 70%, 50%)',
    backgroundColor: 'hsla(340, 70%, 50%, 0.05)',
    paddingLeft: '28px !important',
  },
  '.cm-panels': {
    position: 'static !important',
    backgroundColor: 'transparent !important',
    border: 'none !important',
  },
  '.cm-panel.cm-search': {
    position: 'fixed !important',
    top: '20px !important',
    right: '20px !important',
    zIndex: 100,
    backgroundColor: 'var(--color-background-primary, #0f172a)',
    border: '1px solid var(--color-border, #334155)',
    borderRadius: '12px',
    padding: '12px',
    boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    backdropFilter: 'blur(8px)',
    minWidth: '280px',
  },
  '.cm-search [name=close]': {
    position: 'absolute',
    right: '8px',
    top: '8px',
    cursor: 'pointer',
    opacity: 0.6,
    border: 'none',
    background: 'transparent',
    color: 'var(--color-text-primary, #e2e8f0)',
    fontSize: '18px',
  },
  '.cm-search [name=close]:hover': { opacity: 1 },
  '.cm-textfield': {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid var(--color-border, #334155)',
    borderRadius: '6px',
    color: 'var(--color-text-primary, #e2e8f0)',
    padding: '4px 8px',
    outline: 'none',
    width: '100%',
    marginBottom: '4px',
  },
  '.cm-textfield:focus': {
    borderColor: 'var(--color-accent-primary, #38bdf8)',
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  '.cm-panel.cm-search input[type=checkbox]:checked': {
    backgroundColor: 'var(--color-accent-primary, #38bdf8)',
  },
  '.cm-panel.cm-search input[type=checkbox]': {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
  },
  '.cm-button': {
    backgroundImage: 'linear-gradient(135deg, var(--color-accent-primary, #38bdf8), var(--color-accent-hover, #7dd3fc))',
    color: 'var(--color-accent-text, #0f172a)',
    border: 'none',
    borderRadius: '6px',
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: '0.85em',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    transition: 'transform 0.1s, opacity 0.2s',
    marginRight: '4px',
    boxShadow: '0 4px 12px -2px rgba(0, 0, 0, 0.2)',
  },
  '.cm-button:hover': {
    opacity: 0.95,
    transform: 'translateY(-1px)',
    boxShadow: '0 6px 14px -2px rgba(0, 0, 0, 0.25)',
  },
  '.cm-button:active': { transform: 'translateY(0)' },
  '.cm-search label': {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '0.8em',
    color: 'var(--color-text-secondary, #94a3b8)',
    marginRight: '8px',
    cursor: 'pointer',
  },
  '.cm-search input[type=checkbox]': {
    cursor: 'pointer',
    accentColor: 'var(--color-accent-primary, #38bdf8)',
  },
});

// Fold service for ::: directive blocks and HTML tags
const customFoldService = foldService.of((state, lineStart) => {
  const line = state.doc.lineAt(lineStart);
  const trimmed = line.text.trim();
  
  const dirMatch = trimmed.match(/^:::(.+)/);
  if (dirMatch) {
    let stack = 1;
    for (let i = line.number + 1; i <= state.doc.lines; i++) {
      const nextLine = state.doc.line(i);
      const nextText = nextLine.text.trim();
      if (nextText.match(/^:::(.+)/)) {
        stack++;
      } else if (nextText === ':::') {
        stack--;
        if (stack === 0) {
          return { from: line.to, to: nextLine.to };
        }
      }
    }
    return null;
  }

  const htmlMatch = trimmed.match(/^<([a-zA-Z][\w-]*)\b/);
  if (htmlMatch) {
    const tagName = htmlMatch[1].toLowerCase();
    const voidElements = new Set([
      'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 
      'link', 'meta', 'param', 'source', 'track', 'wbr'
    ]);
    if (voidElements.has(tagName) || trimmed.endsWith('/>')) return null;

    let stack = 1;

    for (let i = line.number + 1; i <= state.doc.lines; i++) {
      const nextLine = state.doc.line(i);
      const nextText = nextLine.text;
      
      let match;
      const tagRegex = new RegExp(`</?${tagName}\\b[^>]*>`, 'gi');
      
      while ((match = tagRegex.exec(nextText)) !== null) {
        if (match[0].startsWith('</')) {
          stack--;
          if (stack === 0) {
            return { from: line.to, to: nextLine.to };
          }
        } else {
          if (!match[0].endsWith('/>')) {
            stack++;
          }
        }
      }
    }
    return null;
  }

  return null;
});

// Directive colorization plugin — colored left borders for nested :::
const directivePlugin = ViewPlugin.fromClass(
  class {
    decorations: any;
    constructor(view: EditorView) {
      this.decorations = this.getDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.getDecorations(update.view);
      }
    }
    getDecorations(view: EditorView) {
      const builder = new RangeSetBuilder<Decoration>();
      const doc = view.state.doc;
      const visibleRanges = view.visibleRanges;
      if (visibleRanges.length === 0) return builder.finish();

      const maxTo = visibleRanges[visibleRanges.length - 1].to;
      const admonitionStack: string[] = [];

      for (let i = 1; i <= doc.lines; i++) {
        const line = doc.line(i);
        if (line.from > maxTo) break;

        const trimmedLine = line.text.trim();
        let isClosingLine = false;
        let closingTargetIdx = -1;

        const match = trimmedLine.match(/^:::(.*)/);
        if (match) {
          const rest = match[1].trim();
          if (rest === '') {
            if (admonitionStack.length > 0) {
              isClosingLine = true;
              closingTargetIdx = admonitionStack.length - 1;
            }
          } else {
            const typeMatch = rest.match(/^(\w+|\{)/);
            const type =
              typeMatch && typeMatch[1] !== '{'
                ? typeMatch[1].toLowerCase()
                : 'generic';
            admonitionStack.push(type);
          }
        }

        const isVisible = visibleRanges.some(
          r => line.to >= r.from && line.from <= r.to
        );

        if (isVisible && admonitionStack.length > 0) {
          const targetIdx = isClosingLine
            ? closingTargetIdx
            : admonitionStack.length - 1;
          const currentType = admonitionStack[targetIdx];
          const depth = targetIdx + 1;
          const lineClasses = ['cm-admonition-bg'];

          if (currentType === 'raw') {
            lineClasses.push('cm-raw-block');
            lineClasses.push(`cm-admonition-depth-${Math.min(depth, 5)}`);
          } else {
            lineClasses.push(`cm-admonition-${currentType}`);
            lineClasses.push(`cm-admonition-depth-${Math.min(depth, 5)}`);
          }

          builder.add(
            line.from,
            line.from,
            Decoration.line({ class: lineClasses.join(' ') })
          );
        }

        if (isClosingLine) {
          admonitionStack.pop();
        }
      }

      return builder.finish();
    }
  },
  { decorations: v => v.decorations }
);

// Blockquote line decoration
const blockquotePlugin = ViewPlugin.fromClass(
  class {
    decorations: any;
    constructor(view: EditorView) {
      this.decorations = this.getDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.getDecorations(update.view);
      }
    }
    getDecorations(view: EditorView) {
      const builder = new RangeSetBuilder<Decoration>();
      for (const { from, to } of view.visibleRanges) {
        for (let pos = from; pos <= to; ) {
          const line = view.state.doc.lineAt(pos);
          if (line.text.trim().startsWith('>')) {
            builder.add(
              line.from,
              line.from,
              Decoration.line({ class: 'cm-blockquote-line' })
            );
          }
          pos = line.to + 1;
        }
      }
      return builder.finish();
    }
  },
  { decorations: v => v.decorations }
);

// Spoiler inline decoration: !>text<! → blurred until hover
const spoilerPlugin = ViewPlugin.fromClass(
  class {
    decorations: any;
    constructor(view: EditorView) {
      this.decorations = this.getDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.getDecorations(update.view);
      }
    }
    getDecorations(view: EditorView) {
      const builder = new RangeSetBuilder<Decoration>();
      const spoilerRegex = /!>([\s\S]+?)<!(?=\s|$)/g;
      const ranges: { from: number; to: number; dec: Decoration }[] = [];

      for (const { from, to } of view.visibleRanges) {
        const text = view.state.doc.sliceString(from, to);
        spoilerRegex.lastIndex = 0;
        let match;
        while ((match = spoilerRegex.exec(text))) {
          const start = from + match.index;
          const end = start + match[0].length;
          const contentStart = start + 2;
          const contentEnd = end - 2;
          if (contentStart >= contentEnd) continue;
          ranges.push({ from: start, to: contentStart, dec: Decoration.replace({}) });
          ranges.push({
            from: contentStart,
            to: contentEnd,
            dec: Decoration.mark({ class: 'cm-spoiler' }),
          });
          ranges.push({ from: contentEnd, to: end, dec: Decoration.replace({}) });
        }
      }

      ranges.sort((a, b) => a.from - b.from || a.to - b.to);
      for (const { from, to, dec } of ranges) builder.add(from, to, dec);
      return builder.finish();
    }
  },
  { decorations: v => v.decorations }
);

// Color text inline decoration: %color%text%%
const colorTextPlugin = ViewPlugin.fromClass(
  class {
    decorations: any;
    constructor(view: EditorView) {
      this.decorations = this.getDecorations(view);
    }
    update(update: ViewUpdate) {
      if (update.docChanged || update.viewportChanged) {
        this.decorations = this.getDecorations(update.view);
      }
    }
    getDecorations(view: EditorView) {
      const builder = new RangeSetBuilder<Decoration>();
      const colorRegex = /%([^%\s]+?)%((?:(?!%%).)*)%%/g;
      for (const { from, to } of view.visibleRanges) {
        const text = view.state.doc.sliceString(from, to);
        let match;
        while ((match = colorRegex.exec(text))) {
          const color = match[1];
          const startPos = from + match.index;
          const endPos = startPos + match[0].length;
          builder.add(
            startPos,
            endPos,
            Decoration.mark({ attributes: { style: `color: ${color}` } })
          );
        }
      }
      return builder.finish();
    }
  },
  { decorations: v => v.decorations }
);

/**
 * NReditor — CodeMirror 6 editor with live markdown preview.
 * Drop-in component that works inside any container.
 *
 * @example
 * ```tsx
 * import NReditor from '@noirmd/previewer/editor';
 * import '@noirmd/previewer/markdown.css';
 *
 * <NReditor value={md} onChange={setMd} />
 * <NReditor value={md} onChange={setMd} tailwindCDN />
 * ```
 */
const NReditor: React.FC<NReditorProps> = ({
  value,
  onChange,
  className,
  debounceMs = 300,
  tailwindCDN = false,
}) => {
  const editorRef = useRef<EditorView | null>(null);
  const [isAllFolded, setIsAllFolded] = useState(false);
  const [editorMode, setEditorMode] = useState<EditorMode>('editor');
  const debouncedContent = useDebounce(value, debounceMs);

  const handleToggleFold = () => {
    if (!editorRef.current) return;
    if (isAllFolded) {
      unfoldAll(editorRef.current);
      setIsAllFolded(false);
    } else {
      foldAll(editorRef.current);
      setIsAllFolded(true);
    }
  };

  const extensions = React.useMemo(
    () => [
      customStreamParserV2,
      lineNumbers(),
      foldGutter({
        markerDOM: open => {
          const span = document.createElement('span');
          span.style.cursor = 'pointer';
          span.style.padding = '0 4px';
          span.style.fontSize = '12px';
          span.style.display = 'inline-block';
          span.style.transition = 'transform 0.2s';
          span.textContent = open ? '▼' : '▶';
          return span;
        },
      }),
      customFoldService,
      customEditorTheme,
      syntaxHighlighting(customSyntaxHighlighting),
      EditorView.lineWrapping,
      scrollPastEnd(),
      keymap.of([
        { key: 'Ctrl-Shift-[', run: foldAll },
        { key: 'Ctrl-Shift-]', run: unfoldAll },
      ]),
      directivePlugin,
      blockquotePlugin,
      spoilerPlugin,
      colorTextPlugin,
    ],
    []
  );

  const modeButtons: { key: EditorMode; icon: string; label: string }[] = [
    { key: 'editor', icon: 'code', label: 'Editor' },
    { key: 'split', icon: 'vertical_split', label: 'Split' },
    { key: 'preview', icon: 'visibility', label: 'Preview' },
  ];

  return (
    <div className={`relative flex-1 flex flex-col min-h-0 ${className || ''}`}>
      {/* Mode toolbar */}
      <div className="flex items-center justify-between px-2 py-1.5 border-b border-border/30 bg-background-secondary-solid/50 rounded-t-2xl shrink-0">
        <button
          onClick={handleToggleFold}
          className="p-1 px-2 text-xs font-bold bg-background-secondary-solid border border-border rounded hover:bg-border text-accent-primary transition-colors"
          title={isAllFolded ? 'Expand all' : 'Collapse all'}
        >
          {isAllFolded ? '╩' : '╦'}
        </button>

        <div className="flex items-center gap-0.5 bg-black/10 dark:bg-white/5 rounded-lg p-0.5">
          {modeButtons.map(btn => (
            <button
              key={btn.key}
              onClick={() => setEditorMode(btn.key)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs rounded-md transition-colors ${
                editorMode === btn.key
                  ? 'bg-accent-primary/20 text-accent-primary font-semibold'
                  : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
              }`}
              title={btn.label}
            >
              <span className="material-symbols-rounded text-sm">{btn.icon}</span>
              <span className="hidden sm:inline">{btn.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content area — editor / split / preview */}
      <div className="flex-1 min-h-0 flex">
        {(editorMode === 'editor' || editorMode === 'split') && (
          <div
            className={`${
              editorMode === 'split' ? 'w-1/2 border-r border-border/30' : 'w-full'
            } flex-1 flex flex-col min-h-0 min-w-0`}
          >
            <CodeMirror
              value={value}
              onChange={onChange}
              className="flex-1 min-h-0 min-w-0"
              height="100%"
              onCreateEditor={view => {
                editorRef.current = view as any;
              }}
              basicSetup={{
                lineNumbers: false,
                foldGutter: false,
              }}
              extensions={extensions}
            />
          </div>
        )}

        {(editorMode === 'preview' || editorMode === 'split') && (
          <div
            className={`${
              editorMode === 'split' ? 'w-1/2' : 'w-full'
            } flex-1 min-h-0 overflow-auto min-w-0`}
          >
            <div className="nr-prose h-full shadow-xs overflow-auto p-4">
              <CustomMarkdownRenderer content={debouncedContent} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NReditor;
