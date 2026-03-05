import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'build',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        it: resolve(__dirname, 'it.html'),
        diy: resolve(__dirname, 'diy.html'),
      },
    },
  },
});
