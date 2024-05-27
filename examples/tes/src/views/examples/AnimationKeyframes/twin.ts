import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
import type { IParams } from "@/utils/twin/types";
// import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import Helper from "@/utils/twin/helpers";

// type IHelper = typeof Helper;

class Twin extends CreateTwin {

  // helper: IHelper; // 辅助工具

  constructor(query: IParams) {
    super(query);

    this.init(query);
  }

  // 初始化
  init(query: IParams) {
    const { domName } = query;

    this.scene.background = new THREE.Color(0xbfe3dd);

    // 相机设置
    this.camera.near = 1;
    this.camera.far = 100;
    this.camera.position.set(640, 200, 800);
    this.camera.lookAt(0, 0, 0);

    // 加载外部gltf
    const url = new URL("./LittlestTokyo.glb", import.meta.url).href;
    this.GLTFLoader.load(url, gltf => {
      const model = gltf.scene;
      model.position.set(1, 1, 0);

      this.scene.add(model);
    });

    // 添加辅助观察的坐标系
    new Helper(this.scene, this.directionalLight, { domName });
  }
}

export default Twin;
