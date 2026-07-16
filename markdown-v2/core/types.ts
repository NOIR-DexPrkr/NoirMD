// ============================================================
// Token Types — AST nodes produced by the parser (framework-agnostic)
// ============================================================

/**
 * Generic CSSProperties — framework-agnostic equivalent of React.CSSProperties.
 * Used for inline styles on tokens (e.g. images).
 */
export type CSSProperties = Record<string, string | number>;

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
  style: CSSProperties;
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
