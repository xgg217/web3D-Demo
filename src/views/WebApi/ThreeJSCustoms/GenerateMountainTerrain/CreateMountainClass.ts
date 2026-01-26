import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { createNoise2D } from "simplex-noise";

// 创建山脉
export class CreateMountain {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.Mesh;
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
      this.mesh = geometry;
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
    // 山体起伏
    updatePosition();
    // 旋转镜头
    this.mesh.rotateZ(0.001);

    this.renderer.render(this.scene, this.camera);
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

const { createGeometry, updatePosition } = (() => {
  // 创建几何体 长100段 宽100段
  let geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);

  let noise2D = createNoise2D();

  const createGeometry = () => {
    geometry = new THREE.PlaneGeometry(3000, 3000, 100, 100);
    noise2D = createNoise2D();
    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("orange"),
      wireframe: true,
    });

    // 更新
    updatePosition();

    const mesh = new THREE.Mesh(geometry, material);
    return mesh;
  };

  const updatePosition = () => {
    const positions = geometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const y = positions.getY(i);

      const z = noise2D(x / 300, y / 300) * 50;

      // 正弦值是从 -1 到 1 变化，我们传入时间来计算正弦，得到的就是一个不断变化的 -1 到 1 的值
      // 因为 Math.sin 是从 -1 到 1 变化的，所以 * 10 就是 -10 到 10 变化，这样就有 20 的高度波动
      // sin 的参数首先是传入时间，因为它是不断变化的，所以传入它就有 -1 到 1 的 sin 的不断变化
      // 当然，它的值很大，我们要把它变小一点，乘以 0.002
      // 想让每个顶点都不一样，所以 sin 的参数还要传入一个 x 坐标，这样每个顶点变化的值不同，是符合正弦规律的变化
      const sinNum = Math.sin(Date.now() * 0.002 + x * 0.05) * 10;

      positions.setZ(i, z + sinNum);
    }
    positions.needsUpdate = true;
  };

  // const material = new THREE.MeshBasicMaterial({
  //   color: new THREE.Color("orange"),
  //   wireframe: true,
  // });

  // const mesh = new THREE.Mesh(geometry, material);

  return { createGeometry, updatePosition };
})();
