import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
import type { IParams } from "@/utils/twin/types";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import Helper from "@/utils/twin/helpers";

class Twin extends CreateTwin {
  mixer?: THREE.AnimationMixer;
  helper: Helper;
  clock: THREE.Clock;
  constructor(query: IParams) {
    super(query);

    // 添加辅助观察的坐标系
    this.helper = new Helper(this.scene, this.directionalLight, { domName: query.domName });
    this.clock = new THREE.Clock();

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
      // console.log(gltf);

      model.rotateY(-Math.PI * 0.8); // 旋转180度

      this.mixer = new THREE.AnimationMixer(model);
      // 获取gltf.animations[0]的第一个clip动画对象
      const clipAction = this.mixer.clipAction(gltf.animations[3]);
      clipAction.play();
      this.animate();

      this.scene.add(model);
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
    const dirLight = new THREE.DirectionalLight(0xffffff, 3);
    dirLight.position.set(-3, 10, -10);
    dirLight.castShadow = true;
    dirLight.shadow.camera.top = 2;
    dirLight.shadow.camera.bottom = -2;
    dirLight.shadow.camera.left = -2;
    dirLight.shadow.camera.right = 2;
    dirLight.shadow.camera.near = 0.1;
    dirLight.shadow.camera.far = 40;
    this.scene.add(dirLight);
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

    // 模型显示隐藏+是否显示骨骼线条
    {
      const folder1 = this.helper.gui.addFolder("显示隐藏");
      console.log(folder1);

      // folder1.add('模型显示/关闭', this, 'showModel').listen();
      // folder1.add('骨骼线条', this, 'showBones').listen();
    }
  }
}

export { Twin };
