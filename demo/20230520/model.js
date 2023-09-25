import { Mesh,MeshBasicMaterial,DoubleSide, TextureLoader, PlaneGeometry, RepeatWrapping } from "three";

// 创建一个几何体
const geometry = new PlaneGeometry(200,20);
// const geometry = new BoxGeometry(100, 100, 100);

const textLoader = new TextureLoader();

const texture = textLoader.load('./纹理3.jpg');
const material = new MeshBasicMaterial({
  map: texture,
});

texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
texture.repeat.set(20,1);//注意选择合适的阵列数量

const mesh = new Mesh(geometry, material)

mesh.rotateX(-Math.PI/2);

texture.offset.x = 0.5; // UV 坐标的 V方向偏移
//texture.offset.y = 0.5; // UV 坐标的 V方向偏移
//texture.wrapS = RepeatWrapping; // 改变包裹，或者映射方式

export{mesh, texture} ;