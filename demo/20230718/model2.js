import * as THREE from "three";
import dataArr from "./data.js"
// 将几何体添加到场景中

const geometruy = (() => {
  const pointsArr = [];
  dataArr.forEach(e => {
    const v2 = new THREE.Vector2(e[0],e[1])
    pointsArr.push(v2);
  })
  const shape = new THREE.Shape(pointsArr);
  return new THREE.ShapeGeometry(shape);
  // return geometruy
})();

const material =  new THREE.MeshLambertMaterial({
  color: 0x00ffff,
  side: THREE.DoubleSide
})

const mesh = new THREE.Mesh(geometruy, material);

// 包围盒
(() => {
  // 包围盒计算模型对象的大小和位置
  const box3 = new THREE.Box3();
  box3.expandByObject(mesh); // 计算模型包围盒
  const size = new THREE.Vector3();
  box3.getSize(size); // 计算包围盒尺寸
  console.log('模型包围盒尺寸',size);
  const center = new THREE.Vector3();
  box3.getCenter(center); // 计算包围盒中心坐标
  console.log('模型中心坐标',center);
})();

export default mesh;