<script setup lang="ts">
import { Test1 } from "./utils";
import { cereateBarChart2 } from "./utils2";

const Test1Ref = ref<Test1>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box2")! as HTMLElement;
    Test1Ref.value = new Test1(boxDom, cereateBarChart2);
  }, 1000);
});

onBeforeUnmount(() => {
  Test1Ref.value?.destroy();
});
</script>

<template>
  <div class="box2"></div>
</template>

<style scoped>
.box2 {
  height: 50%;
  width: 100%;
}
</style>
