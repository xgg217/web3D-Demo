// 引入dat.gui.js库
import * as dat from '../../../dat.gui-master/build/dat.gui.module.js';
import { model } from './scene/model.js'//轿车模型

/**
 * 创建三维场景的控制界面
 */
//创建控件对象变量
var guiControls = {
  metalness: 1.0,//金属度
  roughness: 0.4,//粗糙度
};
//关联空间数据创建交互界面
var gui = new dat.GUI();//创建GUI对象
// var folder = gui.addFolder('菜单');//添加文件夹
//设置交互界面位置
gui.domElement.style = 'position:absolute;top:0px;right:0px;width:600px;';
// 材质金属度.metalness属性值变化范围0.0~1.0
var metalnessGUI = gui.add(guiControls, 'metalness', 0.0, 1.0);
// 事件函数.onChange：当通过UI界面metalness改变的时候，同步改变材质属性.metalness
metalnessGUI.onChange(function (value) {
  model.traverse(function (object) {
    if (object.type === 'Mesh') {
      // 重置金属度
      object.material.metalness = value;
    }
  })
});
// 材质金属度.metalness属性值变化范围0.0~1.0
var roughnessGUI = gui.add(guiControls, 'roughness', 0.0, 1.0);
roughnessGUI.onChange(function (value) {
  model.traverse(function (object) {
    if (object.type === 'Mesh') {      
      object.material.roughness = value;// 重置粗糙度
    }
  })
});
export { guiControls }