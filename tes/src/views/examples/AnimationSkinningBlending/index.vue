<template>
  <div class="animationSkinningBlending"></div>
</template>

<script setup lang="ts">
import type { IParams } from "@/utils/twin/types";
import { Twin } from "./twin";

const query: IParams = {
  domName: ".animationSkinningBlending"
};

const twin3D = ref<Twin | null>();

const init3D = () => {
  twin3D.value = new Twin(query);
  console.log(twin3D.value);
};

onMounted(() => {
  init3D();
});

onUnmounted(() => {
  twin3D.value = null;
});
</script>

<style lang="scss" scoped></style>
