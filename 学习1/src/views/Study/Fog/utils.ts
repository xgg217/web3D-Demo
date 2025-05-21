import * as THREE from "three";
import { getWAndH } from "@/utils/index";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

// 案例1
export class Fog1 {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  light: THREE.DirectionalLight; //  光源
  // cameraHelper: THREE.DirectionalLight;
  stats: Stats; // 帧率
  boxDom: HTMLElement;
  clock: THREE.Clock; // 两帧渲染时间间隔
  meshArr: THREE.Mesh[];
  gui: GUI;

  constructor() {
    const boxDom = document.querySelector(".box")! as HTMLElement;
    this.boxDom = boxDom;
    const { width, height } = getWAndH("box");
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;
    // console.log(width, height);
    // console.log(window.devicePixelRatio);

    this.clock = new THREE.Clock();

    // 场景
    const scene = this.createScene();
    this.scene = scene;

    // 相机
    const camera = this.createCamera(ASPECT_RATIO);
    this.camera = camera;

    // 光源
    const light = this.createLight();
    scene.add(light);
    this.light = light;

    // 物体
    const meshArr = this.createMesh();
    this.meshArr = meshArr;
    scene.add(...meshArr);

    // 渲染器
    const renderer = this.createRenderer(width, height);
    this.renderer = renderer;

    // 帧率
    {
      const stats = new Stats();
      boxDom.appendChild(stats.dom);
      stats.dom.style.position = "absolute";
      stats.dom.style.left = "10px";
      stats.dom.style.top = "10px";
      this.stats = stats;
    }

    // GUI
    this.gui = this.createGUI();
  }

  // 创建场景(含 雾)
  createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    //辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // 添加雾
    {
      const near = 1;
      const far = 2;
      const color = "lightblue";
      const fog = new THREE.Fog(color, near, far);
      scene.fog = fog;
      scene.background = new THREE.Color(color);
    }

    return scene;
  }

  //灯光
  createLight() {
    const color = 0xffffff;
    const intensity = 3;
    const light = new THREE.DirectionalLight(color, intensity);
    light.position.set(-1, 2, 4);
    // scene.add( light );
    return light;
  }

  // 创建相机
  createCamera(ASPECT_RATIO: number) {
    const camera = new THREE.PerspectiveCamera(75, ASPECT_RATIO, 0.1, 5);
    // this.camera = camera;
    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    return camera;
  }

  // 创建物体
  createMesh() {
    const boxWidth = 1;
    const boxHeight = 1;
    const boxDepth = 1;
    const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    // const scene = this.scene;

    function makeInstance(geometry: THREE.BoxGeometry, color: number, x: number) {
      const material = new THREE.MeshPhongMaterial({ color });

      const cube = new THREE.Mesh(geometry, material);
      // scene.add(cube);

      cube.position.x = x;

      return cube;
    }

    const cubes = [
      makeInstance(geometry, 0x44aa88, 0),
      makeInstance(geometry, 0x8844aa, -2),
      makeInstance(geometry, 0xaa8844, 2),
    ];

    // scene.add(...cubes);
    return cubes;
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

  // gui
  createGUI() {
    const fog = this.scene.fog as THREE.Fog;
    const gui = new GUI();
    gui.add(fog, "near", 1, 2);
    gui.add(fog, "far", 1, 2);
    gui.addColor({ color: new THREE.Color("lightblue") }, "color").onChange(color => {
      // console.log(err);
      this.scene.background = new THREE.Color(color);
      fog.color = new THREE.Color(color);
    });
    return gui;
  }

  animate() {
    this.renderer.render(this.scene, this.camera);

    // 运动
    {
      // 两帧渲染时间间隔
      const time = this.clock.getElapsedTime();
      const arr = this.meshArr;
      arr.forEach((item, index) => {
        const speed = 1 + index * 0.1;
        const rot = time * speed;
        item.rotation.x = rot;
        item.rotation.y = rot;
      });
    }

    this.stats.update();
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
    this.gui.destroy();

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
