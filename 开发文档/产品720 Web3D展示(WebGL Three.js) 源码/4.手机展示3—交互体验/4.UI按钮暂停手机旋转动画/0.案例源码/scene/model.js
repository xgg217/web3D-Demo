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

loader.load("./scene/model/手机.glb", function (gltf) {//gltf加载成功后返回一个对象
    console.log('控制台查看gltf对象结构', gltf);
    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene);
    //根据手机节点名称.name找到对应模型对象
    var mesh = gltf.scene.getObjectByName('手机');//找到手机Mesh
    // console.log('mesh', mesh);
    var texLoader = new THREE.TextureLoader();//纹理贴图加载器
    // mesh.material：设置手机Mesh材质
    mesh.material = new THREE.MeshStandardMaterial({
      // color:0xffffff,
      metalness: 1.0,//Mesh表面金属度，默认值0.5
      roughness: 1.0,//Mesh表面粗糙度，默认值0.5
      map: texLoader.load("./scene/model/basecolor.png"), //颜色贴图
      // 金属度、粗糙度贴图表示的值会和金属度、粗糙度分别相乘
      roughnessMap: texLoader.load("./scene/model/roughness.png"), //粗糙度贴图
      metalnessMap: texLoader.load("./scene/model/metallic.png"), //金属度贴图
      // 相机镜头等位置需要设置半透明效果(设置alphaMap和transparent属性)
      alphaMap: texLoader.load("./scene/model/opacity.png"),//alpha贴图

      normalMap: texLoader.load("./scene/model/normal.png"), //法线贴图
      transparent: true, //使用alphaMap，注意开启透明计算
      envMap: textureCube, //设置pbr材质环境贴图，渲染效果更好
      envMapIntensity: 0.5, //设置环境贴图对模型表面影响程度
    })
    // 纹理朝向texture.flipY
    mesh.material.map.flipY = false;
    mesh.material.normalMap.flipY = false;
    mesh.material.metalnessMap.flipY = false;
    mesh.material.roughnessMap.flipY = false;
    mesh.material.alphaMap.flipY = false;

})
export { model }