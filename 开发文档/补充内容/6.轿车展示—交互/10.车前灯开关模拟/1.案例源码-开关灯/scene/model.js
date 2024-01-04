// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
// 引入gltf模型加载库GLTFLoader.js
import {
    GLTFLoader
} from '../../../../three.js-r125/examples/jsm/loaders/GLTFLoader.js';
import {
    SetCarMaterial
} from './SetCarMaterial.js';
import {
    CreateCarTags
} from './PointsTag.js'; //创建热点
import {
    open
} from '../open.js';
var model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景

import {
    lensflare1,
    lensflare2,
} from './openCarLight.js'; //轿车前灯发光模拟



var loader = new GLTFLoader(); //创建一个GLTF加载器

loader.load("./scene/model/轿车.glb", function (gltf) { //gltf加载成功后返回一个对象
    // console.log('控制台查看gltf对象结构', gltf);
    SetCarMaterial(gltf.scene); //代码设置车模型不同零部件的材质效果
    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene);

    // 标注热点
    CreateCarTags(gltf.scene);

    open(gltf.scene); //车门打开

    // glrt模型中用来给车灯定位的空物体,获取坐标，用来在openCarLight.js文件中生成发光效果
    var light1 = gltf.scene.getObjectByName('镜头光晕1');
    var light2 = gltf.scene.getObjectByName('镜头光晕2');
    light1.add(lensflare1);
    light2.add(lensflare2);






})
export {
    model
}