// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from '../../../../three.js-r125/examples/jsm/loaders/GLTFLoader.js';

var model = new THREE.Group();//声明一个组对象，用来添加加载成功的三维场景
var loader = new GLTFLoader(); //创建一个GLTF加载器

// .glb文件包含了gltf文件中所有贴图和模型文件
loader.load("./scene/model/分离/轿车.gltf", function (gltf) {//gltf加载成功后返回一个对象
    console.log('控制台查看gltf对象结构', gltf);
    // var leftBeforeDoor = gltf.scene.getObjectByName('左前门');
    // 在浏览器控制台可以看到轿车左前车门是一个对象，包含多个网格模型Mesh后代。
    // console.log('查看左前车门',leftBeforeDoor);

    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene); 
})
export { model }