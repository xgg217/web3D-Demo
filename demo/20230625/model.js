import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, MeshLambertMaterial, TextureLoader, sRGBEncoding, CubeTextureLoader } from 'three';

const loader = new GLTFLoader(); //创建一个GLTF加载器

const model = new Group(); //声明一个组对象，用来添加加载成功的三维场景

const textureCube = new CubeTextureLoader().setPath('./环境贴图/').load(["1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg"]); //加载立方体贴图
textureCube.encoding = sRGBEncoding;

loader.load("./gltf模型/工厂.glb", function (gltf) { //gltf加载成功后返回一个对象
    gltf.scene.traverse(obj => {
        if(obj.isMesh) {
            // console.log(obj.material)
            // obj.material.metalness = 1.0; // 设置金属度
            // // obj.material.roughness = 0; // 表面粗糙度
            // obj.material.envMap = textureCube; // 设置环境贴图
            obj.material.envMapIntensity = 1.0;
        }
    })
    model.add(gltf.scene);
})

export default model;