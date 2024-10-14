<template>
  <div class="animationKeyframes"></div>
</template>

<script setup lang="ts" name="AnimationKeyframes">
import Twin from "./twin";
import type { IParams } from "@/utils/twin/types";

const init3D = () => {

  const query: IParams = {
    domName: ".animationKeyframes"
  };

  const twin = new Twin(query);

  console.log(twin);

  // {
  //   const isBool = isCanvas(".main .animationSkinningAdditiveBlending");
  //   if (isBool) {
  //     // return;
  //   }
  // }
};

// 页面加载
onMounted(() => {
  init3D();
});
</script>

<style lang="scss" scoped></style>
