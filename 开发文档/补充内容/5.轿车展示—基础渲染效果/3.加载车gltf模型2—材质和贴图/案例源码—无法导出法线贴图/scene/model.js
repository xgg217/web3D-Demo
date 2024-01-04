// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
// 引入gltf模型加载库GLTFLoader.js
import {
    GLTFLoader
} from '../../../../three.js-r125/examples/jsm/loaders/GLTFLoader.js';

var model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
var loader = new GLTFLoader(); //创建一个GLTF加载器


var texLoader = new THREE.TextureLoader();
loader.load("./scene/model/轿车.glb", function (gltf) { //gltf加载成功后返回一个对象
    // console.log('控制台查看gltf对象结构', gltf);
    // var texture = texLoader.load('./scene/model/Tyre_Normal.png');
    // var lun = gltf.scene.getObjectByName('轮胎03');
    // lun.material.normalMap = texture;
    // texture.flipY = false;
    // 如果每个轮胎都是共享同一个材质，只需要设置一个轮胎的材质，其它会跟着改变
    // 如果每个轮胎的材质都是单独的就需要批量分别设置
    // gltf.scene.traverse(function (object) {
    //     if (object.name.slice(0, 2) == "轮胎") {
    //         var lun = gltf.scene.getObjectByName(object.name);
    //         lun.material.normalMap = texture;
    //     }
    // })

    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene);
})
export {
    model
}