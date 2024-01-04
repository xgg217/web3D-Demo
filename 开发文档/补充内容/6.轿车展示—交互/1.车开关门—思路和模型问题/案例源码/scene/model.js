// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
// 引入gltf模型加载库GLTFLoader.js
import {
    GLTFLoader
} from '../../../../three.js-r125/examples/jsm/loaders/GLTFLoader.js';
import {
    SetCarMaterial
} from './SetCarMaterial.js';
var model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
var loader = new GLTFLoader(); //创建一个GLTF加载器

loader.load("./scene/model/轿车.glb", function (gltf) { //gltf加载成功后返回一个对象
    // console.log('控制台查看gltf对象结构', gltf);
    SetCarMaterial(gltf.scene); //代码设置车模型不同零部件的材质效果
    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene);

    // 开关车门旋转测试
    // 通过坐标系判断一下可以绕哪个轴旋转，至于旋转值是负数还是正数可以代码测试下
    gltf.scene.getObjectByName('右前门').rotateY(Math.PI / 3);
    gltf.scene.getObjectByName('右后门').rotateY(Math.PI / 3);
    gltf.scene.getObjectByName('左前门').rotateY(-Math.PI / 3);
    gltf.scene.getObjectByName('左后门').rotateY(-Math.PI / 3);
    gltf.scene.getObjectByName('后备箱').rotateZ(Math.PI / 3);
})
export {
    model
}