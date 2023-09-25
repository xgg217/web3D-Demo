import { CylinderGeometry,MeshLambertMaterial,LineBasicMaterial,EdgesGeometry,LineSegments, Mesh,Group} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const model = new Group();
loader.load("./建筑模型.gltf", gltf => {
  const scene = gltf.scene;
  scene.traverse(obj => {
    if(obj.isMesh) {
      // 长方体作为EdgesGeometry参数创建一个新的几何体
      const edges = new EdgesGeometry(obj.geometry);
      const edgesMaterial = new LineBasicMaterial({
        color: 0x00ffff,
      })
      const line = new LineSegments(edges, edgesMaterial);
      obj.add(line);
      obj.material = new MeshLambertMaterial({
        color: 0x004444,
        transparent:true,
        opacity:0.5,
      })
    }
  })
  
  model.add(scene)
})

export default model;