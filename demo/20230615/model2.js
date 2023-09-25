import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group } from 'three';

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new Group(); //声明一个组对象，用来添加加载成功的三维场景

loader.load("./gltf模型/小区/简易小区.glb", function (gltf) { //gltf加载成功后返回一个对象
    // console.log('控制台查看gltf对象结构', gltf);
    // console.log('场景3D模型数据', gltf.scene);
    model.add(gltf.scene); //三维场景添加到model组对象中
    // const nameNode = gltf.scene.getObjectByName("1号楼");
    // nameNode.material.color.set(0xff0000);//改变1号楼Mesh材质颜色

    //获得所有'洋房'房子的父对象
    const obj = gltf.scene.getObjectByName('洋房');
    console.log('obj', obj); //控制台查看返回结果

    console.log('obj.children', obj.children);
    // obj.children的所有子对象都是Mesh，改变Mesh对应颜色
    obj.children.forEach(function (mesh) {
        mesh.material.color.set(0xffff00);
    })
})


export default model;