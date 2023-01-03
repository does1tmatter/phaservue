import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import svgLoader from 'vite-svg-loader'

const autoImportOpts = {
  imports: [
    'vue',
    'vue-router',
    '@vueuse/core'
  ],
  vueTemplate: true
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport(autoImportOpts),
    svgLoader()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
