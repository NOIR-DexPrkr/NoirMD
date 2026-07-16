import React from 'react';

// ============================================================
// Token Types — AST nodes produced by the parser
// ============================================================

export interface HeaderToken {
  type: 'header';
  level: number;
  text: string;
  id: string;
  classes?: string;
}

export interface ParagraphToken {
  type: 'paragraph';
  content: string;
  align?: 'center' | 'right';
  classes?: string;
  id?: string;
}

export interface CodeblockToken {
  type: 'codeblock';
  language: string;
  content: string;
  title?: string;
}

export interface DirectiveToken {
  type: 'directive';
  directiveType: string;
  props: Record<string, string>;
  slots: Record<string, string>; // slot name → raw content string
  scopeId: string;
}

export interface HtmlToken {
  type: 'html';
  content: string;
  scopeId: string;
}

export interface HtmlBlockToken {
  type: 'html-block';
  tag: string;
  attrs: string;
  children: Token[];
}

export interface ImageToken {
  type: 'image';
  alt: string;
  src: string;
  style: React.CSSProperties;
}

export interface TableToken {
  type: 'table';
  content: string;
}

export interface ListToken {
  type: 'list';
  content: string;
}

export interface BlockquoteToken {
  type: 'blockquote';
  content: string;
  classes?: string;
  id?: string;
}

export interface HrToken {
  type: 'hr';
}

export interface TocToken {
  type: 'toc';
}

export type Token =
  | HeaderToken
  | ParagraphToken
  | CodeblockToken
  | DirectiveToken
  | HtmlToken
  | HtmlBlockToken
  | ImageToken
  | TableToken
  | ListToken
  | BlockquoteToken
  | HrToken
  | TocToken;

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
