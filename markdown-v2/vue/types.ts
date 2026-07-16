// ============================================================
// Vue-specific types — re-exports core types + Vue additions
// ============================================================

import type { Component, Ref } from 'vue';
import type { Token, CSSProperties } from '../core/types';

// ── Re-export all core types for convenience ──
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

// ============================================================
// RenderContext — threaded through the render tree via provide/inject
// ============================================================

export interface RenderContext {
  modals: Ref<Record<string, boolean>>;
  setModals: (value: Record<string, boolean> | ((prev: Record<string, boolean>) => Record<string, boolean>)) => void;
  articleClass: string;
  allElements: Token[];
  parseMarkdown: (md: string) => Token[];
  renderElement: (element: Token, index: number, depth?: number) => any;
  renderInline: (text: string) => any[];
  processAndRenderElements: (elements: Token[], depth?: number) => any[];
}

// ============================================================
// DirectiveComponentProps — unified interface for ALL directives
// ============================================================

export type DirectiveComponent = Component;

export interface DirectiveComponentProps {
  /** The directive type string, e.g. 'card', 'note', 'modal' */
  directiveType: string;
  /** Parsed key="value" attributes from the {props} block */
  props: Record<string, string>;
  /** Named slots → raw content strings (to be parsed recursively) */
  slots: Record<string, string>;
  /** Convenience: render a named slot as parsed markdown */
  renderSlot: (name: string) => any[];
  /** Full render context access */
  context: RenderContext;
  /** Position index in the parent element list */
  index: string | number;
  /** Full parsed AST */
  allElements: Token[];
  /** Extra flags from the orchestrator */
  options?: Record<string, any>;
}
