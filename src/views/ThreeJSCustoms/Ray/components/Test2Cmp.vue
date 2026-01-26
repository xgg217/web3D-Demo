<template>
  <div class="box2" ref="dom"></div>
</template>

<script setup lang="ts">
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const dom = ref<HTMLElement>();

// 随机颜色 16进制
const getRandomColor = () => {
  const val = "#" + Math.random().toString(16).substring(2, 8).padEnd(6, "0");
  return new THREE.Color(val);
};

// 创建物体
const { mesh } = (() => {
  const mesh = new THREE.Group();

  // 立方体1
  const box1 = new THREE.BoxGeometry(50, 50, 50);
  const box2 = new THREE.BoxGeometry(50, 50, 50);
  box2.translate(100, 0, 0); // 向x轴平移100
  const box3 = new THREE.BoxGeometry(50, 50, 50);
  box3.translate(0, 0, 100); // 向Z轴正方向移动100

  const material1 = new THREE.MeshBasicMaterial({
    color: new THREE.Color("red"),
  });

  const material2 = new THREE.MeshBasicMaterial({
    color: new THREE.Color("green"),
  });

  const material3 = new THREE.MeshBasicMaterial({
    color: new THREE.Color("blue"),
  });

  const mesh1 = new THREE.Mesh(box1, material1);
  const mesh2 = new THREE.Mesh(box2, material2);
  const mesh3 = new THREE.Mesh(box3, material3);

  mesh.add(mesh1, mesh2, mesh3);

  return {
    mesh,
  };
})();

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

  // 射线选中改变物体颜色
  {
    renderer.domElement.addEventListener("click", e => {
      // .offsetY、.offsetX以canvas画布左上角为坐标原点,单位px
      const px = e.offsetX;
      const py = e.offsetY;
      //屏幕坐标px、py转WebGL标准设备坐标x、y
      //width、height表示canvas画布宽高度
      const x = (px / width) * 2 - 1;
      const y = -(py / height) * 2 + 1;
      //创建一个射线投射器`Raycaster`
      const raycaster = new THREE.Raycaster();
      //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
      // 形象点说就是在点击位置创建一条射线，射线穿过的模型代表选中
      raycaster.setFromCamera(new THREE.Vector2(x, y), camera);

      // 未选中对象返回空数组[],选中一个对象，数组1个元素，选中两个对象，数组两个元素
      const intersects = raycaster.intersectObjects(mesh.children);

      if (intersects.length > 0) {
        const color = getRandomColor();

        // @ts-ignore 选中模型的第一个模型，设置为红色
        intersects[0].object.material.color.set(color);
      }
    });
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
.box2 {
  width: 100%;
  height: 50vh;
  border: 1px solid #000;
}
</style>
