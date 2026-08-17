# NoirMD

A **framework-agnostic** markdown renderer with custom directives, interactive components, and pure CSS styling. **One vanilla DOM engine** with thin React/Vue wrappers — use it in React, Vue, Vanilla JS, or any framework.

> **NoirMD** transforms Markdown into a typed AST and renders it with a single vanilla DOM engine (`renderMarkdownString` → `HTMLElement`) — with support for admonitions, cards, modals, slides, and more.

---

## ✨ Features

- 🌐 **Framework Agnostic** — One DOM rendering engine; React and Vue are thin mount-point wrappers
- 📝 **Custom Parser** — Line-by-line state machine that produces a typed `Token[]` AST
- 📦 **Directive System** — 16 directive types mapped to 7 rich components (admonitions, cards, modals, etc.)
- 🎨 **Modular CSS** — Pure CSS split into `variables.css`, `base.css`, and one file per component; `--color-*` theme support
- 🔤 **Rich Inline Syntax** — Bold, italic, highlight, color, spoiler, underline, icons, and more
- 💻 **Syntax Highlighting** — Code blocks with highlight.js built-in
- ✍️ **Editor** — CodeMirror 6 powered editor with live preview

---

## 📦 Installation

```bash
# Core + React
npm install @noirmd/previewer react react-dom

# Core + Vue 3
npm install @noirmd/previewer vue

# Core only (Vanilla JS)
npm install @noirmd/previewer
```

For the editor (optional):

```bash
npm install @uiw/react-codemirror @codemirror/view @codemirror/state @codemirror/language @lezer/highlight
```

---

## 📖 Package Entry Points

| Import path | Description | Dependencies |
|-------------|-------------|--------------|
| `@noirmd/previewer/core` | Parser, types, utilities | None |
| `@noirmd/previewer/vanilla` | Vanilla DOM renderer — the single rendering engine | None (highlight.js bundled) |
| `@noirmd/previewer/react` | Thin React mount-point wrapper | React ≥18 |
| `@noirmd/previewer/vue` | Thin Vue mount-point wrapper | Vue ≥3 |
| `@noirmd/previewer` | Backward-compatible (core + react) | React ≥18 |
| `@noirmd/previewer/editor` | CodeMirror 6 editor | React + CodeMirror |
| `@noirmd/previewer/editor.css` | Self-contained editor styles (toolbar, layout) | — |
| `@noirmd/previewer/vanilla/vanilla.css` | Full CSS entry (`@import`s all partials) | — |

---

## 🚀 Quick Start

### React

```tsx
import { NRpreviewer } from '@noirmd/previewer/react';
import '@noirmd/previewer/vanilla/vanilla.css';

function App() {
  return (
    <NRpreviewer
      content="# Hello **world**"
      tailwindCDN
    />
  );
}
```

### Vue 3

```vue
<script setup>
import { NRpreviewer } from '@noirmd/previewer/vue';
import '@noirmd/previewer/vanilla/vanilla.css';

const markdown = `# Hello **world**`;
</script>

<template>
  <NRpreviewer :content="markdown" :tailwindCDN="true" />
</template>
```

### Vanilla JS

```ts
import { renderMarkdownString } from '@noirmd/previewer/vanilla';
import '@noirmd/previewer/vanilla/vanilla.css';

const element = renderMarkdownString('# Hello **world**');
document.getElementById('app')!.appendChild(element);
```

### Editor (React)

```tsx
import { useState } from 'react';
import NReditor from '@noirmd/previewer/editor';
import '@noirmd/previewer/editor.css';
import '@noirmd/previewer/vanilla/vanilla.css';

function Editor() {
  const [value, setValue] = useState('# Start writing...');

  return (
    <NReditor
      value={value}
      onChange={setValue}
      tailwindCDN
    />
  );
}
```

---

## ⚠️ Required: Import the CSS

**Every framework requires importing the same CSS file for NoirMD to display correctly.** Without it, markdown renders as unstyled HTML.

| Framework | CSS Import |
|-----------|-----------|
| React / Next.js | `import '@noirmd/previewer/vanilla/vanilla.css';` |
| Vue / Nuxt | `import '@noirmd/previewer/vanilla/vanilla.css';` |
| Vanilla JS | `import '@noirmd/previewer/vanilla/vanilla.css';` |

Import it **once** in your root component or global CSS file.

> The CSS is modular: `variables.css` (design tokens), `base.css` (global/reusable
> styles) and one file per component (codeblock, admonition, card, modal, ...).
> `vanilla.css` is the entry point that `@import`s everything.

---

## 📖 Markdown Syntax

### Inline Syntax

| # | Syntax | Result |
|---|--------|--------|
| 1 | `\|[[icon-name]]\|` | Material Icon inline |
| 2 | `!~color;style;type;text~!` | Text decoration (underline, overline, etc.) |
| 3 | `%color%text%%` | Colored text |
| 4 | `!>text<!` | Spoiler (hidden until hover) |
| 5 | `==text==` | Highlight / mark |
| 6 | `***text***` | Bold + Italic |
| 7 | `**text**` | **Bold** |
| 8 | `_text_` | *Italic* (single underscore only) |
| 9 | `~~text~~` | ~~Strikethrough~~ |
| 10 | `` `code` `` | Inline code |
| 11 | `[text](url)` | Link (always `target="_blank"`) |
| 12 | `<html>` | Raw HTML inline |

> ⚠️ `_text_` is the **only** supported italic syntax. `*text*` renders as literal asterisks.

### Block Syntax

| Element | Syntax |
|---------|--------|
| Headers | `# H1` through `###### H6` (with optional alignment and custom attributes) |
| Code blocks | Triple backticks with optional language and title |
| Tables | Pipe-delimited with alignment |
| Lists | Ordered and unordered, with nesting |
| Blockquotes | `>` prefixed quotes |
| Images | `![alt](src#float){w:h}` with positioning |
| HTML blocks | `<tag>...</tag>` (nesting-aware, content parsed as markdown) |
| TOC | `[TOC]` or `[TOC2]` |

