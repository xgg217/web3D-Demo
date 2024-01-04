<script setup lang="ts">
import { onMounted, ref, onUnmounted } from "vue";
import * as THREE from "three";
import { camera } from "./utils/player"

let stopRender = false;

const { warppRef, init } = (() => {
  const scene = new THREE.Scene();
  const warppRef = ref<HTMLDivElement | null>(null);
  let renderer: THREE.WebGLRenderer | null = null;
  const clock = new THREE.Clock();

  // 设置光源
  const setLight = () => {
    const directionLight = new THREE.DirectionalLight(0xffffff, 0.4);
    const ambient = new THREE.AmbientLight(0xffffff, 0.4);

    scene.add(directionLight);
    scene.add(ambient);
  };

  // 设置渲染器
  const setRenderer = () => {
    // 初始化渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true
    });

    // 设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    // console.log(warppRef.value);

    // 将webgl渲染的canvas内容添加到body
    warppRef.value?.appendChild(renderer.domElement);
  };

  // 辅助工具
  const setAuxiliaryTool = () => {
    // 辅助箭头
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // 添加一个辅助网格地面
    const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
    scene.add(gridHelper);
  };

  // 设置窗口大小
  const setWindowResize = () => {
    window.addEventListener("resize", () => {
      // 重置渲染器输出画布canvas尺寸
      renderer?.setSize(window.innerWidth, window.innerHeight);

      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      camera.aspect = window.innerWidth / window.innerHeight;

      camera.updateProjectionMatrix();
    });
  };

  // 渲染循环
  const render = () => {
    if (!stopRender) {
      const deltaTime = clock.getDelta();

      // playerUpdate(deltaTime); // 更新任务
      // mixer.update(deltaTime); // 更新播放器相关的时间

      renderer?.render(scene, camera);
      requestAnimationFrame(render);
    }
  };

  // 初始化
  const init = () => {
    window.setTimeout(() => {
      // scene.add(group);

      // 设置光源
      setLight();

      // 渲染器
      setRenderer();

      // 辅助工具
      setAuxiliaryTool();

      // 自适应窗口被调整大小时发生的事件
      setWindowResize();

      // 渲染循环
      render();

    }, 500);
  };

  return {
    warppRef,
    init
  };
})();

onMounted(() => {
  init();
});

onUnmounted(() => {
  stopRender = true;
});
</script>

<template>
  <div ref="warppRef" class="warpp"></div>
</template>

<style scoped>
.warpp {
  width: 100%;
  height: 100%;
}
</style>
