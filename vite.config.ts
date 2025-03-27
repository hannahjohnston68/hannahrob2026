import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import getPort from "get-port"; // Import a utility to check for open ports

export default defineConfig(async ({ mode }) => {
  const port = await getPort({ port: 3004 }); // Dynamically find an open port

  return {
    base: mode === 'production' ? '/hannahrob2026/' : '/',
    server: {
      host: "::",
      port, // Use the dynamically found open port
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host: 'localhost',
        port,
        clientPort: port
      }
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src')
        }
      ]
    },
    build: {
      outDir: 'dist',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html'),
        },
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./src/test/setup.ts'],
      include: ['src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    },
  };
});
