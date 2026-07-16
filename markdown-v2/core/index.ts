// ============================================================
// @noirmd/previewer/core — Framework-agnostic exports
//
// This module contains the parser, token types, and utilities.
// It has ZERO dependency on React (or any UI framework).
// ============================================================

// ── Parser ──
export { parseMarkdown } from './parser';

// ── Token Types ──
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
} from './types';

// ── Utilities ──
export {
  parseCssString,
  generateId,
  generateScopeId,
  resetScopeCounter,
  scrollToId,
  extractAttributes,
  parseProps,
  parseHtmlAttrs,
} from './utils';
