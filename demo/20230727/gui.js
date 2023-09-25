// 从threejs扩展库引入gui.js
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
const gui = new GUI();//创建GUI对象 
gui.domElement.style.right = '0px';
gui.domElement.style.width = '300px';

export default gui;