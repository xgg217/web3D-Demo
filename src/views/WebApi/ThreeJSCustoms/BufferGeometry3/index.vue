<script setup lang="ts">
import Test1Cmp from "./components/Test1Cmp.vue";
import Test2Cmp from "./components/Test2Cmp.vue";
import Test3Cmp from "./components/Test3Cmp.vue";
</script>

<template>
  <div class="box">
    <Test1Cmp />
    <Test2Cmp />
    <Test3Cmp />
  </div>
</template>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: auto;
}
</style>
