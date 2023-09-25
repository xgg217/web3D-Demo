import {BoxGeometry, MeshLambertMaterial, Mesh, KeyframeTrack,AnimationClip,AnimationMixer, Clock} from 'three';
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
const gui = new GUI();


const geometry = new BoxGeometry(50,50,50);



// 几何体顶点变形目标数据，可以设置1组或多组
geometry.morphAttributes.position = [target1, target2];

const material = new MeshLambertMaterial({
    color: 0x00ffff
})

const mesh = new Mesh(geometry, material);

(() => {
    // const target1 = new BoxGeometry(50,200,50).attributes.position; // 变高
    // const target2 = new BoxGeometry(10,50,10).attributes.position; // 变细


    // 创建变形动画权重系数的关键帧数据
    mesh.name = "Box";//关键帧动画控制的模型对象命名
    // 设置变形目标1对应权重随着时间的变化
    const KF1 = new KeyframeTrack('Box.morphTargetInfluences[0]', [0, 5], [0, 1]);
    // 设置变形目标2对应权重随着时间的变化
    const KF2 = new KeyframeTrack('Box.morphTargetInfluences[1]', [5, 10], [0, 1]);
    // 创建一个剪辑clip对象
    const clip = new AnimationClip("t", 10, [KF1, KF2]);
    const mixer = new AnimationMixer(mesh);
    const clipAction = mixer.clipAction(clip);
    clipAction.play();
    clipAction.loop = THREE.LoopOnce; //不循环播放
    clipAction.clampWhenFinished = true // 物体状态停留在动画结束的时候

    const clock = new Clock();

  function loop() {
    requestAnimationFrame(loop);
    const frameT = clock.getDelta();
    // 更新播放器时间
    mixer.update(frameT);
  }
  loop();
})();

// GUI拖动条可视化改变变形目标权重系数
const obj = {
    t1: 0,
    t2: 0,
}
gui.add(obj, 't1', 0, 1).name('变形目标1').onChange(function (v) {
    // 变形目标1对物体形状影响权重
    mesh.morphTargetInfluences[0] = v;
});
gui.add(obj, 't2', 0, 1).name('变形目标2').onChange(function (v) {
    // 变形目标2对物体形状影响权重
    mesh.morphTargetInfluences[1] = v;
});


export default mesh;