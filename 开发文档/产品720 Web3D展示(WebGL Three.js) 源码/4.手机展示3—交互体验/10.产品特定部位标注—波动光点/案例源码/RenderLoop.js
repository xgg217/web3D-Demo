import { scene } from './scene/index.js'//Three.js三维场景
import { renderer, camera } from './RendererCamera.js'//渲染器对象和相机对象
import { model } from './scene/model.js'//手机模型
// 渲染循环
function render() {
  // model.rotateY(0.01);//手机绕y轴旋转
  renderer.render(scene, camera); //执行渲染操作
  requestAnimationFrame(render); //请求再次执行渲染函数render，渲染下一帧
  // console.log(camera.position);//通过相机控件OrbitControls旋转相机，选择一个合适场景渲染角度
}
render();

export {renderer}
