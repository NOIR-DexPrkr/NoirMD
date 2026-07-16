# CNR-Paste V2 Markdown Renderer

React component library that parses markdown into a typed AST and renders it as React elements. Used as a drop-in markdown preview for CNR-Paste.

## Architecture

```
string → parseMarkdown() → Token[] → processAndRenderElements() → React tree
```

- **Parser**: Line-by-line state machine (`parser.ts`), produces typed `Token[]` AST
- **Renderer**: `CustomMarkdownRenderer.tsx` orchestrates the full pipeline
- **Directives**: Custom `:::type {props} ... :::` syntax for interactive components
- **Inline syntax**: Bold, italic, highlight, color, spoiler, underline, icons, links

## Key Files

| File | Purpose |
|------|---------|
| `parser.ts` | Line-by-line parser → Token[] AST |
| `renderers.tsx` | Inline rendering, table, list, header extraction |
| `CustomMarkdownRenderer.tsx` | Main orchestrator: parse → render → React |
| `DirectiveRenderer.tsx` | Routes directive tokens to components |
| `directives/index.ts` | Directive registry (16 strings → 7 components) |
| `types.ts` | Token, RenderContext, DirectiveComponentProps interfaces |
| `context.tsx` | React context for RenderContext |
| `useTailwindCDN.ts` | Lazy Tailwind v4 CDN injection (ref-counted) |
| `guide-llm/` | Detailed docs for each feature area |

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
| `||[[icon-name]]||` | Icon renderer |
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
