import * as THREE from "three";
import { getWAndH } from "@/utils/index";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class ShadowMapsPointLight {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  // mesh: THREE.Mesh; // 物体
  renderer: THREE.WebGLRenderer;

  constructor() {
    const boxDom = document.querySelector(".box")!;
    const { width, height } = getWAndH("box");
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;

    // 渲染器
    {
      const renderer = new THREE.WebGLRenderer({
        antialias: true, // 锯齿模糊
        logarithmicDepthBuffer: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setAnimationLoop(() => this.animate());
      this.renderer = renderer;
      renderer.shadowMap.enabled = true; // 允许光源阴影渲染

      // const leftDom = document.querySelector(".box")!;
      boxDom.appendChild(renderer.domElement);
    }

    // 场景
    {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("black");
      this.scene = scene;

      //辅助观察的坐标系
      const axesHelper = new THREE.AxesHelper(100);
      scene.add(axesHelper);
    }

    // 相机
    {
      const camera = new THREE.PerspectiveCamera(45, ASPECT_RATIO, 0.1, 100);
      this.camera = camera;
      camera.position.set(0, 10, 20);
      // this.camera.lookAt(0, 0, 0);

      // 相机控件
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 5, 0);
      controls.update();
    }
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
  }
}
