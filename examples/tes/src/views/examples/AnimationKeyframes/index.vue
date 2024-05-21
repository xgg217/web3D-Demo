<template>
  <div class="animationKeyframes"></div>
</template>

<script setup lang="ts" name="AnimationKeyframes">
import init from "./twin";

const init3D = () => {
  // {
  //   const isBool = isCanvas(".main .animationSkinningAdditiveBlending");
  //   if (isBool) {
  //     // return;
  //   }
  // }

  const twin = init();

  const url = new URL("./LittlestTokyo.glb", import.meta.url).href;
  twin.GLTFLoader.load(url, gltf => {
    const model = gltf.scene;
    model.position.set(1, 1, 0);
    // model.scale.set(0.01, 0.01, 0.01);

    twin.scene.add(model);
  });
};

// 页面加载
onMounted(() => {
  init3D();
});
</script>

<style lang="scss" scoped></style>
