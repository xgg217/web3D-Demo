// 引入Three.js
import * as THREE from '../../../../three.js-r125/build/three.module.js';
/**
 * 创建圆弧线条模型
 */
var geometry = new THREE.BufferGeometry(); //声明一个几何体对象BufferGeometry
//参数：0, 0圆弧坐标原点x，y  100：圆弧半径    0, 2 * Math.PI：圆弧起始角度
var R = 60;//半径
var arc = new THREE.ArcCurve(0, 0, R, Math.PI/2+Math.PI/6, Math.PI/2-Math.PI/6);
//getPoints是基类Curve的方法，返回一个vector2对象作为元素组成的数组
var points = arc.getPoints(50);//分段数50，返回51个顶点
// setFromPoints方法从points中提取数据改变几何体的顶点位置数据.attributes.position
geometry.setFromPoints(points);
// console.log(geometry.attributes.position);
//材质对象
var material = new THREE.LineBasicMaterial({
  color: 0xffffff,//线条颜色
});
//线条模型对象
var line = new THREE.Line(geometry, material);
line.rotateX(Math.PI / 2);//绕x轴旋转90度


var CircleLine = new THREE.Group();//声明一个组对象，用来添加线模型
CircleLine.add(line);
// 线模型父对象平移，线模型会跟着平移
CircleLine.position.y -= 85;//平移到产品的底部

export { CircleLine }