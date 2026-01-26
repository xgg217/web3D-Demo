import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export class Test1 {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  controls: OrbitControls;
  group: THREE.Group;

  constructor(private dom: HTMLElement) {
    // 获取宽高
    const width = this.dom.clientWidth;
    const height = this.dom.clientHeight;

    // 获取屏幕分辨率
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;

    this.group = new THREE.Group();

    // 场景
    {
      const scene = new THREE.Scene();

      //辅助观察的坐标系
      const axesHelper = new THREE.AxesHelper(100);
      scene.add(axesHelper);
      this.scene = scene;
    }

    // 环境贴图
    {
      // 加载环境贴图
      const textureCube = this.crreateLoader();
      this.scene.background = textureCube;
    }

    // 渲染器1
    {
      const renderer = new THREE.WebGLRenderer({
        antialias: true, // 抗锯齿
      });
      renderer.setSize(width, height);
      renderer.setAnimationLoop(() => this.animate());
      dom.appendChild(renderer.domElement);
      this.renderer = renderer;
    }

    // 创建相机
    {
      const camera = new THREE.PerspectiveCamera(60, ASPECT_RATIO, 1, 10000);
      // this.camera = camera;
      camera.position.set(80, 80, 80);
      camera.lookAt(0, 0, 0);
      this.camera = camera;
    }

    // 轨道
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // 物体
    const mesh = this.cereateMesh();
    this.group.add(mesh);

    this.scene.add(this.group);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    this.controls.update();
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

    return group;
  }

  // 加载
  crreateLoader() {
    const urls = [
      new URL("./images/px.png", import.meta.url).href,
      new URL("./images/nx.png", import.meta.url).href,
      new URL("./images/py.png", import.meta.url).href,
      new URL("./images/ny.png", import.meta.url).href,
      new URL("./images/pz.png", import.meta.url).href,
      new URL("./images/nz.png", import.meta.url).href,
    ];

    const textureCube = new THREE.CubeTextureLoader()
      .setPath(new URL("./images", import.meta.url).href)
      .load(["/px.png", "/py.png", "/pz.png", "/nx.png", "/ny.png", "/nz.png"]);

    // const textureCube = new THREE.CubeTextureLoader().load(urls);
    return textureCube;
  }
}
