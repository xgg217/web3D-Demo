<template>
  <div class="phone"></div>
</template>

<script setup lang="ts">
import init from "./twin";
import { isCanvas } from "@/utils/isCanvas"

const init3D = () => {
  {
    const isBool = isCanvas(".main .animationSkinningAdditiveBlending");
    if (isBool) {
      // return;
    }
  }

  const twin = init();

  // 相机调整
  twin.camera.position.set(350, 160, 300);
  twin.camera.lookAt(0, 0, 0);

};

// 页面加载
onMounted(() => {
  init3D();
});
</script>

<style lang="scss" scoped>
</style>