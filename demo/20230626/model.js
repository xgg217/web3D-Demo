import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { PlaneGeometry,MeshLambertMaterial,DoubleSide, Group,Mesh, TextureLoader, sRGBEncoding, CubeTextureLoader } from 'three';

const group = new Group();
const geometry = new PlaneGeometry(250, 250);
const material = new MeshLambertMaterial({
    color: 0x00ffff,
    side: DoubleSide,
});
const mesh = new Mesh(geometry, material);

group.add(mesh);

const geometry2 = new PlaneGeometry(300, 300);
const material2 = new MeshLambertMaterial({
    color: 0xff6666,
    side: DoubleSide,
});
const mesh2 = new Mesh(geometry2, material2);
mesh2.position.z = 0.1;

group.add(mesh2);



export default group;