import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, MeshLambertMaterial } from 'three';

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("./gltf模型/小区/简易小区-共享材质.glb", function (gltf) { //gltf加载成功后返回一个对象
    const mesh1 = gltf.scene.getObjectByName("1号楼");
    
    const mesh2 = gltf.scene.getObjectByName("2号楼");
    
    //用代码方式解决mesh共享材质问题
    gltf.scene.getObjectByName("小区房子").traverse(function (obj) {
        if (obj.isMesh) {
            // .material.clone()返回一个新材质对象，和原来一样，重新赋值给.material属性
            obj.material = obj.material.clone();
        }
    });
    mesh1.material.color.set(0xffff00);
    mesh2.material.color.set(0x00ff00);
    model.add(gltf.scene); //三维场景添加到model组对象中
})


export default model;