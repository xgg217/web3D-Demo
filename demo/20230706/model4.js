import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector2,Shape,ShapeGeometry,MeshLambertMaterial,DoubleSide,Mesh,Group} from 'three';

// 三维向量Vector3创建一组顶点坐标
const arr = [
  new Vector2(-50, -50),
  new Vector2(-60, 0),
  new Vector2(0, 50),
  new Vector2(60, 0),
  new Vector2(50, -50),
]


const shape = new Shape(arr);
const geometry = new ShapeGeometry(shape);

const material = new MeshLambertMaterial({
  color: 0x00ffff,
  side:DoubleSide,//双面显示看到管道内壁
})

const mesh = new Mesh(geometry, material);

const group = new Group;

group.add(mesh)

export default group;