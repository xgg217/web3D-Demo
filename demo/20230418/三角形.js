import * as THREE from "three";

//创建一个空的几何体对象
const geometry = new THREE.BufferGeometry();

//类型化数组创建顶点数据
const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 100, 0, //顶点3坐标
  0, 0, 10, //顶点4坐标
  0, 0, 100, //顶点5坐标
  50, 0, 10, //顶点6坐标
]);

// 创建属性缓冲区对象
//3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3);

// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

// // 点渲染模式
// const material = new THREE.PointsMaterial({
//   color: 0xffff00,
//   size: 10.0 //点对象像素尺寸
// });

// const points = new THREE.Points(geometry, material); //点模型对象

// 线材质对象
// const material = new THREE.LineBasicMaterial({
//   color: 0xff0000 //线条颜色
// });

// // 创建线模型对象
// const line = new THREE.LineSegments(geometry, material);

// 线模型对象
const metr = new THREE.MeshBasicMaterial({
  color: 0xff0000,
  side: THREE.DoubleSide, //两面可见
})

// 创建线模型对象
const mesh = new THREE.Mesh(geometry, metr);

export default mesh;