// ============================================================
// @noirmd/previewer/react — React bindings
//
// All React-specific rendering components, directives, hooks, and UI.
// ============================================================

// ── Main component ──
export { default as NRpreviewer } from './NRpreviewer';
export type { NRpreviewerProps } from './NRpreviewer';

// ── Core renderer (advanced usage) ──
export { default as CustomMarkdownRenderer } from './CustomMarkdownRenderer';

// ── Parser (re-exported from core for convenience) ──
export { parseMarkdown } from '../core/parser';

// ── Utilities (re-exported from core for convenience) ──
export { extractHeaders } from './renderers';
export { useDebounce } from './useDebounce';

// ── UI components (for custom directive implementations) ──
export { IconRenderer, CodeBlock, Admonition, Details, Modal } from './ui-components';

// ── Tailwind CDN helpers ──
export { useLazyTailwindCDN, scanTailwindCDN, preloadTailwindCDN } from './useTailwindCDN';

// ── Types ──
export type {
  Token,
  RenderContext,
  DirectiveComponentProps,
  DirectiveComponent,
  CSSProperties,
} from './types';
