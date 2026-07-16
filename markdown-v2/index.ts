// ── Main component ──
export { default as NRpreviewer } from './NRpreviewer';
export type { NRpreviewerProps } from './NRpreviewer';

// ── Core renderer (advanced usage) ──
export { default as CustomMarkdownRenderer } from './CustomMarkdownRenderer';

// ── Editor (import from '@noirmd/previewer/editor') ──
// NReditor — CodeMirror 6 editor with live preview. Requires optional CodeMirror peer deps.

// ── Parser & utilities ──
export { parseMarkdown } from './parser';
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
} from './types';
