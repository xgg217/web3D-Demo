import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class BoxClass {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  constructor(private dom: HTMLElement) {
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

    // 创建几何体
    {
      const geometry = createGeometry();

      // 旋转90度，与x轴对齐
      // mesh.rotateX(Math.PI / 2);
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
    camera.position.set(300, 300, 300);
    camera.lookAt(0, 0, 0);

    return camera;
  }

  //
  animate() {
    this.renderer.render(this.scene, this.camera);
  }
}

const createGeometry = () => {
  const boxGeometry = new THREE.BoxGeometry(100, 100, 100);

  const geometry = new THREE.EdgesGeometry(boxGeometry);

  const material = new THREE.LineDashedMaterial({
    color: new THREE.Color("orange"),
    dashSize: 10,
    gapSize: 10,
  });

  const line = new THREE.Line(geometry, material);

  // 需要计算线段距离，才能显示虚线
  line.computeLineDistances();

  return line;
};
