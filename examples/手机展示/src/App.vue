<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import * as THREE from 'three';
import { camera } from './utils/player';
import { phoneGroup } from './utils/phone';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

let stopRender = false;

const { warppRef, init } = (() => {
  const scene = new THREE.Scene();
  const warppRef = ref<HTMLDivElement | null>(null);
  let renderer: THREE.WebGLRenderer | null = null;
  let controls: OrbitControls;
  // const clock = new THREE.Clock();

  // 设置光源
  const setLight = () => {
    // 平行光1
    const directionLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionLight.position.set(100, 200, 300);
    scene.add(directionLight);

    // 平行光2
    const directionLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionLight2.position.set(-400, -200, -300);
    scene.add(directionLight2);

    // 环境光
    const ambient = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambient);

    // DirectionalLightHelper：可视化平行光
    var helper1 = new THREE.DirectionalLightHelper(directionLight, 5);
    scene.add(helper1);
    var helper2 = new THREE.DirectionalLightHelper(directionLight2, 5);
    scene.add(helper2);
  };

  // 设置渲染器
  const setRenderer = () => {
    // 初始化渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true //开启锯齿
    });

    // 设置设备像素比率,防止Canvas画布输出模糊
    renderer.setPixelRatio(window.devicePixelRatio);
    // 设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 将webgl渲染的canvas内容添加到body
    warppRef.value?.appendChild(renderer.domElement);
  };

  // 辅助工具
  const setAuxiliaryTool = () => {
    // 辅助箭头
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // 添加一个辅助网格地面
    // const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
    // scene.add(gridHelper);

    // gui
    // {
    //   const gui = new GUI();
    //   gui.add(camera.position, 'x', 0, 500);
    //   gui.add(camera.position, 'y', 0, 500);
    //   gui.add(camera.position, 'z', 0, 600);
    //   // scene.add(gui);
    // }
  };

  // 设置窗口大小
  const setWindowResize = () => {
    window.addEventListener('resize', () => {
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
      phoneGroup.rotateY(0.005); // 每次渲染的时候旋转

      // const deltaTime = clock.getDelta();

      // playerUpdate(deltaTime); // 更新任务
      // mixer.update(deltaTime); // 更新播放器相关的时间

      renderer!.render(scene, camera);
      requestAnimationFrame(render);
      // console.log(camera.position);
    }
  };

  // 相机控制器
  const initOrbitControls = () => {
    controls = new OrbitControls(camera, renderer!.domElement);
    controls.addEventListener('change', function () {
      renderer!.render(scene, camera); //执行渲染操作
    }); //监听鼠标、键盘事件
  };

  // 初始化
  const init = () => {
    scene.add(phoneGroup);

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

    //
    initOrbitControls();
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
