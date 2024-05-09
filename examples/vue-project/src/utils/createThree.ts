import * as THREE from "three";
import type { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default class CreateTwin {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  directionalLight: DirectionalLight;
  controls: OrbitControls;

  constructor() {
    // 场景
    this.scene = new THREE.Scene();
    // 相机
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000);

    this.camera.position.set(1.24, 7.03, 52.5);

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    });

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    document.body.appendChild(this.renderer.domElement);

    // 渲染循环
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });

    // 平行光
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    this.directionalLight.position.set(80, 100, 50);
    this.scene.add(this.directionalLight);

    // 设置.envMap
    const rgbeLoader = new RGBELoader();
    rgbeLoader.load("./envMap.hdr", envMap => {
      this.scene.environment = envMap;
      envMap.mapping = THREE.EquirectangularReflectionMapping;
    });

    // 相机控件
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    // 画布尺寸随着窗口变化
    window.addEventListener("resize", () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    });
  }
}
