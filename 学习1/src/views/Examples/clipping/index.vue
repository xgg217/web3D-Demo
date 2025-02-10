<script setup lang="ts">
import Clipping from "./utils";

onMounted(() => {
  new Clipping();
});
</script>

<template>
  <div class="warpp">
    <div class="box"></div>
  </div>
</template>

<style scoped>
.warpp,
.box {
  height: 100%;
}
</style>
