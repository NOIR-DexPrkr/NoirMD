// ============================================================
// @noirmd/previewer — Backward-compatible barrel export
//
// Re-exports everything from core + react so existing users
// who import from '@noirmd/previewer' continue to work.
//
// For framework-agnostic usage:
//   import { renderMarkdownString } from '@noirmd/previewer/vanilla';
//   import '@noirmd/previewer/vanilla/vanilla.css';
//
// For React usage:
//   import { NRpreviewer } from '@noirmd/previewer/react';
// ============================================================

// ── Core (framework-agnostic) ──
export {
  parseMarkdown,
  parseCssString,
  generateId,
  generateScopeId,
  resetScopeCounter,
  scrollToId,
  extractAttributes,
  parseProps,
  parseHtmlAttrs,
} from './core/index';

export type {
  Token,
  CSSProperties,
  HeaderToken,
  ParagraphToken,
  CodeblockToken,
  DirectiveToken,
  HtmlToken,
  HtmlBlockToken,
  ImageToken,
  TableToken,
  ListToken,
  BlockquoteToken,
  HrToken,
  TocToken,
} from './core/index';

// ── React bindings (thin wrappers over the vanilla engine) ──
export { default as NRpreviewer } from './react/NRpreviewer';
export type { NRpreviewerProps } from './react/NRpreviewer';

export { default as CustomMarkdownRenderer } from './react/CustomMarkdownRenderer';
export { default as RawHtmlRenderer } from './react/RawHtmlRenderer';

export { useDebounce } from './react/useDebounce';
export { useLazyTailwindCDN, scanTailwindCDN, preloadTailwindCDN } from './react/useTailwindCDN';

// ── Vanilla directive types (custom directives use the DOM API) ──
export type {
  DirectiveProps,
  DirectiveRendererFn,
  VanillaRenderContext,
} from './vanilla/directives';