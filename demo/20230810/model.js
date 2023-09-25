import * as THREE from 'three';
import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const group = new THREE.Group();

(() => {
  const div = document.querySelector('#tag');
  const tag = new CSS2DObject(div);
  // 创建GLTF加载器对象
  const loader = new GLTFLoader();
  loader.load( './工厂.glb', function ( gltf ) {
    console.log('控制台查看加载gltf文件返回的对象结构',gltf);
    console.log('gltf对象场景属性',gltf.scene);
    
    const nameNode = gltf.scene.getObjectByName("设备B");
    console.log(nameNode)
    
    const axesHelper = new THREE.AxesHelper(30);
    console.log(axesHelper)
    nameNode.add(axesHelper);
    // 返回的场景对象gltf.scene插入到threejs场景中
    nameNode.add(tag)
    group.add( gltf.scene );
  })
})();



export {group};