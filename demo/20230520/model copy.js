import { Mesh, TextureLoader,MeshBasicMaterial, BufferGeometry, BufferAttribute } from "three";

// 创建一个几何体
const geometry = new BufferGeometry();

// 类型数组创建顶点数据
const vertices = new Float32Array([
  0,0,0, // 顶点1坐标
  160,0,0, // 顶点2坐标
  160,80,0, // 顶点3坐标
  0,80,0, // 顶点4坐标
]);

// 创建属性缓冲区对象
const attribue = new BufferAttribute(vertices, 3);

geometry.attributes.position = attribue;

const indexex = new Uint16Array([
  0,1,2,0,2,3,
])

geometry.index = new BufferAttribute(indexex, 1);

const uvs = new Float32Array([
  0,0, // 顶点1坐标
  0.5,0, // 顶点2坐标
  0.5,0.5, // 顶点3坐标
  0,0.5, // 顶点4坐标
])
geometry.attributes.uv = new BufferAttribute(uvs, 2);


const textLoader = new TextureLoader();
const texture = textLoader.load('./worldmap1.jpg');
const material = new MeshBasicMaterial({
  map: texture
});

const mesh = new Mesh(geometry, material)

export default mesh;