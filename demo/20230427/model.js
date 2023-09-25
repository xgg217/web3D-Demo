import * as THREE from "three";

// 创建一个Mesh（绿色的3D立方体），并添加到场景中
const geometry = new THREE.BoxGeometry( 50, 50, 50 );

const material = new THREE.MeshPhongMaterial( { color: 0x00ff00, shininess: 100 } );

//创建一个空的几何体对象
const mesh = new THREE.Mesh(geometry, material);
// const mesh2 = new THREE.Mesh(geometry, material);
const mesh2 = mesh.clone();

mesh2.geometry = mesh.geometry.clone();
mesh2.material = mesh.material.clone();

// mesh.material.color.set(0xffff00);

mesh2.position.x = 100;

mesh2.material.color.set(0xffff00);

export{ mesh, mesh2 };