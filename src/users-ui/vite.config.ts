import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        assetFileNames: assetInfo => {
          return "assets/[name][extname]";
        },
        entryFileNames: chunkInfo => {
          return "assets/[name].js";
        },
      },
    },
  },
});
