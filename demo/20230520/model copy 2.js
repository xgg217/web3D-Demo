import { Mesh,MeshBasicMaterial,DoubleSide, TextureLoader, PlaneGeometry, BoxGeometry, CircleGeometry } from "three";

// 创建一个几何体
const geometry = new CircleGeometry(100);
// const geometry = new BoxGeometry(100, 100, 100);

const textLoader = new TextureLoader();

const texture = textLoader.load('./路飞.jpg');
const material = new MeshBasicMaterial({
  map: texture,
  side: DoubleSide
});

const mesh = new Mesh(geometry, material)

export default mesh;