import * as THREE from "three";

// 获取宽高
export const getWAndH = (className: string) => {
  const main = document.querySelector(`.${className}`)! as HTMLElement;
  const width = main.clientWidth;
  const height = main.clientHeight;
  return { width, height };
};

// 左侧为官方示例
export class LeftCreate {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Mesh; // 物体
  renderer: THREE.WebGLRenderer;
  light: THREE.DirectionalLight; //  光

  constructor() {
    // 场景
    this.scene = new THREE.Scene();

    const AMOUNT = 2; // 显示一个4*4的阵列
    const { width, height } = getWAndH("main");
    const WIDHT = Math.floor(width / 2);
    const HEIGHT = height;

    // 相机 显示一个2*2的阵列
    {
      // 宽度
      const widthVal = WIDHT * window.devicePixelRatio;
      const heightVal = HEIGHT * window.devicePixelRatio;
      const ASPECT_RATIO = widthVal / heightVal;

      this.camera = new THREE.PerspectiveCamera(40, ASPECT_RATIO, 0.1, 10);
      this.camera.lookAt(0, 0, 0);

      // // 每个画面的宽度
      // const width = Math.floor(widthVal / AMOUNT);
      // const height = Math.floor(heightVal / AMOUNT);
      // const cameras = [];
      // for (let y = 0; y < AMOUNT; y++) {
      //   for (let x = 0; x < AMOUNT; y++) {
      // const subcamera = new THREE.PerspectiveCamera(
      //   40,
      //   ASPECT_RATIO,
      //   0.1,
      //   10,
      // );
      //     subcamera.viewport = new THREE.Vector4(
      //       Math.floor(x * width),
      //       Math.floor(y * height),
      //       Math.ceil(width),
      //       Math.ceil(height),
      //     );
      //     subcamera.position.x = x / AMOUNT - 0.5;
      //     subcamera.position.y = 0.5 - y / AMOUNT;
      //     subcamera.position.z = 1.5;
      //     // subcamera.position.multiplyScalar(2);
      // subcamera.lookAt(0, 0, 0);
      // subcamera.updateMatrixWorld();
      // cameras.push(subcamera);
      //   }
      // }
      // this.camera = new THREE.ArrayCamera(cameras);
      // this.camera.position.z = 3;
    }

    // 光源
    {
      this.scene.add(new THREE.AmbientLight(0x999999));
      const light = new THREE.DirectionalLight(0xffffff, 3);
      light.position.set(100, 100, 1);
      light.castShadow = true;
      light.shadow.camera.zoom = 4; // tighter shadow map
      this.light = light;
      this.scene.add(light);
    }

    // 开启阴影
    // {
    //   const geometryBackground = new THREE.PlaneGeometry(100, 100);
    //   const materialBackground = new THREE.MeshPhongMaterial({
    //     color: 0x000066,
    //   });
    //   const background = new THREE.Mesh(geometryBackground, materialBackground);
    //   background.receiveShadow = true;
    //   background.position.set(0, 0, -1);
    //   this.scene.add(background);
    // }

    // 物体
    {
      const geometryCylinder = new THREE.CylinderGeometry(50, 50, 1, 32);
      const materialCylinder = new THREE.MeshPhongMaterial({
        color: 0xff0000,
      });
      const mesh = new THREE.Mesh(geometryCylinder, materialCylinder);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.mesh = mesh;
      this.scene.add(mesh);
    }

    // 渲染器
    {
      const renderer = new THREE.WebGLRenderer({
        antialias: true, // 锯齿模糊
        logarithmicDepthBuffer: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(WIDHT, HEIGHT);
      renderer.setAnimationLoop(this.animate);
      renderer.shadowMap.enabled = true;
      this.renderer = renderer;
      const leftDom = document.querySelector(".main .left")!;
      leftDom.appendChild(renderer.domElement);
    }

    // window.addEventListener("resize", this.onWindowResize);
  }

  // 旋转
  animate() {
    // this.mesh.rotation.x += 0.005;
    // this.mesh.rotation.z += 0.01;
    // this.renderer.render(this.scene, this.camera);
  }

  onWindowResize() {}
}
