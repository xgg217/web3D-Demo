import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
import type { IParams } from "@/utils/twin/types";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import Helper from "@/utils/twin/helpers";

// type IHelper = typeof Helper;

const clock = new THREE.Clock();

class Twin extends CreateTwin {
  // helper: IHelper; // 辅助工具
  mixer?: THREE.AnimationMixer;

  constructor(query: IParams) {
    super(query);

    this.init(query);
  }

  // 初始化
  init(query: IParams) {
    const { domName } = query;

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.background = new THREE.Color(0xbfe3dd);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(this.renderer), 0.04).texture;

    // 相机设置
    this.camera.near = 1;
    this.camera.far = 100;
    this.camera.position.set(64, 20, 80);
    this.camera.lookAt(0, 0, 0);

    // 加载外部gltf
    const url = new URL("./LittlestTokyo.glb", import.meta.url).href;
    this.GLTFLoader.load(url, gltf => {
      const model = gltf.scene;
      console.log(gltf);

      model.position.set(1, 1, 0);
      model.scale.set(0.1, 0.1, 0.1);

      this.mixer = new THREE.AnimationMixer(model);
      // 获取gltf.animations[0]的第一个clip动画对象
      const clipAction = this.mixer.clipAction(gltf.animations[0]);
      clipAction.play();
      this.animate();

      this.scene.add(model);
    });

    // 添加辅助观察的坐标系
    new Helper(this.scene, this.directionalLight, { domName });
  }

  // 动画
  animate() {
    // console.log(this);
    requestAnimationFrame(() => this.animate());
    const frameT = clock.getDelta(); // 更新播放器相关的时间
    // console.log(this.mixer);

    this.mixer!.update(frameT);
  }
}

export default Twin;
