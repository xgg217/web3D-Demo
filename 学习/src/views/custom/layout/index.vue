<template>
  <div class="layout">
    <!-- 左侧导航栏 -->
    <NavCmp path-name="custom" />

    <!-- 内容区 -->
    <MainCmp />
  </div>
</template>

<script setup lang="ts">
import MainCmp from "@/components/layout/MainCmp.vue";
import NavCmp from "@/components/layout/NavCmp.vue";
</script>

<style scoped>
.layout {
  display: flex;
}
</style>
