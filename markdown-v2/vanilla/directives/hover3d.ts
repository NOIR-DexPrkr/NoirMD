// ============================================================
// Hover-3D Directive (vanilla)
//
// 3D tilt card that reacts to the mouse position. The 8 empty
// tracking divs daisyUI requires are generated automatically.
//
//   :::hover-3d
//   <figure>...<img .../></figure>
//   :::
// ============================================================

import type { DirectiveRendererFn } from './index';
import { applyBaseProps } from '../utils';

const hover3dDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const container = document.createElement('div');
  container.className = 'nr-hover-3d';
  applyBaseProps(container, props);

  const stage = document.createElement('div');
  stage.className = 'nr-hover-3d__stage';
  stage.appendChild(renderSlot('default'));
  container.appendChild(stage);

  // 8 empty divs needed for the directional hover regions
  for (let i = 0; i < 8; i++) {
    container.appendChild(document.createElement('div'));
  }

  return container;
};

export default hover3dDirective;