// ============================================================
// @noirmd/previewer/vanilla — Entry point
//
// Usage:
//   import { renderMarkdownString } from '@noirmd/previewer/vanilla';
//   import '@noirmd/previewer/vanilla/vanilla.css';
//
//   const el = renderMarkdownString('# Hello **world**');
//   document.body.appendChild(el);
//
// Zero React dependency. Pure DOM + CSS.
// ============================================================

export {
  renderTokens,
  renderMarkdownString,
  renderHtmlString,
  renderInline,
  createIcon,
  createCodeBlock,
  createAdmonition,
  createDetails,
  createModal,
  createTable,
  createList,
  createTOC,
  createBlockquote,
  directiveRegistry,
  type DirectiveRendererFn,
  type DirectiveProps,
  type VanillaRenderContext,
} from './vanilla/index';
