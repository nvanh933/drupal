const { resolve } = require('node:path');
const { defineConfig } = require('vite');

module.exports = defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    manifest: false,
    rollupOptions: {
      input: {
        vendor: resolve(__dirname, 'src/vendor/vendor.js'),
        common: resolve(__dirname, 'src/common/common.js'),
        'login-page': resolve(__dirname, 'src/pages/login/login-page.scss'),
        'reset-password-page': resolve(__dirname, 'src/pages/reset-password/reset-password-page.scss'),
      },
      output: {
        entryFileNames: 'js/[name].js',
        chunkFileNames: 'js/[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'css/[name][extname]';
          }
          return 'assets/[name][extname]';
        },
      },
    },
  },
});
