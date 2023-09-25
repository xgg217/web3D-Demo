import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入CSS3渲染器CSS3DRenderer
import { CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import model from './model.js'; //模型对象

//场景
const scene = new THREE.Scene();
scene.add(model); //模型对象添加到场景中

//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


//相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

// WebGL渲染器设置
const renderer = new THREE.WebGLRenderer({
    antialias: true, //开启优化锯齿
});
renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
renderer.setSize(width, height);
document.body.appendChild(renderer.domElement);


// 创建一个CSS3渲染器CSS3DRenderer
const css3Renderer = new CSS3DRenderer();
css3Renderer.setSize(width, height);
// HTML标签<div id="tag"></div>外面父元素叠加到canvas画布上且重合
css3Renderer.domElement.style.position = 'absolute';
css3Renderer.domElement.style.top = '0px';//具体值根据canvas画布位置来定
//设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
css3Renderer.domElement.style.pointerEvents = 'none';
document.body.appendChild(css3Renderer.domElement);


// 渲染循环
function render() {
    css3Renderer.render(scene, camera);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}
render();


const controls = new OrbitControls(camera, renderer.domElement);


// 画布跟随窗口变化
window.onresize = function () {
    const width = window.innerWidth;
    const height = window.innerHeight;
    // cnavas画布宽高度重新设置
    renderer.setSize(width,height);
    // HTML标签css3Renderer.domElement尺寸重新设置
    css3Renderer.setSize(width,height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
};