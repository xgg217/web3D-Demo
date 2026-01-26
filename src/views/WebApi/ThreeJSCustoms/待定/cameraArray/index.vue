<script setup lang="ts">
import { LeftCreate } from "./utils";

onMounted(() => {
  const leftCreate = new LeftCreate();
});
</script>

<template>
  <div class="box">
    <div class="left"></div>
    <div class="right">2</div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
  align-items: center;
  /* height: 100vh; */
  height: 100%;
}
.left,
.right {
  flex: 1;
  border: 1px solid red;
  /* height: 100vh; */
  height: 100%;
}
</style>
