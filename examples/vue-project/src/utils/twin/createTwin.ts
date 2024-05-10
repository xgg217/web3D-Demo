import * as THREE from "three";
import type { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export default class CreateTwin {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  directionalLight: DirectionalLight;
  controls: OrbitControls;
  GLTFLoader: GLTFLoader;

  constructor() {
    const mainDom = document.querySelector(".main")!;
    const mainStyle = getComputedStyle(mainDom);

    // 场景
    this.scene = new THREE.Scene();

    // 相机
    const width = parseInt(mainStyle.width);
    const height = parseInt(mainStyle.height);
    // 透视投影相机
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000);
    this.camera.position.set(1.24, 7.03, 52.5);
    this.camera.lookAt(0, 0, 0);

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    mainDom.appendChild(this.renderer.domElement);

    // 渲染循环 setAnimationLoop 内置方法用于代替requestAnimationFrame
    this.renderer.setAnimationLoop(() => {
      this.renderer.render(this.scene, this.camera);
    });

    // 平行光
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    this.directionalLight.position.set(80, 100, 50);
    this.scene.add(this.directionalLight);

    // 设置.envMap
    // const rgbeLoader = new RGBELoader();
    // rgbeLoader.load("./envMap.hdr", envMap => {
    //   this.scene.environment = envMap;
    //   envMap.mapping = THREE.EquirectangularReflectionMapping;
    // });

    // gltf加载
    const draco = new DRACOLoader();
    draco.setDecoderPath("./draco/");
    // 创建一个gltf的加载器对象
    this.GLTFLoader = new GLTFLoader();
    this.GLTFLoader.setDRACOLoader(draco);

    // 相机控件
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();
    // 画布尺寸随着窗口变化
    mainDom.addEventListener("resize", () => {
      const mainStyle = getComputedStyle(mainDom);
      const width = parseInt(mainStyle.width);
      const height = parseInt(mainStyle.height);

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }
}
