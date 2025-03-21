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
      includeAssets: [
        "eduventurelogohatternelkul.svg",
        "icons/*.png",
        "manifest.json",
      ],
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
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
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
});
