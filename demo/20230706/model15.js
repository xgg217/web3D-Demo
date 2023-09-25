import { BufferGeometry,BufferAttribute,PointsMaterial,Points,EdgesGeometry,LineSegments, Mesh,Group} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const geometry = new BufferGeometry(); //创建一个几何体对象

const vertices = new Float32Array([
  0, 0, 0, //顶点1坐标
  50, 0, 0, //顶点2坐标
  0, 25, 0, //顶点3坐标
]);
// 顶点位置
geometry.attributes.position = new BufferAttribute(vertices, 3);

const colors = new Float32Array([
  1, 0, 0, //顶点1颜色
  0, 0, 1, //顶点2颜色
  0, 1, 0, //顶点3颜色
]);

geometry.attributes.color = new BufferAttribute(colors, 3);

// 点渲染模式
const material = new PointsMaterial({
  // color: 0x333333,//使用顶点颜色数据，color属性可以不用设置
  vertexColors:true,//默认false，设置为true表示使用顶点颜色渲染
  size: 20.0, //点对象像素尺寸
});
const points = new Points(geometry, material); //点模型对象

export default points;