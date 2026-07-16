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

The vanilla renderer uses its own CSS file (`vanilla.css`, not `markdown.css`). **Without importing it, content will render but have no visual styling** — no heading sizes, no table borders, no code block backgrounds.

Import it once at the top of your entry point:

```ts
import '@noirmd/previewer/vanilla/vanilla.css';
```

This applies to **every** usage of `renderMarkdownString`.

> The vanilla CSS is self-contained — no Tailwind needed. It uses CSS custom properties (`--nr-bg`, `--nr-text`, etc.) for theming.

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

### `parseMarkdown(markdown: string): Token[]`

Returns the raw AST tokens if you want to build custom renderers:

```ts
import { parseMarkdown } from '@noirmd/previewer/core';

const tokens = parseMarkdown('# Hello **World**');
console.log(tokens);
// [{ type: 'header', level: 1, content: 'Hello **World**', ... }]
```

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
