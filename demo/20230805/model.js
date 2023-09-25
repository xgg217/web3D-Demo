import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';


const group = new THREE.Group();

const {group1,mesh} = (() => {
  const group1 = new THREE.Group();
  const geometry = new THREE.ConeGeometry(25, 80);
  const material = new THREE.LineBasicMaterial({
    color: 0xffff00,
  });
  
  const mesh = new THREE.Mesh(geometry, material);
  
  // 可视化模型的局部坐标系
  const axesHelper = new THREE.AxesHelper(100);
  mesh.add(axesHelper);
  
  group1.add(mesh);
  
  group1.position.x = -100;
  
  const div = document.querySelector('#tag');
  const tag = new CSS2DObject(div);
  // const pos = geometry.attributes.position;
  // tag.position.set(pos.getX(0),pos.getY(0),pos.getZ(0));
  mesh.add(tag);
  
  
  return {group1,mesh}
})();

// const tag = (() => {
//   const div = document.querySelector('#tag');
//
//   // HTML元素转化为threejs的CSS2模型对象
//   // const tag = new CSS2DObject(div);
//   // tag.position.set(60,0,50);
//   // mesh.getWorldPosition(worldPosition);
//   // tag.position.copy(worldPosition);
//   return tag
// })();

group.add(group1);
// mesh.add(tag);



export {group};