<script setup lang="ts">
// 参考
// https://threejs.org/manual/#zh/fog
import { Fog1 } from "./utils";

const Fog1Class = ref<Fog1>();

onMounted(() => {
  setTimeout(() => {
    Fog1Class.value = new Fog1();
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  Fog1Class.value?.destroy();
});
</script>

<template>
  <div class="box"></div>
</template>

<style scoped>
.box {
  position: relative;
  top: 0;
  left: 0;
}
</style>
