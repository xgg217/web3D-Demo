import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { cereateScaleline } from "./utils2";
import type { TFun } from "./types";

export class Test1 {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  group: THREE.Group;

  constructor(
    private dom: HTMLElement,
    func: TFun,
  ) {
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
      const renderer = new THREE.WebGLRenderer({
        antialias: true, // 抗锯齿
      });
      renderer.setSize(width, height);
      renderer.setAnimationLoop(() => this.animate());
      dom.appendChild(renderer.domElement);
      this.renderer = renderer;
    }

    // 轨道
    new OrbitControls(this.camera, this.renderer.domElement);

    // 物体
    const mesh = this.cereateMesh(func);
    // this.group.add(mesh);
    this.group.add(mesh);

    this.scene.add(this.group);
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

  cereateMesh(func: TFun) {
    const group = new THREE.Group();

    // 创建坐标轴
    const axesHelper = cereateScaleline(100, 100);
    group.add(axesHelper);

    // 柱状图
    // const bar = cereateBarChart([70, 20, 80, 40, 50]);
    const bar = func([70, 20, 100, 40, 50]);
    group.add(bar);

    return group;
  }
}
