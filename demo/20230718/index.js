import * as THREE from "./three.module.min.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Model from './model3.js'


const can = document.querySelector('#can')
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();

// 2.创建相机 - 正交相机
export const camera = (() => {
  //渲染器和相机
  const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
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
  can.appendChild(renderer.domElement);
  const controls = new OrbitControls(camera, renderer.domElement);
  renderer.outputEncoding = THREE.sRGBEncoding;
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });//监听鼠标、键盘事件
  return renderer
})();

//辅助观察的坐标系
const axesHelper = (() => {
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper);
  return axesHelper
})();

const controls = (() => {
  const controls = new OrbitControls(camera, renderer.domElement);
  
  controls.minDistance = 200;
  controls.maxDistance = 500;
  
  
  
  controls.target.set(0, 0, 0); //与lookAt参数保持一致
  controls.update();//update()函数内会执行camera.lookAt(controls.target)
  
  return controls
})();

// 渲染循环
let angle = 0; //用于圆周运动计算的角度值
const R = 100; //相机圆周运动的半径
function render() {
  // angle += 0.01;
  // // 相机y坐标不变，在XOZ平面上做圆周运动
  // camera.position.x = R * Math.cos(angle);
  // camera.position.z = R * Math.sin(angle);
  // camera.lookAt(0,0,0);
  // const dis = controls.getDistance();
  // console.log('dis',dis);
  
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();


window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}


