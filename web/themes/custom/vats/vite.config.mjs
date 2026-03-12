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
        'vendor': resolve(import.meta.dirname, 'src/vendor/vendor.js'),
        'main': resolve(import.meta.dirname, 'src/common/main.scss'),
        'components': resolve(import.meta.dirname, 'src/components/index.js'),
        'user-login': resolve(import.meta.dirname, 'src/pages/user-login/user-login.scss'),
        'user-password': resolve(import.meta.dirname, 'src/pages/user-password/user-password.scss'),
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
