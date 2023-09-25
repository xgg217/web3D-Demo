import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, PointsMaterial,Points,BufferGeometry, LineBasicMaterial,Line,Vector2,SplineCurve} from 'three';

// 二维向量Vector3创建一组顶点坐标
const arr = [
  new Vector2(-100, 0),
  new Vector2(0, 30),
  new Vector2(100, 0),
]

// 二维样条曲线
const curve = new SplineCurve(arr);

const line = (() => {
  const pointsArr = curve.getPoints(100); //分段数50，返回51个顶点
  console.log('曲线上获取坐标',pointsArr);
  const geometry = new BufferGeometry()
  geometry.setFromPoints(pointsArr)

  // 线材质对象
  const material = new LineBasicMaterial({
    color: 0x00ffff,
  })
  // 线模型对象
  const line = new Line(geometry, material)
  return line
})();

const points = (() => {
  // 用点模型可视化样条曲线经过的顶点位置
  const geometry2 = new BufferGeometry()
  geometry2.setFromPoints(arr)
  // 线材质对象
  const material2 = new PointsMaterial({
    color: 0xff00ff,
    size: 10
  })

  // 点模型对象
  const points = new Points(geometry2, material2)
  return points
})();

const group = new Group;

group.add(line, points)

export default group;