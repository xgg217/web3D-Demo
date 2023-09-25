import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector2,Vector3,Shape,Path,CatmullRomCurve3, ExtrudeGeometry,ShapeGeometry,MeshLambertMaterial,DoubleSide,Mesh,Group,BoxGeometry} from 'three';

const shape = new Shape();
shape.lineTo(100, 0);
shape.lineTo(100, 100);
shape.lineTo(0, 100);

// Shape内孔轮廓
const path1 = new Path();// 圆孔1
path1.absarc(20, 20, 10);

const path2 = new Path();// 圆孔2
path2.absarc(80, 20, 10);

const path3 = new Path();// 方形孔
path3.moveTo(50, 50);
path3.lineTo(80, 50);
path3.lineTo(80, 80);
path3.lineTo(50, 80);
shape.holes.push(path1, path2, path3);

// const geometry = new BoxGeometry(50,50,50)
const geometry = new ExtrudeGeometry(shape,{
  depth:20,//拉伸长度
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