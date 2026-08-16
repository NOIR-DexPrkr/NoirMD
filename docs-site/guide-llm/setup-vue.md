# Setup — Vue 3

Use NoirMD in a Vue 3 project (Vite, Nuxt, Vue CLI, etc.).

> **Architecture**: Vue bindings are thin mount-point wrappers. All rendering,
> directives and events live in the framework-agnostic vanilla engine
> (`@noirmd/previewer/vanilla`). Rendering happens on the client; the server
> render is an empty placeholder that fills on mount.

## Installation

```bash
npm install @noirmd/previewer vue
```

## ⚠️ Required: Import the CSS

NoirMD renders markdown into HTML with `nr-*` classes (`.nr-prose`, `.md-h1`,
`.nr-card`, ...). **Without importing the CSS, content will render but have no
visual styling** — no heading sizes, no table borders, no code block backgrounds.

Import it **once** globally in your `main.ts`:

```ts
import '@noirmd/previewer/vanilla/vanilla.css';
```

Or directly in your component:

```vue
<script setup>
import '@noirmd/previewer/vanilla/vanilla.css';
</script>
```

This applies to **every** usage: `NRpreviewer`, custom renderers, etc.

> The CSS is modular: `variables.css` (design tokens), `base.css` (global/reusable
> styles) and one file per component. Importing `vanilla.css` pulls in everything.
> If you use Tailwind CSS, it works alongside — NoirMD's styles use their own
> class names that don't conflict. The `tailwindCDN` prop is only needed for
> Tailwind classes authored inside markdown content.

## Basic Usage

```vue
<script setup>
import { NRpreviewer } from '@noirmd/previewer/vue';
import '@noirmd/previewer/vanilla/vanilla.css';

const markdown = `# Hello World

This is **NoirMD** with Vue.

:::note {title="Tip"}
You can use custom directives!
:::`;
</script>

<template>
  <NRpreviewer :content="markdown" :tailwindCDN="true" />
</template>
```

## NRpreviewer Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `content` | `string` | — | Markdown string to render |
| `html` | `string` | — | Raw HTML string to render (when `content` is not provided) |
| `tailwindCDN` | `boolean` | `false` | Inject Tailwind CSS v4 CDN (for user-authored Tailwind classes) |
| `className` | `string` | `''` | Additional CSS class |
| `style` | `Record<string, string>` | — | Inline styles |

## Dynamic Content

Use `ref` or `computed` for reactive markdown:

```vue
<script setup>
import { ref } from 'vue';
import { NRpreviewer } from '@noirmd/previewer/vue';
import '@noirmd/previewer/vanilla/vanilla.css';

const input = ref('# Edit me');
</script>

<template>
  <textarea v-model="input" />
  <NRpreviewer :content="input" :tailwindCDN="true" />
</template>
```

## Styling

Import the CSS file globally or in your component:

```vue
<script setup>
import '@noirmd/previewer/vanilla/vanilla.css';
</script>
```

Or in your `main.ts`:

```ts
import '@noirmd/previewer/vanilla/vanilla.css';
```

Custom themes via CSS variables:

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

## Nuxt 3

Works with Nuxt 3 out of the box. Import in your component:

```vue
<script setup>
import { NRpreviewer } from '@noirmd/previewer/vue';
import '@noirmd/previewer/vanilla/vanilla.css';
</script>

<template>
  <NRpreviewer :content="markdown" :tailwindCDN="true" />
</template>
```

## TypeScript

Full type definitions included:

```ts
import type { Token } from '@noirmd/previewer/core';
import type { DirectiveProps, DirectiveRendererFn, VanillaRenderContext } from '@noirmd/previewer/vue';
```
