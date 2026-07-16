// ============================================================
// Vue provide/inject for RenderContext
// ============================================================

import { inject, InjectionKey } from 'vue';
import type { RenderContext } from './types';

export const RenderContextKey: InjectionKey<RenderContext> = Symbol('RenderContext');

export function useRenderContext(): RenderContext {
  const ctx = inject(RenderContextKey);
  if (!ctx) {
    throw new Error('useRenderContext must be used within a RenderContextProvider');
  }
  return ctx;
}
