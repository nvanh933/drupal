import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        quietDeps: true,
        silenceDeprecations: ['legacy-js-api'],
      },
    },
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: 'src/js/main.js',
      },
      output: {
        entryFileNames: 'js/[name].js',
        assetFileNames: 'css/[name].[ext]',
      }
    }
  }
});
