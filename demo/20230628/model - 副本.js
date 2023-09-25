import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { BufferGeometry,BufferAttribute,LineLoop, Group,Mesh, LineBasicMaterial, sRGBEncoding, CubeTextureLoader } from 'three';

const group = new Group();


const geometry = new BufferGeometry(); //创建一个几何体对象
const R = 100; //圆弧半径
const N = 50; //分段数量
const sp = 2 * Math.PI / N;//两个相邻点间隔弧度

// 批量生成圆弧上的顶点数据
const arr = [];
for (let i = 0; i < N; i++) {
    const angle =  sp * i;//当前点弧度
    // 以坐标原点为中心，在XOY平面上生成圆弧上的顶点数据
    const x = R * Math.cos(angle);
    const y = R * Math.sin(angle);
    arr.push(x, y, 0);
}

//类型数组创建顶点数据
const vertices = new Float32Array(arr);
// 创建属性缓冲区对象
//3个为一组，表示一个顶点的xyz坐标
const attribue = new BufferAttribute(vertices, 3);
// 设置几何体attributes属性的位置属性
geometry.attributes.position = attribue;

// 线材质
const material = new LineBasicMaterial({
    color: 0xff0000 //线条颜色
});
// 创建线模型对象   构造函数：Line、LineLoop、LineSegments
// const line = new THREE.Line(geometry, material);
const line = new LineLoop(geometry, material);//线条模型对象

export default line;