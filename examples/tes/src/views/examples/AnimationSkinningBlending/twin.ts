import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
import type { IParams } from "@/utils/twin/types";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import Helper from "@/utils/twin/helpers";

class Twin extends CreateTwin {
  mixer?: THREE.AnimationMixer;
  helper: Helper;
  clock: THREE.Clock;
  model?: THREE.Group<THREE.Object3DEventMap>; // 模型
  skeletonHelper?: THREE.SkeletonHelper; // 骨骼模型
  constructor(query: IParams) {
    super(query);

    // 添加辅助观察的坐标系
    this.helper = new Helper(this.scene, this.directionalLight, { domName: query.domName });
    this.clock = new THREE.Clock();
    this.model = undefined;
    this.skeletonHelper = undefined;

    this.init();
  }

  // 初始化
  init() {
    // const { domName } = query;

    // 设置场景相关属性
    this.setScene();
    // 添加阴影
    this.addShadow();

    // 相机设置
    this.camera.near = 1;
    this.camera.far = 100;
    this.camera.position.set(2, 2, 4);
    this.camera.lookAt(0, 0, 0);

    // 加载外部gltf
    const url = new URL("./Soldier.glb", import.meta.url).href;
    this.GLTFLoader.load(url, gltf => {
      const model = gltf.scene;
      this.model = model;
      this.scene.add(model);

      model.traverse(object => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (object.isMesh) object.castShadow = true; // 设置产生投影的网格模型
      });

      // 骨骼模型
      this.skeletonHelper = new THREE.SkeletonHelper(model);
      // console.log(gltf);
      this.skeletonHelper.visible = false;
      this.scene.add(this.skeletonHelper);

      model.rotateY(-Math.PI * 0.8); // 旋转180度

      this.mixer = new THREE.AnimationMixer(model);
      // 获取gltf.animations[0]的第一个clip动画对象
      const clipAction = this.mixer.clipAction(gltf.animations[3]);
      clipAction.play();
      this.animate();
    });

    // 添加控制面板
    this.onControlsChange();
  }

  // 设置场景相关属性
  setScene() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(this.renderer), 0.04).texture;

    this.scene.background = new THREE.Color(0xa0a0a0);
    this.scene.fog = new THREE.Fog(0xa0a0a0, 10, 50); // 雾化场景
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);
  }

  // 添加阴影
  addShadow() {
    const dirHelper = new THREE.DirectionalLightHelper(this.directionalLight, 5);
    this.scene.add(dirHelper);

    this.directionalLight.position.set(-3, 10, -10);

    // 1. 设置产生阴影的模型对象 - 已在模型中设置了投射阴影

    // 2. 设置产生阴影的光源对象
    this.directionalLight.castShadow = true;

    // const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    // 3. 设置接收阴影效果的模型对象
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    // 4. 允许渲染器渲染阴影 .shadowMap.enabled
    this.renderer.shadowMap.enabled = true;

    // 5. 平行光阴影相机属性
    this.directionalLight.shadow.camera.top = 2;
    this.directionalLight.shadow.camera.bottom = -2;
    this.directionalLight.shadow.camera.left = -2;
    this.directionalLight.shadow.camera.right = 2;
    this.directionalLight.shadow.camera.near = 0.1;
    this.directionalLight.shadow.camera.far = 40;
  }

  // 动画
  animate() {
    // console.log(this);
    requestAnimationFrame(() => this.animate());
    const frameT = this.clock.getDelta(); // 更新播放器相关的时间
    // console.log(this.mixer);

    this.helper.stats.update();

    this.mixer!.update(frameT);
  }

  // 控制面板操作
  onControlsChange() {
    // 添加分组

    const setTools = {
      showModel: true,
      showSkeleton: false
    };

    // 模型显示隐藏+是否显示骨骼线条
    {
      const folder1 = this.helper.gui.addFolder("显示隐藏");

      folder1
        .add(setTools, "showModel")
        .name("模型显示/关闭")
        .onChange(val => {
          // console.log(val);
          this.model!.visible = val;
        });

      folder1
        .add(setTools, "showSkeleton")
        .name("骨骼线条显示/关闭")
        .onChange(val => {
          // console.log(val);
          this.skeletonHelper!.visible = val;
        });
    }
  }
}

export { Twin };
