// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from '../../../../three.js-r125/examples/jsm/loaders/GLTFLoader.js';

var model = new THREE.Group();//声明一个组对象，用来添加加载成功的三维场景
var loader = new GLTFLoader(); //创建一个GLTF加载器

// 加载环境贴图
var textureCube = new THREE.CubeTextureLoader()
    .setPath('./scene/model/envMap/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

textureCube.encoding = THREE.sRGBEncoding;//设置纹理贴图编码方式和WebGL渲染器一致

loader.load("./scene/model/轿车.glb", function (gltf) {//gltf加载成功后返回一个对象
    console.log('控制台查看gltf对象结构', gltf);
    // 递归遍历批量更改所有Mesh的材质
    gltf.scene.traverse(function (object) {
        if (object.type === 'Mesh') {//判断是否是网格模型，mesh的父对象组group是没有材质的
            // 设置车架外面金属框、轮毂的材质
            if (object.name.slice(0, 4) == "高光金属") {
                object.material = new THREE.MeshStandardMaterial({
                    color: object.material.color, //读取材质原来的颜色
                    metalness: 1.0,
                    roughness: 0.2,
                })
            }
            //批量设置环境贴图
            object.material.envMap = textureCube;
        }
    })
    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene);
})
export { model }