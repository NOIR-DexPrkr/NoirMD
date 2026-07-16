import { defineConfig } from 'tsup';
import { copyFileSync, rmSync } from 'fs';
import { join } from 'path';

// Clean dist before the first build
try { rmSync(join(__dirname, 'dist'), { recursive: true, force: true }); } catch {}

export default defineConfig([
  // ── Main entry (backward compat: core + react) ──
  {
    entry: ['index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    target: 'es2020',
    external: ['react', 'react-dom', '@base-ui/react'],
    noExternal: ['highlight.js'],
    onSuccess: async () => {
      copyFileSync('markdown.css', 'dist/markdown.css');
    },
  },
  // ── Core entry (framework-agnostic) ──
  {
    entry: ['core.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    target: 'es2020',
    external: [],
    noExternal: [],
  },
  // ── React entry ──
  {
    entry: ['react.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    target: 'es2020',
    external: ['react', 'react-dom', '@base-ui/react'],
    noExternal: ['highlight.js'],
  },
  // ── Vanilla entry (framework-agnostic) ──
  {
    entry: ['vanilla.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    target: 'es2020',
    external: [],
    noExternal: ['highlight.js'],
    onSuccess: async () => {
      copyFileSync('vanilla/vanilla.css', 'dist/vanilla.css');
    },
  },
  // ── Vue entry ──
  {
    entry: ['vue.ts'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    target: 'es2020',
    platform: 'neutral',
    external: ['vue'],
    noExternal: ['highlight.js'],
  },
  // ── Editor entry (existing) ──
  {
    entry: ['react/NReditor.tsx'],
    outDir: 'dist',
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    target: 'es2020',
    external: [
      'react',
      'react-dom',
      '@uiw/react-codemirror',
      '@codemirror/view',
      '@codemirror/state',
      '@codemirror/language',
      '@lezer/highlight',
    ],
    noExternal: [],
  },
]);
