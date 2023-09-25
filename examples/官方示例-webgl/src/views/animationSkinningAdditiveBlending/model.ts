import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Group,Mesh, PlaneGeometry, MeshLambertMaterial } from "three"
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

const littlestTokyoUrl = new URL('./Xbot.glb', import.meta.url).href;


const group = new Group();

// 投影 平面
const mesh = (() => {
  const mesh = new Mesh( new PlaneGeometry( 5, 5 ), new MeshLambertMaterial( { color: 0xcbcbcb, depthWrite: false } ) );
  mesh.rotation.x = -Math.PI / 2;
  // mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh
})();


group.add(mesh)




const loader = new GLTFLoader();

// loader.load("/收费站.glb", function ( gltf ) {
loader.load(littlestTokyoUrl, function ( gltf ) {
  console.log('控制台查看加载gltf文件返回的对象结构',gltf);
  console.log('gltf对象场景属性',gltf.scene);
  // 返回的场景对象gltf.scene插入到threejs场景中
  group.add( gltf.scene );

  gltf.scene.traverse( function ( object ) {


    if ( object.isMesh ) {object.castShadow = true;}

  });


});

(() => {
  const gui = new GUI();//创建GUI对象
  const folder1 = gui.addFolder( '分组1' );
  const folder2 = gui.addFolder( '分组2' );
  const folder3 = gui.addFolder( '分组3' );

  // folder1.add()

})()

export default group;

