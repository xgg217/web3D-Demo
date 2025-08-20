<template>
  <div class="box"></div>
</template>

<script setup lang="ts">
import { BoxClass } from "./utils";

const boxClass = ref<BoxClass>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box")! as HTMLElement;
    boxClass.value = new BoxClass(boxDom);
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  boxClass.value?.destroy();
});
</script>

<style lang="scss" scoped></style>
