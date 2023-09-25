import { Group,PlaneGeometry,MeshBasicMaterial, TubeGeometry,TextureLoader,RepeatWrapping,MeshLambertMaterial,DoubleSide,Mesh} from 'three';


const group = new Group();

const geometry = new PlaneGeometry( 200, 100,);
const material = new MeshLambertMaterial( {color: 0x00ffff} );

const plane = new Mesh( geometry, material );

plane.rotation.x = -Math.PI / 2;

group.add( plane );

export default group;