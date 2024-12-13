<script setup lang="ts">
import { CameraSetScissorTest } from "./utils";

onMounted(() => {
  new CameraSetScissorTest();
});
</script>

<template>
  <div class="box">
    <div class="split">
      <div id="view1" tabindex="1"></div>
      <div id="view2" tabindex="2"></div>
    </div>
  </div>
</template>

<style scoped>
.box {
  height: calc(100vh -50px);
}

.split {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
.split > div {
  border: 1px solid red;
  width: 50%;
  height: 100%;
}
</style>
