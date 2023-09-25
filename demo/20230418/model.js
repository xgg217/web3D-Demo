import * as THREE from "three";

//创建一个空的几何体对象
const geometry = new THREE.PlaneGeometry(100, 100);

console.log(geometry.attributes.position);

geometry.translate(50,0,0)

console.log(geometry.attributes.position);

// 线模型对象
const metr = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
   side: THREE.DoubleSide, //两面可见
})

// 创建线模型对象
const mesh = new THREE.Mesh(geometry, metr);

const v3 = new THREE.Vector3(100,100,100)
console.log(v3);

export default mesh;