import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { getRandomColor } from "@/utils/index";
import { round } from "es-toolkit";

const WIDTH_VAL = 100; // 三角形所在的范围
const HEIGHT_VAL = 100; // 三角形所在范围
const DEPTH_VAL = 100; // 三角形所在范围
const STEP = 10; // 间距

const { setTriangles, setColors } = (() => {
  const len = 5; // 三角形的边长

  const y = Math.sin((60 * Math.PI) / 180) * len; // y点长度

  // 2.移动到指定坐标，随机选择角度
  const setTriangle = (positionVal: THREE.Vector3) => {
    /**
     * 1.设置等边三角形的初始坐标
     *    点a：起点为0,0,0
     *    点b：一条边与x轴重叠，0,len,0
     *    点c：垂直于x轴
     */
    const a = new THREE.Vector3(0, 0, 0);
    const b = new THREE.Vector3(len, 0, 0);
    const c = new THREE.Vector3(len / 2, y, 0);

    // 移动到指定坐标
    a.add(positionVal);
    b.add(positionVal);
    c.add(positionVal);

    const triangle = new THREE.Triangle(a, b, c);

    // 随机旋转
    {
      const centen = new THREE.Vector3(0, 0, 0);
      triangle.getMidpoint(centen); // 三角形的中点
      centen.normalize();

      const v = Math.random() * Math.PI * 2;

      a.applyAxisAngle(centen, v);
      b.applyAxisAngle(centen, v);
      c.applyAxisAngle(centen, v);
    }

    return triangle;
  };

  /**
   * 根据宽高批量生成三角形
   * @param widthVal
   * @param heightVal
   * @param depthVal
   * @param step 三角形的间距
   */
  const setTriangles = (
    width: number,
    height: number,
    depth: number,
    step: number,
  ) => {
    // const triangles: TTriangle[] = [];
    const widthVal = Math.floor(width / step);
    const heightVal = Math.floor(height / step);
    const depthVal = Math.floor(depth / step);
    const arr: number[] = []; //

    for (let z = 1; z < depthVal; z++) {
      for (let y = 1; y < heightVal; y++) {
        for (let x = 1; x < widthVal; x++) {
          const val = new THREE.Vector3(x * step, y * step, z * step);
          const v = setTriangle(val);
          // v.a
          arr.push(v.a.x, v.a.y, v.a.z);
          arr.push(v.b.x, v.b.y, v.b.z);
          arr.push(v.c.x, v.c.y, v.c.z);
        }
      }
    }

    return arr;
  };

  // 随机颜色
  const setColor = () => {
    const c = new THREE.Color();
    const c1 = new THREE.Color(getRandomColor());
    const c2 = new THREE.Color(getRandomColor());
    // color1.clone.lerp(color2,)
    c.lerpColors(c1, c2, 0.5);
    return [c.r, c.g, c.b];
  };

  // 批量设置颜色
  const setColors = (count: number) => {
    // 计算每个顶点的颜色值
    const colorsArr = [];
    for (let i = 0; i < count; i++) {
      const percent = i / count; //点索引值相对所有点数量的百分比
      // 红色分量从0到1变化，蓝色分量从1到0变化
      const v1 = round(Math.random());
      const v2 = round(Math.random());
      const v3 = round(Math.random());
      colorsArr.push(v1, v2, v3, 0.1); //蓝色到红色渐变色
      // console.log(percent, 0, 1 - percent);
      // color.setRGB( vx, vy, vz );
      // console.log(new THREE.Color());

      // colorsArr.push(1, 0, 0); //蓝色到红色渐变色
      // const vx = ( x / n ) + 0.5;
      // const vy = ( y / n ) + 0.5;
      // const vz = ( z / n ) + 0.5;
      // colorsArr.push(1, 0, 0);
      // colorsArr.push(0, 1, 0);
      // colorsArr.push(0, 0, 1);
    }
    return colorsArr;

    // const
    // const list: number[] = [];
    // for (let i = 0; i < length; i++) {
    //   const arr = setColor();
    //   list.push(...arr);
    // }
    // return list;
  };

  return {
    setTriangles,
    setColors,
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
    const mesh = this.cereateMesh();
    // this.group.add(mesh);
    this.group.add(mesh);

    this.scene.add(this.group);
  }

  // 创建物体
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

    // 2. 批量生成三角形 所需的点位
    const arr = setTriangles(WIDTH_VAL, HEIGHT_VAL, DEPTH_VAL, STEP);

    // 3. 创建三角形
    {
      //创建一个空的几何体对象
      const geometry = new THREE.BufferGeometry();

      //类型化数组创建顶点数据
      const vertices = new Uint16Array(arr);

      // 创建属性缓冲区对象
      //3个为一组，表示一个顶点的xyz坐标
      const attribue = new THREE.BufferAttribute(vertices, 3);

      // 设置几何体attributes属性的位置属性
      geometry.attributes.position = attribue;

      // 自定义颜色（渐变颜色）
      {
        const list = setColors(arr.length);
        const colors = new Uint16Array(list);
        geometry.attributes.color = new THREE.BufferAttribute(colors, 4);
      }

      // 材质
      const metr = new THREE.MeshBasicMaterial({
        // color: 0xff0000,
        vertexColors: true,
        side: THREE.DoubleSide, //两面可见
      });

      // mesh.geometry = geometry;
      // mesh.material = metr;

      // const group = new THREE.Group();
      // 创建线模型对象
      const mesh = new THREE.Mesh(geometry, metr);
      group.add(mesh);
    }

    return group;
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
