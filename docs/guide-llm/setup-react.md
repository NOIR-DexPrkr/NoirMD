# Setup — React

Use NoirMD in a React project (Next.js, Vite, CRA, etc.).

## Installation

```bash
npm install @noirmd/previewer react react-dom
```

For the editor (optional):

```bash
npm install @uiw/react-codemirror @codemirror/view @codemirror/state @codemirror/language @lezer/highlight
```

## ⚠️ Required: Import `markdown.css`

NoirMD renders markdown into HTML with classes like `md-h1`, `md-p`, `md-table`, etc. **Without importing the CSS, content will render but have no visual styling** — no heading sizes, no table borders, no code block backgrounds.

Import it **once** at the top level of your app (global CSS file, or your root component):

```tsx
import '@noirmd/previewer/markdown.css';
```

This applies to **every** usage: `NRpreviewer`, `NReditor`, custom renderers, etc.

> If you're using Tailwind CSS, `markdown.css` works alongside it — NoirMD's styles use their own class names (`md-h1`, `nr-prose`) that don't conflict.

## Basic Usage

```tsx
import { NRpreviewer } from '@noirmd/previewer/react';
import '@noirmd/previewer/markdown.css';

function App() {
  const markdown = `# Hello World

This is **NoirMD** with React.

:::note {title="Tip"}
You can use custom directives!
:::`;

  return <NRpreviewer content={markdown} tailwindCDN />;
}
```

## NRpreviewer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — | Markdown string to render |
| `html` | `string` | — | Pre-rendered HTML (skip parsing) |
| `tailwindCDN` | `boolean` | `false` | Inject Tailwind CSS v4 CDN |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | — | Inline styles |

## Editor Component

```tsx
import NReditor from '@noirmd/previewer/editor';

function Editor() {
  const [value, setValue] = useState('# Hello');

  return (
    <NReditor
      value={value}
      onChange={setValue}
      tailwindCDN
    />
  );
}
```

### NReditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Markdown content |
| `onChange` | `(value: string) => void` | — | Change handler |
| `debounceMs` | `number` | `150` | Debounce for preview updates |
| `tailwindCDN` | `boolean` | `false` | Inject Tailwind CSS v4 CDN |
| `className` | `string` | `''` | Additional CSS class |

## TypeScript

Full type definitions are included. Import types as needed:

```tsx
import type { Token } from '@noirmd/previewer/core';
import type { RenderContext, DirectiveComponentProps } from '@noirmd/previewer/react';
```

## Next.js Notes

NoirMD works with both App Router and Pages Router. Use `"use client"` directive for components that use hooks:

```tsx
'use client';
import { NRpreviewer } from '@noirmd/previewer/react';
import '@noirmd/previewer/markdown.css';

export default function DocPage({ content }: { content: string }) {
  return <NRpreviewer content={content} tailwindCDN />;
}
```

## Styling

NoirMD provides its own CSS. Import the stylesheet:

```tsx
import '@noirmd/previewer/markdown.css';
```

With `tailwindCDN`, Tailwind CSS v4 is injected automatically via CDN. For custom themes, use CSS variables:

```css
:root {
  --color-background-primary: #ffffff;
  --color-text-primary: #1a1a2e;
  --color-accent-primary: #6366f1;
}
.dark {
  --color-background-primary: #0f0f23;
  --color-text-primary: #e2e8f0;
  --color-accent-primary: #818cf8;
}
```
