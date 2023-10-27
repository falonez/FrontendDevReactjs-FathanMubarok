import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA, VitePWAOptions  } from "vite-plugin-pwa";
import workbox from 'workbox-sw';
const manifestForPlugIn : Partial <VitePWAOptions> = {
  registerType: "prompt",
	includeAssets: ["favicon.ico", "apple-touch-icon.png", "masked-icon.svg"],
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
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    VitePWA(manifestForPlugIn),
    workbox({
      // Opsi Workbox
      precaching: [
        {
          // Nama cache
          cacheName: 'my-app',
          // File-file yang akan di-cache
          files: [
            '/index.html',
            '/assets/style.css',
            '/assets/app.js',
            '/assets/image.png',
          ],
        },
      ],
      expiration: {
        // Nama cache
        cacheName: 'my-app',
        // File-file yang akan di-cache
        files: [
          '/index.html',
          '/assets/style.css',
          '/assets/app.js',
          '/assets/image.png',
        ],
        // Durasi cache
        duration: {
          days: 7,
        },
      },
    }),
  ],
})
