import * as THREE from "three";

const geometry = new THREE.BoxGeometry(50, 50, 50);
const material = new THREE.MeshLambertMaterial({
  color: 0x00ffff,
});
const mesh = new THREE.Mesh(geometry, material);
// 将几何体添加到场景中



// 包围盒
(() => {
  const scale = new THREE.Vector3()
  const box3 = new THREE.Box3()
  console.log('box3',box3);
  
  box3.expandByObject(mesh); // 计算模型包围盒
  
  box3.getSize(scale)
  
  console.log('模型包围盒尺寸', scale);
})();

export default mesh;