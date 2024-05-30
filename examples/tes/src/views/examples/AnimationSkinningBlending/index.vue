<template>
  <div class="animationSkinningBlending"></div>
</template>

<script setup lang="ts">
import type { IParams } from "@/utils/twin/types";
import { Twin } from "./twin";

const query: IParams = {
  domName: ".animationSkinningBlending"
};

const init3D = () => {
  const twin = new Twin(query);
  console.log(twin);
};

onMounted(() => {
  init3D();
});
</script>

<style lang="scss" scoped></style>
