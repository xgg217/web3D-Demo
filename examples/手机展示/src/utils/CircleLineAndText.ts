import * as THREE from 'three';

const lineAndTextGroup = new THREE.Group();

// 画圆弧
{
  const curve = new THREE.ArcCurve(0, 0, 60, Math.PI / 2 + Math.PI / 6, Math.PI / 2 - Math.PI / 6);

  const points = curve.getPoints(50);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color: 0xff0000 });

  //线条模型对象
  const line = new THREE.Line(geometry, material);

  lineAndTextGroup.add(line);
}

// 添加文字

lineAndTextGroup.rotateX(Math.PI / 2); //绕x轴旋转90度
lineAndTextGroup.position.y -= 85; //平移到产品的底部

export { lineAndTextGroup };
