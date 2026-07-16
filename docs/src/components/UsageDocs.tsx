import { useState, useEffect, useRef, useMemo } from 'react';
import { NRpreviewer } from '@noirmd/previewer';
import '@noirmd/previewer/markdown.css';

// ── Guide-LLM markdown imports ──
import bestPractices from '../../guide-llm/best-practices.md?raw';
import parser from '../../guide-llm/parser.md?raw';
import inlineSyntax from '../../guide-llm/inline-syntax.md?raw';
import blockSyntax from '../../guide-llm/block-syntax.md?raw';
import directivesGeneral from '../../guide-llm/directives-general.md?raw';
import directiveAdmonitions from '../../guide-llm/directive-admonitions.md?raw';
import directiveButton from '../../guide-llm/directive-button.md?raw';
import directiveCards from '../../guide-llm/directive-cards.md?raw';
import directiveDetails from '../../guide-llm/directive-details.md?raw';
import directiveModal from '../../guide-llm/directive-modal.md?raw';
import directiveSlide from '../../guide-llm/directive-slide.md?raw';
import htmlRaw from '../../guide-llm/html-raw.md?raw';
import stylingSystem from '../../guide-llm/styling-system.md?raw';

// ── Inline sections ──
const introductionMarkdown = `# Introduction

NoirMD is a **markdown renderer + editor for React** with a custom directive system, inline extensions, and live CodeMirror editing.

## Features

- **Full markdown support** — headers, lists, tables, blockquotes, code blocks, images, HTML blocks
- **Inline extensions** — icons \`|[[star]]|\`, colored text \`%cyan%text%%\`, spoilers, underlines, highlights
- **Directives** — admonitions, cards, modals, buttons, slides, collapsible sections
- **Live editor** — CodeMirror 6 with syntax highlighting, split view, and preview mode
- **Tailwind CDN** — runtime injection for directive styling without a build step
- **Theme system** — light/dark mode with CSS custom properties

## Quick Example

\`\`\`tsx
import { NRpreviewer } from '@noirmd/previewer';
import '@noirmd/previewer/markdown.css';

function App() {
  return (
    <NRpreviewer
      content="# Hello **NoirMD**"
      tailwindCDN
    />
  );
}
\`\`\`

## Architecture

NoirMD is split into two main components:

| Component | Purpose |
|-----------|---------|
| \`NRpreviewer\` | Renders markdown/HTML as React components |
| \`NReditor\` | CodeMirror 6 editor with live preview |

Both share the same parser and renderer pipeline:

\`\`\`
content (string) → parseMarkdown() → Token[] → renderElement() → React tree
\`\`\`
`;

