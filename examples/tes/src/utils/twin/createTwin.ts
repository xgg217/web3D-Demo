import * as THREE from "three";
import type { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, CubeTextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import type { IParams } from "./types";

// 获取宽高
const getWAndH = (el: Element) => {
  const mainStyle = window.getComputedStyle(el);
  const width = parseInt(mainStyle.width);
  const height = parseInt(mainStyle.height);
  return { width, height };
};

export default class CreateTwin {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  directionalLight: DirectionalLight; // 平行光
  controls: OrbitControls; // 相机控件
  GLTFLoader: GLTFLoader; // gltf
  textureCube: CubeTextureLoader; // 环境贴图

  constructor(params: IParams) {
    const mainDom = document.querySelector(`.main ${params.domName}`)!;

    // 场景
    this.scene = new THREE.Scene();

    // 相机
    const { width, height } = getWAndH(mainDom);
    // 透视投影相机
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000);
    this.camera.position.set(1.24, 7.03, 52.5);
    this.camera.lookAt(0, 0, 0);

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      logarithmicDepthBuffer: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
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

    // 环境贴图
    this.textureCube = new THREE.CubeTextureLoader();

    // gltf加载
    this.GLTFLoader = new GLTFLoader();

    // 相机控件
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    // 画布尺寸随着窗口变化
    window.addEventListener("resize", () => {
      const { width, height } = getWAndH(mainDom);

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }
}
