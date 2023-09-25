import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Vector2,Vector3,Shape,CatmullRomCurve3, ExtrudeGeometry,MeshLambertMaterial,DoubleSide,Mesh,Group} from 'three';


// 扫描轮廓：Shape表示一个平面多边形轮廓
const shape = new Shape([
  // 按照特定顺序，依次书写多边形顶点坐标
  new Vector2(0,0), //多边形起点
  new Vector2(0,10),
  new Vector2(10,10),
  new Vector2(10,0),
]);

// 扫描轨迹：创建轮廓的扫描轨迹(3D样条曲线)
const curve = new CatmullRomCurve3([
  new Vector3( -10, -50, -50 ),
  new Vector3( 10, 0, 0 ),
  new Vector3( 8, 50, 50 ),
  new Vector3( -5, 0, 100)
]);



//扫描造型：扫描默认没有倒角
const geometry = new ExtrudeGeometry(
  shape, //扫描轮廓
  {
    extrudePath:curve,//扫描轨迹
    steps:100//沿着路径细分精度，越大越光滑
  }
);

const material = new MeshLambertMaterial({
  color: 0x00ffff,
  side:DoubleSide,//双面显示看到管道内壁
})

const mesh = new Mesh(geometry, material);

const group = new Group;

group.add(mesh)

export default group;