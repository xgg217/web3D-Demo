import * as THREE from "./three.module.min.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import {mesh,pointsArr} from './model.js'


const can = document.querySelector('#can')
const width = window.innerWidth;
const height = window.innerHeight;

const scene = new THREE.Scene();

// 2.创建相机 - 正交相机
export const camera = (() => {
  //渲染器和相机
  const camera = new THREE.PerspectiveCamera(90, width / height, 1, 3000);
  camera.position.set(292, 223, 185);//根据渲染范围尺寸数量级设置相机位置
  camera.lookAt(0, 0, 0);
  return camera
})();

scene.add( mesh );

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

//辅助观察的坐标系
const axesHelper = (() => {
  const axesHelper = new THREE.AxesHelper(100);
  scene.add(axesHelper);
  return axesHelper
})();

// 渲染循环
// 渲染循环
let i = 0; //在渲染循环中累加变化
function render() {
  if (i < pointsArr.length - 1) {
    // 相机位置设置在当前点位置
    camera.position.set(...pointsArr[i]);
    // 曲线上当前点pointsArr[i]和下一个点pointsArr[i+1]近似模拟当前点曲线切线
    // 设置相机观察点为当前点的下一个点，相机视线和当前点曲线切线重合
    camera.lookAt(pointsArr[i + 1]);
    i += 1; //调节速度
  } else {
    i = 0
  }
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();


window.onresize = () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}

// const controls = new OrbitControls(camera, renderer.domElement);
// controls.target.set(0, 0, 0); //与lookAt参数保持一致
// controls.update();//update()函数内会执行camera.lookAt(controls.target)