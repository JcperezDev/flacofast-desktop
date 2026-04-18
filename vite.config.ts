import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue(), tailwindcss()],
  clearScreen: false,
  server: {
    strictPort: true,
    port: 1420,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL ?? 'http://127.0.0.1:3000',
        changeOrigin: true,
      },
    },
  },
  envPrefix: ['VITE_', 'TAURI_'],
})
