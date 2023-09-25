import {Mesh, Group, BoxGeometry,MeshBasicMaterial,KeyframeTrack,AnimationClip,AnimationMixer,Clock,LoopOnce} from 'three';
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const group = new Group();
const loader = new GLTFLoader();

loader.load("./士兵.glb", (gltf) => {
    console.log(gltf.animations);
    group.add(gltf.scene);

    //包含关键帧动画的模型作为参数创建一个播放器
    const mixer = new AnimationMixer(gltf.scene);

    //  获取gltf.animations[0]的第一个clip动画对象
    const clipAction = mixer.clipAction(gltf.animations[3]); //创建动画clipAction对象
    clipAction.play(); //播放动画

    // 如果想播放动画,需要周期性执行`mixer.update()`更新AnimationMixer时间数据
    const clock = new Clock();
    function loop() {
      requestAnimationFrame(loop);
      //clock.getDelta()方法获得loop()两次执行时间间隔
      const frameT = clock.getDelta();
      // 更新播放器相关的时间
      mixer.update(frameT);
    }
    loop();
})



export default group;