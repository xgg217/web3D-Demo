<script setup lang="ts">
import { CameraSetScissorTest } from "./utils";

onMounted(() => {
  new CameraSetScissorTest();
});
</script>

<template>
  <div class="box"></div>
</template>

<style scoped>
.box {
  height: calc(100vh -50px);
}
/* .box {
  display: flex;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
} */
</style>
