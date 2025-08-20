import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class TunnelShuttleClass {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  tubePoints: THREE.Vector3[]; // 路径点
  onKeyDown: (e: KeyboardEvent) => void; // 键盘按下事件
  tubePointsIndex: number; // 路径点索引
  constructor(private dom: HTMLElement) {
    // console.log("TunnelShuttleClass");
    this.tubePointsIndex = 0;

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
    // {
    //   const pointLight = new THREE.PointLight(0xffffff, 200);
    //   pointLight.position.set(80, 80, 80);
    //   this.scene.add(pointLight);
    // }

    // 创建相机
    {
      const camera = new THREE.PerspectiveCamera(60, ASPECT_RATIO, 1, 10000);
      // this.camera = camera;
      camera.position.set(200, 200, 200);
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

    // 轨道
    new OrbitControls(this.camera, this.renderer.domElement);

    // 几何体
    {
      const { mesh, tubePoints } = this.createGeometry();
      this.scene.add(mesh);
      this.tubePoints = tubePoints;
    }

    // 键盘事件
    {
      this.onKeyDown = this.keyDownClick.bind(this);
    }
    window.addEventListener("keydown", this.onKeyDown);
  }

  // 创建隧道几何体
  createGeometry() {
    // 轨迹
    const path = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-100, 20, 90),
      new THREE.Vector3(-40, 80, 100),
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(60, -60, 0),
      new THREE.Vector3(100, -40, 80),
      new THREE.Vector3(150, 60, 60),
    ]);

    const geometry = new THREE.TubeGeometry(path, 100, 5, 30);

    const tubePoints = path.getSpacedPoints(1000); // 获取路径点
    // console.log(tubePoints);

    // 加载纹理
    const loader = new THREE.TextureLoader();
    const imgUr = new URL("./water.png", import.meta.url).href;
    const texture = loader.load(imgUr);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.repeat.x = 20;

    const material = new THREE.MeshBasicMaterial({
      // color: new THREE.Color("orange"),
      map: texture,
      aoMap: texture,
      side: THREE.DoubleSide,
    });

    const mesh = new THREE.Mesh(geometry, material);

    return {
      mesh,
      tubePoints,
    };
  }

  animate() {
    const index = this.tubePointsIndex;

    // 设置相机的位置
    if (index < this.tubePoints.length - 1) {
      this.camera.position.copy(this.tubePoints[index]);
      this.camera.lookAt(this.tubePoints[index + 1]);
      // this.tubePointsIndex++;
    } else {
      this.tubePointsIndex = 0;
    }

    this.renderer.render(this.scene, this.camera);
  }

  // 键盘事件
  keyDownClick(e: KeyboardEvent) {
    console.log(e.code);

    // 鼠标按下 方向键 的 上
    if (e.code === "ArrowUp") {
      console.log(this);

      this.tubePointsIndex = this.tubePointsIndex + 10;
    }
  }

  destroy() {
    window.removeEventListener("keydown", this.onKeyDown);

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
