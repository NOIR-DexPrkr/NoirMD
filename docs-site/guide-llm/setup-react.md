# Setup — React

Use NoirMD in a React project (Next.js, Vite, CRA, etc.).

> **Architecture**: React bindings are thin mount-point wrappers. All rendering,
> directives and events live in the framework-agnostic vanilla engine
> (`@noirmd/previewer/vanilla`). Rendering happens on the client; the server
> render is an empty placeholder that fills on mount.

## Installation

```bash
npm install @noirmd/previewer react react-dom
```

For the editor (optional):

```bash
npm install @uiw/react-codemirror @codemirror/view @codemirror/state @codemirror/language @lezer/highlight
```

## ⚠️ Required: Import the CSS

NoirMD renders markdown into HTML with `nr-*` classes (`.nr-prose`, `.md-h1`,
`.nr-card`, ...). **Without importing the CSS, content will render but have no
visual styling** — no heading sizes, no table borders, no code block backgrounds.

Import it **once** at the top level of your app (global CSS file, or your root component):

```tsx
import '@noirmd/previewer/vanilla/vanilla.css';
```

This applies to **every** usage: `NRpreviewer`, `NReditor`, custom renderers, etc.

> The CSS is modular: `variables.css` (design tokens), `base.css` (global/reusable
> styles) and one file per component. Importing `vanilla.css` pulls in everything.
> If you use Tailwind CSS, it works alongside — NoirMD's styles use their own
> class names that don't conflict. The `tailwindCDN` prop is only needed for
> Tailwind classes authored inside markdown content.

## Basic Usage

```tsx
import { NRpreviewer } from '@noirmd/previewer/react';
import '@noirmd/previewer/vanilla/vanilla.css';

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
| `html` | `string` | — | Raw HTML string to render (when `content` is not provided) |
| `tailwindCDN` | `boolean` | `false` | Inject Tailwind CSS v4 CDN (for user-authored Tailwind classes) |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `CSSProperties` | — | Inline styles |

## Editor Component

```tsx
import NReditor from '@noirmd/previewer/editor';
import '@noirmd/previewer/editor.css';

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

The editor is self-contained: `@noirmd/previewer/editor.css` provides toolbar, mode
switcher (Editor / Split / Preview), and layout styles with CSS-variable fallbacks,
so it looks the same in any host — even without Tailwind.

### NReditor Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Markdown content |
| `onChange` | `(value: string) => void` | — | Change handler |
| `debounceMs` | `number` | `300` | Debounce for preview updates |
| `tailwindCDN` | `boolean` | `false` | Inject Tailwind CSS v4 CDN |
| `className` | `string` | `''` | Additional CSS class |
| `onGuide` | `() => void` | — | Show "Guía" button (syntax guide) |
| `onConfig` | `() => void` | — | Show "Configurar" button (theme/metadata) |

## TypeScript

Full type definitions are included. Import types as needed:

```tsx
import type { Token } from '@noirmd/previewer/core';
import type { DirectiveProps, DirectiveRendererFn, VanillaRenderContext } from '@noirmd/previewer/react';
```

## Custom Directives

Directives are framework-agnostic: register a function that receives props and
returns an `HTMLElement`. Works identically in React, Vue and vanilla:

```ts
import { directiveRegistry } from '@noirmd/previewer/vanilla';

directiveRegistry['mybox'] = ({ props, renderSlot }) => {
  const div = document.createElement('div');
  div.className = `my-box ${props.class || ''}`;
  div.appendChild(renderSlot('default'));
  return div;
};
```

## Next.js Notes

NoirMD works with both App Router and Pages Router. Use `"use client"` directive for components that use hooks:

```tsx
'use client';
import { NRpreviewer } from '@noirmd/previewer/react';
import '@noirmd/previewer/vanilla/vanilla.css';

export default function DocPage({ content }: { content: string }) {
  return <NRpreviewer content={content} tailwindCDN />;
}
```

## Styling

NoirMD provides its own CSS. Import the stylesheet:

```tsx
import '@noirmd/previewer/vanilla/vanilla.css';
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
