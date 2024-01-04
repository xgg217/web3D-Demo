// 场景总文件
// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
import {
    model
} from './model.js';
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
scene.add(model); //产品三维模型添加到场景中
/**
 * 光源设置
 */
// 平行光1
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(400, 200, 300);
scene.add(directionalLight);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight2.position.set(-400, -200, -300);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);

// Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
var axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);

/**
 * 创建一个地面
 */
var geometry = new THREE.PlaneGeometry(6000, 6000); //矩形平面
// 加载树纹理贴图
var texture = new THREE.TextureLoader().load("./scene/model/瓷砖.jpg");
texture.encoding = THREE.sRGBEncoding; //设置纹理贴图编码方式和WebGL渲染器一致 要不然色差
// 设置阵列
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(12, 12); //注意选择合适的阵列数量
var material = new THREE.MeshLambertMaterial({
    color: 0x222222,
    map: texture,
});
//   创建地面网格模型；
var ground = new THREE.Mesh(geometry, material); //网格模型对象Mesh
ground.rotateX(-Math.PI / 2);
scene.add(ground);

export {
    scene
};