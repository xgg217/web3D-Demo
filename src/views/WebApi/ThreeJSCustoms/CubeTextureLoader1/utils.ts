import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class Test1 {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  group: THREE.Group;
  textureCube: THREE.CubeTexture;

  constructor(private dom: HTMLElement) {
    // 获取宽高
    const width = this.dom.clientWidth;
    const height = this.dom.clientHeight;

    // 获取屏幕分辨率
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;

    this.group = new THREE.Group();

    // 环境贴图
    {
      const urls = [
        new URL("./images/1.png", import.meta.url).href,
        new URL("./images/2.png", import.meta.url).href,
        new URL("./images/3.png", import.meta.url).href,
        new URL("./images/4.png", import.meta.url).href,
        new URL("./images/5.png", import.meta.url).href,
        new URL("./images/6.png", import.meta.url).href,
      ];

      this.textureCube = new THREE.CubeTextureLoader().load(urls);
    }

    // 场景
    {
      const scene = new THREE.Scene();

      //辅助观察的坐标系
      const axesHelper = new THREE.AxesHelper(100);
      scene.add(axesHelper);

      // 设置背景
      scene.background = this.textureCube;

      this.scene = scene;
    }

    // 光源
    // {
    //   const light = new THREE.AmbientLight(0xffffff, 10000000); // 环境光
    //   this.scene.add(light);
    // }

    // 创建相机
    {
      const camera = new THREE.PerspectiveCamera(60, ASPECT_RATIO, 1, 10000);
      // this.camera = camera;
      camera.position.set(200, 200, 200);
      camera.lookAt(0, 0, 0);
      this.camera = camera;
    }

    // 渲染器
    {
      const renderer = new THREE.WebGLRenderer({
        antialias: true, // 抗锯齿
        alpha: true,
        logarithmicDepthBuffer: true,
      });
      renderer.setSize(width, height);
      renderer.setAnimationLoop(() => this.animate());
      dom.appendChild(renderer.domElement);
      this.renderer = renderer;
    }

    // 轨道
    new OrbitControls(this.camera, this.renderer.domElement);

    // 物体
    const mesh = this.cereateMesh();
    // this.group.add(mesh);
    this.group.add(mesh);

    this.scene.add(this.group);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    const renderer = this.renderer;
    const scene = this.scene;
    const camera = this.camera;
    // 销毁动画
    renderer.setAnimationLoop(null);
    // 清除渲染器和画布
    renderer.dispose();
    this.dom.removeChild(renderer.domElement);
    // 删除场景中的所有对象
    scene.traverse(object => {
      // @ts-ignore
      if (object.isMesh) {
        // @ts-ignore
        object.geometry.dispose();
        // @ts-ignore
        object.material.dispose();
      }
    });
    // 重置相机和其他辅助对象
    camera.position.set(0, 0, 0);
    // 解除引用
    {
      // @ts-ignore
      this.scene = null;
      // @ts-ignore
      this.camera = null;
      // @ts-ignore
      this.renderer = null;
    }
  }

  cereateMesh() {
    const group = new THREE.Group();

    const mesh = cereateBox(this.textureCube);
    group.add(mesh);

    return group;
  }
}

const cereateBox = (textureCube: THREE.CubeTexture) => {
  const geometry = new THREE.BoxGeometry(100, 100, 100);

  // 材质
  const material = new THREE.MeshStandardMaterial({
    metalness: 1.0,
    roughness: 0,
    color: 0xffffff,
    envMap: textureCube, // 设置材质环境贴图
    // envMapIntensity: 0.5, // 设置环境贴图对模型表面的影响程度
  });

  const mesh = new THREE.Mesh(geometry, material);

  return mesh;
};
