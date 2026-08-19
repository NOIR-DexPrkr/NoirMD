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

const hover3dDirective: DirectiveRendererFn = ({ props, renderSlot }) => {
  const container = document.createElement('div');
  container.className = 'nr-hover-3d';

  if (props.class) container.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) container.setAttribute('style', props.style);

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