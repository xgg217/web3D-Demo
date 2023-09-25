import * as THREE from 'three';

const model = new THREE.Group();

const {mesh1, mesh2, mesh3} = (() => {
  const geometry1 = new THREE.SphereGeometry(25);
  const material1 = new THREE.MeshLambertMaterial({
    color: 0x009999,
  })
  
  const mesh1 = new THREE.Mesh(geometry1, material1);
  // mesh1.position.set(100,100,0);
  
  const geometry2 = new THREE.SphereGeometry(25);
  const material2 = new THREE.MeshLambertMaterial({
    color: 0x999900,
  })
  
  const mesh2 = new THREE.Mesh(geometry2, material2);
  // mesh2.position.y = 100;
  mesh2.position.set(0,100,0);
  
  const geometry3 = new THREE.SphereGeometry(25);
  const material3 = new THREE.MeshLambertMaterial({
    color: 0x990099,
  })
  
  const mesh3 = new THREE.Mesh(geometry3, material3);
  mesh3.position.set(100,0,0);
  
  
  
  return {mesh1, mesh2, mesh3}
})();

model.add(mesh1, mesh2, mesh3);


// const mesh = (() => {
//   const geometry = new THREE.BufferGeometry(); //创建一个几何体对象
//   //类型数组创建顶点数据
//   const vertices = new Float32Array([
//     100, 25, 0, //顶点1坐标
//     100, -25, 25, //顶点2坐标
//     100, -25, -25, //顶点3坐标
//   ]);
//   // 创建属性缓冲区对象
//   const attribue = new THREE.BufferAttribute(vertices, 3); //3个为一组，表示一个顶点的xyz坐标
//   // 设置几何体attributes属性的位置属性
//   geometry.attributes.position = attribue;
//
//
//   const material = new THREE.MeshBasicMaterial({
//     color: 0x00ffff, //材质颜色
//     side: THREE.FrontSide, //默认只有正面可见
//     // side: THREE.BackSide, //设置只有背面可见
//     // side: THREE.DoubleSide, //两面可见
//   });
//   // 网格模型本质：一个一个三角形(面)构成
//   const mesh = new THREE.Mesh(geometry, material);
//   return mesh
// })();
//


export {model,mesh1, mesh2, mesh3};