<template>
  <div class="box"></div>
</template>

<script setup lang="ts">
import { CreateMountain } from "./CreateMountainClass";

const createMountain = ref<CreateMountain>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box")! as HTMLElement;
    createMountain.value = new CreateMountain(boxDom);
  }, 1000);
});

onBeforeUnmount(() => {
  createMountain.value?.destroy();
});
</script>

<style scoped></style>
