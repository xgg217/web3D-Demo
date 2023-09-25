import * as THREE from "./three.module.min.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './model.js'

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';

// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
// 引入UnrealBloomPass通道
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
// 引入GlitchPass通道
import { GlitchPass } from 'three/addons/postprocessing/GlitchPass.js';

const can = document.querySelector('#can')
const width = window.innerWidth;
const height = window.innerHeight;

const aDom = document.querySelector('.a');
const bDom = document.querySelector('.b');

const scene = new THREE.Scene();

// 2.创建相机 - 正交相机
export const camera = (() => {
  //渲染器和相机
  const camera = new THREE.PerspectiveCamera(90, width / height, 1, 3000);
  camera.position.set(100, 100, 100);//根据渲染范围尺寸数量级设置相机位置
  camera.lookAt(0, 0, 0);
  return camera
})();

scene.add( mesh );

// 光源设置
const directionLight = (() => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  // directionalLight.position.set(200, 200, 200);
  directionalLight.position.set(100, 60, 50);
  scene.add(directionalLight);
  
  // const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  // scene.add(ambient);
 
  return directionalLight
})();

// WebGL渲染器设置
const renderer = (() => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, // 开启优化锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
  // 设置渲染的尺寸大小
  renderer.setSize(width, height)
// 将webgl渲染的canvas内容添加到body
  can.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  // renderer.outputEncoding = THREE.sRGBEncoding;
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });//监听鼠标、键盘事件
  
  
  return renderer
})();

// 后处理器
const composer = (() => {

  // 创建后处理对象EffectComposer，WebGL渲染器作为参数
  const composer = new EffectComposer(renderer);
  // 创建一个渲染器通道，场景和相机作为参数
  const renderPass = new RenderPass(scene, camera);

  // 设置renderPass通道
  composer.addPass(renderPass);

  // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
  const v2 = new THREE.Vector2(window.innerWidth, window.innerWidth);
  // const v2 = new THREE.Vector2(800, 600);
  const outlinePass = new OutlinePass(v2, scene, camera);

  // 一个模型对象
  // outlinePass.selectedObjects = meshArr;
  composer.addPass(outlinePass)
  
  aDom.addEventListener('click', () => {
    const A = mesh.getObjectByName('设备A')
    outlinePass.selectedObjects = [A];
  });
  
  bDom.addEventListener('click', () => {
    const B = mesh.getObjectByName('设备B')
    outlinePass.selectedObjects = [B];
  });
  //
  // // 创建一个发光通道
  // const v3 = new THREE.Vector2(window.innerWidth, window.innerHeight);
  // const bloomPass = new UnrealBloomPass(v3);
  // composer.addPass(bloomPass)
  //
  // const glitchPass = new GlitchPass();
  // // 设置glitchPass通道
  // composer.addPass(glitchPass);

  return composer
})()


//辅助观察的坐标系
const axesHelper = (() => {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  return axesHelper
})();

// 渲染循环
function render() {
  composer.render();
  // renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();


window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}