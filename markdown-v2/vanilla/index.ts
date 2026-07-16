// ============================================================
// @noirmd/previewer/vanilla — Vanilla DOM renderer
//
// Framework-agnostic rendering using pure DOM APIs + CSS.
// No React, no Tailwind, no framework dependency.
// ============================================================

// ── Renderer ──
export { renderTokens, renderMarkdownString } from './renderer';

// ── Inline renderer ──
export { renderInline } from './inline';

// ── Component factories ──
export {
  createIcon,
  createCodeBlock,
  createAdmonition,
  createDetails,
  createModal,
  createTable,
  createList,
  createTOC,
  createBlockquote,
} from './components';

// ── Directive registry ──
export { default as directiveRegistry } from './directives';
export type { DirectiveRendererFn, DirectiveProps, VanillaRenderContext } from './directives';
