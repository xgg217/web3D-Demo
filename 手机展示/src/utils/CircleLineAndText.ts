import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import font from 'three/examples/fonts/helvetiker_bold.typeface.json';

const lineAndTextGroup = new THREE.Group();
const R = 50;

// 画圆弧
{
  const curve = new THREE.ArcCurve(0, 0, 60, Math.PI / 2 + Math.PI / 6, Math.PI / 2 - Math.PI / 6);

  const points = curve.getPoints(R);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  //线条模型对象
  const line = new THREE.Line(geometry, material);
  line.rotateX(Math.PI / 2); //绕x轴旋转90度
  lineAndTextGroup.add(line);
}

// 添加文字
{
  const loader = new FontLoader();
  const f = loader.parse(font);
  // console.log(f);

  const materuial = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    side: THREE.DoubleSide
  });
  const shapes = f.generateShapes("720°", 10);
  const geometry = new THREE.ShapeGeometry(shapes);
  const textMesh = new THREE.Mesh(geometry, materuial);
  textMesh.position.z = R;
  textMesh.position.x = -12;

  lineAndTextGroup.add(textMesh);
}

lineAndTextGroup.position.y -= 85; //平移到产品的底部

export { lineAndTextGroup };
