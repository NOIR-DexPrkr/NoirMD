import { defineConfig } from 'tsup';
import { copyFileSync, cpSync, rmSync, statSync } from 'fs';
import { join } from 'path';

// Clean dist before the first build
try { rmSync(join(__dirname, 'dist'), { recursive: true, force: true }); } catch {}

// Copy all vanilla CSS files (entry + partials + fonts) into dist so the
// @import chain inside vanilla.css resolves relative to the package.
async function copyVanillaCss() {
  cpSync('vanilla', 'dist', {
    recursive: true,
    filter: (src: string) =>
      statSync(src).isDirectory() ||
      src.endsWith('.css') ||
      src.endsWith('.woff2'),
  });
}

export default defineConfig([
  // ── Main entry (backward compat: core + react) ──
  {
    entry: ['index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    target: 'es2020',
    external: ['react', 'react-dom'],
    noExternal: ['highlight.js'],
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
    external: ['react', 'react-dom'],
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
    onSuccess: copyVanillaCss,
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
    onSuccess: async () => {
      copyFileSync('editor.css', 'dist/editor.css');
    },
  },
]);
