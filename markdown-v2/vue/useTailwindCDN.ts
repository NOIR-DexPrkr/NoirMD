// ============================================================
// Vue composable for lazy Tailwind v4 CDN injection
// ============================================================

import { onMounted, onUnmounted, watch, type Ref } from 'vue';
import { injectNRTailwindTheme, removeNRTailwindTheme } from '../vanilla/tailwindTheme';

const CDN_URL = 'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4';
const SCRIPT_ID = 'tailwind-cdn-v4-runtime';
const CONFIG_ID = 'tailwind-cdn-v4-config';

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

// Runtime SSR guard — wrapped in a function so bundlers cannot statically strip it
const isBrowser = () => typeof window !== 'undefined' && typeof document !== 'undefined';

/**
 * Lazy CDN composable — only loads the Tailwind Browser CDN when `enabled` is true.
 */
export function useLazyTailwindCDN(enabled: Ref<boolean> | boolean) {
  const injectCDN = () => {
    if (!isBrowser()) return;
    window.__twCDNRefs = (window.__twCDNRefs ?? 0) + 1;

    if (!document.getElementById(CONFIG_ID)) {
      const configScript = document.createElement('script');
      configScript.id = CONFIG_ID;
      configScript.textContent = TAILWIND_CDN_CONFIG;
      document.head.appendChild(configScript);
    }

    injectNRTailwindTheme();

    if (!document.getElementById(SCRIPT_ID)) {
      const script = document.createElement('script');
      script.id = SCRIPT_ID;
      script.src = CDN_URL;
      document.head.appendChild(script);
    }
  };

  const removeCDN = () => {
    if (!isBrowser()) return;
    window.__twCDNRefs = (window.__twCDNRefs ?? 1) - 1;
    if ((window.__twCDNRefs ?? 0) <= 0) {
      document.getElementById(SCRIPT_ID)?.remove();
      document.getElementById(CONFIG_ID)?.remove();
      removeNRTailwindTheme();
      window.__twCDNRefs = 0;
    }
  };

  if (typeof enabled === 'boolean') {
    // Static boolean — use lifecycle hooks
    onMounted(() => {
      if (enabled) injectCDN();
    });
    onUnmounted(() => {
      if (enabled) removeCDN();
    });
  } else {
    // Reactive ref — watch for changes
    watch(enabled, (newVal, oldVal) => {
      if (newVal && !oldVal) injectCDN();
      if (!newVal && oldVal) removeCDN();
    }, { immediate: true });

    onUnmounted(() => {
      if (enabled.value) removeCDN();
    });
  }
}

/**
 * Trigger a Tailwind CDN re-scan (use after DOM mutations with new classes).
 */
export function scanTailwindCDN() {
  if (typeof window === 'undefined') return;
  const tw = (window as any).tailwind;
  if (tw?.scan) tw.scan();
}

/**
 * Preload the Tailwind Browser CDN right after page load.
 */
export function preloadTailwindCDN() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  if (document.getElementById(SCRIPT_ID)) return;

  const inject = () => {
    if (document.getElementById(SCRIPT_ID)) return;

    if (!document.getElementById(CONFIG_ID)) {
      const configScript = document.createElement('script');
      configScript.id = CONFIG_ID;
      configScript.textContent = TAILWIND_CDN_CONFIG;
      document.head.appendChild(configScript);
    }

    injectNRTailwindTheme();

    const script = document.createElement('script');
    script.id = SCRIPT_ID;
    script.src = CDN_URL;
    document.head.appendChild(script);

    window.__twCDNRefs = (window.__twCDNRefs ?? 0) + 1;
  };

  if ('requestIdleCallback' in window) {
    (window as any).requestIdleCallback(inject, { timeout: 2000 });
  } else {
    setTimeout(inject, 200);
  }
}
