import * as THREE from "three";
import { getWAndH } from "@/utils/index";
import type { TSetLoadTextCb } from "./types";

export class Textures {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  boxDom: HTMLElement;
  mesh: THREE.Mesh;
  clock: THREE.Clock; // 两帧渲染时间间隔

  constructor(materialsArr: THREE.MeshBasicMaterial[]) {
    const boxDom = document.querySelector(".box3")! as HTMLElement;
    this.boxDom = boxDom;

    const { width, height } = getWAndH("box3");
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
    const mesh = this.createMesh(materialsArr);
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

  // 物体(含纹理)
  createMesh(materialsArr: THREE.MeshBasicMaterial[]) {
    // const loadManager = new THREE.LoadingManager();
    // const loader = new THREE.TextureLoader(loadManager);
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

    const cube = new THREE.Mesh(geometry, materialsArr);
    return cube;
  }

  // 渲染器
  createRenderer(width: number, height: number) {
    // console.log(width, height);

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

  // 创建前加载图片
  static async createTextures(cb: TSetLoadTextCb): Promise<Textures> {
    // await this.createMesh()
    const loadManager = new THREE.LoadingManager();
    const loader = new THREE.TextureLoader(loadManager);
    const urlArr = [
      new URL("./flower-1.jpg", import.meta.url).href,
      new URL("./flower-2.jpg", import.meta.url).href,
      new URL("./flower-3.jpg", import.meta.url).href,
      new URL("./flower-4.jpg", import.meta.url).href,
      new URL("./flower-5.jpg", import.meta.url).href,
      new URL("./flower-6.jpg", import.meta.url).href,
    ] as const;

    function loadColorTexture(path: string) {
      const texture = loader.load(path);
      texture.colorSpace = THREE.SRGBColorSpace;
      return texture;
    }

    const materials = [
      new THREE.MeshBasicMaterial({ map: loadColorTexture(urlArr[0]) }),
      new THREE.MeshBasicMaterial({ map: loadColorTexture(urlArr[1]) }),
      new THREE.MeshBasicMaterial({ map: loadColorTexture(urlArr[2]) }),
      new THREE.MeshBasicMaterial({ map: loadColorTexture(urlArr[3]) }),
      new THREE.MeshBasicMaterial({ map: loadColorTexture(urlArr[4]) }),
      new THREE.MeshBasicMaterial({ map: loadColorTexture(urlArr[5]) }),
    ];

    return new Promise((res, rej) => {
      loadManager.onLoad = () => {
        const textures = new Textures(materials);
        // textures.colorSpace = THREE.SRGBColorSpace;

        res(textures);
      };

      loadManager.onProgress = (urlOfLastItemLoaded, itemsLoaded, itemsTotal) => {
        cb(itemsLoaded, itemsTotal);
      };

      loadManager.onError = (url: string) => {
        rej(url);
      };
    });
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
        // object.material.dispose();
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