### Header Alignment & Attributes

```markdown
# ->Centered Title<-
## ->Right Title->
## Title ##{.highlight #custom-id}
```

---

## 🧩 Directive System

Directives use the `:::type {props} ... :::` syntax. Props support shorthands: `.className` → `class`, `#id` → `id`.

### Admonitions

```markdown
:::note Title
This is a note admonition.
:::

:::warning Caution
Be careful with this!
:::

:::danger Alert
Critical warning here.
:::

:::info Tip
Useful information.
:::

:::greentext Success
Positive outcome.
:::
```

| Type | Color | Default Icon |
|------|-------|-------------|
| `note` | Blue (info) | `info` |
| `info` | Blue (info) | `lightbulb` |
| `warning` | Amber | `warning` |
| `danger` | Red | `report` |
| `greentext` | Green | `subdirectory_arrow_right` |

### Cards

```markdown
:::card {title="Card Title" image="/img.png" icon="star"}
Card content here.

#description
Short description text.
:::
```

| Variant | Behavior | Click Action |
|---------|----------|-------------|
| `card` | Static | No interaction |
| `card-m` | Modal | Opens dialog with `#content` slot |
| `card-b` | Link | Opens `url` in new tab |

Consecutive cards auto-batch into a flex-wrap grid. Use `batch="off"` on the first card to disable.

### Details (Collapsible)

```markdown
:::details {title="Click to expand" icon="expand_more" defaultOpen="true"}
Hidden content revealed on click.
:::
```

### Modal (Dialog)

```markdown
:::modal {title="Modal Title" label="Open Modal" icon="open_in_new"}
Modal body with **markdown** support.
:::
```

Powered by the native `<dialog>` element — portal to `<body>` on open, backdrop click and Escape to close, cleanup on close.

### Button (Link)

```markdown
:::button {label="Click Me" url="https://example.com" icon="near_me"}
```

### Slide (Text Carousel)

```markdown
:::slide {interval="3000" speed="500"}
First slide line
Second slide line
Third slide line
:::
```

### Wrapper & Style

```markdown
:::div .my-class #my-id
Custom wrapper with class and id.
:::

:::style
Custom styled container.
:::
```

### Slot System

Split directive content into named regions:

```markdown
:::card
Default content here.

#header
Header slot content.

#footer
Footer slot content.
:::
```

---

## 🎨 Styling System

### Modular CSS

NoirMD ships pure CSS (no framework, no Tailwind required). `vanilla.css` is the
single entry point and `@import`s:
- `variables.css` — design tokens (`--nr-*` with `--color-*` host fallbacks)
- `base.css` — global/reusable styles (typography, inline elements, hljs theme)
- one file per component: `codeblock.css`, `admonition.css`, `details.css`,
  `modal.css`, `card.css`, `button.css`, `table.css`, `list.css`,
  `blockquote.css`, `toc.css`, `slide.css`

Edit the partials directly — `vanilla.css` only imports.

### Tailwind (optional)

`tailwindCDN` injects the Tailwind CSS v4 browser CDN at runtime (ref-counted,
preflight disabled) — only needed for Tailwind classes authored inside markdown.

### Theme Color Tokens

| Token | CSS Variable | Usage |
|-------|-------------|-------|
| `bg-background-primary` | `--color-background-primary` | Main background |
| `bg-background-secondary-solid` | `--color-background-secondary-solid` | Secondary background |
| `text-text-primary` | `--color-text-primary` | Primary text |
| `text-text-secondary` | `--color-text-secondary` | Secondary text |
| `text-accent-primary` | `--color-accent-primary` | Accent color |
| `text-accent-hover` | `--color-accent-hover` | Accent hover |
| `border-border` | `--color-border` | Border |
| `text-danger` | `--color-danger` | Error/danger |
| `text-success` | `--color-success` | Success |
| `text-info` | `--color-info` | Information |

### Font Families

| Token | Font |
|-------|------|
| `font-sans` | Inter |
| `font-serif` | Lora |
| `font-display` | Playfair Display |
| `font-slab` | Roboto Slab |
| `font-mono` | Roboto Mono |
| `font-handwriting` | Caveat |

### Override Pattern

