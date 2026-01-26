<script setup lang="ts">
import Test1Cmp from "./components/Test1Cmp/index.vue";
import Test2Cmp from "./components/Test2Cmp/index.vue";
import Test3Cmp from "./components/Test3Cmp/index.vue";
</script>

<template>
  <div class="box">
    <Test1Cmp />

    <el-divider content-position="left">纹理2</el-divider>
    <Test2Cmp />

    <el-divider content-position="left">纹理之批量加载回调</el-divider>
    <Test3Cmp />
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: auto;
  border: 1px solid #000;
}
</style>
