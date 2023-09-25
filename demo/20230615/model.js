import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, MeshLambertMaterial, TextureLoader, sRGBEncoding } from 'three';

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new Group(); //声明一个组对象，用来添加加载成功的三维场景

const texLoader = new TextureLoader();
const texture = texLoader.load('./gltf模型/手机模型/黑色.png');// 加载手机mesh另一个颜色贴图
texture.encoding = sRGBEncoding; //和渲染器.outputEncoding一样值
console.log('texture.flipY', texture.flipY);
texture.flipY = false; //纹理贴图Y轴翻转

loader.load("./gltf模型/手机模型/手机模型.glb", function (gltf) { //gltf加载成功后返回一个对象
    const mesh = gltf.scene.children[0]; //获取Mesh
    mesh.material.map = texture; //更换不同风格的颜色贴图
    
    console.log('.flipY', mesh.material.map.flipY);
    model.add(gltf.scene); //三维场景添加到model组对象中
})


export default model;