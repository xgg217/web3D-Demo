<template>
  <div class="box1" ref="dom"></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const dom = ref<HTMLElement>();

// 三角形
const { mesh } = (() => {
  //创建一个空的几何体对象
  const geometry = new THREE.BufferGeometry();

  //类型化数组创建顶点数据
  const vertices = new Float32Array([
    0,
    0,
    0, //顶点1坐标
    80,
    0,
    0, //顶点2坐标
    80,
    80,
    0, //顶点3坐标
  ]);

  // 创建属性缓冲区对象
  //3个为一组，表示一个顶点的xyz坐标
  const attribue = new THREE.BufferAttribute(vertices, 3);

  // 设置几何体attributes属性的位置属性
  geometry.attributes.position = attribue;

  // 材质
  const metr = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide, //两面可见
  });

  // 创建线模型对象
  const mesh = new THREE.Mesh(geometry, metr);

  return {
    mesh,
  };
})();

// const scene = new THREE.Scene();
// scene.add(mesh);

const init = () => {
  const domVal = dom.value!;

  // 获取宽高
  const width = domVal.clientWidth;
  const height = domVal.clientHeight;

  // 获取屏幕分辨率
  const widthVal = width * window.devicePixelRatio;
  const heightVal = height * window.devicePixelRatio;
  const ASPECT_RATIO = widthVal / heightVal;

  // 场景
  let scene: THREE.Scene;
  {
    scene = new THREE.Scene();
    scene.add(mesh);

    //辅助观察的坐标系
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);
  }

  // 灯光
  {
    const pointLight = new THREE.DirectionalLight(0xffffff, 1);
    pointLight.position.set(100, 100, 100);
    scene.add(pointLight);
  }

  // 创建相机
  let camera: THREE.PerspectiveCamera;
  {
    camera = new THREE.PerspectiveCamera(60, ASPECT_RATIO, 1, 10000);
    // this.camera = camera;
    camera.position.set(100, 100, 100);
    camera.lookAt(0, 0, 0);
  }

  let renderer: THREE.WebGLRenderer;
  {
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    // renderer.setAnimationLoop(() => this.animate());
    domVal.appendChild(renderer.domElement);
  }

  const controls = new OrbitControls(camera, renderer.domElement);

  // 物体
  scene.add(mesh);

  // 射线
  {
    const ray = new THREE.Ray();
    ray.origin.set(50, 50, 100);
    ray.direction = new THREE.Vector3(0, 0, -1);

    const arrowHelper = new THREE.ArrowHelper(
      ray.direction,
      ray.origin,
      1000,
      new THREE.Color("pink"),
    );
    mesh.add(arrowHelper);
  }

  // 渲染循环
  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.box1 {
  width: 100%;
  height: 50vh;
  border: 1px solid #000;
}
</style>
