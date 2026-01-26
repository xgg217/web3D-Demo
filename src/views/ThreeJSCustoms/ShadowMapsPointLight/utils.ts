import * as THREE from "three";
import { getWAndH } from "@/utils/index";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

export class ShadowMapsPointLight {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  light: THREE.PointLight; //  聚光灯
  // mesh: THREE.Mesh; // 物体
  renderer: THREE.WebGLRenderer;
  boxDom: HTMLElement;

  constructor() {
    const boxDom = document.querySelector(".box")! as HTMLElement;
    this.boxDom = boxDom;
    const { width, height } = getWAndH("box");
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;

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
      renderer.shadowMap.enabled = true; // 允许光源阴影渲染

      // const leftDom = document.querySelector(".box")!;
      boxDom.appendChild(renderer.domElement);
    }

    // 场景
    {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("black");
      this.scene = scene;

      //辅助观察的坐标系
      const axesHelper = new THREE.AxesHelper(100);
      scene.add(axesHelper);
    }

    // 相机
    {
      const camera = new THREE.PerspectiveCamera(45, ASPECT_RATIO, 0.1, 100);
      this.camera = camera;
      camera.position.set(0, 10, 20);
      // this.camera.lookAt(0, 0, 0);

      // 相机控件
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 5, 0);
      controls.update();
    }

    // 物体
    {
      const loader = new THREE.TextureLoader();
      // 平面
      {
        const planeSize = 40;
        // 纹理
        const imgUr = new URL("@/assets/checker.png", import.meta.url).href;
        const texture = loader.load(imgUr);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        texture.colorSpace = THREE.SRGBColorSpace;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeo, planeMat);
        mesh.receiveShadow = true;
        mesh.rotation.x = Math.PI * -0.5;
        this.scene.add(mesh);
      }

      // 正方体
      {
        const cubeSize = 4;
        const boxGeometry = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const boxMaterial = new THREE.MeshPhongMaterial({
          color: "#8AC",
        });
        const mesh = new THREE.Mesh(boxGeometry, boxMaterial);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.set(cubeSize + 1, cubeSize / 2, 0);
        this.scene.add(mesh);
      }

      // 外面的大盒子
      {
        const cubeSize = 30;
        const cubeGeo = new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize);
        const cubeMat = new THREE.MeshPhongMaterial({
          color: "#CCC",
          side: THREE.BackSide,
        });
        const mesh = new THREE.Mesh(cubeGeo, cubeMat);
        mesh.receiveShadow = true;
        mesh.position.set(0, cubeSize / 2 - 0.1, 0);
        this.scene.add(mesh);
      }

      // 球体
      {
        const sphereRadius = 3;
        const sphereWidthDivisions = 32;
        const sphereHeightDivisions = 16;
        const sphereGeo = new THREE.SphereGeometry(
          sphereRadius,
          sphereWidthDivisions,
          sphereHeightDivisions,
        );
        const sphereMat = new THREE.MeshPhongMaterial({ color: "#CA8" });
        const mesh = new THREE.Mesh(sphereGeo, sphereMat);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        mesh.position.set(-sphereRadius - 1, sphereRadius + 2, 0);
        this.scene.add(mesh);
      }
    }

    // 光源
    {
      const color = 0xffffff;
      const intensity = 100;
      const light = new THREE.PointLight(color, intensity);
      this.light = light;
      light.castShadow = true;
      light.position.set(0, 10, 0);
      this.scene.add(light);

      // 辅助光源
      const helper = new THREE.PointLightHelper(light);
      this.scene.add(helper);
    }

    // gui
    {
      const gui = new GUI();
      // gui.addColor(new ColorGUIHelper(light, "color"), "value").name("color");
      // 光照强度
      gui.add(this.light, "intensity", 0, 200);
      // 光源照射的最大距离 默认值为 0（无限远）
      gui.add(this.light, "distance", 0, 40);

      // 分组 相机与阴影
      // {
      //   const folder = gui.addFolder("相机与阴影");
      //   folder.open();
      //   const minMaxGUIHelper = new MinMaxGUIHelper(
      //     this.light.shadow.camera,
      //     "near",
      //     "far",
      //     0.1,
      //   );
      //   folder.add(minMaxGUIHelper, "min", 0.1, 50, 0.1).name("near");
      //   folder.add(minMaxGUIHelper, "max", 0.1, 50, 0.1).name("far");
      // }
    }
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
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

// 获取 PerspectiveCamera 的所有属性类型
type MyProps = keyof THREE.PerspectiveCamera;

// 最大值与最小值
class MinMaxGUIHelper {
  obj: THREE.PerspectiveCamera;
  minProp: MyProps; // THREE.PerspectiveCamera的属性
  maxProp: MyProps; // 属性
  minDif: number; // 值

  constructor(obj: THREE.PerspectiveCamera, minProp: MyProps, maxProp: MyProps, minDif: number) {
    this.obj = obj;
    this.minProp = minProp;
    this.maxProp = maxProp;
    this.minDif = minDif;
  }
  // get min() {
  //   return this.obj[this.minProp];
  // }
  // set min(v) {
  //   this.obj[this.minProp] = v;
  //   this.obj[this.maxProp] = Math.max(this.obj[this.maxProp], v + this.minDif);
  // }

  // get max() {
  //   return this.obj[this.maxProp];
  // }
  // set max(v) {
  //   this.obj[this.maxProp] = v;
  //   this.min = this.min; // this will call the min setter
  // }
}
