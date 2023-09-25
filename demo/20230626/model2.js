import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { BoxGeometry,MeshBasicMaterial, Group,Mesh, MeshLambertMaterial, TextureLoader, sRGBEncoding, CubeTextureLoader } from 'three';

const geometry = new BoxGeometry(100, 60, 20);

const material = new MeshBasicMaterial({
    color: 0xffff00,
});

const mesh = new Mesh(geometry, material);


const red = document.querySelector('.red');
const bu = document.querySelector('.bu');


red.addEventListener('click', () => {
    mesh.material.color.set(0xff0000);
});

bu.addEventListener('click',function(){
    mesh.material.color.set(0x00ff00);
})



export default mesh;