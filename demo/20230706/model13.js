import { CylinderGeometry,MeshLambertMaterial,LineBasicMaterial,EdgesGeometry,LineSegments, Mesh} from 'three';

const geometry = new CylinderGeometry(60, 60, 100, 30);
const material = new MeshLambertMaterial({
  color: 0x004444,
  transparent:true,
  opacity:0.5,
});
const mesh = new Mesh(geometry, material);

// 长方体作为EdgesGeometry参数创建一个新的几何体
const edges = new EdgesGeometry(geometry,30);
const edgesMaterial = new LineBasicMaterial({
  color: 0x00ffff,
})
const line = new LineSegments(edges, edgesMaterial);
mesh.add(line);

export default mesh;