import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  server: {
    port: 3000
  },
  build: {
    outDir: '../docs-dist',
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Shiki core from languages and themes
          'shiki-core': ['shiki'],
          // Group Shiki languages by category to avoid too many small chunks
          'shiki-web-langs': [
            '@shikijs/langs/javascript',
            '@shikijs/langs/typescript', 
            '@shikijs/langs/html',
            '@shikijs/langs/css',
            '@shikijs/langs/json',
            '@shikijs/langs/yaml'
          ],
          'shiki-system-langs': [
            '@shikijs/langs/bash',
            '@shikijs/langs/dockerfile',
            '@shikijs/langs/python',
            '@shikijs/langs/rust'
          ],
          // Group themes
          'shiki-themes': [
            '@shikijs/themes/nord',
            '@shikijs/themes/github-light',
            '@shikijs/themes/github-dark',
            '@shikijs/themes/dracula'
          ]
        }
      }
    },
    chunkSizeWarningLimit: 1000 // Increase limit to 1MB for remaining chunks
  }
})