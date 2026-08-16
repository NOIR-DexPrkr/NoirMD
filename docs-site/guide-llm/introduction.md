# Introduction

NoirMD is a **framework-agnostic** markdown renderer with custom directives and syntax highlighting. It uses **one vanilla DOM rendering engine** with thin React/Vue wrappers, and pure CSS styling (no framework, no Tailwind dependency).

## What is NoirMD?

NoirMD provides a complete markdown rendering pipeline:

- **Parser** — Line-by-line state machine that produces a typed AST
- **Vanilla engine** — A single DOM renderer (`renderMarkdownString` → `HTMLElement`) that handles all tokens, directives and events
- **Directives** — 16 custom directive types for rich content (admonitions, cards, modals, etc.)
- **Wrappers** — Thin React/Vue components that mount the vanilla output
- **Styling** — Modular pure CSS (`vanilla.css` + partials) with `--color-*` theme support; optional Tailwind CDN for user-authored classes
- **Editor** — Optional CodeMirror 6 based markdown editor with live preview

## Why NoirMD?

| Feature | NoirMD | Other renderers |
|---------|--------|-----------------|
| Framework agnostic | ✅ One engine for React, Vue, Vanilla | Usually React-only |
| Custom directives | ✅ 16 types, DOM API | Limited or none |
| CSS | ✅ Pure CSS, modular, themeable | Framework-coupled |
| Syntax highlighting | ✅ Highlight.js built-in | External plugin |
| Zero config | ✅ Works out of the box | Configuration needed |

## Package Entry Points

| Import path | Description | Dependencies |
|-------------|-------------|--------------|
| `@noirmd/previewer/core` | Parser, types, utilities | None |
| `@noirmd/previewer/vanilla` | Vanilla DOM renderer — the single rendering engine | None (highlight.js bundled) |
| `@noirmd/previewer/react` | Thin React mount-point wrapper | React ≥18 |
| `@noirmd/previewer/vue` | Thin Vue mount-point wrapper | Vue ≥3 |
| `@noirmd/previewer` | Backward-compatible (core + react) | React ≥18 |
| `@noirmd/previewer/editor` | CodeMirror 6 editor | React + CodeMirror |

## Architecture

```
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

The **core** parser is shared everywhere. The **vanilla engine** renders the AST
into a real `HTMLElement` (directives, modals, details, copy buttons — all native
DOM events). React/Vue wrappers are thin mount-points that append that element and
re-render when content changes. Switch frameworks without changing your markdown
or your custom directives.

## ⚠️ Required: Import the CSS

**Every framework requires importing the same CSS file for NoirMD to display correctly.** Without it, markdown renders as unstyled HTML (no heading sizes, no table borders, no code block backgrounds).

| Framework | CSS Import |
|-----------|-----------|
| React / Next.js | `import '@noirmd/previewer/vanilla/vanilla.css';` |
| Vue / Nuxt | `import '@noirmd/previewer/vanilla/vanilla.css';` |
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
