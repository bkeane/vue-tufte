import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  const isDemo = mode === 'demo'
  
  return {
    base: isDemo ? '/vue-tufte/' : '/',
    plugins: [
      vue({
        template: {
          compilerOptions: {
            whitespace: 'preserve'
          }
        }
      }),
      // Only include library-specific plugins for library build
      ...(isDemo ? [] : [
        dts({
          insertTypesEntry: true,
          outDir: 'dist',
          include: ['src/**/*']
        }),
        cssInjectedByJsPlugin(),
      ])
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    // Conditional build configuration
    build: isDemo 
      ? {
          // Demo site build - builds index.html and assets
          outDir: 'dist',
          chunkSizeWarningLimit: 1000
        }
      : {
          // Library build - builds components for npm
          lib: {
            entry: resolve(__dirname, 'src/index.ts'),
            name: 'VueTufte',
            formats: ['es', 'umd'],
            fileName: (format) => `vue-tufte.${format}.js`
          },
          rollupOptions: {
            external: ['vue'],
            output: {
              globals: {
                vue: 'Vue'
              },
              exports: 'named'
            }
          }
        }
  }
})
