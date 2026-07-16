// ============================================================
// @noirmd/previewer — Backward-compatible barrel export
//
// Re-exports everything from core + react so existing users
// who import from '@noirmd/previewer' continue to work.
//
// For framework-agnostic usage:
//   import { parseMarkdown } from '@noirmd/previewer/core';
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

// ── React bindings ──
export { default as NRpreviewer } from './react/NRpreviewer';
export type { NRpreviewerProps } from './react/NRpreviewer';

export { default as CustomMarkdownRenderer } from './react/CustomMarkdownRenderer';

export { extractHeaders } from './react/renderers';
export { useDebounce } from './react/useDebounce';

export { IconRenderer, CodeBlock, Admonition, Details, Modal } from './react/ui-components';

export { useLazyTailwindCDN, scanTailwindCDN, preloadTailwindCDN } from './react/useTailwindCDN';

export type {
  RenderContext,
  DirectiveComponentProps,
  DirectiveComponent,
} from './react/types';
