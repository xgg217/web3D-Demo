// 引入dat.gui.js库
import * as dat from '../../../dat.gui-master/build/dat.gui.module.js';
import { mobilePhoneMesh } from './scene/model.js'//手机模型
//引入光源对象
import { ambient, directionalLight1, directionalLight2, helper1, helper2 } from './scene/index.js'

/**
 * 创建三维场景的控制界面
 */
//创建控件对象变量
var guiControls = {
  envMapIntensity: 0.5,
  旋转: false,//产品模型是否旋转
  ambient: 0.9,//环境光强度
  平行光1强度: 0.8,
  平行光2强度: 0.8,
  // 平行光1坐标
  x1: 100,
  y1: 75,
  z1: 50,
  // 平行光2坐标
  x2: -100,
  y2: -75,
  z2: -50,
};
//关联空间数据创建交互界面
var gui = new dat.GUI();//创建GUI对象
// var folder = gui.addFolder('菜单');//添加文件夹
//设置交互界面位置
gui.domElement.style = 'position:absolute;top:0px;right:0px;width:600px;';
// 材质.envMapIntensity属性值变化范围0.0~1.0
var envMapIntensityGUI = gui.add(guiControls, 'envMapIntensity', 0.0, 1.0);//添加环境贴图影响因子菜单选项
// 事件函数.onChange：当通过UI界面envMapIntensity改变的时候，同步改变材质属性.envMapIntensity
envMapIntensityGUI.onChange(function (value) {
  mobilePhoneMesh.material.envMapIntensity = value;//设置环境贴图对模型表面影响程度
});
// 控制模型旋转
gui.add(guiControls, '旋转');
// 控制环境光强度  最大强度值可以先随便给一个比较大，然后看看效果，在缩小范围调整
var ambientGUI = gui.add(guiControls, 'ambient', 0.0, 5.0);
ambientGUI.onChange(function (value) {
  ambient.intensity = value;//改变环境光强度
});
// 平行光1强度
var directionalLight1GUI = gui.add(guiControls, '平行光1强度', 0.0, 5.0);
directionalLight1GUI.onChange(function (value) {
  directionalLight1.intensity = value;//改变平行光强度
});
// 平行光2强度
var directionalLight2GUI = gui.add(guiControls, '平行光2强度', 0.0, 5.0);
directionalLight2GUI.onChange(function (value) {
  directionalLight2.intensity = value;//改变平行光强度
});
// 平行光1位置
var x1 = gui.add(guiControls, 'x1', -100, 100);
var y1 = gui.add(guiControls, 'y1', -100, 100);
var z1 = gui.add(guiControls, 'z1', -100, 100);
x1.onChange(function (value) {
  directionalLight1.position.x = value;
  helper1.update()
});
y1.onChange(function (value) {
  directionalLight1.position.y = value;
  helper1.update()
});
z1.onChange(function (value) {
  directionalLight1.position.z = value;
  helper1.update()
});
// 平行光2位置
var x2 = gui.add(guiControls, 'x2', -100,100);
var y2 = gui.add(guiControls, 'y2', -100,100);
var z2 = gui.add(guiControls, 'z2', -100,100);
x2.onChange(function (value) {
  directionalLight2.position.x = value;
  helper2.update()
});
y2.onChange(function (value) {
  directionalLight2.position.y = value;
  helper2.update()
});
z2.onChange(function (value) {
  directionalLight2.position.z = value;
  helper2.update()
});


export { guiControls }