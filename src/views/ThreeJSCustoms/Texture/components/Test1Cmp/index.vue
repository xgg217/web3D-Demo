<script setup lang="ts">
import { Textures } from "./utils";

const texturesClass = ref<Textures>();

onMounted(() => {
  setTimeout(() => {
    texturesClass.value = new Textures();
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  texturesClass.value?.destroy();
});
</script>

<template>
  <div class="box1"></div>
</template>

<style scoped src="../style.css"></style>
<style scoped></style>
