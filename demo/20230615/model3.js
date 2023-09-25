import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, MeshLambertMaterial } from 'three';

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("./gltf模型/小区/简易小区.glb", function (gltf) { //gltf加载成功后返回一个对象
    gltf.scene.traverse(function(obj) {
        // console.log(obj)
        if (obj.isMesh) {//判断是否是网格模型
            // console.log('模型节点',obj);
            // console.log('模型节点名字',obj.material);
            // 重新设置材质
            obj.material = new MeshLambertMaterial({
                color:0xffffff,
            });
        }
    });
    model.add(gltf.scene); //三维场景添加到model组对象中

})


export default model;