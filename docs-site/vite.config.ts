import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      allow: ['..'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
          editor: [
            '@noirmd/previewer',
            '@uiw/react-codemirror',
            '@codemirror/view',
            '@codemirror/state',
            '@codemirror/language',
            '@lezer/highlight',
          ],
        },
      },
    },
  },
});