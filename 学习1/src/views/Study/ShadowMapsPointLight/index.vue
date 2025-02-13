<script setup lang="ts">
import { ShadowMapsPointLight } from "./utils";

const ShadowMapsPointLightClass = ref<ShadowMapsPointLight>();

onMounted(() => {
  setTimeout(() => {
    ShadowMapsPointLightClass.value = new ShadowMapsPointLight();
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  ShadowMapsPointLightClass.value?.destroy();
});
</script>

<template>
  <div class="box"></div>
</template>

<style scoped></style>
