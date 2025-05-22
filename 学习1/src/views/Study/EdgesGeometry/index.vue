<template>
  <div class="box">1</div>
</template>

<script setup lang="ts">
import { BoxClass } from "./BoxClass";

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box")! as HTMLElement;
    new BoxClass(boxDom);
  }, 1000);
});
</script>

<style lang="scss" scoped></style>
