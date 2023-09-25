import { Mesh,MeshBasicMaterial,DoubleSide, TextureLoader, PlaneGeometry, RepeatWrapping } from "three";

// 创建一个几何体
const geometry = new PlaneGeometry(2000,2000);
// const geometry = new BoxGeometry(100, 100, 100);

const textLoader = new TextureLoader();

const texture = textLoader.load('./c.jpg');
const material = new MeshBasicMaterial({
  map: texture,
  side: DoubleSide
});

texture.wrapS = RepeatWrapping;
texture.wrapT = RepeatWrapping;
// uv两个方向纹理重复数量
texture.repeat.set(10,10);//注意选择合适的阵列数量

const mesh = new Mesh(geometry, material)

export default mesh;