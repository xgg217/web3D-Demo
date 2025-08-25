import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const WIDTH_VAL = 100; // 三角形所在的范围
const HEIGHT_VAL = 100; // 三角形所在范围
const DEPTH_VAL = 100; // 三角形所在范围

const { getTriangle } = (() => {
  type TTriangle = {
    a: THREE.Vector3;
    b: THREE.Vector3;
    c: THREE.Vector3;
  };

  const len = 5; // 三角形的边长

  const y = Math.sin((60 * Math.PI) / 180) * len; // y点长度

  /**
   * 1.设置等边三角形的初始坐标
   *    点a：起点为0,0,0
   *    点b：一条边与x轴重叠，0,len,0
   *    点c：垂直于x轴
   */
  const triangle: TTriangle = {
    a: new THREE.Vector3(0, 0, 0),
    b: new THREE.Vector3(0, len, 0),
    c: new THREE.Vector3(len / 2, y, 0),
  };

  // 2.移动到指定坐标，随机选择角度
  const getTriangle = (positionVal: THREE.Vector3) => {
    // 新的三角形
    const newTriangle: TTriangle = {
      a: triangle.a.clone(),
      b: triangle.b.clone(),
      c: triangle.c.clone(),
    };

    // 移动到指定坐标
    newTriangle.a.add(positionVal);
    newTriangle.b.add(positionVal);
    newTriangle.c.add(positionVal);

    // 随机旋转
    newTriangle.a.applyAxisAngle(new THREE.Vector3(1, 0, 0), Math.random() * Math.PI * 2);
    newTriangle.b.applyAxisAngle(new THREE.Vector3(0, 1, 0), Math.random() * Math.PI * 2);
    newTriangle.c.applyAxisAngle(new THREE.Vector3(0, 0, 1), Math.random() * Math.PI * 2);
  };

  // 根据宽高批量生成三角形
  const getTriangles = (widthVal: number, heightVal: number, depthVal: number) => {
    // const triangles: TTriangle[] = [];

    for (let i = 1; i < widthVal - 1; i++) {
      for (let j = 1; j < heightVal - 1; j++) {
        //     const positionVal = new THREE.Vector3(i, j, 0);
        //     getTriangle(positionVal);
        //     triangles.push(newTriangle);
      }
    }
  };

  return {
    getTriangle,
  };
})();

export class Test1 {
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
    this.cereateMesh();

    this.scene.add(this.group);
  }

  // 创建物体
  cereateMesh() {
    // 创建一个他们透明的正方形便于观察
    {
      const geometry = new THREE.BoxGeometry(WIDTH_VAL, HEIGHT_VAL, DEPTH_VAL);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.5,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(50, 50, 50);
      this.group.add(mesh);
    }
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

// const triangle = (() => {
//   return;
// })();

// 随机生成一个等边三角形
export const getRandomTriangle = (len: number) => {
  // 1. 先在 ​​XY 平面​​生成一个等边三角形
  {
    // 60度的正弦
    const y = Math.sin((60 * Math.PI) / 180) * len; // y点长度
    // new THREE.Vector3(0, 0, 0),
    // new THREE.Vector3(0, len, 0),
    // new THREE.Vector3(1, y, 0),

    // triangle.rotateX()
  }

  // 然后 ​​随机旋转整个三角形​​（绕任意轴旋转任意角度）
};
