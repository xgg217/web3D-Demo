import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group } from "three"
// import LittlestTokyo from './LittlestTokyo.glb?raw'

// console.log(LittlestTokyo);
// const littlestTokyoUrl = new URL('./LittlestTokyo.glb', import.meta.url).href






const loader = new GLTFLoader();
const group = new Group();
loader.load("@/assets/modal/LittlestTokyo.glb", function ( gltf ) {
  console.log('控制台查看加载gltf文件返回的对象结构',gltf);
  console.log('gltf对象场景属性',gltf.scene);
  // 返回的场景对象gltf.scene插入到threejs场景中
  group.add( gltf.scene );
})

export default group;

