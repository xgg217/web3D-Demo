import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector2,Shape,ExtrudeGeometry,MeshLambertMaterial,DoubleSide,Mesh,Group} from 'three';


const arr = [
  new Vector2(-50, -50),
  new Vector2(-50, 50),
  new Vector2(50, 50),
  new Vector2(50, -50),
]


const shape = new Shape(arr);
const geometry = new ExtrudeGeometry(shape, {
  depth: 20, //拉伸长度
  bevelThickness: 5, //倒角尺寸:拉伸方向
  bevelSegments: 1, //倒直角
});

const material = new MeshLambertMaterial({
  color: 0x00ffff,
  side:DoubleSide,//双面显示看到管道内壁
})

const mesh = new Mesh(geometry, material);

const group = new Group;

group.add(mesh)

export default group;