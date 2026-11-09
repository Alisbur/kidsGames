import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/kidsGames/",
  server: {
    port: 4000,
  },
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
      "@assets": path.resolve(import.meta.dirname, "./src/assets"),
      "@pages": path.resolve(import.meta.dirname, "./src/pages"),
      "@styles": path.resolve(import.meta.dirname, "./src/shared/styles"),
      "@components": path.resolve(import.meta.dirname, "./src/components"),
      "@shared": path.resolve(import.meta.dirname, "./src/shared"),
    },
  },
});
