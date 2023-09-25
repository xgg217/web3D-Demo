import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { Group, BoxGeometry,Mesh,MeshBasicMaterial} from 'three';
import { camera } from './index.js';

const model = new Group();

const geometry =  new BoxGeometry(100, 60, 20);
const basicMaterial = new MeshBasicMaterial({
  color: 0xffff00,
  transparent:true,//开启透明
  opacity: 0.75 // 不透明度
});

const mesh = new Mesh(geometry, basicMaterial);

model.add(mesh);



// X轴
(() => {
  const x = document.querySelector('.x');
  x.addEventListener('click', () => {
    camera.position.set(500, 0, 0);
    camera.lookAt(0, 0, 0); //重新计算相机视线方向
  })
})();

// y轴
(() => {
  const x = document.querySelector('.y');
  x.addEventListener('click', () => {
    camera.position.set(0, 500, 0);
    camera.lookAt(0, 0, 0); //重新计算相机视线方向
  })
})();

// z轴
(() => {
  const x = document.querySelector('.z');
  x.addEventListener('click', () => {
    camera.position.set(0, 0, 500);
    camera.lookAt(0, 0, 0); //重新计算相机视线方向
  })
})();

export default model;