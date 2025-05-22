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
  // console.log("销毁组件");
  createMountain.value?.destroy();
});
</script>

<style lang="scss" scoped></style>
