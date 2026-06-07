import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-gsap': ['gsap'],
          'vendor-framer': ['framer-motion'],
          'vendor-lenis': ['@studio-freight/lenis'],
        }
      }
    }
  }
})