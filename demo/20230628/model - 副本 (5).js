import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EllipseCurve,Points,BufferGeometry, LineBasicMaterial,Line,Vector3,CatmullRomCurve3} from 'three';

// 三维向量Vector3创建一组顶点坐标
const arr = [
    new Vector3(-50, 20, 90),
    new Vector3(-10, 40, 40),
    new Vector3(0, 0, 0),
    new Vector3(60, -60, 0),
    new Vector3(70, 0, 80)
]

// 三维样条曲线
const curve = new CatmullRomCurve3(arr);

const pointsArr = curve.getPoints(100); //分段数50，返回51个顶点
console.log('曲线上获取坐标',pointsArr);
const geometry = new BufferGeometry()
geometry.setFromPoints(pointsArr)

// 线材质对象
const material = new LineBasicMaterial({
    color: 0xff0000,
})

// 线模型对象
const points = new Line(geometry, material)

export default points;