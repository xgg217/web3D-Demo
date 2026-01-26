<script setup lang="ts">
// 参考 https://threejs.org/examples/?q=DRACO#webgl_loader_draco
import { Test1 } from "./utils";

const Test1Ref = ref<Test1>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box")! as HTMLElement;
    Test1Ref.value = new Test1(boxDom);
  }, 1000);
});

onBeforeUnmount(() => {
  Test1Ref.value!.destroy();
});
</script>

<template>
  <div class="box"></div>
</template>

<style scoped></style>
