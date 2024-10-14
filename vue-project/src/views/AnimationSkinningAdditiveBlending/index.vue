<template>
  <div>AnimationSkinningAdditiveBlending</div>
</template>

<script setup lang="ts">
// import twin from "./twin";
import { CreateTwin } from "@/utils/twin/createTwin";

const trin = new CreateTwin();

const init3D = () => {
  console.log(trin);
};

const a = 1;

console.log(a);

onMounted(() => {
  init3D();
});
</script>

<style lang="scss" scoped></style>
