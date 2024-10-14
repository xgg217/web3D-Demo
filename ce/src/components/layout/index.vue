<template>
  <div class="layout">
    <!-- 左侧导航栏 -->
    <NavCmp path-name="examples" />

    <!-- 内容区 -->
    <MainCmp />
  </div>
</template>

<script setup lang="ts">
import MainCmp from "./MainCmp.vue";
import NavCmp from "./NavCmp.vue";
</script>

<style scoped>
.layout {
  display: flex;
}
</style>
