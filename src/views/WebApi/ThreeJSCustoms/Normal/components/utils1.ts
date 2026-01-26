import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { VertexNormalsHelper } from "three/addons/helpers/VertexNormalsHelper.js";

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
    const group = new THREE.Group();

    const geometry = new THREE.BufferGeometry();
    const material = new THREE.MeshBasicMaterial({
      vertexColors: true,
      // size: 5,
      // side: THREE.DoubleSide, //两面可见
    });

    // 坐标点
    {
      //类型化数组创建顶点数据
      const vertices = new Uint16Array([
        0, 0, 0, 50, 0, 0, 0, 100, 0, 0, 0, 10, 0, 0, 100, 50, 0, 10,
      ]);

      const attribue = new THREE.BufferAttribute(vertices, 3);

      // 设置几何体attributes属性的位置属性
      geometry.attributes.position = attribue;
    }

    // 颜色
    {
      const colors = new Float32Array([
        1,
        0,
        0, //顶点1颜色
        0,
        1,
        0, //顶点2颜色
        0,
        0,
        1, //顶点3颜色
        1,
        1,
        0, //顶点4颜色
        0,
        1,
        1, //顶点5颜色
        1,
        0,
        1, //顶点6颜色
      ]);
      geometry.attributes.color = new THREE.BufferAttribute(colors, 3);
    }

    // 法线
    {
      const normals = new Float32Array([
        0,
        0,
        1, //顶点1法向量
        0,
        0,
        1, //顶点2法向量
        0,
        0,
        1, //顶点3法向量
        0,
        1,
        0, //顶点4法向量
        0,
        1,
        0, //顶点5法向量
        0,
        1,
        0, //顶点6法向量
      ]);
      geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);
    }

    const points = new THREE.Mesh(geometry, material);

    const helper = new VertexNormalsHelper(points, 8, 0x00ff00);
    group.add(helper);
    group.add(points);

    return group;
  }
}
