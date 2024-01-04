// 引入dat.gui.js库
import * as dat from '../../../dat.gui-master/build/dat.gui.module.js';
import {
  model
} from './scene/model.js' //轿车模型

/**
 * 创建三维场景的控制界面
 */
//创建控件对象变量
var guiControls = {
  // 金属边条
  metalness: 1.0, //金属度
  roughness: 0.2, //粗糙度
  envMapIntensity: 1.0,

  // 后视灯的镜面
  jingmetalness: 1.0,
  jingroughness: 0.0,
  jingenvMapIntensity: 1.0,

  // 车的油漆外壳
  kemetalness: 0.9,
  keroughness: 0.5,
  keenvMapIntensity: 2.5,
  kecolor: 0x222222, 
  clearcoat: 1,
  clearcoatRoughness: 0.01,
  // 车玻璃
  transmission: 0.5, 
};

//关联空间数据创建交互界面
var gui = new dat.GUI({ width: 330 } ); //创建GUI对象
var folder1 = gui.addFolder('高光金属——车金属边条、轮毂');
folder1.open();
//设置交互界面位置
gui.domElement.style = 'position:absolute;top:0px;right:0px;';
// 材质金属度.metalness属性值变化范围0.0~1.0
folder1.add(guiControls, 'metalness', 0.0, 1.0).onChange(function (value) {
  setMaterial('高光金属',"metalness",value)
});
// 材质金属度.metalness属性值变化范围0.0~1.0
folder1.add(guiControls, 'roughness', 0.0, 1.0).onChange(function (value) {
  setMaterial('高光金属',"roughness",value)
});
folder1.add( guiControls, 'envMapIntensity', 0.0, 5 ).onChange( function (value) {
  setMaterial('高光金属',"envMapIntensity",value)
} );

var folder2 = gui.addFolder('镜子材质');
folder2.open();
folder2.add( guiControls, 'jingmetalness', 0.0, 1.0).name( "metalness" ).onChange( function (value) {
  setMaterial('后视镜',"metalness",value)
} );
folder2.add( guiControls, 'jingroughness' , 0.0, 1.0).name( "roughness" ).step(0.01).onChange( function (value) {
  setMaterial('后视镜',"roughness",value)
} );
folder2.add( guiControls, 'jingenvMapIntensity', 0.0, 5 ).name( "envMapIntensity" ).onChange( function (value) {
  setMaterial('后视镜',"envMapIntensity",value)
} );

var folder3 = gui.addFolder('车外壳油漆');
folder3.open();
folder3.add( guiControls, 'kemetalness', 0.0, 1.0).name( "metalness" ).onChange( function (value) {
  setMaterial('外壳',"metalness",value)
} );
folder3.add( guiControls, 'keroughness' , 0.0, 1.0).name( "roughness" ).step(0.01).onChange( function (value) {
  setMaterial('外壳',"roughness",value)
} );
folder3.add( guiControls, 'keenvMapIntensity', 0.0, 5 ).name( "envMapIntensity" ).onChange( function (value) {
  setMaterial('外壳',"envMapIntensity",value)
} );
folder3.add( guiControls, 'clearcoat', 0.0, 1 ).onChange( function (value) {
  setMaterial('外壳',"clearcoat",value)
} );

folder3.add( guiControls, 'clearcoatRoughness', 0, 1 ).onChange( function (value) {
  setMaterial('外壳',"clearcoatRoughness",value)
} );

var folder4 = gui.addFolder('玻璃');
folder4.open();
folder4.add( guiControls, 'transmission', 0.0, 1.0).onChange( function (value) {
  setMaterial('玻璃',"transmission",value)
} );




// 当GUI界面发生变化，修改mesh的材质属性
function setMaterial(meshname,materialname,value){
  model.traverse(function (object) {
    if (object.type === 'Mesh') {
      
      if (object.name.slice(0, meshname.length) == meshname) {
        console.log(meshname.length);
        // 重置金属度
        object.material[materialname] = value; // 设置材质属性
      }
    }
  })
}

export {
  guiControls
}