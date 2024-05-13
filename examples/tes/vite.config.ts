import { fileURLToPath, URL } from 'node:url'
import AutoImport from 'unplugin-auto-import/vite' //按需自动加载API插件

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    VueDevTools(),
    AutoImport({
      imports: ['vue', 'vue-router'],
      // 自定义 导入
      dirs: ['./src/api'],
      dts: './src/auto-imports.d.ts' // 解决使用了ts会出现类型丢失的问题
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
