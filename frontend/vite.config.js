import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  root: './',
  server: {
    host: '::',
    port: 5173,
    watch: {
      usePolling: true,
    },
  },
})

