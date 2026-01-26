import * as THREE from "three";
import { getWAndH } from "@/utils/index";

export class Textures {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  boxDom: HTMLElement;
  mesh: THREE.Mesh;
  clock: THREE.Clock; // 两帧渲染时间间隔

  constructor() {
    const boxDom = document.querySelector(".box1")! as HTMLElement;
    this.boxDom = boxDom;

    const { width, height } = getWAndH("box1");
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;

    this.clock = new THREE.Clock();

    // 场景
    const scene = this.createScene();
    this.scene = scene;

    // 相机
    const camera = this.createCamera(ASPECT_RATIO);
    this.camera = camera;

    // 物体
    const mesh = this.createMesh();
    this.mesh = mesh;
    scene.add(mesh);

    // 渲染器
    const renderer = this.createRenderer(width, height);
    this.renderer = renderer;
  }

  // 创建场景
  createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    return scene;
  }

  // 创建相机
  createCamera(ASPECT_RATIO: number) {
    const camera = new THREE.PerspectiveCamera(75, ASPECT_RATIO, 0.1, 5);
    // this.camera = camera;
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    return camera;
  }

  // 物体
  createMesh() {
    const loader = new THREE.TextureLoader();
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    const cubes = [];
    const wallURL = new URL("./wall.jpg", import.meta.url).href;

    const texture = loader.load(wallURL);
    texture.colorSpace = THREE.SRGBColorSpace;
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });
    const cube = new THREE.Mesh(geometry, material);

    return cube;
  }

  // 渲染器
  createRenderer(width: number, height: number) {
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 锯齿模糊
      logarithmicDepthBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    renderer.setAnimationLoop(() => this.animate());
    this.boxDom!.appendChild(renderer.domElement);

    return renderer;
  }

  animate() {
    this.renderer.render(this.scene, this.camera);

    // 运动
    {
      // 两帧渲染时间间隔
      const time = this.clock.getElapsedTime();
      // const speed = 1 + index * 0.1;
      const rot = time * 0.5;
      this.mesh.rotation.x = rot;
      this.mesh.rotation.y = rot;
      // const arr = this.mesh;
      // arr.forEach((item, index) => {
      //   const speed = 1 + index * 0.1;
      //   const rot = time * speed;
      //   item.rotation.x = rot;
      //   item.rotation.y = rot;
      // });
    }
  }

  // 销毁
  destroy() {
    const renderer = this.renderer;
    const scene = this.scene;
    const camera = this.camera;

    // 销毁动画
    renderer.setAnimationLoop(null);

    // 清除渲染器和画布
    renderer.dispose();
    this.boxDom.removeChild(renderer.domElement);
    this.boxDom.remove();

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

    // GUI销毁
    // this.gui.destroy();

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
}