const setupMarkdown = `# Setup

## Installation

Install the core package and React:

\`\`\`bash
npm install @noirmd/previewer react react-dom
\`\`\`

For the editor component, also install CodeMirror peer dependencies:

\`\`\`bash
npm install @uiw/react-codemirror @codemirror/view @codemirror/state @codemirror/language @lezer/highlight
\`\`\`

## Basic Usage

### Previewer only

\`\`\`tsx
import { NRpreviewer } from '@noirmd/previewer';
import '@noirmd/previewer/markdown.css';

<NRpreviewer content="# Hello **world**" />

// With Tailwind CDN for directive styling
<NRpreviewer content=":::note Title\\nContent\\n:::" tailwindCDN />

// Raw HTML
<NRpreviewer html="<h1>Fallback</h1>" />
\`\`\`

### Editor + Preview

\`\`\`tsx
import NReditor from '@noirmd/previewer/editor';
import '@noirmd/previewer/markdown.css';

function App() {
  const [value, setValue] = useState('# Hello');

  return (
    <NReditor
      value={value}
      onChange={setValue}
      tailwindCDN
    />
  );
}
\`\`\`

## Configuration

### Tailwind CDN

The library uses Tailwind CSS classes in its components. You have three options:

| Option | When to use |
|--------|-------------|
| Your own Tailwind setup | If your app already uses Tailwind, everything works |
| \`tailwindCDN\` prop | Injects Tailwind v4 browser CDN at runtime — zero config |
| \`preloadTailwindCDN()\` | Call on page idle for faster first render |

\`\`\`tsx
import { preloadTailwindCDN } from '@noirmd/previewer';

// Preload on page idle — zero cost on initial render
preloadTailwindCDN();
\`\`\`

### Theme (Light / Dark)

NoirMD uses CSS custom properties for theming. Toggle by adding/removing the \`.dark\` class on the root element:

\`\`\`tsx
document.documentElement.classList.toggle('dark');
\`\`\`

Default CSS variables:

\`\`\`css
:root {
  --color-background-primary: #ffffff;
  --color-background-secondary-solid: #f1f5f9;
  --color-text-primary: #0f172a;
  --color-text-secondary: #64748b;
  --color-accent-primary: #0ea5e9;
  --color-border: #e2e8f0;
}

.dark {
  --color-background-primary: #0f172a;
  --color-background-secondary-solid: #1e293b;
  --color-text-primary: #e2e8f0;
  --color-text-secondary: #94a3b8;
  --color-accent-primary: #38bdf8;
  --color-border: #334155;
}
\`\`\`

### Exported Types

\`\`\`tsx
import type {
  Token,
  RenderContext,
  DirectiveComponentProps,
  DirectiveComponent,
} from '@noirmd/previewer';
\`\`\`

### Exported Utilities

\`\`\`tsx
import {
  parseMarkdown,     // string → Token[]
  extractHeaders,    // Token[] → header tokens
  useDebounce,       // debounce hook
} from '@noirmd/previewer';
\`\`\`

### UI Components

Individual UI components exported for building custom directives:

\`\`\`tsx
import {
  IconRenderer,     // Material Symbols icon
  CodeBlock,   // Syntax-highlighted code block
  Admonition,       // Styled alert box
  Details,          // Collapsible section
  Modal,            // Dialog overlay
} from '@noirmd/previewer';
\`\`\`
`;

// ── Section definitions ──
interface DocSection {
  id: string;
  title: string;
  icon: string;
  markdown: string;
  category?: string;
}

const sections: DocSection[] = [
  { id: 'introduction', title: 'Introduction', icon: 'auto_awesome', markdown: introductionMarkdown },
  { id: 'setup', title: 'Setup', icon: 'settings', markdown: setupMarkdown },
  { id: 'best-practices', title: 'Best Practices', icon: 'verified', markdown: bestPractices, category: 'Guide' },
  { id: 'parser', title: 'Parser & AST', icon: 'schema', markdown: parser, category: 'Guide' },
  { id: 'inline-syntax', title: 'Inline Syntax', icon: 'format_bold', markdown: inlineSyntax, category: 'Guide' },
  { id: 'block-syntax', title: 'Block Syntax', icon: 'view_agenda', markdown: blockSyntax, category: 'Guide' },
  { id: 'styling-system', title: 'Styling System', icon: 'palette', markdown: stylingSystem, category: 'Guide' },
  { id: 'html-raw', title: 'HTML Raw', icon: 'code', markdown: htmlRaw, category: 'Guide' },
  { id: 'directives-general', title: 'Directives', icon: 'widgets', markdown: directivesGeneral, category: 'Components' },
  { id: 'directive-admonitions', title: 'Admonitions', icon: 'info', markdown: directiveAdmonitions, category: 'Components' },
  { id: 'directive-button', title: 'Button', icon: 'smart_button', markdown: directiveButton, category: 'Components' },
  { id: 'directive-cards', title: 'Cards', icon: 'dashboard', markdown: directiveCards, category: 'Components' },
  { id: 'directive-details', title: 'Details', icon: 'expand_more', markdown: directiveDetails, category: 'Components' },
  { id: 'directive-modal', title: 'Modal', icon: 'open_in_new', markdown: directiveModal, category: 'Components' },
  { id: 'directive-slide', title: 'Slide', icon: 'view_carousel', markdown: directiveSlide, category: 'Components' },
];

// ── Extract headers from markdown ──
function generateSlug(text: string): string {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-');
}

