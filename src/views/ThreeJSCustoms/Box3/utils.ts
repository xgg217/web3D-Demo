import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export class BoxClass {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  fltfGroup: THREE.Group; // 加载的模型

  constructor(private dom: HTMLElement) {
    this.fltfGroup = new THREE.Group();

    // 获取宽高
    const width = this.dom.clientWidth;
    const height = this.dom.clientHeight;

    // 获取屏幕分辨率
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;

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
      const pointLight = new THREE.PointLight(0xffffff, 100000);
      pointLight.position.set(100, 100, 100);
      this.scene.add(pointLight);
    }

    // 创建相机
    {
      const camera = new THREE.PerspectiveCamera(60, ASPECT_RATIO, 1, 10000);
      // this.camera = camera;
      camera.position.set(100, 100, 100);
      camera.lookAt(0, 0, 0);
      this.camera = camera;
    }

    // 渲染器
    {
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(width, height);
      renderer.setAnimationLoop(() => this.animate());
      dom.appendChild(renderer.domElement);
      this.renderer = renderer;
    }

    // 加载glf
    this.loadGLF()
      .then(gltf => {
        if (!gltf) {
          return;
        }

        // 放大
        gltf.scene.scale.set(50, 50, 50);

        // this.fltfGroup = gltf.scene;
        this.fltfGroup.add(gltf.scene);

        // 计算包围盒
        {
          const scale = new THREE.Vector3();
          const box3 = new THREE.Box3();
          box3.expandByObject(gltf.scene);
          box3.getSize(scale);
        }

        // 包围盒线框
        {
          const helper = new THREE.BoxHelper(gltf.scene, "pink");
          // mesh.add(helper);
          this.fltfGroup.add(helper);
        }

        this.scene.add(this.fltfGroup);
      })
      .catch(err => {
        console.error(err);
      });

    // 轨道
    new OrbitControls(this.camera, this.renderer.domElement);
  }

  // 加载glf
  async loadGLF() {
    const loader = new GLTFLoader();
    try {
      const glfUrl = new URL("./Michelle.glb", import.meta.url).href;
      const gltf = await loader.loadAsync(glfUrl);
      return gltf;
    } catch (error) {
      console.error(error);
    }

    // loader.load(glfUrl, gltf => {
    //   this.fltfGroup = gltf.scene;
    //   this.scene.add(this.fltfGroup);
    // });
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
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
}
