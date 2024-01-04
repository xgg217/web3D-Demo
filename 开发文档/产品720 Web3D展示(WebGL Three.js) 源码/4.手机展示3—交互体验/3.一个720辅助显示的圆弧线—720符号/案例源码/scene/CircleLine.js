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


var CircleLine = new THREE.Group();//线模型和720符号父对象
CircleLine.add(line);
CircleLine.position.y -= 85;//平移到产品的底部

var loader = new THREE.FontLoader();
// THREE.FontLoader加载字体
loader.load('../../../../three.js-r125/examples/fonts/helvetiker_bold.typeface.json', function (font) {
  var material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide,
  });
  // .generateShapes()：获得字符'720°'的轮廓顶点坐标
  var Shapes = font.generateShapes('720°', 10);//10)控制字符大小
  var geometry = new THREE.ShapeGeometry(Shapes);//通过多个多边形轮廓生成字体
  var textMesh = new THREE.Mesh(geometry, material);
  textMesh.position.z = R;
  textMesh.position.x = -12;
  CircleLine.add(textMesh)
});


export { CircleLine }