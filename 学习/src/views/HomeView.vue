<script setup lang="ts">
import { RouterLink } from "vue-router";
import { ElCard } from "element-plus";
import markdownit from "markdown-it";
import README from "./../../README.md?raw";

const md = markdownit();
const mdHTML = md.render(README);
</script>

<template>
  <main>
    <RouterLink to="/study">学习</RouterLink>
    <RouterLink to="/examples">webgl</RouterLink>
    <RouterLink to="/custom">自定义</RouterLink>
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
