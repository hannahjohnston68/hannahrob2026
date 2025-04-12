import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { componentTagger } from "lovable-tagger";
import getPort from "get-port";

export default defineConfig(async ({ mode }) => {
  const defaultPort = 3000;
  const port = await getPort({ port: defaultPort });

  return {
    base: mode === 'production' ? '/hannahrob2026/' : '/',
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    build: {
      target: 'esnext',
      minify: 'terser',
      sourcemap: false,
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'ui-vendor': ['framer-motion'],
          },
        },
      },
    },
    server: {
      host: true, // Listen on all local IPs
      port,
      strictPort: false, // Allow fallback to another port if default is taken
      open: true, // Automatically open browser
      cors: true, // Enable CORS
      hmr: {
        overlay: true,
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    },
    optimizeDeps: {
      include: ['@firebase/app', '@firebase/firestore']
    }
  };
});
