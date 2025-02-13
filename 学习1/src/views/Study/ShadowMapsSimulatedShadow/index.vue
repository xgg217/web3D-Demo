<script setup lang="ts">
import { SimulatedShadow } from "./utils";

const SimulatedShadowClass = ref<SimulatedShadow>();

onMounted(() => {
  setTimeout(() => {
    SimulatedShadowClass.value = new SimulatedShadow();
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  SimulatedShadowClass.value?.destroy();
});
</script>

<template>
  <div class="box"></div>
</template>

<style scoped></style>
