// ============================================================
// @noirmd/previewer/vue — Entry point
//
// Usage:
//   import { NRpreviewer } from '@noirmd/previewer/vue';
//   import '@noirmd/previewer/markdown.css';
//
// Requires Vue 3 as a peer dependency.
// ============================================================

export {
  NRpreviewer,
  CustomMarkdownRenderer,
  parseMarkdown,
  extractHeaders,
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
} from './vue/index';
