import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

export class Test1 {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  cubeCamera: THREE.CubeCamera;
  renderer: THREE.WebGLRenderer;
  cubeRenderTarget: THREE.WebGLCubeRenderTarget;
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

    // 渲染器2
    {
      const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256);
      cubeRenderTarget.texture.type = THREE.HalfFloatType;

      this.cubeRenderTarget = cubeRenderTarget;
    }

    // 灯光
    // {
    //   const ambient = new THREE.AmbientLight(0xffffff, 1000);
    //   this.scene.add(ambient);
    // }

    // 创建相机
    {
      const camera = new THREE.PerspectiveCamera(60, ASPECT_RATIO, 1, 10000);
      // this.camera = camera;
      camera.position.set(80, 80, 80);
      camera.lookAt(0, 0, 0);
      this.camera = camera;
    }

    // 相机2
    this.cubeCamera = new THREE.CubeCamera(1, 1000, this.cubeRenderTarget);

    // 轨道
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.autoRotate = true;

    // 加载环境贴图
    this.crreateLoader();

    // 物体
    const mesh = this.cereateMesh();
    this.group.add(mesh);

    this.scene.add(this.group);
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    this.cubeCamera.update(this.renderer, this.scene);
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

    // 中间光亮的球体
    {
      const material = new THREE.MeshStandardMaterial({
        envMap: this.cubeRenderTarget.texture,
        roughness: 0.05,
        metalness: 1,
      });
      const sphere = new THREE.Mesh(new THREE.SphereGeometry(20, 32, 32), material);
      group.add(sphere);
    }

    const material2 = new THREE.MeshStandardMaterial({
      roughness: 0.1,
      metalness: 0,
    });

    const cube = new THREE.Mesh(new THREE.BoxGeometry(15, 15, 15), material2);
    cube.position.set(70, 0, 0);
    group.add(cube);

    const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(8, 3, 128, 16), material2);
    torus.position.set(0, 0, 70);
    group.add(torus);

    return group;
  }

  // 加载
  crreateLoader() {
    const url = new URL("./quarry_01_1k.hdr", import.meta.url).href;
    const rgbeLoader = new RGBELoader();
    rgbeLoader
      .loadAsync(url)
      .then(texture => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        this.scene.background = texture;
        this.scene.environment = texture;
        texture.dispose();
      })
      .catch(err => {
        console.error(err);
      });
  }
}
