import type { DirectiveComponent } from '../types';
import AdmonitionDirective from './AdmonitionDirective';
import CardDirective from './CardDirective';
import DetailsDirective from './DetailsDirective';
import ModalDirective from './ModalDirective';
import ButtonDirective from './ButtonDirective';
import WrapperDirective from './WrapperDirective';
import SlideDirective from './SlideDirective';

/**
 * Directive Registry — maps type strings to directive components.
 * All directives implement the unified DirectiveComponentProps interface.
 */
const directiveRegistry: Record<string, DirectiveComponent> = {
  // Admonitions
  note: AdmonitionDirective,
  info: AdmonitionDirective,
  warning: AdmonitionDirective,
  danger: AdmonitionDirective,
  greentext: AdmonitionDirective,
  // Cards
  card: CardDirective,
  'card-m': CardDirective,
  'card-b': CardDirective,
  // Interactive
  details: DetailsDirective,
  modal: ModalDirective,
  button: ButtonDirective,
  // Layout / generic wrappers
  div: WrapperDirective,
  style: WrapperDirective,
  custom: WrapperDirective,
  raw: WrapperDirective,
  // Animation
  slide: SlideDirective,
};

export default directiveRegistry;
