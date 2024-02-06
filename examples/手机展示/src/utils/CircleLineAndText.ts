import * as THREE from 'three';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import font from 'three/examples/fonts/helvetiker_bold.typeface.json';

const lineAndTextGroup = new THREE.Group();

// 画圆弧
{
  const curve = new THREE.ArcCurve(0, 0, 60, Math.PI / 2 + Math.PI / 6, Math.PI / 2 - Math.PI / 6);

  const points = curve.getPoints(50);
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
  const a = loader.parse(font);
  console.log(a);

  // const imgUrl = new URL(
  //   './../../node_modules/three/examples/fonts/helvetiker_bold.typeface.json',
  //   import.meta.url
  // ).href;
  // const loader = new FontLoader();
  // const font = loader.load(
  //   // 资源URL
  //   // 'three/examples/fonts/helvetiker_bold.typeface.json',
  //   imgUrl,

  //   // onLoad回调
  //   function (font) {
  //     // do something with the font
  //     console.log(font);
  //   }

  //   // onProgress回调
  //   // function ( xhr ) {
  //   //   console.log( (xhr.loaded / xhr.total * 100) + '% loaded' );
  //   // },

  //   // // onError回调
  //   // function ( err ) {
  //   //   console.log( 'An error happened' );
  //   // }
  // );
}

lineAndTextGroup.position.y -= 85; //平移到产品的底部

export { lineAndTextGroup };
