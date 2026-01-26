<template>
  <div class="box"></div>
</template>

<script setup lang="ts">
import { TunnelShuttleClass } from "./utils";

const TunnelShuttleClassRef = ref<TunnelShuttleClass>();

onMounted(() => {
  setTimeout(() => {
    const boxDom = document.querySelector(".box")! as HTMLElement;
    TunnelShuttleClassRef.value = new TunnelShuttleClass(boxDom);
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  TunnelShuttleClassRef.value?.destroy();
});
</script>

<style scoped></style>
