import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';

import  {group}  from './model.js';//模型对象

const can = document.querySelector('#can')
//场景
const scene = new THREE.Scene();
scene.add(group); //模型对象添加到场景中


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
can.appendChild(renderer.domElement);


const css2Renderer = (() => {
  // 创建一个CSS2渲染器CSS2DRenderer
  const css2Renderer = new CSS2DRenderer();
// // width, height：canvas画布宽高度
  css2Renderer.setSize(width, height);
  can.appendChild(css2Renderer.domElement);
  css2Renderer.domElement.style.position = 'absolute';
  css2Renderer.domElement.style.top = '0px';
//
// renderer.domElement.style.marginTop = '200px';
// css2Renderer.domElement.style.top = '200px';
  css2Renderer.domElement.style.pointerEvents = 'none';
  return css2Renderer
})();


// 渲染循环
function render() {
  // 用法和webgl渲染器渲染方法类似
  css2Renderer.render(scene, camera)
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();


const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  css2Renderer.setSize(width,height);
  renderer.setSize(width, height);
  camera.aspect = width/ height;
  camera.updateProjectionMatrix();
};