# Setup — Vue 3

Use NoirMD in a Vue 3 project (Vite, Nuxt, Vue CLI, etc.).

## Installation

```bash
npm install @noirmd/previewer vue
```

## ⚠️ Required: Import `markdown.css`

NoirMD renders markdown into HTML with classes like `md-h1`, `md-p`, `md-table`, etc. **Without importing the CSS, content will render but have no visual styling** — no heading sizes, no table borders, no code block backgrounds.

Import it **once** globally in your `main.ts`:

```ts
import '@noirmd/previewer/markdown.css';
```

Or directly in your component:

```vue
<script setup>
import '@noirmd/previewer/markdown.css';
</script>
```

This applies to **every** usage: `NRpreviewer`, custom renderers, etc.

> If you're using Tailwind CSS, `markdown.css` works alongside it — NoirMD's styles use their own class names (`md-h1`, `nr-prose`) that don't conflict.

## Basic Usage

```vue
<script setup>
import { NRpreviewer } from '@noirmd/previewer/vue';
import '@noirmd/previewer/markdown.css';

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
| `tailwindCDN` | `boolean` | `false` | Inject Tailwind CSS v4 CDN |
| `className` | `string` | `''` | Additional CSS class |

## Dynamic Content

Use `ref` or `computed` for reactive markdown:

```vue
<script setup>
import { ref, computed } from 'vue';
import { NRpreviewer } from '@noirmd/previewer/vue';
import '@noirmd/previewer/markdown.css';

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
import '@noirmd/previewer/markdown.css';
</script>
```

Or in your `main.ts`:

```ts
import '@noirmd/previewer/markdown.css';
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
import '@noirmd/previewer/markdown.css';
</script>

<template>
  <NRpreviewer :content="markdown" :tailwindCDN="true" />
</template>
```

## TypeScript

Full type definitions included:

```ts
import type { Token } from '@noirmd/previewer/core';
```
