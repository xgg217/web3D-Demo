<template>
  <div></div>
</template>

<script setup lang="ts">
import init from "./twin";
// import { CreateTwin } from "@/utils/twin/createTwin";

// const trin = new CreateTwin();

const init3D = () => {
  const twin = init();
  const url = new URL("./Xbot.glb", import.meta.url).href;
  console.log(url);
  twin.GLTFLoader.load(url, gltf => {
    console.log(gltf);
    twin.scene.add(gltf.scene);
  });

  // console.log(
  //   twin.GLTFLoader.load(url, gltf => {
  //     console.log(gltf);
  //     twin.scene.add(gltf.scene);
  //   })
  // );
};

onMounted(() => {
  init3D();
});
</script>

<style lang="scss" scoped></style>
