// ============================================================
// @noirmd/previewer/core — Framework-agnostic entry point
//
// Usage:
//   import { parseMarkdown, Token } from '@noirmd/previewer/core';
//
// This module has ZERO dependency on React (or any UI framework).
// ============================================================

export {
  parseMarkdown,
  type Token,
  type CSSProperties,
  type HeaderToken,
  type ParagraphToken,
  type CodeblockToken,
  type DirectiveToken,
  type HtmlToken,
  type HtmlBlockToken,
  type ImageToken,
  type TableToken,
  type ListToken,
  type BlockquoteToken,
  type HrToken,
  type TocToken,
  parseCssString,
  generateId,
  generateScopeId,
  resetScopeCounter,
  scrollToId,
  extractAttributes,
  parseProps,
  parseHtmlAttrs,
} from './core/index';
