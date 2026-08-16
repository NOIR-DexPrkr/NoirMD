// ============================================================
// @noirmd/previewer/react — React bindings
//
// Thin mount-point wrappers around the framework-agnostic
// vanilla renderer. All rendering, directives and events live
// in the vanilla engine; React only owns the DOM mount point.
// ============================================================

// ── Main component ──
export { default as NRpreviewer } from './NRpreviewer';
export type { NRpreviewerProps } from './NRpreviewer';

// ── Core renderer (advanced usage) ──
export { default as CustomMarkdownRenderer } from './CustomMarkdownRenderer';
export { default as RawHtmlRenderer } from './RawHtmlRenderer';

// ── Parser (re-exported from core for convenience) ──
export { parseMarkdown } from '../core/parser';

// ── Utilities ──
export { useDebounce } from './useDebounce';
export { useLazyTailwindCDN, scanTailwindCDN, preloadTailwindCDN } from './useTailwindCDN';

// ── Core types ──
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
} from '../core/types';

// ── Vanilla directive types (custom directives use the DOM API) ──
export type { DirectiveProps, DirectiveRendererFn, VanillaRenderContext } from '../vanilla/directives';