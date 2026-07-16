# @noirmd/previewer — Framework-Agnostic Markdown Renderer

A framework-agnostic markdown parser with an optional React renderer, featuring custom directives, cards, modals, and Tailwind styling. Usable from React, Vue, Svelte, vanilla JS, or any framework.

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

- **Core** (`core/`): Parser, token types, utilities — ZERO framework dependency
- **React** (`react/`): React components, directives, hooks, UI
- **Vanilla** (`vanilla/`): Pure DOM rendering + CSS, ZERO framework dependency
- **Vue** (`vue/`): Vue 3 components, composables, directives — requires Vue ≥3
- **Entry points**: `@noirmd/previewer/core`, `@noirmd/previewer/react`, `@noirmd/previewer/vanilla`, `@noirmd/previewer/vue`, `@noirmd/previewer` (backward compat)

## Package Entry Points

| Import path | Description | Dependencies |
|-------------|-------------|--------------|
| `@noirmd/previewer/core` | Parser, types, utilities | None |
| `@noirmd/previewer/react` | React components + renderer | React ≥18 |
| `@noirmd/previewer/vanilla` | Vanilla DOM renderer + CSS | None (highlight.js bundled) |
| `@noirmd/previewer/vue` | Vue 3 components + composables | Vue ≥3 |
| `@noirmd/previewer` | Backward-compatible (core + react) | React ≥18 |
| `@noirmd/previewer/editor` | CodeMirror 6 editor | React + CodeMirror |

## Directory Structure

```
markdown-v2/
├── core/                    # Framework-agnostic core
│   ├── types.ts             # Token types, CSSProperties
│   ├── parser.ts            # Line-by-line state machine parser
│   ├── utils.ts             # parseCssString, generateId, etc.
│   └── index.ts             # Barrel export
├── react/                   # React bindings
│   ├── types.ts             # RenderContext, DirectiveComponentProps
│   ├── context.tsx          # React context for RenderContext
│   ├── CustomMarkdownRenderer.tsx  # Main orchestrator
│   ├── NRpreviewer.tsx      # Drop-in preview component
│   ├── DirectiveRenderer.tsx # Routes directive tokens to components
│   ├── RawHtmlRenderer.tsx  # Raw HTML + script execution
│   ├── renderers.tsx        # Inline, table, list rendering
│   ├── ui-components.tsx    # Admonition, Details, Modal, etc.
│   ├── useTailwindCDN.ts    # Lazy Tailwind v4 CDN injection
│   ├── directives/          # All directive implementations
│   └── index.ts             # Barrel export
├── vanilla/                 # Vanilla DOM renderer (no React)
│   ├── components.ts        # Factory: icon, codeblock, admonition, details, modal, table, list, toc
│   ├── inline.ts            # renderInline → DocumentFragment
│   ├── renderer.ts          # renderTokens/renderMarkdownString → HTMLElement
│   ├── directives/          # Directive renderers (admonition, card, details, modal, button, wrapper, slide)
│   ├── vanilla.css          # Pure CSS with variables (no Tailwind)
│   └── index.ts             # Barrel export
├── vue/                     # Vue 3 bindings (render functions, no SFC)
│   ├── types.ts             # RenderContext, DirectiveComponentProps
│   ├── context.ts           # provide/inject for RenderContext
│   ├── CustomMarkdownRenderer.ts  # Main orchestrator
│   ├── NRpreviewer.ts       # Drop-in preview component
│   ├── DirectiveRenderer.ts  # Routes directive tokens to components
│   ├── RawHtmlRenderer.ts   # Raw HTML + script execution
│   ├── renderers.ts         # Inline, table, list rendering (h() based)
│   ├── ui-components.ts     # Admonition, Details, Modal, etc.
│   ├── useTailwindCDN.ts    # Composable for lazy Tailwind CDN injection
│   ├── highlightSetup.ts    # highlight.js language registration
│   ├── directives/          # All directive implementations
│   └── index.ts             # Barrel export
├── core.ts                  # @noirmd/previewer/core entry
├── react.ts                 # @noirmd/previewer/react entry
├── vanilla.ts               # @noirmd/previewer/vanilla entry
├── vue.ts                   # @noirmd/previewer/vue entry
├── index.ts                 # @noirmd/previewer backward-compat entry
└── tsup.config.ts           # Build config (6 entry points)
```

## Directive System

16 directive strings map to 7 component implementations:

- **Admonitions**: `note`, `info`, `warning`, `danger`, `greentext` → `AdmonitionDirective`
- **Cards**: `card`, `card-m`, `card-b` → `CardDirective` (auto-batch consecutive cards)
- **Interactive**: `details`, `modal`, `button` → dedicated components
- **Layout**: `div`, `style`, `custom`, `raw` → `WrapperDirective`
- **Animation**: `slide` → `SlideDirective`

### Slot System

Directives use `#slotname` markers to split content into named regions:
- Only recognized at nesting depth 0 (not inside nested directives)
- Content before first slot → `default` slot
- `renderSlot(name)` parses slot content recursively as markdown

### Props

- Shorthands: `.className` → `{ class: "..." }`, `#my-id` → `{ id: "..." }`
- Short-form: `:::note Title` → `{ title: "Title" }`
- Override pattern: user `class` appended after defaults (last wins)

## Custom Syntax

| Syntax | Meaning |
|--------|---------|
| `-> text <-` / `-> text ->` | Centered / right-aligned paragraph |
| `![alt](src#left\|right\|center){w:h}` | Image with float positioning |
| `!~color;style;text~!` | Underline with params |
| `%color%text%%` | Colored text |
| `!>text<!` | Spoiler (hover to reveal) |
| `==text==` | Highlight |
| `\|\|[[icon-name]]\|\|` | Icon renderer |
| `[TOC]` / `[TOC2]` | Table of contents |

## Styling

- **Tailwind v4 CDN**: Injected lazily at runtime, ref-counted, preflight disabled
- **CSS Variables**: `--color-background-primary`, `--color-text-primary`, `--color-accent-primary`, etc.
- **Markdown CSS** (`markdown.css`): Responsive heading/paragraph styles via `@apply`
- All Tailwind classes resolve without safelist (CDN JIT)

## Gotchas

- Unclosed directives (`:::type` without `:::`) render as plain text paragraphs
- `<style>` blocks inject globally into `<head>` — no scoped styles
- Directives have their own padding/borders/rounded — avoid nesting inside flex/grid containers
- Consecutive `card`/`card-m`/`card-b` auto-batch into flex-wrap; use `batch="off"` to disable
- Button/Modal have smart class detection that omits defaults when user classes conflict
- `scanTailwindCDN()` must be called after DOM mutations with new Tailwind classes

## Documentation

The `guide-llm/` directory contains detailed reference docs:
- `parser.md` — Parser detection order, AST structure
- `inline-syntax.md` — All inline formatting rules
- `block-syntax.md` — Block-level elements
- `directives-general.md` — Directive system overview
- `directive-*.md` — Per-directive guides
- `styling-system.md` — Tailwind, CSS variables, overrides
- `best-practices.md` — Rules and restrictions
