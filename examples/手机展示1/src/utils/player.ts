import * as THREE from "three";

// 创建相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(100, 100, 100); // 玩家角色后面一点
camera.lookAt(0, 0, 0); //对着人身上某个点  视线大致沿着人的正前方

export { camera };
