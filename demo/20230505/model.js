import { BoxGeometry, Group, Mesh, MeshPhongMaterial, Vector3, AxesHelper } from "three";

// 创建一个Mesh（绿色的3D立方体），并添加到场景中
const geometry = new BoxGeometry( 50, 50, 50 );

const material = new MeshPhongMaterial( { color: 0x00ff00, shininess: 100 } );

const group = new Group();
const mesh = new Mesh(geometry, material);
mesh.position.x = 50;

group.add(mesh);

group.position.x = 50;


const worldPosition = new Vector3();
// 获取mesh的世界坐标，你会发现mesh的世界坐标受到父对象group的.position影响
mesh.getWorldPosition(worldPosition);
console.log('世界坐标',worldPosition);
console.log('本地坐标',mesh.position);

const meshAxesHelper = new AxesHelper(50);
mesh.add(meshAxesHelper);

export default group;