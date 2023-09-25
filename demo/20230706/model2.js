import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector3,CatmullRomCurve3,TubeGeometry,MeshLambertMaterial,DoubleSide,BoxGeometry,Mesh,Group} from 'three';

// 三维向量Vector3创建一组顶点坐标
const arr = [
  new Vector3(-50, 20, 90),
  new Vector3(-10, 40, 40),
  new Vector3(0, 0, 0),
  new Vector3(60, -60, 0),
  new Vector3(70, 0, 80)
]

const path = new CatmullRomCurve3(arr);

const geometry = new TubeGeometry(path, 40, 10, 25);

const material = new MeshLambertMaterial({
  color: 0x00ffff,
  side:DoubleSide,//双面显示看到管道内壁
})

const mesh = new Mesh(geometry, material);

const group = new Group;

group.add(mesh)

export default group;