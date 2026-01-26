<script setup lang="ts">
import { onMounted, ref } from "vue";
import {
  Scene,
  Color,
  Fog,
  PerspectiveCamera,
  DirectionalLight,
  AmbientLight,
  WebGLRenderer,
  AxesHelper,
  CameraHelper,
} from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { getElmWidhtAndHeight } from "@/utils/index";
import Stats from "three/addons/libs/stats.module.js";
import model from "./model";

const canRef = ref();
const width = ref(0); // 高度
const height = ref(0); // 高度

const scene = new Scene();
const stats = new Stats();

scene.add(model);

//辅助观察的坐标系
const axesHelper = (() => {
  const axesHelper = new AxesHelper(100);
  scene.add(axesHelper);
  return axesHelper;
})();

scene.add(axesHelper);

// 光源设置
(() => {
  const dirLight = new DirectionalLight(0xffffff, 3);
  dirLight.position.set(3, 10, 10);
  dirLight.castShadow = true; //
  dirLight.shadow.camera.top = 2;
  dirLight.shadow.camera.bottom = -2;
  dirLight.shadow.camera.left = -1;
  dirLight.shadow.camera.right = 1;
  dirLight.shadow.camera.near = 0;
  dirLight.shadow.camera.far = 20;
  dirLight.shadow.radius = 1;
  dirLight.shadow.mapSize.set(1024, 1024);
  scene.add(dirLight);
  // const ambient = new AmbientLight(0xffffff, 0.4);
  // scene.add(ambient);

  // const cameraHelper = new CameraHelper(dirLight.shadow.camera);
  // scene.add(cameraHelper);
})();

// 2.创建相机 - 正交相机
const cameraFun = () => {
  //渲染器和相机

  const camera = new PerspectiveCamera(45, width.value / height.value, 1, 3000);
  camera.position.set(-2, 4, 4); //根据渲染范围尺寸数量级设置相机位置
  camera.lookAt(0, 0, 0);
  return camera;
};

// WebGL渲染器设置
const renderer = function renderer(camera: PerspectiveCamera): WebGLRenderer {
  const renderer = new WebGLRenderer({
    antialias: true, // 开启优化锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
  // 设置渲染的尺寸大小
  renderer.setSize(width.value, height.value);
  // 将webgl渲染的canvas内容添加到body

  // renderer.setClearColor(0xa0a0a0, 1); // 设置背景颜色
  renderer.setClearColor(0xffffff, 1); // 设置背景颜色
  // scene.background = new Color(0xa0a0a0);
  // scene.fog = new Fog(0xa0a0a0, 10, 50);

  // 设置渲染器，允许光源阴影渲染
  renderer.shadowMap.enabled = true;

  canRef.value.appendChild(renderer.domElement);

  // 渲染帧率
  {
    // @ts-ignore
    const el = stats.domElement;
    el.style.left = "300px";
    // @ts-ignore
    canRef.value.appendChild(stats.domElement);
  }

  const controls = new OrbitControls(camera, renderer.domElement);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  controls.target.set(0, 0, 0);

  controls.addEventListener("change", function () {
    renderer.render(scene, camera); //执行渲染操作
  }); //监听鼠标、键盘事件
  return renderer;
};

onMounted(() => {
  const { w, h } = getElmWidhtAndHeight(canRef.value);
  width.value = w;
  height.value = h;

  const camera = cameraFun();

  const rend = renderer(camera);

  const render = function render() {
    stats.update();
    rend.render(scene, camera);
    requestAnimationFrame(render);
  };

  render();
});
</script>

<template>
  <div ref="canRef"></div>
</template>

<style scoped>
div {
  height: 100%;
}
</style>
