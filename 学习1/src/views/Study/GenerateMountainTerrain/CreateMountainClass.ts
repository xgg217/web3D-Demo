import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createNoise2D } from "simplex-noise";

// 创建山脉
export class CreateMountain {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  constructor(private dom: HTMLElement) {
    // this.dom = dom;

    // 获取宽高
    const width = dom.clientWidth;
    const height = dom.clientHeight;

    // 获取屏幕分辨率
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;

    // 场景
    {
      const scene = this.createScene();
      this.scene = scene;
    }

    // 创建相机
    {
      const camera = this.createCamera(ASPECT_RATIO);
      this.camera = camera;
    }

    // 渲染器
    {
      const renderer = new THREE.WebGLRenderer({
        antialias: true, // 锯齿模糊
        logarithmicDepthBuffer: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setAnimationLoop(() => this.animate());
      dom.appendChild(renderer.domElement);
      this.renderer = renderer;
    }

    // 轨道
    {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
    }

    // 创建平面体
    {
      const geometry = createGeometry();
      // 旋转90度，与x轴对齐
      geometry.rotateX(Math.PI / 2);
      this.scene.add(geometry);
    }
  }

  // 场景
  createScene() {
    const scene = new THREE.Scene();

    //辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    return scene;
  }

  // 创建相机
  createCamera(ASPECT_RATIO: number) {
    const camera = new THREE.PerspectiveCamera(75, ASPECT_RATIO, 1, 10000);
    // this.camera = camera;
    camera.position.set(200, 200, 200);
    camera.lookAt(0, 0, 0);

    return camera;
  }

  //
  animate() {
    this.renderer.render(this.scene, this.camera);
  }
}

// 创建平面几何体
const createGeometry = () => {
  // 创建几何体 长100段 宽100段
  const geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

  const noise2D = createNoise2D();
  const positions = geometry.attributes.position;

  for (let i = 0; i < positions.count; i++) {
    const x = positions.getX(i);
    const y = positions.getY(i);

    const z = noise2D(x / 300, y / 300) * 50;

    // 正弦值是从 -1 到 1 变化，我们传入时间来计算正弦，得到的就是一个不断变化的 -1 到 1 的值
    const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;

    positions.setZ(i, z + sinNum);
  }

  // 随机顶点坐标
  // const position = geometry.attributes.position;
  // // console.log(position);
  // for (let i = 0; i < position.count; i++) {
  //   // position.setZ(i, Math.random() * 50);
  //   const x = position.getX(i);
  //   const y = position.getX(i);
  //   // 传入 x、y 让噪音算法算出这个位置的 z
  //   const z = noise2D(x / 100, y / 100) * 50;
  //   position.setZ(i, z);
  // }

  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color("orange"),
    wireframe: true,
  });

  return new THREE.Mesh(geometry, material);
};
