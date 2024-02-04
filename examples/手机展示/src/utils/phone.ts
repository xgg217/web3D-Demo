import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const phoneGroup = new THREE.Group();
const loader = new GLTFLoader();
const texLoader = new THREE.TextureLoader();

// console.log(imgUrl);

// 加载环境贴图
const textureCube = new THREE.CubeTextureLoader()
  .setPath('./model/envMap/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

try {
  const imgUrl = new URL('./../assets/手机.gltf', import.meta.url).href;
  // const url = getImageUrl('./src/assets/手机.gltf');
  const gltf = await loader.loadAsync(imgUrl);

  const phoneGltf = gltf.scene; // 玩家角色模型
  phoneGroup.add(phoneGltf);

  const mesh = phoneGltf.getObjectByName('手机')!;

  // console.log(mesh.material);
  // @ts-ignore
  mesh.material = new THREE.MeshStandardMaterial({
    metalness: 1.0, //Mesh表面金属度，默认值0.5
    roughness: 1.0, //Mesh表面粗糙度，默认值0.5

    map: texLoader.load('model/basecolor.png'), // 颜色贴图

    // 金属度 粗糙度 贴图表示的值会和金属度、粗糙度分别相乘
    // 如果有金属度或粗糙度贴图就不用专门设置金属度或粗糙度属性了
    roughnessMap: texLoader.load('model/roughness.png'), // 粗糙度贴图
    metalnessMap: texLoader.load('model/metallic.png'), // 金属度贴图

    // 相机镜头等位置需要设置半透明效果（设置 alphaMap 和 transparent 属性）
    normalMap: texLoader.load('model/normal.png'), // 法线贴图
    alphaMap: texLoader.load('model/opacity.png'), // 透明贴图
    transparent: true, // 使用 alphaMap 注意开启透明计算

    envMap: textureCube, //设置pbr材质环境贴图，渲染效果更好
    envMapIntensity: 0.9 //设置环境贴图对模型表面影响程度
  });

  // 注意：纹理朝向 flipY 设置
  // @ts-ignore
  mesh.material.map.flipY = false;
  // @ts-ignore
  mesh.material.metalnessMap.flipY = false;
  // @ts-ignore
  mesh.material.roughnessMap.flipY = false;
  // @ts-ignore
  mesh.material.normalMap.flipY = false;
  // @ts-ignore
  mesh.material.alphaMap.flipY = false;
} catch (error) {
  console.error(error);
}

// phoneGroup.position.setY(0);

export { phoneGroup };
