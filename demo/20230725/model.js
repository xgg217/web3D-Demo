import { Vector3,CatmullRomCurve3, TubeGeometry,TextureLoader,RepeatWrapping,MeshLambertMaterial,DoubleSide,Mesh} from 'three';

// 三维样条曲线
const path = new CatmullRomCurve3([
  new Vector3(-50, 20, 90),
  new Vector3(-10, 40, 40),
  new Vector3(0, 0, 0),
  new Vector3(60, -60, 0),
  new Vector3(90, -40, 60),
  new Vector3(120, 30, 30),
]);
// 样条曲线path作为TubeGeometry参数生成管道
const geometry = new TubeGeometry(path, 200, 5, 30);
const texLoader = new TextureLoader();
const texture = texLoader.load('./diffuse.jpg');//纹理贴图
texture.wrapS = RepeatWrapping;//UV坐标U方向阵列模式
texture.repeat.x = 10;//纹理沿着管道方向阵列(UV坐标U方向)
const material = new MeshLambertMaterial({
  map:texture,
  side: DoubleSide, //双面显示看到管道内壁
  // transparent:true,
  // opacity:0.5,
});
const mesh = new Mesh(geometry, material);

// 从曲线轨迹线上等间距获取一定数量点坐标
const pointsArr = path.getSpacedPoints(500);
export {mesh,pointsArr};