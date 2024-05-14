import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";

// 投影 平面
const mesh = () => {
  const mesh = new THREE.Mesh(
    new THREE.PlaneGeometry(5, 5),
    new THREE.MeshLambertMaterial({ color: 0xcbcbcb, depthWrite: false })
  );
  mesh.rotation.x = -Math.PI / 2;
  // mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
};

const init = () => {
  const twin = new CreateTwin();

  // 投影 平面
  const m = mesh();
  twin.scene.add(m);

  //辅助观察的坐标系
  const axesHelper = new THREE.AxesHelper(100);
  twin.scene.add(axesHelper);

  return twin;
};

export default init;
