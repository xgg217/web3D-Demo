// 引入three.js
import * as THREE from '../../../three.js-r125/build/three.module.js';
import { camera } from './RendererCamera.js'
import { sprite } from './scene/model.js'


function choose(event) {
  var Sx = event.clientX; //鼠标单击位置横坐标
  var Sy = event.clientY; //鼠标单击位置纵坐标
  //屏幕坐标转WebGL标准设备坐标
  var x = (Sx / window.innerWidth) * 2 - 1; //WebGL标准设备横坐标
  var y = -(Sy / window.innerHeight) * 2 + 1; //WebGL标准设备纵坐标
  //创建一个射线投射器`Raycaster`
  var raycaster = new THREE.Raycaster();
  //通过鼠标单击位置标准设备坐标和相机参数计算射线投射器`Raycaster`的射线属性.ray
  raycaster.setFromCamera(new THREE.Vector2(x, y), camera);
  //返回.intersectObjects()参数中射线选中的网格模型对象
  // 未选中对象返回空数组[],选中一个数组1个元素，选中两个数组两个元素
  var intersects = raycaster.intersectObjects([sprite]);
  // console.log("射线器返回的对象", intersects);
  // intersects.length大于0说明，说明选中了模型
  if (intersects.length > 0) {
    console.log(intersects[0].object);// 如果选中sprite，控制台打印该对象
    window.location.href = 'http://www.webgl3d.cn/';//点击精灵热点，跳转到新的页面
  }
}

// 鼠标滑动经过热点事件
addEventListener('click', choose); // 监听窗口鼠标单击事件

export { choose }

// 注意
// canvas画布非全屏情况：坐标变换参考
//屏幕坐标转WebGL标准设备坐标
// var width = 800;//three.js canvas画布宽度 以项目具体值为准
// var height = 600;//three.js canvas画布高度 以项目具体值为准
// var left = 60;//three.js canvas画布相对画布左上角左侧像素值
// var top = 100;//three.js canvas画布相对画布左上角顶部像素值
// var x = ((Sx - left) / width) * 2 - 1; //WebGL标准设备横坐标
// var y = -((Sy - top) / height) * 2 + 1; //WebGL标准设备纵坐标