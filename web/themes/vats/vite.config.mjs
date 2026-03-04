import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    manifest: false,
    rollupOptions: {
      input: {
        vendor: resolve(import.meta.dirname, 'src/vendor/vendor.js'),
        common: resolve(import.meta.dirname, 'src/common/common.js'),
        'login-page': resolve(import.meta.dirname, 'src/pages/login/login-page.scss'),
        'reset-password-page': resolve(import.meta.dirname, 'src/pages/reset-password/reset-password-page.scss'),
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          const assetName = assetInfo.names?.[0] ?? '';
          if (assetName.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
