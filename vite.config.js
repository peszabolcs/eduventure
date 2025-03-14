import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
  resolve: {
    alias: {
      // eslint-disable-next-line no-undef
      // "@": path.resolve(__dirname, "/src"),
    },
  },
  optimizeDeps: {
    include: ["canvas-confetti"],
  },
});
