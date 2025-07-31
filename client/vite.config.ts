import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig(({ mode }) => ({
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: true,
  },
  plugins: [
    react(),
  ].filter(Boolean),
  build: {
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': path.resolve('./src'),
      '@components': path.resolve('./src/components'),
      '@pages': path.resolve('./src/pages'),
      '@assets': path.resolve('./src/assets'),
      '@constants': path.resolve('./src/constants'),
      '@styles': path.resolve('./src/styles'),
      '@tsx': path.resolve('./src/TSX-src'), 
    },
  },
}));
