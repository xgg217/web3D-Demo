<script setup lang="ts">
import { Test1 } from "./utils";
import { cereateBarChart } from "./utils2";

const Test1Ref = ref<Test1>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box1")! as HTMLElement;
    Test1Ref.value = new Test1(boxDom, cereateBarChart);
  }, 1000);
});

onBeforeUnmount(() => {
  Test1Ref.value?.destroy();
});
</script>

<template>
  <div class="box1"></div>
</template>

<style scoped>
.box1 {
  height: 50%;
  width: 100%;
}
</style>
