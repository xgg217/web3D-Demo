<script setup lang="ts">
import { Test3 } from "./test3";

const Test1Ref = ref<Test3>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box3")! as HTMLElement;
    Test1Ref.value = new Test3(boxDom);
  }, 1000);
});

onBeforeUnmount(() => {
  Test1Ref.value?.destroy();
});
</script>

<template>
  <div class="box3"></div>
</template>

<style scoped src="../style.css"></style>
<style scoped></style>
