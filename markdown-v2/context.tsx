import React, { createContext, useContext } from 'react';
import type { RenderContext } from './types';

const RenderCtx = createContext<RenderContext | null>(null);

export const RenderContextProvider = RenderCtx.Provider;

export function useRenderContext(): RenderContext {
  const ctx = useContext(RenderCtx);
  if (!ctx) {
    throw new Error('useRenderContext must be used within a RenderContextProvider');
  }
  return ctx;
}
