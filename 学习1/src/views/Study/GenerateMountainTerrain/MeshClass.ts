import * as THREE from "three";

// 创建平面几何体
export class MeshClass {
  constructor() {
    // 创建几何体

    const geometry = new THREE.PlaneGeometry(300, 300, 10, 10);

    const material = new THREE.MeshBasicMaterial({
      color: new THREE.Color("orange"),
      wireframe: true,
    });

    new THREE.Mesh(geometry, material);
  }
}