All directives support `class` and `style` props for customization. User classes are **appended** after defaults — CSS source order means the last class wins:

```markdown
:::note {class="bg-red-500/10 border-red-500/30 text-red-500"}
This note is styled red instead of blue.
:::
```

---

## 🏗️ Architecture

```text
                        ┌─────────────────────────────┐
                        │  core/ (framework-agnostic)  │
                        │  parseMarkdown() → Token[]   │
                        └──────────────┬──────────────┘
                                       │
                                 ┌─────▼─────┐
                                 │ vanilla/   │  ← THE engine: Token[] → HTMLElement
                                 │  DOM + CSS │    directives, events, styling
                                 └─────┬─────┘
                                       │
                       ┌───────────────┼───────────────┐
                       │               │               │
                 ┌─────▼─────┐  ┌──────▼──────┐  ┌─────▼─────┐
                 │  react/    │  │   vue/      │  │  any JS   │
                 │  mount pt  │  │  mount pt   │  │  framework │
                 └────────────┘  └─────────────┘  └───────────┘
```

- **Parser** (`core/parser.ts`): State machine that tokenizes Markdown line-by-line into typed tokens
- **Vanilla engine** (`vanilla/`): Renders the AST into a real `HTMLElement` — all tokens, directives, and events (dialog, details, copy, slide) use native DOM
- **React / Vue wrappers**: Thin mount-points (`useEffect`/`onMounted` + `appendChild(renderMarkdownString())`) that re-render when content changes

---

## 📁 Project Structure

```text
NoirMD/
├── markdown-v2/              # Core library (@noirmd/previewer)
│   ├── core/                 # Framework-agnostic parser + types
│   │   ├── parser.ts         # Line-by-line Markdown parser → Token[] AST
│   │   ├── types.ts          # Token types
│   │   └── utils.ts          # Shared utilities
│   ├── vanilla/              # THE rendering engine (pure DOM, no framework)
│   │   ├── renderer.ts       # renderMarkdownString / renderHtmlString → HTMLElement
│   │   ├── inline.ts         # Inline formatting → DocumentFragment
│   │   ├── components.ts     # Icon, codeblock, admonition, details, modal, table, list, TOC
│   │   ├── directives/       # 16 directive implementations (DOM API)
│   │   ├── vanilla.css       # CSS entry (@imports all partials)
│   │   ├── variables.css     # Design tokens
│   │   ├── base.css          # Global/reusable styles + hljs theme
│   │   └── *.css             # One file per component (card, modal, toc, ...)
│   ├── react/                # Thin React mount-point wrapper
│   │   ├── NRpreviewer.tsx   # Drop-in preview component
│   │   ├── NReditor.tsx      # CodeMirror 6 editor with live preview
│   │   └── CustomMarkdownRenderer.tsx  # Mount-point for the vanilla engine
│   └── vue/                  # Thin Vue 3 mount-point wrapper
│       ├── NRpreviewer.ts    # Drop-in preview component
│       └── CustomMarkdownRenderer.ts  # Mount-point for the vanilla engine
│
├── docs-site/                # Documentation site (Vite + React)
│   ├── src/
│   │   ├── components/       # Interactive components (Playground, Cheatsheet, docs shell)
│   │   ├── pages/            # Home, Playground, Doc pages
│   │   └── data/             # Docs index + sample data
│   └── guide-llm/            # Detailed feature documentation
│
└── README.md
```

---

## 📚 Documentation

Detailed guides are available in `docs-site/guide-llm/`:

| Guide | Description |
|-------|-------------|
| `introduction.md` | Overview, architecture, entry points |
| `markdown-guide.md` | Standard markdown syntax reference |
| `setup-react.md` | React installation & usage |
| `setup-vue.md` | Vue 3 installation & usage |
| `setup-vanilla.md` | Vanilla JS installation & usage |
| `parser.md` | Parser detection order, AST tokens, props parsing |
| `inline-syntax.md` | Complete inline formatting reference |
| `block-syntax.md` | Headers, code blocks, tables, lists |
| `directives-general.md` | Directive system: syntax, props, slots, nesting |
| `directive-admonitions.md` | note / info / warning / danger / greentext |
| `directive-cards.md` | card / card-m / card-b |
| `directive-details.md` | Collapsible sections |
| `directive-modal.md` | Dialog popups |
| `directive-button.md` | Link buttons |
| `directive-slide.md` | Text carousel |
| `styling-system.md` | Tailwind, CSS variables, override pattern |
| `best-practices.md` | Rules, restrictions, and common pitfalls |
| `html-raw.md` | Raw HTML, `<style>`, `<script>` |

---

## 📜 License

MIT

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/) — Mount-point wrapper
- [Vue 3](https://vuejs.org/) — Mount-point wrapper
- [CodeMirror 6](https://codemirror.net/) — Editor engine
- [Tailwind CSS](https://tailwindcss.com/) — Optional CDN for user-authored classes
- [highlight.js](https://highlightjs.org/) — Syntax highlighting
- [Vite](https://vitejs.dev/) — Build tool
- [Astro](https://astro.build/) — Documentation site framework
