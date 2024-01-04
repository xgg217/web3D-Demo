// 场景总文件
// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
import { model } from './model.js';
/**
 * 创建场景对象Scene
 */
var scene = new THREE.Scene();
scene.add(model);//产品三维模型添加到场景中
/**
* 光源设置
*/
// 平行光1
var directionalLight1 = new THREE.DirectionalLight(0xffffff,0.8);
// directionalLight1.position.set(400, 200, 300);
directionalLight1.position.set(100, 50, 75);
scene.add(directionalLight1);
// 平行光2
var directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
// directionalLight2.position.set(-400, -200, -300);
directionalLight2.position.set(-100, -50, -75);
scene.add(directionalLight2);
//环境光
var ambient = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambient);

// DirectionalLightHelper：可视化平行光
var helper1 = new THREE.DirectionalLightHelper(directionalLight1, 5,0xff0000);
scene.add(helper1);
var helper2 = new THREE.DirectionalLightHelper(directionalLight2, 5,0x00ff00);
scene.add(helper2);

// Three.js三维坐标轴 三个坐标轴颜色RGB分别对应xyz轴
var axesHelper = new THREE.AxesHelper(250);
scene.add(axesHelper);


export { scene, ambient,directionalLight1,directionalLight2,helper1, helper2};