<script setup lang="ts">
import { ShadowMapsPointLight } from "./utils";

onMounted(() => {
  new ShadowMapsPointLight();
});
</script>

<template>
  <div class="box"></div>
</template>

<style scoped></style>
