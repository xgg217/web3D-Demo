// 引入Three.js
import * as THREE from '../../../three.js-r125/build/three.module.js';
// 引入Three.js扩展库
import { OrbitControls } from '../../../three.js-r125/examples/jsm/controls/OrbitControls.js';

// width和height用来设置Three.js输出Canvas画布尺寸，同时用来辅助设置相机渲染范围
var width = 450;
var height = 740;
/**
* 透视投影相机设置
*/
// 30:视场角度, width / height:Canvas画布宽高比, 1:近裁截面, 3000：远裁截面
var camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);//相机在Three.js三维坐标系中的位置
camera.lookAt(0, 0, 0);//相机指向Three.js坐标系原点
/**
 * 创建渲染器对象
 */
var renderer = new THREE.WebGLRenderer({
    antialias: true, //开启锯齿
});
renderer.setPixelRatio(window.devicePixelRatio);//设置设备像素比率,防止Canvas画布输出模糊。
renderer.setSize(width, height); //设置渲染区域尺寸
renderer.setClearColor(0xffffff, 1); //设置背景颜色
// renderer.domElement表示Three.js渲染结果,也就是一个HTML元素(Canvas画布)
// document.body.appendChild(renderer.domElement); //body元素中插入canvas对象

//创建控件对象  控件可以监听鼠标的变化，改变相机对象的属性
// 旋转：拖动鼠标左键
// 缩放：滚动鼠标中键
// 平移：拖动鼠标右键
var controls = new OrbitControls(camera, renderer.domElement);

export { renderer, camera };