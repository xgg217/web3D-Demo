import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import Stats from "three/addons/libs/stats.module.js";
// import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import { getWAndH } from "@/utils/index";

export default class Clipping {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  stats: Stats; // 帧率
  mesh: THREE.Mesh;
  globalPlane: THREE.Plane; // 平面
  // controls: OrbitControls; // 相机控件
  constructor() {
    const { width, height } = getWAndH("box");
    const boxDom = document.querySelector(".box")!;

    // 平面
    this.globalPlane = new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0.1);
    const globalPlanes = [this.globalPlane];
    const Empty: THREE.Plane[] = [];

    // 场景
    this.scene = new THREE.Scene();

    // 帧率
    {
      const stats = new Stats();
      boxDom.appendChild(stats.dom);
      stats.dom.style.left = "350px";
      stats.dom.style.top = "20px";
      this.stats = stats;
    }

    // 渲染器
    {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setAnimationLoop(() => this.animate());
      renderer.shadowMap.enabled = true;
      this.renderer = renderer;
      boxDom.appendChild(renderer.domElement);

      // 设置裁剪
      renderer.clippingPlanes = Empty; // GUI sets it to globalPlanes
      renderer.localClippingEnabled = true;
    }

    // 相机及控件
    {
      const camera = new THREE.PerspectiveCamera(36, width / height, 0.25, 16);
      camera.position.set(0, 1.3, 3);
      this.camera = camera;

      // 控件
      const controls = new OrbitControls(camera, this.renderer.domElement);
      controls.target.set(0, 1, 0);
      controls.update();
    }

    // 光源
    {
      this.scene.add(new THREE.AmbientLight(0xcccccc));
      const spotLight = new THREE.SpotLight(0xffffff, 60);
      spotLight.angle = Math.PI / 5;
      spotLight.penumbra = 0.2;
      spotLight.position.set(2, 3, 3);
      spotLight.castShadow = true;
      spotLight.shadow.camera.near = 3;
      spotLight.shadow.camera.far = 10;
      spotLight.shadow.mapSize.width = 1024;
      spotLight.shadow.mapSize.height = 1024;
      this.scene.add(spotLight);

      const dirLight = new THREE.DirectionalLight(0x55505a, 3);
      dirLight.position.set(0, 3, 0);
      dirLight.castShadow = true;
      dirLight.shadow.camera.near = 1;
      dirLight.shadow.camera.far = 10;

      dirLight.shadow.camera.right = 1;
      dirLight.shadow.camera.left = -1;
      dirLight.shadow.camera.top = 1;
      dirLight.shadow.camera.bottom = -1;

      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      this.scene.add(dirLight);
    }

    // 物体 初始化
    this.mesh = new THREE.Mesh();
    this.setMesh();
    this.scene.add(this.mesh);
  }

  // 物体
  setMesh() {
    const localPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 0.8);

    // 高光材质
    const material = new THREE.MeshPhongMaterial({
      color: 0x80ee10,
      shininess: 100,
      side: THREE.DoubleSide,
      clippingPlanes: [localPlane],
      clipShadows: true,

      alphaToCoverage: true,
    });

    // 圆环缓冲扭结几何体
    const geometry = new THREE.TorusKnotGeometry(0.4, 0.08, 95, 20);

    this.mesh.geometry = geometry;
    this.mesh.material = material;
    this.mesh.castShadow = true;

    // 投影
    {
      const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(9, 9, 1, 1),
        new THREE.MeshPhongMaterial({ color: 0xa0adaf, shininess: 150 }),
      );
      ground.rotation.x = -Math.PI / 2; // rotates X/Y to X/Z
      ground.receiveShadow = true;
      this.scene.add(ground);
    }
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }
}
