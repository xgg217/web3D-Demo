<template>
  <div></div>
</template>

<script setup lang="ts">
import init from "./twin";

const init3D = () => {
  const twin = init();

  // 相机调整
  twin.camera.position.set(-2, 4, 4);
  twin.camera.lookAt(0, 0, 0);

  twin.renderer.setClearColor(0xffffff, 1); // 设置背景颜色
  // 设置渲染器，允许光源阴影渲染renderer.shadowMap.enabled
  twin.renderer.shadowMap.enabled = true;

  // 光源设置
  twin.directionalLight.position.set(3, 10, 10);
  twin.directionalLight.castShadow = true; //
  twin.directionalLight.shadow.camera.top = 2;
  twin.directionalLight.shadow.camera.bottom = -2;
  twin.directionalLight.shadow.camera.left = -1;
  twin.directionalLight.shadow.camera.right = 1;
  twin.directionalLight.shadow.camera.near = 0;
  twin.directionalLight.shadow.camera.far = 20;
  twin.directionalLight.shadow.radius = 1;
  twin.directionalLight.shadow.mapSize.set(1024, 1024);

  const url = new URL("./Xbot.glb", import.meta.url).href;
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

onMounted(() => {
  init3D();
});
</script>

<style lang="scss" scoped></style>
