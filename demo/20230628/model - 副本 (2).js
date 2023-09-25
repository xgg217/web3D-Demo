import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EllipseCurve,Points,BufferGeometry, PointsMaterial} from 'three';

const arc = new EllipseCurve(0, 0, 100, 50);

const pointsArr = arc.getPoints(50); //分段数50，返回51个顶点
console.log('曲线上获取坐标',pointsArr);

const geometry = new BufferGeometry()
geometry.setFromPoints(pointsArr)

// 点材质对象
const material = new PointsMaterial({
    color: 0xff0000,
    size: 10.0 //点对象像素尺寸
})

// 点模型对象
const points = new Points(geometry, material)


export default points;