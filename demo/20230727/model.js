import { Group,CubeTextureLoader,sRGBEncoding} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const group = new Group();

// 加载工厂模型
(() => {
  // 创建GLTF加载器对象
  const loader = new GLTFLoader();
  
  const textureCube = new CubeTextureLoader().setPath('./环境贴图/').load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg']);
  textureCube.encoding = sRGBEncoding;
  
  loader.load( '工厂.glb', function ( gltf ) {
    gltf.scene.traverse(function (child) {
      if(child.isMesh){
        child.material.envMap = textureCube; // 设置环境贴图
        // child.material.envMapIntensity = 2;
        
        // 批量设置所有Mesh都可以产生阴影和接收阴影
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    group.add( gltf.scene );
  })

})();

export default group;