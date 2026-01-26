import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { randomInt } from "es-toolkit";

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

    // 物体
    const mesh = this.cereateMesh();
    this.group.add(mesh);

    // GUI
    {
      this.cereateGUI();
    }

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

    {
      const geomerty = new THREE.PlaneGeometry(1, 1);
      const url = new URL("./KallkaGo.jpg", import.meta.url).href;
      const map = new THREE.TextureLoader().load(url);
      const material = new THREE.MeshBasicMaterial({
        map,
        color: 0xf2f2f2,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geomerty, material);
      group.add(mesh);
    }

    return group;
  }

  // GUI
  cereateGUI() {
    const folder = new GUI();
    const controls = this.controls;

    folder.add(controls, "autoRotate").name("自动旋转");

    folder.add(controls, "autoRotateSpeed").name("自动旋转速度");

    folder.add(controls, "enableDamping").name("阻尼");

    folder.add(controls, "dampingFactor").name("阻尼系数").min(0).max(1);

    folder.add(controls, "minDistance").name("最小距离");

    folder.add(controls, "maxDistance").name("最大距离");

    folder.add(controls, "maxAzimuthAngle", -2 * Math.PI, Math.PI * 2).name("水平旋转上限");

    folder.add(controls, "minAzimuthAngle", -2 * Math.PI, Math.PI * 2).name("水平旋转下限");

    folder.add(controls, "maxPolarAngle", 0, Math.PI).name("垂直旋转上限");

    folder.add(controls, "minPolarAngle", 0, Math.PI).name("垂直旋转下限");

    folder.add(controls, "maxTargetRadius").name("目标移动上限");

    folder.add(controls, "minTargetRadius").name("目标移动下限");

    folder.add(controls, "enablePan").name("平移");

    folder.add(controls, "panSpeed").name("平移速度");

    folder.add(controls, "enableRotate").name("旋转");

    folder.add(controls, "rotateSpeed").name("旋转速度");

    folder.add(controls, "enableZoom").name("缩放");

    folder.add(controls, "zoomSpeed").name("缩放速度");

    folder.add(controls, "zoomToCursor").name("光标为缩放中心");

    folder.add(controls.target, "x").name("目标位置x").listen();

    folder.add(controls.target, "y").name("目标位置y").listen();

    folder.add(controls.target, "z").name("目标位置z").listen();

    folder.add({ 重置: () => folder.reset() }, "重置");
  }
}
