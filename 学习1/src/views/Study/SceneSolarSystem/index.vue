<script setup lang="ts">
import SolarSystem from "./utils";

const SolarSystemClass = ref<SolarSystem>();

onMounted(() => {
  setTimeout(() => {
    SolarSystemClass.value = new SolarSystem();
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  SolarSystemClass.value?.destroy();
});
</script>

<template>
  <div class="box"></div>
</template>

<style scoped></style>
