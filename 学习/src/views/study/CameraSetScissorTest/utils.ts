import * as THREE from "three";
import { getWAndH } from "@/utils/index";

export class CameraSetScissorTest {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh; // 物体
  renderer: THREE.WebGLRenderer;
  light: THREE.PointLight; //  点光源

  constructor() {
    const boxDom = document.querySelector(".box")!;
    const { width, height } = getWAndH("box");
    console.log(width, height);

    // 场景
    {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x000000);
      this.scene = scene;

      //辅助观察的坐标系
      const axesHelper = new THREE.AxesHelper(100);
      scene.add(axesHelper);
    }

    // 相机
    {
      const widthVal = width * window.devicePixelRatio;
      const heightVal = height * window.devicePixelRatio;
      const ASPECT_RATIO = widthVal / heightVal;

      const camera = new THREE.PerspectiveCamera(40, ASPECT_RATIO, 0.1, 1000);
      this.camera = camera;
      camera.position.set(50, 130, 130);
      this.camera.lookAt(0, 0, 0);
    }

    // 光源
    {
      // 点光源
      const PointLight = new THREE.PointLight(0xffffff, 100000, 100);
      // 设置光源位置
      PointLight.position.set(0, 0, 0);
      this.light = PointLight;
      this.scene.add(PointLight);

      // 环境光
      const ambient = new THREE.AmbientLight(0xffffff, 0.1);
      this.scene.add(ambient);
    }

    // 物体
    {
      // 球体
      const sphereGeometry = new THREE.SphereGeometry(10, 10, 10);
      const sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
      });
      const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);

      // 立方体
      // const boxGeometry = new THREE.BoxGeometry(10, 10, 10);
      // const boxMaterial = new THREE.MeshBasicMaterial({
      //   color: 0xffff00,
      // });
      // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      this.mesh = sphereMesh;
      this.scene.add(sphereMesh);
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
      this.renderer = renderer;
      const leftDom = document.querySelector(".box")!;
      leftDom.appendChild(renderer.domElement);
    }
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    // this.stats.update();
  }
}
