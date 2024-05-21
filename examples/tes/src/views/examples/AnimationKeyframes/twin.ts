import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
// import Helper from "@/utils/twin/helpers";
import type { IParams } from "@/utils/twin/types";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const init = () => {
  const query: IParams = {
    domName: ".animationKeyframes"
  };

  const twin = new CreateTwin(query);

  const pmremGenerator = new THREE.PMREMGenerator(twin.renderer);

  twin.scene.background = new THREE.Color(0xbfe3dd);
  twin.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(twin.renderer), 0.04).texture;

  twin.camera.near = 1;
  twin.camera.far = 100;
  twin.camera.position.set(640, 200, 800);
  twin.camera.lookAt(0, 0, 0);

  return twin;
};

export default init;
