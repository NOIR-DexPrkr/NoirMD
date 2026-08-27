# @noirmd/previewer — Framework-Agnostic Markdown Renderer

A framework-agnostic markdown renderer with **one vanilla DOM engine** and thin React/Vue mount-point wrappers. Features custom directives, cards, modals, and pure modular CSS. Usable from React, Vue, Svelte, vanilla JS, or any framework.

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

- **Core** (`core/`): Parser, token types, utilities — ZERO framework dependency
- **Vanilla** (`vanilla/`): THE rendering engine — pure DOM rendering + modular CSS. Handles all tokens, directives, events (dialog, details, copy, slide) and TOC. ZERO framework dependency
- **React** (`react/`): thin mount-point wrapper (`useEffect` + `appendChild(renderMarkdownString())`), plus Tailwind CDN helpers and the CodeMirror editor (`NReditor.tsx`)
- **Vue** (`vue/`): thin mount-point wrapper (`onMounted` + `watch` + `appendChild`)
- **Entry points**: `@noirmd/previewer/core`, `@noirmd/previewer/react`, `@noirmd/previewer/vanilla`, `@noirmd/previewer/vue`, `@noirmd/previewer` (backward compat)

## Package Entry Points

| Import path | Description | Dependencies |
|-------------|-------------|--------------|
| `@noirmd/previewer/core` | Parser, types, utilities | None |
| `@noirmd/previewer/vanilla` | Vanilla DOM renderer — the single rendering engine | None (highlight.js bundled) |
| `@noirmd/previewer/react` | Thin React mount-point wrapper | React ≥18 |
| `@noirmd/previewer/vue` | Thin Vue mount-point wrapper | Vue ≥3 |
| `@noirmd/previewer` | Backward-compatible (core + react) | React ≥18 |
| `@noirmd/previewer/editor` | CodeMirror 6 editor | React + CodeMirror |
| `@noirmd/previewer/editor.css` | Self-contained editor styles (toolbar, layout) | — |
| `@noirmd/previewer/vanilla/vanilla.css` | Full CSS entry (`@import`s all partials) | — |

## Directory Structure

```
markdown-v2/
├── core/                    # Framework-agnostic core
│   ├── types.ts             # Token types, CSSProperties
│   ├── parser.ts            # Line-by-line state machine parser
│   ├── utils.ts             # parseCssString, generateId, etc.
│   └── index.ts             # Barrel export
├── react/                   # React bindings (thin wrappers)
│   ├── CustomMarkdownRenderer.tsx  # Mount-point for vanilla renderer
│   ├── NRpreviewer.tsx      # Drop-in preview component
│   ├── RawHtmlRenderer.tsx  # Mount-point for raw HTML rendering
│   ├── useTailwindCDN.ts    # Lazy Tailwind v4 CDN injection (opt-in)
│   ├── useDebounce.ts       # Debounce hook (editor)
│   ├── NReditor.tsx         # CodeMirror 6 editor (React-only)
│   ├── custom-syntax.ts     # Editor language support
│   ├── highlightSetup.ts    # highlight.js registration (editor)
│   └── index.ts             # Barrel export
├── vanilla/                 # THE rendering engine (no React)
│   ├── components.ts        # Factory: icon, codeblock, admonition, details, modal, table, list, toc
│   ├── inline.ts            # renderInline → DocumentFragment
│   ├── renderer.ts          # renderTokens/renderMarkdownString/renderHtmlString → HTMLElement
│   ├── directives/          # Directive renderers (admonition, card, details, modal, button, wrapper, slide)
│   ├── vanilla.css          # CSS entry — only @imports the partials below
│   ├── variables.css        # Design tokens (--nr-* with --color-* fallbacks)
│   ├── base.css             # Global/reusable: typography, inline elements, hljs theme
│   ├── codeblock.css        # One file per component (admonition, card, modal, ...)
│   ├── admonition.css
│   ├── details.css
│   ├── modal.css
│   ├── card.css
│   ├── button.css
│   ├── table.css
│   ├── list.css
│   ├── blockquote.css
│   ├── toc.css
│   ├── slide.css
│   └── index.ts             # Barrel export
├── vue/                     # Vue 3 bindings (thin mount-point wrappers, no SFC)
│   ├── CustomMarkdownRenderer.ts  # Mount-point for vanilla renderer
│   ├── NRpreviewer.ts       # Drop-in preview component
│   ├── RawHtmlRenderer.ts   # Mount-point for raw HTML rendering
│   ├── useTailwindCDN.ts    # Composable for lazy Tailwind CDN injection (opt-in)
│   ├── highlightSetup.ts    # highlight.js language registration
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
| `\|[[icon-name]]\|` | Icon renderer (also hex codepoints: `\|[[f004]]\|`) |
| `[TOC]` / `[TOC2]` | Table of contents |

## Styling

- **Modular CSS**: `vanilla.css` is the single import — it `@import`s `variables.css`
  (design tokens), `base.css` (global/reusable styles) and one file per component
- **CSS Variables**: `--nr-*` tokens with `--color-*` host fallbacks
  (`--color-background-primary`, `--color-text-primary`, `--color-accent-primary`, ...)
- **Tailwind v4 CDN**: Optional, injected lazily via `tailwindCDN` prop (ref-counted,
  preflight disabled) — only needed for Tailwind classes authored inside markdown
- **Editor CSS** (`editor.css`): Self-contained editor toolbar/layout, pure CSS with
  `var(--color-*, fallback)` so the host theme wins when defined

## Gotchas

- Unclosed directives (`:::type` without `:::`) render as plain text paragraphs
- `<style>` blocks inject globally into `<head>` — no scoped styles
- Directives have their own padding/borders/rounded — avoid nesting inside flex/grid containers
- Consecutive `card`/`card-m`/`card-b` auto-batch into flex-wrap; use `batch="off"` to disable
- Button/Modal have smart class detection that omits defaults when user classes conflict
- `scanTailwindCDN()` must be called after DOM mutations with new Tailwind classes
- React/Vue wrappers render on the client only (useEffect/onMounted) — server render is an empty placeholder
- Custom directives are framework-agnostic: register DOM functions in the shared vanilla `directiveRegistry`

## Documentation

The `guide-llm/` directory contains detailed reference docs:
- `parser.md` — Parser detection order, AST structure
- `inline-syntax.md` — All inline formatting rules
- `block-syntax.md` — Block-level elements
- `directives-general.md` — Directive system overview
- `directive-*.md` — Per-directive guides
- `styling-system.md` — Tailwind, CSS variables, overrides
- `best-practices.md` — Rules and restrictions
