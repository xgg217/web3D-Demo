<template>
  <div class="box1"></div>
</template>

<script setup lang="ts">
import { Test1 } from "./test1";

const Test1Ref = ref<Test1>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box1")! as HTMLElement;
    Test1Ref.value = new Test1(boxDom);
  }, 1000);
});

onBeforeUnmount(() => {
  Test1Ref.value?.destroy();
});
</script>

<style scoped>
.box1 {
  width: 100%;
  height: 50vh;
  border: 1px solid #000;
}
</style>
