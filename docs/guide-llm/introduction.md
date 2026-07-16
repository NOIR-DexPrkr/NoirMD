# Introduction

NoirMD is a **framework-agnostic** markdown renderer with custom directives, syntax highlighting, and Tailwind CSS styling. Use it in React, Vue, Vanilla JS, or any framework — the same core parser, different renderers.

## What is NoirMD?

NoirMD provides a complete markdown rendering pipeline:

- **Parser** — Line-by-line state machine that produces a typed AST
- **Renderers** — Framework-specific UI components (React, Vue, Vanilla)
- **Directives** — 16 custom directive types for rich content (admonitions, cards, modals, etc.)
- **Styling** — Built-in Tailwind CSS v4 CDN injection with light/dark theme support
- **Editor** — Optional CodeMirror 6 based markdown editor with live preview

## Why NoirMD?

| Feature | NoirMD | Other renderers |
|---------|--------|-----------------|
| Framework agnostic | ✅ React, Vue, Vanilla | Usually React-only |
| Custom directives | ✅ 16 types | Limited or none |
| Tailwind CDN | ✅ JIT compilation | Manual setup |
| Syntax highlighting | ✅ Highlight.js built-in | External plugin |
| Zero config | ✅ Works out of the box | Configuration needed |

## Package Entry Points

| Import path | Description | Dependencies |
|-------------|-------------|--------------|
| `@noirmd/previewer/core` | Parser, types, utilities | None |
| `@noirmd/previewer/react` | React components + renderer | React ≥18 |
| `@noirmd/previewer/vanilla` | Vanilla DOM renderer + CSS | None |
| `@noirmd/previewer/vue` | Vue 3 components + composables | Vue ≥3 |
| `@noirmd/previewer` | Backward-compatible (core + react) | React ≥18 |
| `@noirmd/previewer/editor` | CodeMirror 6 editor | React + CodeMirror |

## Architecture

```
                    ┌─────────────────────────────┐
                    │  core/ (framework-agnostic)  │
                    │  parseMarkdown() → Token[]   │
                    └──────────────┬──────────────┘
                                   │
                ┌──────────────────┼──────────────────┐
                │                  │                  │
          ┌─────▼─────┐    ┌──────▼──────┐    ┌─────▼─────┐
          │  react/    │    │  vanilla/   │    │   vue/    │
          │  React UI  │    │  Pure DOM   │    │  Vue 3    │
          └────────────┘    └─────────────┘    └───────────┘
```

The **core** parser is shared across all frameworks. Each renderer consumes the same AST but renders using its own framework's component model. This means you can switch frameworks without changing your markdown content.

## ⚠️ Required: Import the CSS

**Every framework requires importing a CSS file for NoirMD to display correctly.** Without it, markdown renders as unstyled HTML (no heading sizes, no table borders, no code block backgrounds).

| Framework | CSS Import |
|-----------|-----------|
| React / Next.js | `import '@noirmd/previewer/markdown.css';` |
| Vue / Nuxt | `import '@noirmd/previewer/markdown.css';` |
| Vanilla JS | `import '@noirmd/previewer/vanilla/vanilla.css';` |

Import it **once** in your root component or global CSS file. See the setup guide for your framework for details.

## Quick Example

````markdown
:::note {title="Hello"}
This is a **custom directive** rendered by NoirMD.
:::
```

```javascript
const greeting = "Hello, NoirMD!";

````

This renders as a styled admonition with syntax-highlighted code in any of the three frameworks.

## Next Steps

- **[Setup React](/docs/setup-react)** — For React projects
- **[Setup Vue](/docs/setup-vue)** — For Vue 3 projects
- **[Setup Vanilla](/docs/setup-vanilla)** — For vanilla JS / any framework
- **[Parser](/docs/parser)** — Understand how markdown is parsed
- **[Playground](/playground)** — Try it live in your browser
