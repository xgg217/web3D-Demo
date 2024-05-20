import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
import TWEEN from '@tweenjs/tween.js';
// import Helper from "@/utils/twin/helpers";
import type { IParams } from "@/utils/twin/types";

let sprite: THREE.Sprite;
const texLoader = new THREE.TextureLoader();
const phoneGroup = new THREE.Group();
let mobilePhoneMesh: THREE.Object3D<THREE.Object3DEventMap> | null = null; // 只想手机网格模型

const init = () => {
  const query: IParams = {
    domName: ".phone"
  };

  const twin = new CreateTwin(query);

  // 平行光1
  twin.directionalLight.intensity = 0.8; // 调整透明度
  twin.directionalLight.position.set(100, 200, 300);

  // 平行光2
  const directionLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
  directionLight2.position.set(-400, -200, -300);
  twin.scene.add(directionLight2);

  // 环境光
  const ambient = new THREE.AmbientLight(0xffffff, 3);
  twin.scene.add(ambient);

  // 加载gltf
  {
    const imgUrl = new URL('./assets/手机-标注.gltf', import.meta.url).href;
    twin.GLTFLoader.load(imgUrl, (gltf) => {
      const phoneGltf = gltf.scene; // 玩家角色模型
      // twin.scene.add(gltf.scene);
      phoneGroup.add(phoneGltf);
      twin.scene.add(phoneGroup);

      // 模型中包含两个空对象分别是手机前/后摄像头位置，主要是为了方便读取摄像头的世界坐标
      {
        const frontObject3D = phoneGltf.getObjectByName('后置摄像头位置')!;
        // 设置摄像头位置
        getWPsition(frontObject3D);
      }

      {
        const mesh = phoneGltf.getObjectByName('手机')!;
        mobilePhoneMesh = mesh;

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mesh.material = setMesh();
        // 注意：纹理朝向 flipY 设置
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mesh.material.map.flipY = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mesh.material.metalnessMap.flipY = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mesh.material.roughnessMap.flipY = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mesh.material.normalMap.flipY = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        mesh.material.alphaMap.flipY = false;
      }
    });
  }

  return twin;
};

// 手机壳颜色切换
const { setMeshColor } = (() => {
  const mp1Url = new URL('./assets/wl/幻夜黑.png', import.meta.url).href;
  const mp2Url = new URL('./assets/wl/极光蓝.png', import.meta.url).href;
  const mp3Url = new URL('./assets/wl/极光紫.png', import.meta.url).href;
  const mp4Url = new URL('./assets/wl/珊瑚红.png', import.meta.url).href;

  const mp1 = texLoader.load(mp1Url);
  const mp2 = texLoader.load(mp2Url);
  const mp3 = texLoader.load(mp3Url);
  const mp4 = texLoader.load(mp4Url);
  const mpArr = [mp1, mp2, mp3, mp4];

  mp1.flipY = false; // 纹理朝向
  mp2.flipY = false; // 纹理朝向
  mp3.flipY = false; // 纹理朝向
  mp4.flipY = false; // 纹理朝向

  // console.log(mp1);

  const setMeshColor = (index: 1 | 2 | 3 | 4) => {
    // const mesh = phoneGroup.getObjectByName('手机')!;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (mobilePhoneMesh && mobilePhoneMesh.material) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      mobilePhoneMesh.material.map = mpArr[index - 1];
    }
  };

  return {
    setMeshColor
  };
})();

const setMesh = (() => {

  const baseColorUrl = new URL("./assets/model/basecolor.png", import.meta.url).href;
  const roughnessUrl = new URL("./assets/model/roughness.png", import.meta.url).href;
  const metallicUrl = new URL("./assets/model/metallic.png", import.meta.url).href;
  const normalUrl = new URL("./assets/model/normal.png", import.meta.url).href;
  const opacityUrl = new URL("./assets/model/opacity.png", import.meta.url).href;

  // 加载环境贴图
  const textureCube = new THREE.CubeTextureLoader()
  .setPath('./model/envMap/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);

  const setMesh = () => {
    new THREE.MeshStandardMaterial({
      metalness: 1.0, //Mesh表面金属度，默认值0.5
      roughness: 1.0, //Mesh表面粗糙度，默认值0.5

      // map: texLoader.load('model/basecolor.png'), // 颜色贴图
      map: texLoader.load(baseColorUrl), // 颜色贴图

      // 金属度 粗糙度 贴图表示的值会和金属度、粗糙度分别相乘
      // 如果有金属度或粗糙度贴图就不用专门设置金属度或粗糙度属性了
      roughnessMap: texLoader.load(roughnessUrl), // 粗糙度贴图
      metalnessMap: texLoader.load(metallicUrl), // 金属度贴图

      // 相机镜头等位置需要设置半透明效果（设置 alphaMap 和 transparent 属性）
      normalMap: texLoader.load(normalUrl), // 法线贴图
      alphaMap: texLoader.load(opacityUrl), // 透明贴图
      transparent: true, // 使用 alphaMap 注意开启透明计算

      envMap: textureCube, //设置pbr材质环境贴图，渲染效果更好
      envMapIntensity: 0.9 //设置环境贴图对模型表面影响程度
    });
  }

  return {
    setMesh
  }
})();

// 手机摄像头位置标注
const { getWPsition } = (() => {
  const dir = new THREE.Vector3(); // 后置摄像头世界坐标
  // let divDom:HTMLElement | null;
  // let buttonDom:HTMLButtonElement | null;
  const imgUrl = new URL('./assets/光点.png', import.meta.url).href;

  // 后置摄像头 标注
  const spriteMaterial = new THREE.SpriteMaterial({
    // color:0x00ffff,//设置颜色
    map: texLoader.load(imgUrl),
    transparent: true
  });

  sprite = new THREE.Sprite(spriteMaterial);
  sprite.scale.set(6, 6, 1);
  sprite.renderOrder = 1;

  // xyz三个方向都放大2倍
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

  // {
  //   setTimeout(() => {
  //     divDom = document.getElementById('message')!;
  //     buttonDom = divDom.querySelector('button')!;
  //     // console.log(div);

  //     const tag = new CSS2DObject(divDom);
  //     console.log(tag);

  //     // div.style.position = 'absolute';
  //     divDom.style.top = '-10px';
  //     divDom.style.left = '360px';

  //     divDom.style.pointerEvents = 'none';
  //     sprite.add(tag);

  //     // 点击关闭提示
  //     buttonDom?.addEventListener('click', () => {
  //       console.log(11);

  //       divDom!.style.display = 'none';
  //     });
  //   }, 1000);

  // }

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

export default init;

export {
  setMeshColor
}
