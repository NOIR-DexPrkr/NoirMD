// ============================================================
// Vanilla Shared Utilities
//
// Reusable helpers extracted from directive boilerplate.
// Reduces duplication across all directive files.
// ============================================================

import { parseCssString } from '../core/utils';

// ── Theme Tokens ──────────────────────────────────────────

/**
 * Unified set of theme token names that map to CSS classes.
 * Used by all directives that support a `color` prop with
 * both theme tokens and arbitrary CSS colors.
 */
export const THEME_TOKENS = new Set([
  'primary', 'secondary', 'accent', 'neutral', 'info', 'success', 'warning', 'error',
]);

/**
 * Check if a value is a known theme token.
 */
export function isThemeToken(color: string | undefined): boolean {
  return !!color && THEME_TOKENS.has(color);
}

/**
 * Check if a value is an arbitrary CSS color (not a theme token).
 * Accepts: named colors, hex, rgb/rgba, hsl/hsla, oklch, oklab, color().
 */
export function isArbitraryColor(value: string): boolean {
  if (THEME_TOKENS.has(value)) return false;
  if (/^(#|rgb|hsl|oklch|oklab|lab|lch|color\()/i.test(value)) return true;
  if (/^[a-zA-Z]+$/.test(value)) return true;
  return false;
}

// ── DOM Helpers ───────────────────────────────────────────

/**
 * Apply common `class` and `style` props to an element.
 * Uses `parseCssString` + `setProperty` (not `setAttribute`) to
 * avoid overwriting previously set inline styles.
 */
export function applyBaseProps(el: HTMLElement, props: Record<string, string>): void {
  if (props.class) {
    el.classList.add(...props.class.split(/\s+/).filter(Boolean));
  }
  if (props.style) {
    const styles = parseCssString(props.style);
    for (const [key, value] of Object.entries(styles)) {
      el.style.setProperty(key, String(value));
    }
  }
}

/**
 * Apply float positioning to an element.
 * Supports `left`, `right`, and `center` values.
 */
export function applyFloatStyle(el: HTMLElement, float?: string, width?: string): void {
  if (!float) return;

  if (float === 'left' || float === 'right') {
    el.style.float = float;
    if (!width) el.style.maxWidth = '50%';
    el.style.marginInlineStart = float === 'right' ? '1rem' : '';
    el.style.marginInlineEnd = float === 'left' ? '1rem' : '';
  } else if (float === 'center') {
    el.style.marginInline = 'auto';
  }
}

/**
 * Apply a color to an element — either as a CSS class (theme token)
 * or as inline style (arbitrary CSS color).
 *
 * @returns The CSS class string to append (e.g. `" nr-chat__bubble--primary"`), or empty string if using inline style.
 */
export function applyColor(
  el: HTMLElement,
  color: string | undefined,
  classSuffix: string,
): string {
  if (!color) return '';

  if (isThemeToken(color)) {
    return ` ${classSuffix}--${color}`;
  }

  if (isArbitraryColor(color)) {
    el.style.background = color;
    el.style.color = 'white';
  }

  return '';
}

/**
 * Open a native <dialog> modal, appending it to document.body.
 * Removes the dialog from DOM when closed.
 */
export function openModal(dialog: HTMLDialogElement): void {
  if (!dialog.open) {
    document.body.appendChild(dialog);
    dialog.showModal();
    dialog.addEventListener('close', () => dialog.remove(), { once: true });
  }
}

// ── Regex Constants ───────────────────────────────────────

/** Match markdown image syntax: ![alt](url) */
export const IMG_RE = /!\[([^\]]*)\]\(([^)]+)\)/g;

// ── Typed Props Helper ────────────────────────────────────

/**
 * Apply alignment modifier class to an element.
 * Appends `${suffix}--center` or `${suffix}--right` when applicable.
 * Uses `applyAlignClass(el, 'nr-button-wrap', align)` for button/modal wrappers.
 */
export function applyAlignClass(
  el: HTMLElement,
  baseClass: string,
  align?: string,
): void {
  if (align === 'center') {
    el.classList.add(`${baseClass}--center`);
  } else if (align === 'right') {
    el.classList.add(`${baseClass}--right`);
  }
}

/**
 * Resolve an icon prop to a valid icon name, or null for "none"/"off".
 * Returns `fallback` when `value` is missing; returns `null` when the user
 * explicitly wants no icon (`value` is "none" or "off").
 */
export function resolveIcon(
  value: string | undefined,
  fallback: string,
): string | null {
  if (!value) return fallback;
  if (value === 'none' || value === 'off') return null;
  return value;
}

/**
 * Parse a prop value as an integer with a fallback default.
 * Returns the default if the value is missing or NaN.
 */
export function parseIntProp(value: string | undefined, defaultValue: number): number {
  if (!value) return defaultValue;
  const n = parseInt(value, 10);
  return Number.isNaN(n) ? defaultValue : n;
}
