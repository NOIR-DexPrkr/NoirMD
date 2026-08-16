# Setup — Vanilla JS

Use NoirMD in any project without a framework. Pure DOM rendering with zero dependencies (except highlight.js, bundled).

## Installation

```bash
npm install @noirmd/previewer
```

Or via CDN (no build step needed):

```html
<script type="module">
  import { renderMarkdownString } from 'https://esm.sh/@noirmd/previewer/vanilla';
</script>
```

## ⚠️ Required: Import `vanilla.css`

The vanilla renderer uses its own CSS (`vanilla.css`). **Without importing it, content will render but have no visual styling** — no heading sizes, no table borders, no code block backgrounds.

Import it once at the top of your entry point:

```ts
import '@noirmd/previewer/vanilla/vanilla.css';
```

This applies to **every** usage of `renderMarkdownString`.

> The vanilla CSS is self-contained — no Tailwind needed. It is modular under the hood:
> `variables.css` (design tokens), `base.css` (global/reusable styles) and one file
> per component (codeblock, admonition, card, modal, ...). Importing `vanilla.css`
> pulls in everything via `@import`. It uses CSS custom properties (`--nr-bg`,
> `--nr-text`, etc.) for theming, with `--color-*` host-variable fallbacks.

## Basic Usage

```ts
import { renderMarkdownString } from '@noirmd/previewer/vanilla';
import '@noirmd/previewer/vanilla/vanilla.css';

const markdown = `# Hello World

This is **NoirMD** with vanilla JS.

:::note {title="Tip"}
You can use custom directives!
:::`;

// Returns a DOM element
const element = renderMarkdownString(markdown);
document.getElementById('app')!.appendChild(element);
```

## API

### `renderMarkdownString(markdown: string): HTMLElement`

Parses markdown and returns a DOM element you can append anywhere.

```ts
import { renderMarkdownString } from '@noirmd/previewer/vanilla';

const el = renderMarkdownString('# Hello');
document.body.appendChild(el);
```

### `renderHtmlString(html: string): HTMLElement`

Renders a raw HTML string into a wrapper element. Extracts `<style>` blocks
(injected globally into `<head>`) and force-executes `<script>` tags:

```ts
import { renderHtmlString } from '@noirmd/previewer/vanilla';

const el = renderHtmlString('<div class="my-box"><script>console.log("hi")</script></div>');
document.body.appendChild(el);
```

### `parseMarkdown(markdown: string): Token[]`

Returns the raw AST tokens if you want to build custom renderers:

```ts
import { parseMarkdown } from '@noirmd/previewer/core';

const tokens = parseMarkdown('# Hello **World**');
console.log(tokens);
// [{ type: 'header', level: 1, content: 'Hello **World**', ... }]
```

## Custom Directives

Register your own directive types in the shared registry. The function receives
props and slot content and returns an `HTMLElement`:

```ts
import { directiveRegistry } from '@noirmd/previewer/vanilla';

directiveRegistry['mybox'] = ({ props, renderSlot }) => {
  const div = document.createElement('div');
  div.className = `my-box ${props.class || ''}`;
  div.appendChild(renderSlot('default'));
  return div;
};

// Usage: :::mybox {class="red"}
// Content here
// :::
```

Same registry is used by React and Vue wrappers — one implementation, any framework.

## Dynamic Updates

Re-render when content changes:

```ts
import { renderMarkdownString } from '@noirmd/previewer/vanilla';
import '@noirmd/previewer/vanilla/vanilla.css';

const container = document.getElementById('preview')!;
const textarea = document.getElementById('editor') as HTMLTextAreaElement;

textarea.addEventListener('input', () => {
  container.innerHTML = '';
  container.appendChild(renderMarkdownString(textarea.value));
});
```

## Styling

Vanilla renderer uses its own CSS (no Tailwind required):

```ts
import '@noirmd/previewer/vanilla/vanilla.css';
```

Custom theming via CSS variables:

```css
:root {
  --nr-bg: #ffffff;
  --nr-text: #1a1a2e;
  --nr-accent: #6366f1;
  --nr-border: #e2e8f0;
}
.dark {
  --nr-bg: #0f0f23;
  --nr-text: #e2e8f0;
  --nr-accent: #818cf8;
  --nr-border: #334155;
}
```

## HTML + Script Setup

Minimal HTML page:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>NoirMD Vanilla</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 800px; margin: 2rem auto; }
  </style>
</head>
<body>
  <div id="app"></div>
  <script type="module">
    import { renderMarkdownString } from '@noirmd/previewer/vanilla';
    import '@noirmd/previewer/vanilla/vanilla.css';

    const md = `# Hello **NoirMD**
    :::note {title="It works!"}
    Vanilla JS rendering with directives.
    :::`;

    document.getElementById('app').appendChild(renderMarkdownString(md));
  </script>
</body>
</html>
```

## Framework Integration

Since vanilla renderer is pure DOM, it works anywhere:

- **Svelte** — use in `onMount` or `$effect`
- **Angular** — use in `ngAfterViewInit`
- **Lit / Web Components** — use in `connectedCallback`
- **WordPress** — enqueue as a script module
- **Static sites** — no build step required with esm.sh
