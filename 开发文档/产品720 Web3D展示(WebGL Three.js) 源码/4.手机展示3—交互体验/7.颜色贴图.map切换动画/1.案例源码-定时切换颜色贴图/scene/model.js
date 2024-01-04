// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
// 引入gltf模型加载库GLTFLoader.js
import { GLTFLoader } from '../../../../three.js-r125/examples/jsm/loaders/GLTFLoader.js';

var model = new THREE.Group();//声明一个组对象，用来添加加载成功的三维场景
var mobilePhoneMesh = null;//指向手机网格模型Mesh
var loader = new GLTFLoader(); //创建一个GLTF加载器
// 加载环境贴图
var textureCube = new THREE.CubeTextureLoader()
    .setPath('./scene/model/envMap/')
    .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

loader.load("./scene/model/手机.glb", function (gltf) {//gltf加载成功后返回一个对象
    // console.log('控制台查看gltf对象结构', gltf);
    //把gltf.scene中的所有模型添加到model组对象中
    model.add(gltf.scene);
    //根据手机节点名称.name找到对应模型对象
    var mesh = gltf.scene.getObjectByName('手机');//找到手机Mesh
    mobilePhoneMesh = mesh;
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
    
    // 用于切换的贴图：4个颜色贴图对应的纹理对象
    var map1 = texLoader.load("./scene/model/极光紫.png");//颜色贴图            
    var map2 = texLoader.load("./scene/model/幻夜黑.png");//颜色贴图
    var map3 = texLoader.load("./scene/model/珊瑚红.png");//颜色贴图
    var map4 = texLoader.load("./scene/model/极光蓝.png");//颜色贴图
    map1.flipY = false;// 纹理朝向texture.flipY
    map2.flipY = false;// 纹理朝向texture.flipY
    map3.flipY = false;// 纹理朝向texture.flipY
    map4.flipY = false;// 纹理朝向texture.flipY
    // 纹理贴图切换动画
    var T = 0;//用来表示完成一轮贴图切换所处时间
    var spT = 2;// 纹理贴图切换时间(秒)
    var clock = new THREE.Clock();
    function animation() {        
        // 每隔spT毫秒切换一次颜色贴图
        if (T < spT) {
            mesh.material.map = map1;
        } else if (T < spT * 2) {
            mesh.material.map = map2;
        } else if (T < spT * 3) {
            mesh.material.map = map3;
        } else if (T < spT * 4) {
            mesh.material.map = map4;
        } else if (T >= spT * 4) {
            T = 0;
        }        
        var t = clock.getDelta();// 两次渲染时间间隔
        T += t;
        requestAnimationFrame(animation); //请求再次执行函数animation
    }
    animation();
})
export { model, mobilePhoneMesh }