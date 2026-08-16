import { build } from 'esbuild';

await build({
  entryPoints: ['test/main.jsx'],
  bundle: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2020',
  jsx: 'automatic',
  loader: { '.ts': 'ts', '.tsx': 'tsx' },
  outfile: 'test/bundle.js',
  define: { 'process.env.NODE_ENV': '"development"' },
  logLevel: 'info',
});

console.log('OK — test/bundle.js generado. Abre test/index.html');