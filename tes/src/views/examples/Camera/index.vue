<template>
  <div class="camera"></div>
</template>

<script setup lang="ts" name="Camera">
import { init } from "./twin";

onMounted(() => {
  const twin = init();
  console.log(twin);
});
</script>

<style lang="scss" scoped></style>
