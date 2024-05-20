import * as THREE from "three";
import type { Scene, PerspectiveCamera, WebGLRenderer, DirectionalLight, CubeTextureLoader } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import Helper from "./helpers";
import type { IParams } from "./types";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

// 获取宽高
export const getWAndH = () => {
  const width = window.innerWidth - 300 - 15;
  const height = window.innerHeight - 15;
  return { width, height };
};

type IHelper = typeof Helper;

export default class CreateTwin {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  directionalLight: DirectionalLight; // 平行光
  controls: OrbitControls; // 相机控件
  GLTFLoader: GLTFLoader; // gltf
  textureCube: CubeTextureLoader; // 环境贴图
  helper: IHelper; // 辅助工具

  constructor(params: IParams) {
    const { domName } = params;

    const mainDom = document.querySelector(`.main ${domName}`)!;

    console.log(mainDom);

    // 场景
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xa0a0a0);

    // 相机
    const { width, height } = getWAndH();
    // 透视投影相机
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 3000);
    this.camera.position.set(1.24, 7.03, 52.5);
    this.camera.lookAt(0, 0, 0);

    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true, // 锯齿模糊
      logarithmicDepthBuffer: true
    });
    this.renderer.setPixelRatio(window.devicePixelRatio); //防止输出模糊
    this.renderer.setSize(width, height);
    mainDom.appendChild(this.renderer.domElement);

    // 平行光
    this.directionalLight = new THREE.DirectionalLight(0xffffff, 3.0);
    this.directionalLight.position.set(3, 10, 10);
    this.scene.add(this.directionalLight);

    // 环境贴图
    this.textureCube = new THREE.CubeTextureLoader();

    const dracoLoader = new DRACOLoader();
    // // DRACOLoader依赖examples\jsm\libs\draco\gltf里面多个解压文件
    dracoLoader.setDecoderPath("./draco/");

    // gltf加载
    this.GLTFLoader = new GLTFLoader();
    this.GLTFLoader.setDRACOLoader(dracoLoader);

    // 相机控件
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.target.set(0, 0, 0);
    this.controls.update();

    //辅助观察的坐标系
    const helper = new Helper(this.scene, this.directionalLight, { domName: domName });

    // 渲染循环 setAnimationLoop 内置方法用于代替requestAnimationFrame
    this.renderer.setAnimationLoop(() => {
      // console.log(2);
      helper.stats.update();

      this.renderer.render(this.scene, this.camera);
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    this.helper = helper;

    // 画布尺寸随着窗口变化
    window.addEventListener("resize", () => {
      const { width, height } = getWAndH();
      // console.log(width);

      this.renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });
  }
}
