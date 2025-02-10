import { fileURLToPath, URL } from "node:url";
import AutoImport from "unplugin-auto-import/vite";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      imports: ["vue", "vue-router"],
      dts: "src/types/auto-imports.d.ts", //自定义生成 auto-imports.d.ts 路径丢失的问题
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
      dts: "src/types/components.d.ts", //自定义生成 components.d.ts 路径
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
