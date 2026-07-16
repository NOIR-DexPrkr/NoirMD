// ============================================================
// React-specific types — re-exports core types + React additions
// ============================================================

import React from 'react';
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
// RenderContext — threaded through the render tree via React Context
// ============================================================

export interface RenderContext {
  modals: Record<string, boolean>;
  setModals: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  articleClass: string;
  allElements: Token[];
  parseMarkdown: (md: string) => Token[];
  renderElement: (element: Token, index: number, depth?: number) => React.ReactNode;
  renderInline: (text: string) => React.ReactNode;
  processAndRenderElements: (elements: Token[], depth?: number) => React.ReactNode[];
}

// ============================================================
// DirectiveComponentProps — unified interface for ALL directives
// ============================================================

export type DirectiveComponent = React.FC<DirectiveComponentProps>;

export interface DirectiveComponentProps {
  /** The directive type string, e.g. 'card', 'note', 'modal' */
  directiveType: string;
  /** Parsed key="value" attributes from the {props} block */
  props: Record<string, string>;
  /** Named slots → raw content strings (to be parsed recursively) */
  slots: Record<string, string>;
  /** Convenience: render a named slot as parsed markdown */
  renderSlot: (name: string) => React.ReactNode;
  /** Full render context access */
  context: RenderContext;
  /** Position index in the parent element list */
  index: string | number;
  /** Full parsed AST */
  allElements: Token[];
  /** Extra flags from the orchestrator */
  options?: Record<string, any>;
}
