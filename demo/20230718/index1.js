import * as THREE from "./three.module.min.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Model from './model.js'

console.log(THREE.Scene)
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();
let s = 2.9;//控制 left, right, top, bottom范围大小
// const width = window.innerWidth; //canvas画布宽度
// const height = window.innerHeight; //canvas画布高度

// 2.创建相机 - 正交相机
const camera = (() => {
  // const x = 113.51,y = 33.88;
  // const k = width / height; //canvas画布宽高比
  // const camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 8000);
  // camera.position.set(x, y, 300);
  // camera.lookAt(x, y, 0); //指向坐标原点
  // return camera;
  //渲染器和相机
  
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// camera.position.set(292, 223, 185);
  camera.position.set(200, 200, 200);//根据渲染范围尺寸数量级设置相机位置
  camera.lookAt(0, 0, 0);
  
  return camera
})();

scene.add( Model );

// 光源设置
const directionLight = (() => {
  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(100, 60, 50);
  scene.add(directionalLight);
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);
  return directionalLight
})();

// WebGL渲染器设置
const renderer = (() => {
  const renderer = new THREE.WebGLRenderer({
    antialias: true, //开启优化锯齿
  });
  // 设置渲染的尺寸大小
  renderer.setSize(width, height)
// 将webgl渲染的canvas内容添加到body
  document.body.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.outputEncoding = THREE.sRGBEncoding;
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });//监听鼠标、键盘事件
  // renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
  // renderer.setSize(width, height);
  // document.body.appendChild(renderer.domElement);
  //
  return renderer
})();

//辅助观察的坐标系
const axesHelper = (() => {
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);
  return axesHelper
})();

// 渲染循环
function render() {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();


window.onresize = () => {
  // const width = window.innerWidth - 200 ; //canvas画布宽度
  // const height = window.innerHeight - 200; //canvas画布高度
  // // 1. WebGL渲染器渲染的Cnavas画布尺寸更新
  // renderer.setSize(width, height);
  // // 2.1.更新相机参数
  // //canvas画布宽高比会影响left, right需要跟着更新
  // const k = width / height; //canvas画布宽高比
  // camera.left = -s*k;
  // camera.right = s*k;
  // // 2.2.相机的left, right等属性变化了，通知threejs系统
  // camera.updateProjectionMatrix();
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(113.5, 33.88, 0); //与lookAt参数保持一致
controls.update();//update()函数内会执行camera.lookAt(controls.target)