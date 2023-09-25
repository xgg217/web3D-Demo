import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector2,Vector3,Shape,CatmullRomCurve3, ExtrudeGeometry,ShapeGeometry,MeshLambertMaterial,DoubleSide,Mesh,Group,BoxGeometry} from 'three';

const shape = new Shape();
shape.moveTo(10, 0);
console.log(shape.currentPoint)
shape.lineTo(100,0)
console.log(shape.currentPoint)
shape.lineTo(100,100)
console.log(shape.currentPoint)
shape.lineTo(10,100)
console.log(shape.currentPoint)

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