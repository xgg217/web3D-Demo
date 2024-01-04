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
loader.load("./scene/model/千斤顶.glb", function (gltf) {//gltf加载成功后返回一个对象
    // console.log('控制台查看gltf对象结构', gltf);

    gltf.scene.rotateX(Math.PI / 2)
    gltf.scene.scale.set(10, 10, 10);
    gltf.scene.position.y = -100;
    // 递归遍历批量更改所有Mesh的材质
    gltf.scene.traverse(function (object) {
        if (object.type === 'Mesh') {
            console.log(object.material);
            object.material = new THREE.MeshStandardMaterial({
                color: object.material.color, //读取材质原来的颜色
                // 金属度属性metalness：材质像金属的程度, 非金属材料,如木材或石材,使用0.0,金属使用1.0。
                // metalness默认0.5,0.0到1.0之间的值可用于生锈的金属外观
                metalness: 1.0,
                // metalness: 0.0,//没有金属质感    
                // 粗糙度属性roughness:模型表面粗糙程度,0.0表示平滑的镜面反射,1.0表示完全漫反射,默认0.5                      
                roughness: 0.0,
                // roughness: 1.0,//设置到完全漫反射状态，表面金属质感比较弱
                // roughness: 0.0,//完全镜面反射，就像一面镜子一样，注意配合环境贴图观察更明显,参考下节课
                envMap: textureCube, //设置pbr材质环境贴图
                // envMapIntensity：通过乘以环境贴图的颜色来缩放环境贴图的效果。
                // envMapIntensity:0.7,//默认值1, 设置为0.0,相当于没有环境贴图
            })
        }
    })

    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene); 
})
export { model }