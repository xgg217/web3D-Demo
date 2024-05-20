<template>
  <div class="animationSkinningIk"></div>
</template>

<script setup lang="ts">
import init from "./twin";
import { isCanvas } from "@/utils/isCanvas";

const init3D = () => {
  {
    const isBool = isCanvas(".main .animationSkinningIk");
    if (isBool) {
      // return;
    }
  }

  const twin = init();
  // console.log(twin);

  // 相机调整
  twin.camera.position.set(-2, 4, 4);
  twin.camera.lookAt(0, 0, 0);

  const url = new URL("./kira.glb", import.meta.url).href;
  twin.GLTFLoader.load(url, gltf => {
    gltf.scene.traverse(object => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (object.isMesh) {
        object.castShadow = true;
      }
    });
    twin.scene.add(gltf.scene);
  });
};

// 页面加载
onMounted(() => {
  init3D();
});
</script>

<style lang="scss" scoped></style>
