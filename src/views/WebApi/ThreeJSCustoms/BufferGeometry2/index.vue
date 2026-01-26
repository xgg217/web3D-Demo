<script setup lang="ts">
import { Points } from "./utils";

const pointsRef = ref<Points>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box")! as HTMLElement;
    pointsRef.value = new Points(boxDom);
  }, 1000);
});

onBeforeUnmount(() => {
  pointsRef.value?.destroy();
});
</script>

<template>
  <div class="box"></div>
</template>

<style scoped></style>
