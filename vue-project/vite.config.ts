import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite"; //按需自动加载API插件
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueDevTools from "vite-plugin-vue-devtools";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), VueDevTools(), AutoImport({ imports: ["vue", "vue-router"], dts: "./auto-imports.d.ts" })],

  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
