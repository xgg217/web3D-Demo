import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

// draco.setDecoderConfig({ type: "js" });

export class Test1 {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  group: THREE.Group;
  controls: OrbitControls;

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

    // 灯光
    {
      const ambient = new THREE.AmbientLight(0xffffff, 1000);
      this.scene.add(ambient);
    }

    // 创建相机
    {
      const camera = new THREE.PerspectiveCamera(60, ASPECT_RATIO, 1, 10000);
      // this.camera = camera;
      camera.position.set(3, 3, 3);
      camera.lookAt(0, 0, 0);
      this.camera = camera;
    }

    // 渲染器
    {
      const renderer = new THREE.WebGLRenderer({
        antialias: true, // 抗锯齿
      });
      renderer.setSize(width, height);
      renderer.setAnimationLoop(() => this.animate());
      dom.appendChild(renderer.domElement);
      this.renderer = renderer;
    }

    // 轨道
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // 坐标轴
    this.scene.add(new THREE.AxesHelper(10), new THREE.GridHelper(10, 10));

    // 加载资源
    this.createGLTF();

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

  // 加载 gltf
  createGLTF() {
    const draco = new DRACOLoader();
    // const url = new URL("draco/", import.meta.url).href;
    // draco.setDecoderPath("./draco/"); // 设置 解码器路径
    draco.setDecoderPath("https://www.gstatic.com/draco/versioned/decoders/1.5.6/");
    const url = new URL("./bunny.drc", import.meta.url).href;
    draco.load(url, geometry => {
      geometry.computeVertexNormals();

      const material = new THREE.MeshStandardMaterial({ color: 0xa5a5a5 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.scene.add(mesh);

      // Release decoder resources.
      draco.dispose();
    });
  }
}
