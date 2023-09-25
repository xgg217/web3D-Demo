import { Group,PlaneGeometry,BoxGeometry, TubeGeometry,TextureLoader,RepeatWrapping,MeshLambertMaterial,DoubleSide,Mesh} from 'three';


const group = new Group();

// 平面
const plane = (() => {
  const geometry = new PlaneGeometry( 600, 300,);
  const material = new MeshLambertMaterial( {color: 0x999999} );
  
  const plane = new Mesh( geometry, material );
  
  plane.rotation.x = -Math.PI / 2;
  
  // 设置接收阴影的投影面
  plane.receiveShadow = true;
  
  return plane
})();

// 立方体
const plane1 = (() => {
  const geometry = new BoxGeometry(50,100,50);
  const material = new MeshLambertMaterial( {color: 0x00ffff} );
  const plane = new Mesh( geometry, material );
  plane.translateY(50);
  
  // 设置产生投影的网格模型
  plane.castShadow = true;
  
  return plane;
})();

group.add( plane,plane1);

export default group;