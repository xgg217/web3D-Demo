import * as THREE from "three";
import { getWAndH } from "@/utils/index";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

export class CameraSetScissorTest {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  camera2: THREE.PerspectiveCamera;
  mesh: THREE.Mesh; // 物体
  renderer: THREE.WebGLRenderer;
  light: THREE.SpotLight; //  点光源
  view1Elem: HTMLElement;
  view2Elem: HTMLElement;
  cameraHelper: THREE.CameraHelper;

  constructor() {
    const boxDom = document.querySelector(".box")!;
    const view1Elem = document.querySelector("#view1")! as HTMLElement;
    const view2Elem = document.querySelector("#view2")! as HTMLElement;
    this.view1Elem = view1Elem;
    this.view2Elem = view2Elem;

    const { width, height } = getWAndH("box");
    // console.log(width, height);

    const widthVal = width * window.devicePixelRatio;
    const heightVal = height * window.devicePixelRatio;
    const ASPECT_RATIO = widthVal / heightVal;

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

      // 相机辅助
      const cameraHelper = new THREE.CameraHelper(camera);
      this.cameraHelper = cameraHelper;
      this.scene.add(cameraHelper);

      const controls = new OrbitControls(camera, view1Elem);
      controls.target.set(0, 5, 0);
      controls.update();
    }

    // 相机2
    {
      const camera2 = new THREE.PerspectiveCamera(
        60, // fov
        ASPECT_RATIO, // aspect
        0.1, // near
        500, // far
      );
      camera2.position.set(340, 30, 20);
      this.camera2 = camera2;

      const controls2 = new OrbitControls(camera2, view2Elem);
      controls2.target.set(0, -5, 0);
      controls2.update();
    }

    // 光源
    {
      // 聚光灯光源
      {
        const PointLight = new THREE.SpotLight(
          0xffffff,
          20000,
          150,
          -Math.PI / 6,
        );
        // 设置光源位置
        PointLight.position.set(60, 50, 0);
        this.light = PointLight;
        this.scene.add(PointLight);

        // 设置阴影
        PointLight.castShadow = true;
        PointLight.shadow.mapSize.width = 1024; // 设置阴影映射的分辨率
        PointLight.shadow.mapSize.height = 1024;
        PointLight.shadow.camera.near = 0.5; // 设置阴影摄像机的裁剪平面
        PointLight.shadow.camera.far = 500;
        // @ts-ignore
        PointLight.shadow.camera.left = -10;
        // @ts-ignore
        PointLight.shadow.camera.right = 10;
        // @ts-ignore
        PointLight.shadow.camera.top = 10;
        // @ts-ignore
        PointLight.shadow.camera.bottom = -10;
        // PointLight.shadow.bias = -0.002;

        // 光源辅助观察
        // const pointLightHelper = new THREE.SpotLightHelper(PointLight, 100);
        // this.scene.add(pointLightHelper);
      }

      // 环境光
      const ambient = new THREE.AmbientLight(0xffffff, 0.1);
      this.scene.add(ambient);
    }

    // 物体
    {
      // 球体
      {
        const sphereGeometry = new THREE.SphereGeometry(10);
        const sphereMaterial = new THREE.MeshPhongMaterial({
          color: 0xc8a888,
        });
        const sphereMesh = new THREE.Mesh(sphereGeometry, sphereMaterial);
        // sphereMesh.add(boxMesh);
        sphereMesh.castShadow = true;
        this.mesh = sphereMesh;
        this.scene.add(sphereMesh);
      }

      // 立方体
      {
        const boxGeometry = new THREE.BoxGeometry(15, 15, 15);
        const boxMaterial = new THREE.MeshPhongMaterial({
          color: 0x7e9ebe,
        });
        const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
        boxMesh.castShadow = true;
        boxMesh.position.setX(30);
        this.mesh.add(boxMesh);
      }

      // 平面(含投影)
      {
        const planeSize = 80;

        // 纹理
        const loader = new THREE.TextureLoader();
        const imgUr = new URL("@/assets/checker.png", import.meta.url).href;
        const texture = loader.load(imgUr);
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.magFilter = THREE.NearestFilter;
        const repeats = planeSize / 2;
        texture.repeat.set(repeats, repeats);

        //
        const planeGeometry = new THREE.PlaneGeometry(planeSize, planeSize);
        const planeMat = new THREE.MeshPhongMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        const mesh = new THREE.Mesh(planeGeometry, planeMat);
        // mesh.translateY(-15);
        // mesh.rotateX(90);
        // mesh.position.y = -15;
        // mesh.position.set(0, -15, 0);
        mesh.position.setY(-12);
        mesh.rotation.x = -Math.PI / 2;
        mesh.receiveShadow = true;
        this.scene.add(mesh);
      }
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
      renderer.shadowMap.enabled = true; // 允许光源阴影渲染

      // const leftDom = document.querySelector(".box")!;
      boxDom.appendChild(renderer.domElement);
    }
  }

  //
  setScissorForElement(elem: HTMLElement) {
    const boxDom = document.querySelector(".box")!;
    const canvasRect = boxDom.getBoundingClientRect();
    const elemRect = elem.getBoundingClientRect();
    // console.log("canvasRect", canvasRect);
    // console.log("elemRect", elemRect);

    // 计算canvas的尺寸
    const right = Math.min(elemRect.right, canvasRect.right) - canvasRect.left;
    const left = Math.max(0, elemRect.left - canvasRect.left);
    const bottom =
      Math.min(elemRect.bottom, canvasRect.bottom) - canvasRect.top;
    const top = Math.max(0, elemRect.top - canvasRect.top);

    const width = Math.min(canvasRect.width, right - left);
    const height = Math.min(canvasRect.height, bottom - top);

    // 设置剪函数以仅渲染一部分场景
    const positiveYUpBottom = canvasRect.height - bottom;
    this.renderer.setScissor(left, positiveYUpBottom, width, height);
    this.renderer.setViewport(left, positiveYUpBottom, width, height);
    // console.log("elem", width, height);

    // 返回aspect
    return width / height;
  }

  animate() {
    // 启用剪刀函数
    this.renderer.setScissorTest(true);

    // 视角1
    {
      const camera = this.camera;
      const aspect = this.setScissorForElement(this.view1Elem);
      // console.log();

      // adjust the camera for this aspect
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      this.cameraHelper.update();
      this.cameraHelper.visible = false;
      this.scene.background = new THREE.Color(0x000000);
      this.renderer.render(this.scene, camera);
    }

    // 视角2
    {
      const aspect = this.setScissorForElement(this.view2Elem);

      // adjust the camera for this aspect
      this.camera2.aspect = aspect;
      this.camera2.updateProjectionMatrix();

      // draw the camera helper in the 2nd view
      this.cameraHelper.visible = true;

      this.renderer.render(this.scene, this.camera2);
    }
  }
}
