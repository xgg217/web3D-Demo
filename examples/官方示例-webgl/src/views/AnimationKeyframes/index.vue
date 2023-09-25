<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Scene, PerspectiveCamera, DirectionalLight, AmbientLight, WebGLRenderer, AxesHelper } from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { getElmWidhtAndHeight } from '@/utils/index';
import model from "./model"

const canRef = ref();
const width = ref(0); // 高度
const height = ref(0); // 高度

const scene = new Scene();


scene.add(model);

//辅助观察的坐标系
const axesHelper = (() => {
  const axesHelper = new AxesHelper(100);
  scene.add(axesHelper);
  return axesHelper
})();

scene.add(axesHelper);

// 光源设置
(() => {
  const directionalLight = new DirectionalLight(0xffffff, 1);
  directionalLight.position.set(100, 60, 50);
  scene.add(directionalLight);
  const ambient = new AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
})();


// 2.创建相机 - 正交相机
const cameraFun = (() => {
  //渲染器和相机
  console.log(width.value);

  const camera = new PerspectiveCamera(90, width.value / height.value, 1, 3000);
  camera.position.set(292, 223, 185);//根据渲染范围尺寸数量级设置相机位置
  camera.lookAt(0, 0, 0);
  return camera
});



// WebGL渲染器设置
const renderer = function renderer(camera: PerspectiveCamera): WebGLRenderer {

  const renderer = new WebGLRenderer({
    antialias: true, // 开启优化锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
  // 设置渲染的尺寸大小
  renderer.setSize(width.value, height.value)
  // 将webgl渲染的canvas内容添加到body

  canRef.value.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  // renderer.outputEncoding = THREE.sRGBEncoding;

  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });//监听鼠标、键盘事件
  return renderer
};


onMounted(() => {

  const { w, h } = getElmWidhtAndHeight(canRef.value);
  width.value = w;
  height.value = h;
  // console.log(h);

  const camera = cameraFun();


  const rend = renderer(camera);

  const render = function render() {
    rend.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();

})


</script>

<template>
  <div ref="canRef"></div>
</template>

<style scoped>
div {
  height: 100%;
}
</style>
