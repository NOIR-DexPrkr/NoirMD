// ============================================================
// Countdown Directive (vanilla)
//
// Countdown blocks (days / hours / min / sec) with daisyUI-style
// digit flip animation. Static values via props, or a live
// ticking countdown with the target prop.
//
//   :::countdown {days="15" hours="10" min="24" sec="59"}
//   :::countdown {target="2026-12-31T23:59:59"}
// ============================================================

import type { DirectiveRendererFn } from './index';

const DEFAULT_LABELS = ['days', 'hours', 'min', 'sec'];

const countdownDirective: DirectiveRendererFn = ({ props }) => {
  const wrap = document.createElement('div');
  wrap.className = 'nr-countdown';

  if (props.class) wrap.classList.add(...props.class.split(/\s+/).filter(Boolean));
  if (props.style) wrap.setAttribute('style', props.style);

  const labelParts = (props.labels || '').split('|').map(s => s.trim());
  const labels = DEFAULT_LABELS.map((label, i) => labelParts[i] || label);
  const digits = parseInt(props.digits || '2', 10);

  const targetTime = props.target ? new Date(props.target).getTime() : NaN;
  const hasTarget = !Number.isNaN(targetTime);

  const blocks: { value: HTMLElement }[] = [];

  const compute = (): number[] => {
    if (hasTarget) {
      const diff = Math.max(0, targetTime - Date.now());
      return [
        Math.floor(diff / 86400000),
        Math.floor(diff / 3600000) % 24,
        Math.floor(diff / 60000) % 60,
        Math.floor(diff / 1000) % 60,
      ];
    }
    return [
      parseInt(props.days || '0', 10),
      parseInt(props.hours || '0', 10),
      parseInt(props.min || '0', 10),
      parseInt(props.sec || '0', 10),
    ];
  };

  const render = () => {
    const values = compute();
    blocks.forEach((block, i) => {
      const v = String(values[i]);
      block.value.style.setProperty('--value', v);
      block.value.setAttribute('aria-label', v);
      block.value.textContent = v;
    });
  };

  labels.forEach(label => {
    const block = document.createElement('div');
    block.className = 'nr-countdown__block';

    const value = document.createElement('span');
    value.className = 'nr-countdown__value';
    value.style.setProperty('--digits', String(digits));
    value.setAttribute('aria-live', 'polite');
    value.setAttribute('aria-label', '0');
    value.textContent = '0';

    const labelEl = document.createElement('span');
    labelEl.className = 'nr-countdown__label';
    labelEl.textContent = label;

    block.append(value, labelEl);
    wrap.appendChild(block);
    blocks.push({ value });
  });

  render();
  if (hasTarget) setInterval(render, 1000);

  return wrap;
};

export default countdownDirective;