import { defineConfig } from 'vite';
import solidPlugin from 'vite-plugin-solid';
import {VitePWA} from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [solidPlugin(), 
    VitePWA({
      includeAssets: ['favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Chief2',
        short_name: 'Chief2 Scout',
        description: 'Team 4099 Chief2 Scouting App',
        theme_color: '#ffffff',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          }
        ]
      }
    }
    )
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
