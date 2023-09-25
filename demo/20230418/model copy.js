import * as THREE from "three";

//创建一个空的几何体对象
const geometry = new THREE.BufferGeometry();

//类型化数组创建顶点数据
const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  80, 0, 0, //顶点2坐标
  80, 80, 0, //顶点3坐标
  0, 80, 0, //顶点4坐标
]);

// 创建属性缓冲区对象
// 3个为一组，表示一个顶点的xyz坐标
const attribue = new THREE.BufferAttribute(vertices, 3);
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

// Uint16Array类型数组创建顶点索引数据
const indexes = new Uint16Array([
  // 下面索引值对应顶点位置数据中的顶点坐标
  0, 1, 2, 0, 2, 3,
])

// 索引数据赋值给几何体的index属性
geometry.index = new THREE.BufferAttribute(indexes, 1); //1个为一组


const normals = new Float32Array([
  0, 0, 1, //顶点1法线( 法向量 )
  0, 0, 1, //顶点2法线
  0, 0, 1, //顶点3法线
  0, 0, 1, //顶点4法线
]);

// 设置几何体的顶点法线属性.attributes.normal
geometry.attributes.normal = new THREE.BufferAttribute(normals, 3);

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
const metr = new THREE.MeshLambertMaterial({
  color: 0x0000ff,
   side: THREE.DoubleSide, //两面可见
})

// 创建线模型对象
const mesh = new THREE.Mesh(geometry, metr);

export default mesh;