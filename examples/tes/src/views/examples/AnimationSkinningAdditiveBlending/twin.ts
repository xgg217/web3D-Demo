import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
// import Helper from "@/utils/twin/helpers";
import type { IParams } from "@/utils/twin/types";

// 投影 平面
const mesh = () => {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(8, 8),
    new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  mesh.receiveShadow = true;
  return mesh;
};

const init = () => {
  const query: IParams = {
    domName: ".animationSkinningAdditiveBlending"
  };

  const twin = new CreateTwin(query);

  // 投影 平面
  const m = mesh();
  twin.scene.add(m);

  return twin;
};

export default init;
