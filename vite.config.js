import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command }) => ({
  plugins: [react()],
  // Serve from / in local development and keep GitHub Pages base in production builds.
  base: command === 'serve' ? '/' : '/zentenos-grill-menu/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
  server: {
    port: 5173,
    open: true,
  },
}));
