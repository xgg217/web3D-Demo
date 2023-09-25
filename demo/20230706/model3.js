import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector2,LatheGeometry,MeshLambertMaterial,DoubleSide,Mesh,Group} from 'three';

// 三维向量Vector3创建一组顶点坐标
const arr = [
  new Vector2(50, 60),
  new Vector2(25, 0),
  new Vector2(50, -60)
]


const geometry = new LatheGeometry(arr, 24);

const material = new MeshLambertMaterial({
  color: 0x00ffff,
  side:DoubleSide,//双面显示看到管道内壁
})

const mesh = new Mesh(geometry, material);

const group = new Group;

group.add(mesh)

export default group;