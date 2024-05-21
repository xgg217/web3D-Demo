<template>
  <div class="camera"></div>
</template>

<script setup lang="ts">
import {init} from "./twin";

onMounted(() => {
  const twin = init();
  console.log(twin);

})
</script>

<style lang="scss" scoped>
</style>