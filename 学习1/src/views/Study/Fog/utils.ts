import * as THREE from "three";
import { getWAndH } from "@/utils/index";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// 案例1
export class Fog1 {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  light: THREE.SpotLight; //  点光源
  cameraHelper: THREE.CameraHelper;
  stats: Stats; // 帧率
  boxDom: HTMLElement;

  constructor() {
    const boxDom = document.querySelector(".box1")! as HTMLElement;
    this.boxDom = boxDom;
    const { width, height } = getWAndH("box");
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;

    // 场景
    const scene = this.createScene();
    this.scene = scene;

    // 相机
    const camera = this.createCamera(ASPECT_RATIO);
    this.camera = camera;

    // 光源

    // 物体

    // 渲染器
    const renderer = this.createRenderer(width, height);
    this.renderer = renderer;

    // 帧率
    {
      const stats = new Stats();
      boxDom.appendChild(stats.dom);
      stats.dom.style.left = "350px";
      stats.dom.style.top = "20px";
      this.stats = stats;
    }
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
    const camera = new THREE.PerspectiveCamera(40, ASPECT_RATIO, 0.1, 1000);
    // this.camera = camera;
    camera.position.set(50, 130, 130);
    camera.lookAt(0, 0, 0);

    return camera;
  }

  // 渲染器
  createRenderer(width: number, height: number) {
    const renderer = new THREE.WebGLRenderer({
      antialias: true, // 锯齿模糊
      logarithmicDepthBuffer: true,
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    this.boxDom!.appendChild(renderer.domElement);

    return renderer;
  }
}
