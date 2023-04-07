import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import ssr from 'vite-plugin-ssr/plugin';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), ssr()],
  optimizeDeps: { include: ['react/jsx-dev-runtime'] },
});
