import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { randomInt } from "es-toolkit";

const WIDTH_VAL = 100; // 三角形所在的范围
const HEIGHT_VAL = 100; // 三角形所在范围
const DEPTH_VAL = 100; // 三角形所在范围
const COUNT = 1000; // 生成点的数量

export class Points {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
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

    // 物体
    const mesh = this.cereateMesh();
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

  cereateMesh() {
    // 创建线模型对象
    const group = new THREE.Group();

    // 1. 辅助创建一个他们透明的正方形便于观察
    {
      const geometry = new THREE.BoxGeometry(WIDTH_VAL, HEIGHT_VAL, DEPTH_VAL);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.2,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(50, 50, 50);
      group.add(mesh);
    }

    // 批量生成点
    {
      const geometry = new THREE.BufferGeometry();

      // 生成点坐标、颜色
      const { positionArr, colorArr } = setPoints(
        WIDTH_VAL,
        HEIGHT_VAL,
        DEPTH_VAL,
      );

      // 坐标
      {
        const vertices = new Uint16Array(positionArr);
        // 创建属性缓冲区对象
        //3个为一组，表示一个顶点的xyz坐标
        const attribue = new THREE.BufferAttribute(vertices, 3);
        geometry.setAttribute("position", attribue);
      }

      // 颜色
      {
        // 创建属性缓冲区对象
        const vertices = new Float32Array(colorArr);
        //3个为一组，表示一个顶点的xyz坐标
        const attribue = new THREE.BufferAttribute(vertices, 3);
        geometry.setAttribute("color", attribue);
      }

      const material = new THREE.PointsMaterial({
        size: 5,
        vertexColors: true,
      });

      const points = new THREE.Points(geometry, material);
      group.add(points);
    }

    return group;
  }
}

/**
 * 生成点
 * @param width
 * @param height
 * @param depth
 */
const setPoints = (width: number, height: number, depth: number) => {
  const positionArr: number[] = [];
  const colorArr: number[] = [];
  const n = COUNT / 2;

  const color = new THREE.Color();

  for (let i = 0; i < COUNT; i++) {
    // 位置
    const x = randomInt(0, width);
    const y = randomInt(0, height);
    const z = randomInt(0, depth);
    positionArr.push(x, y, z);

    // 颜色
    {
      const vx = x / n + 0.5;
      const vy = y / n + 0.5;
      const vz = z / n + 0.5;
      color.setRGB(vx, vy, vz, THREE.SRGBColorSpace);
      colorArr.push(color.r, color.g, color.b);
    }
  }

  return { positionArr, colorArr };
};
