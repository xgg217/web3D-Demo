import * as THREE from "three";
import Stats from "three/addons/libs/stats.module.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { getWAndH } from "@/utils/index";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";

export default class Create {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  mesh: THREE.Object3D<THREE.Object3DEventMap>; // 物体
  renderer: THREE.WebGLRenderer;
  light: THREE.DirectionalLight; //  光
  stats: Stats;

  constructor() {
    const boxDom = document.querySelector(".box")!;

    const { width, height } = getWAndH("box");

    // 场景
    this.scene = new THREE.Scene();

    // 帧率
    {
      const stats = new Stats();
      boxDom.appendChild(stats.dom);
      this.stats = stats;
    }

    // 渲染器
    {
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      this.renderer = renderer;
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      renderer.setAnimationLoop(() => this.animate());
    }

    // 相机
    {
      const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
      camera.position.z = 120;
      this.camera = camera;

      // 相机控件
      const controls = new OrbitControls(camera, this.renderer.domElement);
      controls.minDistance = 50;
      controls.maxDistance = 200;
      controls.addEventListener("change", () => {
        this.renderer.render(this.scene, camera); //执行渲染操作
      }); //监听鼠标、键盘事件
    }

    // 光源
    {
      this.scene.add(new THREE.AmbientLight(0x666666));
      const dirLight1 = new THREE.DirectionalLight(0xffddcc, 3);
      dirLight1.position.set(1, 0.75, 0.5);
      this.scene.add(dirLight1);

      const dirLight2 = new THREE.DirectionalLight(0xccccff, 3);
      dirLight2.position.set(-1, 0.75, -0.5);
      this.scene.add(dirLight2);
    }

    this.loadLeePerrySmith();

    window.addEventListener("resize", this.onWindowResize);

    // console.log(this);
  }

  // 加载模型及环境贴图
  loadLeePerrySmith() {
    const textureLoader = new THREE.TextureLoader();
    const url1 = new URL("./assets/Map-COL.jpg", import.meta.url).href;
    const url2 = new URL("./assets/Map-SPEC.jpg", import.meta.url).href;
    const url3 = new URL(
      "./assets/Infinite-Level_02_Tangent_SmoothUV.jpg",
      import.meta.url,
    ).href;
    const gltf1 = new URL("./LeePerrySmith.glb", import.meta.url).href;

    const map = textureLoader.load(url1);
    map.colorSpace = THREE.SRGBColorSpace;
    const specularMap = textureLoader.load(url2);
    const normalMap = textureLoader.load(url3);

    const loader = new GLTFLoader();
    // 加载压缩的gltf
    const dracoLoader = new DRACOLoader();
    loader.setDRACOLoader(dracoLoader);
    dracoLoader.setDecoderPath("/draco/");
    loader.load(gltf1, gltf => {
      // this.scene.add(gltf.scene);
      console.log(gltf.scene);

      const mesh = gltf.scene.children[0];
      mesh.material = new THREE.MeshPhongMaterial({
        specular: 0x111111,
        map: map,
        specularMap: specularMap,
        normalMap: normalMap,
        shininess: 25,
      });
      this.mesh = mesh;
      this.scene.add(mesh);
      mesh.scale.multiplyScalar(10);
    });
  }

  animate() {
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
  }

  onWindowResize() {
    const { width, height } = getWAndH("box");
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}
