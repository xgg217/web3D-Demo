import * as THREE from "./three.module.min.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import mesh from './model.js'
import gui from './gui.js'

//场景
const scene = new THREE.Scene();
scene.add(mesh); //模型对象添加到场景中


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
(() => {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  // 平行光
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(50,30,0);
  // 如果阴影边缘锯齿感的时候，可以适当提升像素
  directionalLight.shadow.mapSize.set(1024,1024);
  // 模糊弱化阴影边缘
  directionalLight.shadow.radius = 3;
  scene.add(directionalLight);

  // 平行光设置产生阴影的光源对象,开启光源阴影的计算功能
  directionalLight.castShadow = true;
  
  // 设置三维场景计算阴影的范围
  directionalLight.shadow.camera.left = -100;
  directionalLight.shadow.camera.right = 100;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 100;
  
  // 可视化平行光阴影对应的正投影相机对象
  const cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
  scene.add(cameraHelper);
  //
  // console.log('阴影相机属性',directionalLight.shadow.camera);
  
  const dirHelper = new THREE.DirectionalLightHelper(directionalLight, 5);
  scene.add(dirHelper);
  
  const dirFolder = gui.addFolder('平行光');
  const obj = {
    R: 100,
    angle: 0,
  };
  dirFolder.add(obj, 'R', 0, 300).onChange(function(value){
    directionalLight.position.x = value * Math.cos(obj.angle);
    directionalLight.position.z = value * Math.sin(obj.angle);
    dirHelper.update();
  });
  dirFolder.add(obj, 'angle', 0, Math.PI*2).onChange(function(value){
    directionalLight.position.x = obj.R * Math.cos(value);
    directionalLight.position.z = obj.R * Math.sin(value);
    dirHelper.update();
  });
  
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
  
  // 模型表面产生条纹影响渲染效果，可以改变.shadowMap.type默认值优化
  renderer.shadowMap.type = THREE.VSMShadowMap;
  
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