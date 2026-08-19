// ============================================================
// Vanilla Directive Registry
//
// Maps directive type strings to vanilla renderer functions.
// ============================================================

import type { Token } from '../../core/types';

// ── Context passed to directive renderers ──

export interface VanillaRenderContext {
  /** Parse markdown string into tokens */
  parseMarkdown: (md: string) => Token[];
  /** Render tokens into an HTMLElement */
  renderElements: (tokens: Token[]) => HTMLElement;
  /** Render inline text into a DocumentFragment */
  renderInline: (text: string) => DocumentFragment;
  /** Parse markdown string and render into an HTMLElement */
  renderMarkdown: (md: string) => HTMLElement;
}

export interface DirectiveProps {
  /** The directive type string */
  directiveType: string;
  /** Parsed key="value" attributes */
  props: Record<string, string>;
  /** Named slots → raw content strings */
  slots: Record<string, string>;
  /** Render a named slot as parsed markdown */
  renderSlot: (name: string) => DocumentFragment;
  /** Render context */
  context: VanillaRenderContext;
  /** Position index */
  index: number;
  /** Full parsed AST */
  allElements: Token[];
  /** Extra flags */
  options?: Record<string, any>;
  /** Inline renderer shortcut */
  renderInline: (text: string) => DocumentFragment;
  /** Full markdown renderer shortcut (for complex directives like slide) */
  renderMarkdown?: (md: string) => HTMLElement;
}

export type DirectiveRendererFn = (props: DirectiveProps) => HTMLElement | DocumentFragment;

// ── Import directive implementations ──

import admonitionDirective from './admonition';
import detailsDirective from './details';
import modalDirective from './modal';
import buttonDirective from './button';
import cardDirective from './card';
import wrapperDirective from './wrapper';
import slideDirective from './slide';
import keysDirective from './keys';
import accordionDirective, { accordionItemDirective } from './accordion';
import carouselDirective from './carousel';
import countdownDirective from './countdown';
import diffDirective from './diff';
import hover3dDirective from './hover3d';
import hovergalleryDirective from './hovergallery';
import chatDirective, { chatItemDirective } from './chat';
import richlistDirective, { richlistItemDirective } from './richlist';
import statDirective from './stat';

// ── Registry ──

const directiveRegistry: Record<string, DirectiveRendererFn> = {
  // Admonitions
  note: admonitionDirective,
  info: admonitionDirective,
  warning: admonitionDirective,
  danger: admonitionDirective,
  greentext: admonitionDirective,
  // Cards
  card: cardDirective,
  'card-m': cardDirective,
  'card-b': cardDirective,
  // Interactive
  details: detailsDirective,
  modal: modalDirective,
  button: buttonDirective,
  // Layout / generic wrappers
  div: wrapperDirective,
  style: wrapperDirective,
  custom: wrapperDirective,
  raw: wrapperDirective,
  // Animation
  slide: slideDirective,
  // New components
  keys: keysDirective,
  accordion: accordionDirective,
  'accordion-item': accordionItemDirective,
  carousel: carouselDirective,
  countdown: countdownDirective,
  diff: diffDirective,
  'hover-3d': hover3dDirective,
  'hover-gallery': hovergalleryDirective,
  chat: chatDirective,
  'chat-item': chatItemDirective,
  richlist: richlistDirective,
  'richlist-item': richlistItemDirective,
  stat: statDirective,
};

export default directiveRegistry;
