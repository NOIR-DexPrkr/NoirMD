import { defineConfig } from 'tsup';
import { copyFileSync } from 'fs';

export default defineConfig([
  {
    entry: ['index.ts'],
    format: ['esm', 'cjs'],
    dts: true,
    sourcemap: true,
    clean: true,
    target: 'es2020',
    external: ['react', 'react-dom', '@base-ui/react'],
    noExternal: ['highlight.js'],
    onSuccess: async () => {
      copyFileSync('markdown.css', 'dist/markdown.css');
    },
  },
  {
    entry: ['NReditor.tsx'],
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
