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

    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.background = new THREE.Color(0xbfe3dd);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(this.renderer), 0.04).texture;

    // 相机设置
    this.camera.near = 1;
    this.camera.far = 100;
    this.camera.position.set(4, 2, 3);
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
}

export { Twin };
