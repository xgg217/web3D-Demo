import * as THREE from "./three.module.min.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './model.js'

//场景
const scene = new THREE.Scene();
scene.add(mesh); //模型对象添加到场景中


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
(() => {
  const ambient = new THREE.AmbientLight(0xffffff, 1);
  scene.add(ambient);
  
  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(100,60,50);
  scene.add(directionalLight);

  // 平行光设置产生阴影的光源对象,开启光源阴影的计算功能
  directionalLight.castShadow = true;
  
  directionalLight.shadow.camera.left = -50;
  directionalLight.shadow.camera.right = 50;
  directionalLight.shadow.camera.top = 200;
  directionalLight.shadow.camera.bottom = -100;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 600;
  
  // console.log('阴影相机属性',directionalLight.shadow.camera);
  
  const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  scene.add(cameraHelper);
  
})();

//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = (() => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, //开启优化锯齿
  });
  renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  
  // 设置渲染器，允许光源阴影渲染
  renderer.shadowMap.enabled = true;
  return renderer;
  
})();


// 渲染循环
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();


const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};