import * as THREE from "three";
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const phoneGroup = new THREE.Group();
const loader = new GLTFLoader();

let gltf = null;
try {
  gltf = await loader.loadAsync("手机.gltf")

} catch (error) {
  console.error(error);

}

console.log(gltf);

const phoneGltf = gltf!.scene; // 玩家角色模型
phoneGroup.add(phoneGltf);

phoneGroup.position.setY(80);

export {
  phoneGroup
}

