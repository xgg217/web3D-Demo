import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
// import Helper from "@/utils/twin/helpers";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import type { IParams } from "@/utils/twin/types";

const init = () => {
  const query: IParams = {
    domName: ".animationSkinningIk"
  };

  const twin = new CreateTwin(query);

  twin.scene.fog = new THREE.FogExp2(0xffffff, 0.17);
  twin.scene.background = new THREE.Color(0xffffff);

  twin.camera.position.set(0.9728517749133652, 1.1044765132727201, 0.7316689528482836);
  twin.camera.lookAt(twin.scene.position);

  // 清除平行光
  twin.scene.remove(twin.directionalLight);

  // 增加环境光
  const ambientLight = new THREE.AmbientLight(0xffffff, 8);
  twin.scene.add(ambientLight);

  // 相机控制
  twin.controls.minDistance = 0.2;
  twin.controls.maxDistance = 1.5;
  twin.controls.enableDamping = true;

  const dracoLoader = new DRACOLoader();
  dracoLoader.setDecoderPath("./draco/");
  twin.G;

  return twin;
};

export default init;
