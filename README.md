# NoirMD

A custom Markdown parser and React renderer with directives, interactive components, and Tailwind CSS styling.

> **NoirMD** transforms Markdown into a typed AST and renders it as React elements — with support for admonitions, cards, modals, slides, and more.

---

## ✨ Features

- 📝 **Custom Parser** — Line-by-line state machine that produces a typed `Token[]` AST
- ⚛️ **React Renderer** — Drop-in `<NRpreviewer>` component for Markdown or raw HTML
- 🎨 **Editor** — CodeMirror 6 powered editor with live preview (`NReditor`)
- 📦 **Directive System** — 16 directive types mapped to 7 rich components (admonitions, cards, modals, etc.)
- 🎯 **Tailwind CSS** — Optional lazy CDN injection for directive styling
- 🔤 **Rich Inline Syntax** — Bold, italic, highlight, color, spoiler, underline, icons, and more
- 💻 **Syntax Highlighting** — Code blocks with highlight.js

---

## 📦 Installation

```bash
# Core previewer
npm install @noirmd/previewer react react-dom

# Editor (optional — for CodeMirror 6 editor with live preview)
npm install @noirmd/previewer @uiw/react-codemirror @codemirror/view @codemirror/state @codemirror/language @lezer/highlight
```

---

## 🚀 Quick Start

### Previewer

```tsx
import { NRpreviewer } from '@noirmd/previewer';
import '@noirmd/previewer/markdown.css';

function App() {
  return (
    <NRpreviewer
      content="# Hello **world**"
      tailwindCDN
    />
  );
}
```

### Editor

```tsx
import { useState } from 'react';
import NReditor from '@noirmd/previewer/editor';
import '@noirmd/previewer/markdown.css';

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

## 📖 Markdown Syntax

### Inline Syntax

| Syntax | Result |
|--------|--------|
| `**bold**` | **Bold** |
| `_italic_` | *Italic* |
| `***bold italic***` | ***Bold Italic*** |
| `~~strikethrough~~` | ~~Strikethrough~~ |
| `` `code` `` | `Code` |
| `==highlight==` | Highlighted |
| `!>spoiler<!` | Hidden text |
| `%red%text%%` | Colored text |
| `!~underline~!` | Underlined |
| `\|[[icon]]\|` | Material icon |
| `[text](url)` | Link |

### Block Syntax

- **Headers**: `# H1` through `###### H6`
- **Code blocks**: Triple backticks with optional language and title
- **Tables**: Pipe-delimited tables with alignment
- **Lists**: Ordered and unordered, with nesting
- **Blockquotes**: `>` prefixed quotes
- **HTML**: Raw HTML blocks supported

---

## 🧩 Directive System

Directives use the `:::type {props} ... :::` syntax:

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
```

Available types: `note`, `info`, `warning`, `danger`, `greentext`

### Cards

```markdown
:::card {title="Card Title" image="/img.png"}
Card content goes here.
:::
```

Variants: `card`, `card-m`, `card-b` — consecutive cards auto-batch into grids.

### Interactive Components

```markdown
:::details {title="Click to expand"}
Hidden content revealed on click.
:::

:::modal {title="Modal Title"}
Modal body content.
:::

:::button {label="Click Me" variant="primary"}
```

### Layout & Animation

```markdown
:::div .my-class #my-id
Custom wrapper with class and id.
:::

:::style
Custom styled container.
:::

:::slide
Animated slide content.
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

## 📁 Project Structure

```
NoirMD/
├── markdown-v2/          # Core library (@noirmd/previewer)
│   ├── parser.ts         # Line-by-line Markdown parser → Token[] AST
│   ├── renderers.tsx     # Inline rendering, tables, lists, header extraction
│   ├── CustomMarkdownRenderer.tsx  # Main orchestrator: parse → render → React
│   ├── DirectiveRenderer.tsx       # Routes directive tokens to components
│   ├── NRpreviewer.tsx   # Drop-in preview component
│   ├── NReditor.tsx      # CodeMirror 6 editor with live preview
│   ├── types.ts          # Token, RenderContext, DirectiveComponentProps
│   ├── directives/       # Directive components (7 implementations)
│   │   ├── AdmonitionDirective.tsx
│   │   ├── CardDirective.tsx
│   │   ├── DetailsDirective.tsx
│   │   ├── ModalDirective.tsx
│   │   ├── ButtonDirective.tsx
│   │   ├── SlideDirective.tsx
│   │   └── WrapperDirective.tsx
│   └── markdown.css      # Base styles
│
└── docs/                 # Documentation site (@noirmd/previewer-docs)
    ├── src/
    │   ├── App.tsx        # Main app with routing & theme
    │   ├── components/    # Landing, Playground, ExampleGallery, UsageDocs
    │   └── data/          # Example definitions
    └── guide-llm/         # Detailed feature documentation
```

---

## 🏗️ Architecture

```
Markdown string
    ↓
parseMarkdown()        → Token[] AST
    ↓
processAndRenderElements() → React tree
    ↓
Rendered UI
```

- **Parser** (`parser.ts`): State machine that tokenizes Markdown line-by-line into typed tokens
- **Renderer** (`CustomMarkdownRenderer.tsx`): Orchestrates the full parse → render pipeline
- **Directive Renderer** (`DirectiveRenderer.tsx`): Maps directive type strings to React components
- **Context** (`context.tsx`): React context for `RenderContext` (themes, slots, etc.)

---

## 🎨 Exports

```tsx
// Main component
export { NRpreviewer } from '@noirmd/previewer';

// Core renderer (advanced usage)
export { CustomMarkdownRenderer } from '@noirmd/previewer';

// Parser & utilities
export { parseMarkdown, extractHeaders, useDebounce } from '@noirmd/previewer';

// UI components (for custom directives)
export { IconRenderer, CodeBlock, Admonition, Details, Modal } from '@noirmd/previewer';

// Tailwind CDN helpers
export { useLazyTailwindCDN, scanTailwindCDN, preloadTailwindCDN } from '@noirmd/previewer';

// Editor (separate entry point)
import NReditor from '@noirmd/previewer/editor';
```

---

## 📜 License

MIT

---

## 🙏 Acknowledgments

Built with:
- [React](https://react.dev/) — UI framework
- [CodeMirror 6](https://codemirror.net/) — Editor engine
- [Tailwind CSS](https://tailwindcss.com/) — Styling (optional CDN)
- [highlight.js](https://highlightjs.org/) — Syntax highlighting
- [Vite](https://vitejs.dev/) — Build tool for docs
