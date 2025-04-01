import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "node:path";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "EduVenture - Innovatív pályaorientációs platform fiataloknak",
        short_name: "EduVenture",
        description:
          "Fedezd fel a legjobb pályaválasztási lehetőségeket és szakmai tanácsokat az EduVenture platformon!",
        theme_color: "#4F46E5",
        icons: [
          {
            src: "/icons/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any maskable",
          },
          {
            src: "/icons/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg,webp}"],
      },
    }),
  ],
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
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: [
            "react",
            "react-dom",
            "react-router-dom",
            "framer-motion",
            "@radix-ui/react-alert-dialog",
            "@radix-ui/react-avatar",
            "@radix-ui/react-dialog",
            "@radix-ui/react-label",
            "@radix-ui/react-progress",
            "@radix-ui/react-separator",
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
            "bootstrap",
            "react-bootstrap",
            "tailwindcss",
            "tailwind-merge",
            "tailwind-variants",
            "tailwindcss-animate",
          ],
          ui: ["lucide-react", "sonner", "next-themes"],
          editor: ["@tinymce/tinymce-react"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
    cssCodeSplit: true,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
});
