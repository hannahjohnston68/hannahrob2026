import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

export default defineConfig({
  base: "/hannahrob2026/",
  plugins: [react()],
  build: {
    sourcemap: false,
    outDir: "dist",
    rollupOptions: {
      input: "src/index.tsx", // ✅ Ensures the correct entry point
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
