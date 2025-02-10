<script setup lang="ts">
import markdownit from "markdown-it";
import README from "./../../README.md?raw";

const md = markdownit();
const mdHTML = md.render(README);

const routerArr = [
  {
    name: "学习",
    path: "/study",
  },
  {
    name: "WebGL",
    path: "/examples",
  },
  {
    name: "自定义",
    path: "/custom",
  },
] as const;
</script>

<template>
  <main>
    <ElMenu
      router
      style="width: 200px"
      active-text-color="#ffd04b"
      background-color="#545c64"
      class="el-menu-vertical-demo"
      default-active="2"
      text-color="#fff"
    >
      <template v-for="item of routerArr" :key="item.path">
        <ElMenuItem :index="item.path">
          <span>{{ item.name }}</span>
        </ElMenuItem>
      </template>
    </ElMenu>
  </main>
  <footer>
    <ElCard style="width: 100%">
      <template #header>
        <div class="card-header">
          <span>备注</span>
        </div>
      </template>
      <div class="aside">
        <div v-html="mdHTML"></div>
      </div>
    </ElCard>
  </footer>
</template>

<style scoped>
main {
  width: 70%;
  display: inline-flex;
  box-sizing: border-box;
}
footer {
  display: inline-flex;
  width: 30%;
  box-sizing: border-box;
  height: 100%;
}

.aside {
  height: calc(100vh - 120px);
  overflow-y: auto;
}
</style>
