import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { getWAndH } from "@/utils/index";
import * as TWEEN from "@tweenjs/tween.js";
// import anime from "animejs";

// 太阳系
export default class SolarSystem {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh; // 物体
  renderer: THREE.WebGLRenderer;
  light: THREE.PointLight; //  点光源
  stats: Stats; // 帧率
  boxDom: HTMLElement;
  tween: TWEEN.Tween;

  constructor() {
    this.boxDom = document.querySelector(".box")!;
    const { width, height } = getWAndH("box");

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

    // #region 光源
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

      // 光源辅助观察
      const pointLightHelper = new THREE.PointLightHelper(PointLight, 100);
      this.scene.add(pointLightHelper);
    }
    // #endregion

    // 物体
    {
      // 太阳
      const sunGeometry = new THREE.SphereGeometry(10, 10, 10);
      const sunMaterial = new THREE.MeshBasicMaterial({
        color: 0xffff00,
        wireframe: true,
      });
      const sumMesh = new THREE.Mesh(sunGeometry, sunMaterial);
      this.mesh = sumMesh;
      this.scene.add(sumMesh);

      // 地球;
      const earthGeometry = new THREE.SphereGeometry(5);
      const earthMaterial = new THREE.MeshLambertMaterial({
        color: 0x0000ff,
        wireframe: true,
      });
      const earthMesh = new THREE.Mesh(earthGeometry, earthMaterial);
      // earthMesh.wireframe = true;
      sumMesh.add(earthMesh);
      earthMesh.position.set(40, 0, 0);

      // 地球运动
      {
        const R = 40; // 相机圆周运动的半径

        const obj = {
          angle: 0,
        };

        // anime({
        //   targets: obj,
        //   angle: -Math.PI * 2,
        //   easing: "linear",
        //   duration: 10000,
        //   loop: true,
        //   update: () => {
        //     earthMesh.rotateY(0.02);
        //     earthMesh.position.x = R * Math.cos(obj.angle);
        //     earthMesh.position.z = R * Math.sin(obj.angle);
        //   },
        // });

        this.tween = new TWEEN.Tween(obj)
          .to({ angle: -Math.PI * 2 }, 10000)
          .repeat(Infinity)
          .onUpdate(obj => {
            earthMesh.rotateY(0.02);
            earthMesh.position.x = R * Math.cos(obj.angle);
            earthMesh.position.z = R * Math.sin(obj.angle);
            // console.log(R * Math.cos(obj.angle));
          })
          .start();
      }

      // 月亮
      const moonGeometry = new THREE.SphereGeometry(2);
      const moonMaterial = new THREE.MeshLambertMaterial({
        color: 0xffffff,
        wireframe: true,
        // side: THREE.DoubleSide, // 双面渲染
        // transparent:true,//开启透明
        // opacity: 0.75 // 不透明度
      });
      const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
      earthMesh.add(moonMesh);
      moonMesh.position.set(15, 0, 0);
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
      // renderer.shadowMap.enabled = true;
      this.renderer = renderer;
      const leftDom = document.querySelector(".box")!;
      leftDom.appendChild(renderer.domElement);
    }

    // 帧率
    {
      const stats = new Stats();
      this.boxDom.appendChild(stats.dom);
      stats.dom.style.left = "350px";
      stats.dom.style.top = "20px";
      this.stats = stats;
    }

    // 辅助网格地面
    {
      const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
      this.scene.add(gridHelper);
    }

    // 相机控件
    {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }

  // 运动
  animate() {
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }

  // 销毁
  destroy() {
    const renderer = this.renderer;
    const scene = this.scene;
    const camera = this.camera;

    // 销毁动画
    renderer.setAnimationLoop(null);

    // 清除渲染器和画布
    renderer.dispose();
    this.boxDom.removeChild(renderer.domElement);

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
