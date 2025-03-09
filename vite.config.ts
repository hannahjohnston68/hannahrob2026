import { defineConfig } from "vite";
<<<<<<< HEAD
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // Use relative paths to fix GitHub Pages 404 errors
  plugins: [react()],
  build: {
    rollupOptions: {
      input: "index.html", // Ensure correct entry point
=======
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
>>>>>>> 4ee7548a972a378186989f507344abc210d5fabc
    },
  },
}));
