import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EllipseCurve,Points,BufferGeometry, LineBasicMaterial,Line} from 'three';

const arc = new EllipseCurve(0, 0, 50, 50);

const pointsArr = arc.getPoints(50); //分段数50，返回51个顶点
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