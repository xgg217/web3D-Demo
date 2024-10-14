<template>
  <div class="layout">
    <!-- 左侧导航栏 -->
    <NavCmp />

    <!-- 内容区 -->
    <MainCmp />
  </div>
</template>

<script setup lang="ts">
import MainCmp from "./components/MainCmp.vue";
import NavCmp from "./components/NavCmp.vue";
</script>

<style scoped>
.layout {
  display: flex;
}
</style>
