import { BoxGeometry, Group, Mesh, MeshPhongMaterial } from "three";

// 创建一个Mesh（绿色的3D立方体），并添加到场景中
//const geometry = new THREE.BoxGeometry( 50, 50, 50 );

const material = new MeshPhongMaterial( { color: 0x00ff00, shininess: 100 } );

// 创建新的demo
const d1 = () => {
  const group = new Group();
  group.name = "高层"
  const box = new BoxGeometry(30, 100, 20);

  for(let i = 0; i<=4; i++) {
    const mesh = new Mesh(box.clone(), material.clone());
    mesh.name = i + 1 + "号楼"
    mesh.position.x = i * 50;
    group.add(mesh)
  }
  return group
}

// 创建新的demo
const d2 = () => {
  const group = new Group();
  group.name = "别墅"
  const box = new BoxGeometry(30, 50, 20);

  for(let i = 0; i<=4; i++) {
    const mesh = new Mesh(box.clone(), material.clone());
    mesh.position.x = i * 50;
    mesh.name = i + 6 + "号楼"

    group.add(mesh)
  }

  group.position.z = 80
  return group
}


const group1 = d1();
const group2 = d2();

const model = new Group();
model.add(group1, group2);
model.name='小区房子';

model.traverse(obj => {
//  console.log(obj.name)
  if(obj.isMesh) {
    console.log(obj.name)
  }
})

model.position.set(15,50,10);

const o1 = group1.getObjectByName("4号楼")
console.log(o1)
o1.material.color.set(0xffff00)


export {model};