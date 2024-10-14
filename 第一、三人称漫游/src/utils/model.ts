import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { ACTION_TYPE } from "./enum";

const loader = new GLTFLoader();

const group = new THREE.Group();

let gltf = null;

try {
  gltf = await loader.loadAsync("人.glb");

  console.log("所有骨骼动画数据", gltf.animations);
} catch (error) {
  console.error(error);
}

const player = gltf!.scene; // 玩家角色模型

//包含关键帧动画的模型作为参数创建一个播放器
const mixer = new THREE.AnimationMixer(gltf!.scene);
// console.log('gltf.animations', gltf!.animations);

// gltf.animations包含做个动作，选择其中的步行动作
const RunAction = mixer.clipAction(gltf!.animations[0]); // 跑步动作
const IdleAction = mixer.clipAction(gltf!.animations[5]); // 休息动作
const WalkAction = mixer.clipAction(gltf!.animations[13]); // 步行动作
// clipAction.play(); //播放动画

RunAction.play();
IdleAction.play();
WalkAction.play();

IdleAction.weight = 1.0; //默认休息状态
WalkAction.weight = 0.0;

// 站着休息和步行两个动作之间切换
const changeAction = function changeAction(name: string) {
  //Idle  休息
  //Run   跑步
  //Walk  走路

  if (name === ACTION_TYPE.Idle.value) {
    IdleAction.weight = 1.0; //休息状态
    WalkAction.weight = 0.0;
    RunAction.weight = 0.0;
  } else if (name == ACTION_TYPE.Walk.value) {
    IdleAction.weight = 0.0;
    WalkAction.weight = 1.0; //步行状态
    RunAction.weight = 0.0;
  } else if (name == ACTION_TYPE.Run.value) {
    IdleAction.weight = 0.0;
    WalkAction.weight = 0.0;
    RunAction.weight = 1.0; //跑步
  } else {
    console.error("没有其他动作展示了");
  }
};

group.add(player);

export { group, mixer, player, changeAction };
