import { CSS2DObject } from 'three/addons/renderers/CSS2DRenderer.js';
const div = document.getElementById('tag');
div.style.top = '-161px'; //指示线端点和标注点重合
div.style.left = '-175px'; //指示线端点和标注点重合
// HTML元素转化为threejs的CSS2模型对象
const tag = new CSS2DObject(div);
export default tag;