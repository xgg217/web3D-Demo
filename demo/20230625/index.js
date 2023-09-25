import * as THREE from "./three.module.min.js"
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import model from './model.js'

// 场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

// 辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);

const textureCube = new THREE.CubeTextureLoader().setPath('./环境贴图/').load(["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"]); //加载立方体贴图
textureCube.encoding = THREE.sRGBEncoding;
scene.environment = textureCube;


// 光源设置
// const directionLight = new THREE.DirectionalLight(0xffffff, 0.8);
// directionLight.position.set(400, 200, 300);
// scene.add(directionLight);
// const ambient = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambient);

//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// camera.position.set(292, 223, 185);
camera.position.set(200, 200, 200);//根据渲染范围尺寸数量级设置相机位置
camera.lookAt(0, 0, 0);


// 初始化渲染器
const renderer = new THREE.WebGLRenderer({
})
// 设置渲染的尺寸大小
renderer.setSize(width, height)
// 将webgl渲染的canvas内容添加到body
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement);

renderer.outputEncoding = THREE.sRGBEncoding;

controls.addEventListener('change', function () {
  renderer.render(scene, camera); //执行渲染操作
});//监听鼠标、键盘事件

//renderer.render(scene, camera);

const render = () => {
  renderer.render(scene, camera);
  requestAnimationFrame(render);
};
render();

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};
