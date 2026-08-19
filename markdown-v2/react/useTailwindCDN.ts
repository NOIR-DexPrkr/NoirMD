import { useEffect, useRef } from 'react';
import { injectNRTailwindTheme, removeNRTailwindTheme } from '../vanilla/tailwindTheme';

/**
 * useLazyTailwindCDN — Lazily injects the Tailwind CSS v4 Browser CDN
 * so that arbitrary Tailwind classes written in runtime markdown content
 * (:::raw, directives, ##{ } attrs, etc.) are resolved.
 *
 * - Only injects the <script> when `enabled` is true (e.g. preview mode).
 * - Removes the script when `enabled` becomes false (editor-only mode).
 * - This means zero CDN cost in editor-only mode.
 * - The v4 Browser CDN uses `@tailwindcss/browser` which JIT-compiles
 *   classes from the DOM at runtime.
 * - preflight is DISABLED via inline config to avoid overriding app base styles.
 */

const CDN_URL = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4';
const SCRIPT_ID = 'tailwind-cdn-v4-runtime';
const CONFIG_ID = 'tailwind-cdn-v4-config';

// Tailwind v4 Browser CDN reads the theme from CSS @theme blocks already on the page.
// No need to duplicate fonts/colors here — they're defined in src/index.css.
// Only disable preflight to avoid injecting normalize.css over our base styles.
const TAILWIND_CDN_CONFIG = `
window.tailwind = window.tailwind || {};
window.tailwind.config = {
  corePlugins: {
    preflight: false,
  },
};
`;

declare global {
  interface Window {
    __twCDNRefs?: number;
    tailwind?: { config: object; scan?: () => void };
  }
}

/**
 * Lazy CDN hook — only loads the Tailwind Browser CDN when `enabled` is true.
 * Call this from the component that hosts the preview panel.
 */
export function useLazyTailwindCDN(enabled: boolean) {
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!enabled) {
      // When disabled: remove CDN scripts if no other consumers need them
      window.__twCDNRefs = (window.__twCDNRefs ?? 1) - 1;
      if ((window.__twCDNRefs ?? 0) <= 0) {
        document.getElementById(SCRIPT_ID)?.remove();
        document.getElementById(CONFIG_ID)?.remove();
        removeNRTailwindTheme();
        window.__twCDNRefs = 0;
        loadedRef.current = false;
      }
      return;
    }

    // When enabled: inject CDN scripts
    window.__twCDNRefs = (window.__twCDNRefs ?? 0) + 1;

    // Inject config script BEFORE the CDN
    if (!document.getElementById(CONFIG_ID)) {
      const configScript = document.createElement('script');
      configScript.id = CONFIG_ID;
      configScript.textContent = TAILWIND_CDN_CONFIG;
      document.head.appendChild(configScript);
    }

    // Inject the NoirMD @theme (primary, base-100, ...) so color
    // classes resolve — must precede the CDN script.
    injectNRTailwindTheme();

    // Inject the Tailwind v4 Browser CDN script
    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = CDN_URL;
      document.head.appendChild(script);
      loadedRef.current = true;
    }

    return () => {
      window.__twCDNRefs = (window.__twCDNRefs ?? 1) - 1;
      if ((window.__twCDNRefs ?? 0) <= 0) {
        document.getElementById(SCRIPT_ID)?.remove();
        document.getElementById(CONFIG_ID)?.remove();
        removeNRTailwindTheme();
        window.__twCDNRefs = 0;
        loadedRef.current = false;
      }
    };
  }, [enabled]);
}

/**
 * Trigger a Tailwind CDN re-scan (use after DOM mutations with new classes).
 */
export function scanTailwindCDN() {
  const tw = (window as any).tailwind;
  if (tw?.scan) tw.scan();
}

/**
 * Preload the Tailwind Browser CDN right after page load.
 * Uses requestIdleCallback so it doesn't block the main thread.
 * By the time the user opens preview, the CDN is already loaded.
 */
export function preloadTailwindCDN() {
  // Already loaded — skip
  if (document.getElementById(SCRIPT_ID)) return;

  const inject = () => {
    if (document.getElementById(SCRIPT_ID)) return; // double-check

    // Inject config script
    if (!document.getElementById(CONFIG_ID)) {
      const configScript = document.createElement('script');
      configScript.id = CONFIG_ID;
      configScript.textContent = TAILWIND_CDN_CONFIG;
      document.head.appendChild(configScript);
    }

    // Inject the NoirMD @theme before the CDN script
    injectNRTailwindTheme();

    // Inject CDN script
    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = CDN_URL;
    document.head.appendChild(script);

    window.__twCDNRefs = (window.__twCDNRefs ?? 0) + 1;
  };

  // Wait for idle — don't block initial render
  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(inject, { timeout: 2000 });
  } else {
    // Fallback: load after a short delay
    setTimeout(inject, 200);
  }
}

export function useTailwindCDN() {
  useLazyTailwindCDN(true);
}