function extractHeaders(markdown: string) {
  const headers: { level: number; text: string; id: string; top: number }[] = [];
  for (const line of markdown.split('\n')) {
    const m = line.match(/^(#{1,6})\s+(.+)/);
    if (m) {
      const level = m[1].length;
      const text = m[2].replace(/[*_~`]/g, '').trim();
      headers.push({ level, text, id: generateSlug(text), top: 0 });
    }
  }
  return headers;
}

// ── TOC Component ──
function TableOfContents({ markdown, scrollRef }: { markdown: string; scrollRef: React.RefObject<HTMLDivElement> }) {
  const headers = useMemo(() => extractHeaders(markdown), [markdown]);
  const [activeId, setActiveId] = useState<string>('');

  useEffect(() => {
    const container = scrollRef.current;
    if (!container || headers.length === 0) return;

    // Build list of header elements with their positions
    const getHeaderElements = () =>
      headers.map(h => ({ id: h.id, el: document.getElementById(h.id) })).filter(h => h.el);

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible header
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
            return;
          }
        }
      },
      { root: container, rootMargin: '-80px 0px -70% 0px', threshold: 0 }
    );

    // Observe after a short delay to ensure DOM is ready
    const timer = setTimeout(() => {
      getHeaderElements().forEach(h => observer.observe(h.el!));
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [headers, scrollRef]);

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (headers.length === 0) return null;

  return (
    <nav className="hidden lg:block w-48 shrink-0 p-4 overflow-y-auto">
      <div className="sticky top-0">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-text-secondary mb-3">On this page</h4>
        <ul className="space-y-1">
          {headers.map((h) => (
            <li key={h.id}>
              <button
                onClick={() => handleClick(h.id)}
                className={`w-full text-left text-xs leading-relaxed transition-colors py-0.5 ${
                  h.level === 1 ? 'pl-0' : h.level === 2 ? 'pl-0' : h.level === 3 ? 'pl-3' : h.level === 4 ? 'pl-6' : 'pl-9'
                } ${
                  activeId === h.id
                    ? 'text-accent-primary font-semibold'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                {h.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default function UsageDocs() {
  const [active, setActive] = useState('best-practices');
  const contentRef = useRef<HTMLDivElement>(null);

  const current = sections.find(s => s.id === active);

  // Build sidebar with category headers
  const sidebarItems: { type: 'section' | 'category'; key: string; section?: DocSection; label?: string }[] = [];
  let lastCategory = '';
  for (const s of sections) {
    if (s.category && s.category !== lastCategory) {
      sidebarItems.push({ type: 'category', key: `cat-${s.category}`, label: s.category });
      lastCategory = s.category;
    }
    sidebarItems.push({ type: 'section', key: s.id, section: s });
  }

  return (
    <div className="flex-1 flex min-h-0 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 border-r border-border bg-background-secondary-solid/10 p-3 hidden md:block overflow-y-auto">
        <nav className="space-y-0.5">
          {sidebarItems.map(item =>
            item.type === 'category' ? (
              <div key={item.key} className="text-[10px] font-bold uppercase tracking-wider text-text-secondary px-3 pt-4 pb-1">
                {item.label}
              </div>
            ) : (
              <button
                key={item.key}
                onClick={() => setActive(item.section!.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
                  active === item.section!.id
                    ? 'bg-accent-primary/15 text-accent-primary font-semibold'
                    : 'text-text-secondary hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <span className="material-symbols-rounded text-base">{item.section!.icon}</span>
                {item.section!.title}
              </button>
            )
          )}
        </nav>

        {/* llms.txt link */}
        <div className="mt-4 pt-4 border-t border-border">
          <a
            href="/llms.txt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-text-secondary hover:text-text-primary hover:bg-white/5 transition-colors"
          >
            <span className="material-symbols-rounded text-base">smart_toy</span>
            llms.txt
            <span className="material-symbols-rounded text-xs ml-auto">open_in_new</span>
          </a>
        </div>
      </aside>

      {/* Mobile selector */}
      <div className="md:hidden px-4 py-2 border-b border-border shrink-0">
        <select
          value={active}
          onChange={e => setActive(e.target.value)}
          className="w-full bg-background-secondary-solid border border-border rounded-lg px-3 py-2 text-sm text-text-primary"
        >
          {sections.map(s => (
            <option key={s.id} value={s.id}>{s.title}</option>
          ))}
        </select>
      </div>

      {/* Content */}
      <div ref={contentRef} className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="max-w-3xl">
          {current && (
            <NRpreviewer content={current.markdown} tailwindCDN />
          )}
        </div>
      </div>

      {/* TOC */}
      {current && <TableOfContents markdown={current.markdown} scrollRef={contentRef} />}
    </div>
  );
}
