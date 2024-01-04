import { scene } from './scene/index.js'//Three.js三维场景
import { renderer, camera } from './RendererCamera.js'//渲染器对象和相机对象
import { model } from './scene/model.js'//手机模型
var rotate = {
  bool: true//表示模型是否旋转，前端UI按钮控制模型是否旋转
}
// 渲染循环
function render() {
  if (rotate.bool) model.rotateY(0.01);//手机绕y轴旋转
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧  
}
render();

const div = document.getElementById('rotate');
const img = document.getElementById('img');
div.onclick = function () {//按钮单击停止或启动旋转动画
  if (rotate.bool) {
    img.src = "./assets/停止旋转.png";//切换按钮图表
  } else {
    img.src = "./assets/旋转.png";//切换按钮图表
  }
  rotate.bool = !rotate.bool;
}
export { renderer }
