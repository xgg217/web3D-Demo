<script setup lang="ts">
import { Test2 } from "./test2";

const Test1Ref = ref<Test2>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box2")! as HTMLElement;
    Test1Ref.value = new Test2(boxDom);
  }, 1000);
});

onBeforeUnmount(() => {
  Test1Ref.value?.destroy();
});
</script>

<template>
  <div class="box2"></div>
</template>

<style scoped src="../style.css"></style>
<style scoped></style>
