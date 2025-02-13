import * as THREE from "three";
import { getWAndH } from "@/utils/index";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

type TSphereShadowBases = {
  base: THREE.Object3D;
  sphereMesh: THREE.Mesh; // 物体
  shadowMesh: THREE.Mesh; // 阴影网格
  y: number;
};

export class SimulatedShadow {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh; // 物体
  renderer: THREE.WebGLRenderer;
  // light: THREE.AmbientLight; //  光源
  sphereShadowBases: TSphereShadowBases[]; // 球体 + 阴影网格
  // cameraHelper: THREE.CameraHelper;
  clock: THREE.Clock; // 两帧渲染时间间隔
  boxDom: HTMLElement;

  constructor() {
    const boxDom = document.querySelector(".box")! as HTMLElement;
    this.boxDom = boxDom;
    const { width, height } = getWAndH("box");
    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;
    this.sphereShadowBases = [];
    const numSpheres = 15; // 小球个数

    this.clock = new THREE.Clock();

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
      scene.background = new THREE.Color(0x000000);
      this.scene = scene;

      //辅助观察的坐标系
      const axesHelper = new THREE.AxesHelper(100);
      scene.add(axesHelper);
    }

    // 相机
    {
      const camera = new THREE.PerspectiveCamera(40, ASPECT_RATIO, 0.1, 1000);
      this.camera = camera;
      camera.position.set(50, 100, 100);
      this.camera.lookAt(0, 0, 0);
    }

    // 光源
    {
      // 半球光 将其光照强度设置为 2，让场景比较明亮
      {
        const skyColor = 0xb1e1ff; // 天空的颜色
        const groundColor = 0xb97a20; // 地面的颜色
        const intensity = 2;
        const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
        this.scene.add(light);
      }

      // 环境光 让球体看起来有些视觉的区别
      {
        {
          const color = 0xffffff;
          const intensity = 1;
          const light = new THREE.DirectionalLight(color, intensity);
          light.position.set(0, 10, 5);
          light.target.position.set(-5, 0, 0);
          this.scene.add(light);
          this.scene.add(light.target);
        }
      }
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
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        //
        const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        planeMat.color.setRGB(1.5, 1.5, 1.5);
        const mesh = new THREE.Mesh(planeGeometry, planeMat);

        mesh.rotation.x = -Math.PI / 2;
        // mesh.receiveShadow = true;
        this.mesh = mesh;
        this.scene.add(mesh);
      }

      // 物体
      const sphereRadius = 1;
      const sphereWidthDivisions = 32;
      const sphereHeightDivisions = 16;
      const sphereGeo = new THREE.SphereGeometry(
        sphereRadius,
        sphereWidthDivisions,
        sphereHeightDivisions,
      );

      // 假阴影的平面网格
      const planeSize = 1;
      const shadowGeo = new THREE.PlaneGeometry(planeSize, planeSize);

      // 阴影纹理
      const imgUr = new URL("./roundshadow.png", import.meta.url).href;
      const shadowTexture = loader.load(imgUr);

      for (let i = 0; i < numSpheres; ++i) {
        const base = new THREE.Object3D();
        this.scene.add(base);

        const shadowMat = new THREE.MeshBasicMaterial({
          map: shadowTexture,
          transparent: true, // 开启透明
          depthWrite: false, // 是否写入深度缓冲区
        });

        const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
        shadowMesh.position.y = 0.01; // so we're above the ground slightly
        shadowMesh.rotation.x = Math.PI * -0.5;
        const shadowSize = sphereRadius * 4;
        shadowMesh.scale.set(shadowSize, shadowSize, shadowSize); // 缩放
        base.add(shadowMesh);

        const u = i / numSpheres; // goes from 0 to 1 as we iterate the spheres.
        const sphereMat = new THREE.MeshPhongMaterial();
        sphereMat.color.setHSL(u, 1, 0.75); // 颜色
        const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
        sphereMesh.position.set(0, sphereRadius + 2, 0);
        base.add(sphereMesh);

        const obj: TSphereShadowBases = {
          base,
          sphereMesh,
          shadowMesh,
          y: sphereMesh.position.y,
        };

        this.sphereShadowBases.push(obj);
      }
    }

    // 相机控件
    {
      const controls = new OrbitControls(this.camera, this.renderer.domElement);
      controls.target.set(0, 0, 0);
      controls.update();
    }
  }

  animate() {
    // console.log("time");
    this.renderer.render(this.scene, this.camera);

    // 两帧渲染时间间隔
    const time = this.clock.getElapsedTime();

    // 运动
    const arr = this.sphereShadowBases;
    arr.forEach((item, index) => {
      const { base, sphereMesh, shadowMesh, y } = item;

      const u = index / arr.length;
      const speed = time * 0.2;
      const angle = speed + u * Math.PI * 2 * (index % 1 ? 1 : -1);
      const radius = Math.sin(speed - index) * 10;
      base.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);

      // yOff是一个从0到1的值
      const yOff = Math.abs(Math.sin(time * 2 + index));
      // 上下移动球体
      sphereMesh.position.y = y + THREE.MathUtils.lerp(-2, 2, yOff);
      // @ts-ignore 随着球的上升，阴影逐渐消失
      shadowMesh.material.opacity = THREE.MathUtils.lerp(1, 0.25, yOff);
    });
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
