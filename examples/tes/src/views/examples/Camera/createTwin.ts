import * as THREE from "three";
import { getWAndH } from "@/utils/twin/createTwin";

let { width, height } = getWAndH();
let aspect = width / height;
const frustumSize = 600;
console.log(width, height);

export default class CreateTwin {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera; // 相机1
  cameraPerspective: THREE.PerspectiveCamera; // 相机2-上帝视角
  cameraOrtho: THREE.OrthographicCamera; // 相机3-正交视角
  cameraRig: THREE.Group;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.Mesh;
  cameraPerspectiveHelper: THREE.CameraHelper;
  cameraOrthoHelper: THREE.CameraHelper;

  constructor() {

    const mainDom = document.querySelector(`.main .camera`)!;

    // 场景
    this.scene = new THREE.Scene();

    // 相机1
    this.camera = new THREE.PerspectiveCamera(50, 0.5 * aspect, 1, 10000);
    this.camera.position.z = 2500;

    // 相机2-上帝视角
    this.cameraPerspective = new THREE.PerspectiveCamera(50, 0.5 * aspect, 150, 1000);

    // 相机2的 辅助视角
    this.cameraPerspectiveHelper = new THREE.CameraHelper(this.cameraPerspective);
    this.scene.add(this.cameraPerspectiveHelper);

    // 相机3-正交视角
    this.cameraOrtho = new THREE.OrthographicCamera(
      (0.5 * frustumSize * aspect) / -2,
      (0.5 * frustumSize * aspect) / 2,
      frustumSize / 2,
      frustumSize / -2,
      150,
      1000
    );

    this.cameraOrthoHelper = new THREE.CameraHelper(this.cameraOrtho);
    this.scene.add(this.cameraOrthoHelper);

    // this.cameraPerspective.rotation.y = Math.PI;
    // this.cameraOrtho.rotation.y = Math.PI;

    this.cameraRig = new THREE.Group();
    this.cameraRig.add(this.cameraPerspective);
    this.cameraRig.add(this.cameraOrtho);
    this.scene.add(this.cameraRig);

    // 大球
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(100, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
    );
    this.scene.add(this.mesh);

    // 中球
    const mesh2 = new THREE.Mesh(
      new THREE.SphereGeometry(50, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
    );
    mesh2.position.y = 150;
    this.mesh.add(mesh2);

    // 小球
    const mesh3 = new THREE.Mesh(
      new THREE.SphereGeometry(5, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0x0000ff, wireframe: true })
    );
    mesh3.position.z = 150;
    this.camera.add(mesh3);

    this.renderer = new THREE.WebGLRenderer( { antialias: true } );
    this.renderer.setPixelRatio( window.devicePixelRatio );
    this.renderer.setSize( width, height );
    mainDom.appendChild(this.renderer.domElement);

    // 循环渲染
    this.renderer.setAnimationLoop(() => {
      this.animate();
    });

    // 画布尺寸随着窗口变化
    window.addEventListener("resize", () => {
      const { width:w, height:h } = getWAndH();
      // console.log(width);
      width = w;
      height = h;
      aspect = width / height;

      this.renderer.setSize(width, height);
      this.camera.aspect = 0.5 * aspect;
      this.camera.updateProjectionMatrix();

      this.cameraPerspective.aspect = 0.5 * aspect;
      this.cameraPerspective.updateProjectionMatrix();

      this.cameraOrtho.left = - 0.5 * frustumSize * aspect / 2;
      this.cameraOrtho.right = 0.5 * frustumSize * aspect / 2;
      this.cameraOrtho.top = frustumSize / 2;
      this.cameraOrtho.bottom = - frustumSize / 2;
      this.cameraOrtho.updateProjectionMatrix();
    });
  }

  // 渲染动画
  animate() {
    const r = Date.now() * 0.0005; // 旋转角度
    this.mesh.position.x = 700 * Math.cos( r );
    this.mesh.position.z = 700 * Math.sin( r );
    this.mesh.position.y = 700 * Math.sin( r );

    this.mesh.children[ 0 ].position.x = 70 * Math.cos( 2 * r );
    this.mesh.children[ 0 ].position.z = 70 * Math.sin( r );

    this.cameraPerspective.fov = 35 + 30 * Math.sin( 0.5 * r );
    this.cameraPerspective.far = this.mesh.position.length();
    this.cameraPerspective.updateProjectionMatrix();

    this.cameraPerspectiveHelper.update();
    this.cameraPerspectiveHelper.visible = true;

    this.cameraOrthoHelper.visible = false;

    this.cameraRig.lookAt( this.mesh.position );

    this.cameraPerspectiveHelper.visible = false;

    this.renderer.setClearColor( 0x000000, 1 );
    this.renderer.setScissor( 0, 0, width / 2, height );
    this.renderer.setViewport( 0, 0, width / 2, height );
    this.renderer.render( this.scene, this.cameraPerspective );

    this.cameraPerspectiveHelper.visible = true;

    this.renderer.setClearColor( 0x111111, 1 );
    this.renderer.setScissor( width / 2, 0, width / 2, height );
    this.renderer.setViewport( width / 2, 0, width / 2, height );

    this.renderer.render(this.scene, this.camera);
  }
}
