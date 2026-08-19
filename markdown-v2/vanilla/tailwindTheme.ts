// ============================================================
// NoirMD Vanilla — Tailwind v4 theme injection
//
// When the host enables the Tailwind Browser CDN (tailwindCDN
// prop), Tailwind classes authored inside markdown (:::div,
// :::raw, attrs, ...) are JIT-compiled at runtime. For color
// utilities like `bg-primary` / `text-secondary` to resolve,
// Tailwind v4 needs an `@theme` block registering --color-*
// keys.
//
// This module injects a <style type="text/tailwindcss"> block
// with a daisyUI-compatible @theme (primary, secondary, accent,
// neutral, base-100/200/300, base-content, info, success,
// warning, error) wired to the host's --color-* variables, with
// NoirMD defaults as fallback.
//
// Safety: if the host already provides a theme (daisyUI, a
// Tailwind @theme block, or --color-* theme variables),
// injection is skipped so the module never overrides the host
// palette.
// ============================================================

const THEME_STYLE_ID = 'nr-tailwind-theme';

// daisyUI 5 / Tailwind v4 convention: the palette lives in
// --color-* theme variables. Values resolve host vars first
// (app --color-*, then daisyUI v4 --p/--b1/... components), and
// fall back to NoirMD defaults. Never references --nr-* (would
// create a circular dependency with the --nr-accent chain).
const NR_THEME_CSS = `
@theme {
  --color-primary: var(--color-accent-primary, oklch(var(--p, 55% 0.3 240) / 1));
  --color-primary-content: #ffffff;
  --color-secondary: oklch(var(--s, 55% 0.25 200) / 1);
  --color-secondary-content: #ffffff;
  --color-accent: var(--color-accent-primary, oklch(var(--a, 65% 0.25 160) / 1));
  --color-accent-content: #ffffff;
  --color-neutral: oklch(var(--n, 50% 0.05 240) / 1);
  --color-neutral-content: var(--color-text-primary, oklch(var(--nc, 92% 0.02 240) / 1));
  --color-base-100: var(--color-background-primary, oklch(var(--b1, 15% 0.01 260) / 1));
  --color-base-200: var(--color-background-secondary-solid, oklch(var(--b2, 20% 0.02 260) / 1));
  --color-base-300: var(--color-border, oklch(var(--b3, 25% 0.03 260) / 1));
  --color-base-content: var(--color-text-primary, oklch(var(--bc, 92% 0.02 260) / 1));
  --color-info: oklch(var(--in, 70% 0.2 220) / 1);
  --color-info-content: #ffffff;
  --color-success: oklch(var(--su, 65% 0.25 140) / 1);
  --color-success-content: #ffffff;
  --color-warning: oklch(var(--wa, 80% 0.25 80) / 1);
  --color-warning-content: #1f2937;
  --color-error: oklch(var(--er, 65% 0.3 30) / 1);
  --color-error-content: #ffffff;
}
`;

function getVar(root: HTMLElement, name: string): string {
  return getComputedStyle(root).getPropertyValue(name).trim();
}

function stylesheetHasTheme(): boolean {
  for (const sheet of Array.from(document.styleSheets)) {
    let rules: CSSRuleList | null = null;
    try {
      rules = sheet.cssRules;
    } catch {
      continue; // cross-origin stylesheet — rules are inaccessible
    }
    if (!rules) continue;
    for (const rule of Array.from(rules)) {
      const css = rule.cssText || '';
      if (css.includes('@theme') || css.includes('@plugin "daisyui"')) return true;
    }
  }
  return false;
}

/**
 * Detect whether the host page already provides a color theme
 * (daisyUI, a Tailwind @theme block, or --color-* variables).
 */
export function hasHostTheme(): boolean {
  if (typeof window === 'undefined' || typeof document === 'undefined') return true;
  if (getVar(document.documentElement, '--color-primary')) return true;
  if (getVar(document.documentElement, '--color-base-100')) return true;
  if (document.body && (getVar(document.body, '--color-primary') || getVar(document.body, '--color-base-100'))) return true;
  return stylesheetHasTheme();
}

/**
 * Inject the NoirMD @theme block so Tailwind CDN color classes
 * (bg-primary, text-secondary, ...) resolve inside markdown.
 * Skipped when the host already defines a theme. Idempotent.
 */
export function injectNRTailwindTheme(): void {
  if (typeof document === 'undefined') return;
  if (document.getElementById(THEME_STYLE_ID)) return;
  if (hasHostTheme()) return;

  const style = document.createElement('style');
  style.id = THEME_STYLE_ID;
  style.setAttribute('type', 'text/tailwindcss');
  style.textContent = NR_THEME_CSS;
  document.head.appendChild(style);
}

/**
 * Remove the injected NoirMD @theme block (idempotent).
 */
export function removeNRTailwindTheme(): void {
  if (typeof document === 'undefined') return;
  document.getElementById(THEME_STYLE_ID)?.remove();
}