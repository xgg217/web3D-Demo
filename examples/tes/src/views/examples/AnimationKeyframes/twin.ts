import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
// import Helper from "@/utils/twin/helpers";
import type { IParams } from "@/utils/twin/types";
// import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

class Twin extends CreateTwin {

  constructor(query: IParams) {
    super(query);

    this.init();
  }

  init() {
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
    })
  }
}

export default Twin;
