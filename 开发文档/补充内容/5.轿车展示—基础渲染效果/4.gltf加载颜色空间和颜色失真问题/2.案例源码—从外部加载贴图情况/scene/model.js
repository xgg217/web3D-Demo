// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
// 引入gltf模型加载库GLTFLoader.js
import {
    GLTFLoader
} from '../../../../three.js-r125/examples/jsm/loaders/GLTFLoader.js';

var model = new THREE.Group(); //声明一个组对象，用来添加加载成功的三维场景
var loader = new GLTFLoader(); //创建一个GLTF加载器


const texLoader = new THREE.TextureLoader();
// .glb文件包含了gltf文件中所有贴图和模型文件
loader.load("./scene/model/轿车.glb", function (gltf) { //gltf加载成功后返回一个对象
    var logo = gltf.scene.getObjectByName('车标');
    logo.material = new THREE.MeshBasicMaterial({
        map: texLoader.load('./scene/model/车标.png'),
    });
    logo.material.map.encoding = THREE.sRGBEncoding;//设置纹理贴图编码方式和WebGL渲染器一致
    logo.material.map.flipY = false;
    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene);
})
export {
    model
}