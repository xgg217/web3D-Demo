import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector2,Vector3,Shape,CatmullRomCurve3, ExtrudeGeometry,ShapeGeometry,MeshLambertMaterial,DoubleSide,Mesh,Group,BoxGeometry} from 'three';

const shape = new Shape();
shape.lineTo(100+50, 0); //.currentPoint变为(100+50,0)
// 圆弧.arc参数的圆心0,0坐标是相对当前.currentPoint而言，而不是坐标原点
shape.arc(-50,0,50,0,Math.PI/2); //.currentPoint变为圆弧线结束点坐标
console.log('currentPoint',shape.currentPoint);
// 绘制直线，直线起点：圆弧绘制结束的点  直线结束点：(0, 0)
shape.lineTo(0, 50);

// const geometry = new BoxGeometry(50,50,50)
const geometry = new ExtrudeGeometry(shape,{
  depth:20,//拉伸长度
  curveSegments: 1,//拉伸路径分段数
  bevelEnabled:false,//禁止倒角
});
const material = new MeshLambertMaterial({
  color: 0x00ffff,
  side:DoubleSide,//双面显示看到管道内壁
})

const mesh = new Mesh(geometry, material);

const group = new Group();

group.add(mesh)

export default group;