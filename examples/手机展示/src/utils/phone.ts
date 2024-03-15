import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { lineAndTextGroup } from './CircleLineAndText';
import TWEEN from '@tweenjs/tween.js';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import gd from '/光点.png';

const allGroup = new THREE.Group();
const phoneGroup = new THREE.Group();
const loader = new GLTFLoader();
const texLoader = new THREE.TextureLoader();

let mobilePhoneMesh: THREE.Object3D<THREE.Object3DEventMap> | null = null; // 只想手机网格模型

let sprite: THREE.Sprite;

// 手机壳颜色切换
const { setMeshColor } = (() => {
  const mp1 = texLoader.load('wl/幻夜黑.png');
  const mp2 = texLoader.load('wl/极光蓝.png');
  const mp3 = texLoader.load('wl/极光紫.png');
  const mp4 = texLoader.load('wl/珊瑚红.png');
  const mpArr = [mp1, mp2, mp3, mp4];

  mp1.flipY = false; // 纹理朝向
  mp2.flipY = false; // 纹理朝向
  mp3.flipY = false; // 纹理朝向
  mp4.flipY = false; // 纹理朝向

  // console.log(mp1);

  const setMeshColor = (index: 1 | 2 | 3 | 4) => {
    // const mesh = phoneGroup.getObjectByName('手机')!;
    // @ts-ignore
    if (mobilePhoneMesh && mobilePhoneMesh.material) {
      // @ts-ignore
      mobilePhoneMesh.material.map = mpArr[index - 1];
    }
  };

  return {
    setMeshColor
  };
})();

// 手机摄像头位置标注
const { getWPsition } = (() => {
  const dir = new THREE.Vector3(); // 后置摄像头世界坐标

  // 后置摄像头 标注
  const spriteMaterial = new THREE.SpriteMaterial({
    // color:0x00ffff,//设置颜色
    map: texLoader.load('光点.png'),
    transparent: true
  });
  // const image = new Image();
  // // const tag = new CSS2DObject(div);
  // image.src = gd;
  // image.onload = function () {
  //   console.log(gd);
  // };

  // const img = new CSS2DObject(image);
  // phoneGroup.add(img);

  sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(6, 6, 1);
  sprite.renderOrder = 1;

  // xyz三个方向都放大2倍
  // sprite.scale.set(9, 9, 1);
  // 缩放动画
  const tween = new TWEEN.Tween(sprite.scale)
    .to(
      {
        x: 9,
        y: 9,
        z: 1
      },
      2000
    )
    .easing(TWEEN.Easing.Quadratic.Out) // 平滑动画
    .repeat(Infinity)
    .yoyo();

  phoneGroup.add(sprite);

  {
    setTimeout(() => {
      const div = document.getElementById('tag')!;
      console.log(div);

      const tag = new CSS2DObject(div);
      console.log(tag);

      // div.style.position = 'absolute';
      // div.style.top = '-10px';
      // div.style.pointerEvents = 'none';
      sprite.add(tag);
      console.log(div);
    }, 1000);

    // const tag = new CSS2DObject(div);
    // phoneGroup.add(tag);
  }

  // 获取世界坐标
  const getWPsition = (group: THREE.Object3D<THREE.Object3DEventMap>) => {
    group.getWorldPosition(dir);
    // console.log(dir);

    dir.setX(dir.x - 7);
    dir.setZ(dir.z - 2);

    sprite.position.copy(dir);

    tween.start();
  };

  // 缩放动画
  function render() {
    TWEEN.update();

    requestAnimationFrame(render);
  }
  render();

  return {
    getWPsition
  };
})();

// 加载环境贴图
const textureCube = new THREE.CubeTextureLoader()
  .setPath('./model/envMap/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

try {
  // console.log(import.meta.url);

  const imgUrl = new URL('./../assets/手机-标注.gltf', import.meta.url).href;
  // const url = getImageUrl('./src/assets/手机.gltf');
  const gltf = await loader.loadAsync(imgUrl);
  // console.log(gltf);

  const phoneGltf = gltf.scene; // 玩家角色模型
  phoneGroup.add(phoneGltf);

  const mesh = phoneGltf.getObjectByName('手机')!;

  // 模型中包含两个空对象分别是手机前/后摄像头位置，主要是为了方便读取摄像头的世界坐标
  {
    const frontObject3D = phoneGltf.getObjectByName('后置摄像头位置')!;
    // 设置摄像头位置
    getWPsition(frontObject3D);
  }

  mobilePhoneMesh = mesh;

  // @ts-ignore
  mesh.material = new THREE.MeshStandardMaterial({
    metalness: 1.0, //Mesh表面金属度，默认值0.5
    roughness: 1.0, //Mesh表面粗糙度，默认值0.5

    // map: texLoader.load('model/basecolor.png'), // 颜色贴图
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

allGroup.add(phoneGroup, lineAndTextGroup);

export { phoneGroup, allGroup, setMeshColor };
