import { defineConfig, splitVendorChunkPlugin } from 'vite';
import react from '@vitejs/plugin-react';
import EnvironmentPlugin from 'vite-plugin-environment';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), splitVendorChunkPlugin(), EnvironmentPlugin('all')],
  resolve: {
    alias: {
      '@src': '/src',
    },
  },
  build: {
    commonjsOptions: {
      exclude: ['src/**/*.{test.tsx,test.ts}'],
    },
  },
});
