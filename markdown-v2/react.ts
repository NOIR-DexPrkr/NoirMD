// ============================================================
// @noirmd/previewer/react — React entry point
//
// Usage:
//   import { NRpreviewer } from '@noirmd/previewer/react';
//   import '@noirmd/previewer/markdown.css';
//
// Requires React as a peer dependency.
// ============================================================

export {
  NRpreviewer,
  type NRpreviewerProps,
  CustomMarkdownRenderer,
  parseMarkdown,
  extractHeaders,
  useDebounce,
  IconRenderer,
  CodeBlock,
  Admonition,
  Details,
  Modal,
  useLazyTailwindCDN,
  scanTailwindCDN,
  preloadTailwindCDN,
  type Token,
  type RenderContext,
  type DirectiveComponentProps,
  type DirectiveComponent,
  type CSSProperties,
} from './react/index';
