import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import {VitePWA} from 'vite-plugin-pwa';


export default defineConfig({
  plugins: [
    react(), // Plugin React (jika Anda menggunakan React)
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ["**/*"],
      },
      // add this to cache all the
      // static assets in the public folder
      includeAssets: [
          "**/*",
      ],
      manifest: {
        name: "Tuangkeun Kuy",
        short_name: "Tuangkeun Kuy",
        description: "An app that can show weather forecast for your city.",
        icons: [
          {
            src: "/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "apple touch icon",
          },
          {
            src: "/maskable_icon.png",
            sizes: "225x225",
            type: "image/png",
            purpose: "any maskable",
          },
        ],
        theme_color: "#171717",
        background_color: "#e8ebf2",
        display: "standalone",
        scope: "/",
        start_url: "/",
        orientation: "portrait",
      },
    }),
  ],
  // Konfigurasi lainnya
});
