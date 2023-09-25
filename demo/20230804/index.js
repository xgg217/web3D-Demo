import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
// 引入渲染器通道RenderPass
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
// 引入OutlinePass通道
import { OutlinePass } from 'three/addons/postprocessing/OutlinePass.js';
import {GammaCorrectionShader} from 'three/addons/shaders/GammaCorrectionShader.js';
import {ShaderPass} from 'three/addons/postprocessing/ShaderPass.js';
import {SMAAPass} from 'three/addons/postprocessing/SMAAPass.js';

import  {group}  from './model.js';//模型对象

const can = document.querySelector('#can')
//场景
const scene = new THREE.Scene();
scene.add(group); //模型对象添加到场景中


//辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(100);
scene.add(axesHelper);


//光源设置
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(100, 60, 50);
scene.add(directionalLight);
const ambient = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambient);


//渲染器和相机
const width = window.innerWidth;
const height = window.innerHeight;
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
camera.position.set(292, 223, 185);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(width, height);
can.appendChild(renderer.domElement);





// 后处理器
const {composer, outlinePass} = (() => {
  
  // 创建后处理对象EffectComposer，WebGL渲染器作为参数
  const composer = new EffectComposer(renderer);
  // 创建一个渲染器通道，场景和相机作为参数
  const renderPass = new RenderPass(scene, camera);
  
  // 设置renderPass通道
  composer.addPass(renderPass);
  
  // OutlinePass第一个参数v2的尺寸和canvas画布保持一致
  const v2 = new THREE.Vector2(window.innerWidth, window.innerWidth);
  // const v2 = new THREE.Vector2(800, 600);
  const outlinePass = new OutlinePass(v2, scene, camera);
  outlinePass.visibleEdgeColor.set(0x00ffff);
  outlinePass.edgeThickness = 4;
  outlinePass.edgeStrength = 6;
  
  
  // 一个模型对象
  // outlinePass.selectedObjects = [mesh];
  composer.addPass(outlinePass)
  
  //获取.setPixelRatio()设置的设备像素比
  const pixelRatio = renderer.getPixelRatio();
  
  // width、height是canva画布的宽高度
  const smaaPass = new SMAAPass(width * pixelRatio, height * pixelRatio);
  composer.addPass(smaaPass);
  
  // 创建伽马校正
  const gammaPass = new ShaderPass(GammaCorrectionShader);
  composer.addPass(gammaPass);
  return {composer, outlinePass}
})()


  
  renderer.domElement.addEventListener('click', (e) => {
    const px = e.offsetX;
    const py = e.offsetY;
    console.log(px, py);

    //屏幕坐标px、py转WebGL标准设备坐标x、y
    //width、height表示canvas画布宽高度
    const x = (px / window.innerWidth) * 2 - 1;
    const y = -(py / window.innerHeight) * 2 + 1;

    //创建一个射线投射器`Raycaster`
    const raycaster = new THREE.Raycaster();
    //.setFromCamera()计算射线投射器`Raycaster`的射线属性.ray
    // 形象点说就是在点击位置创建一条射线，用来选中拾取模型对象
    raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
    
    const cunchu = group.getObjectByName("存储罐");
    
    for (let i = 0; i < cunchu.children.length; i++) {
      const group = cunchu.children[i];
      //递归遍历chooseObj，并给chooseObj的所有子孙后代设置一个ancestors属性指向自己
      group.traverse(function (obj) {
        if (obj.isMesh) {
          obj.ancestors = group;
        }
      })
    }
    
    const intersects = raycaster.intersectObjects(cunchu.children);
    console.log(intersects);

    // const intersects = raycaster.intersectObjects([mesh1, mesh2, mesh3]);
    // console.log("射线器返回的对象", intersects);
    // // intersects.length大于0说明，说明选中了模型
    if (intersects.length > 0) {
      // 选中模型的第一个模型，设置为红色
      // intersects[0].object.material.color.set(0xff0000);
      
      
      outlinePass.selectedObjects = [intersects[0].object.ancestors];
    }
  });


// 渲染循环
function render() {
  composer.render();
  // renderer.render(scene, camera);
  requestAnimationFrame(render);
}
render();


const controls = new OrbitControls(camera, renderer.domElement);

// 画布跟随窗口变化
window.onresize = function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
};