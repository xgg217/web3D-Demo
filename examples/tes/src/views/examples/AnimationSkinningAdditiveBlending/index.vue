<template>
  <div class="animationSkinningAdditiveBlending"></div>
</template>

<script setup lang="ts">
import {AnimationMixer,AnimationAction,AnimationClip,Clock} from "three";
import init from "./twin";
import type { GLTF } from "three/examples/jsm/Addons.js";
import { isCanvas } from "@/utils/isCanvas"

const init3D = () => {
  {
    const isBool = isCanvas(".main .animationSkinningAdditiveBlending");
    if (isBool) {
      // return;
    }
  }

  const twin = init();
  console.log(twin);

  // 相机调整
  twin.camera.position.set(-2, 4, 4);
  twin.camera.lookAt(0, 0, 0);

  twin.renderer.setClearColor(0xffffff, 1); // 设置背景颜色
  // 设置渲染器，允许光源阴影渲染renderer.shadowMap.enabled
  twin.renderer.shadowMap.enabled = true;

  // 光源设置
  twin.directionalLight.position.set(3, 10, 10);
  twin.directionalLight.castShadow = true; //
  twin.directionalLight.shadow.camera.top = 2;
  twin.directionalLight.shadow.camera.bottom = -2;
  twin.directionalLight.shadow.camera.left = -1;
  twin.directionalLight.shadow.camera.right = 1;
  twin.directionalLight.shadow.camera.near = 0;
  twin.directionalLight.shadow.camera.far = 40;
  twin.directionalLight.shadow.radius = 1;
  twin.directionalLight.shadow.mapSize.set(1024, 1024);

  const url = new URL("./Xbot.glb", import.meta.url).href;
  twin.GLTFLoader.load(url, gltf => {
    gltf.scene.traverse(object => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      if (object.isMesh) {
        object.castShadow = true;
      }
    });
    twin.scene.add(gltf.scene);

    // 动画
    setDefaultAction(gltf);

  });
};

// 动画设置
const {setDefaultAction} = (() => {
  type IIitemActions = {
    [key:string]: {
      name: string,
      key: string, // 动作的key
      action: AnimationClip | null,
    }
  }

  let mixer:AnimationMixer = null;
  let currentAction:AnimationAction | null = null; // 正在播放的动作

  // 对应动作的动画
  const baseActions:IIitemActions = {
    // headShake: { name: '左右摇头', key: 'headShake', action: null },
    // sad_pose: { name: '点头', key: 'sad_pose', action: null },
    // sneak_pose: { name: '紧张', key: 'sneak_pose', action: null },
    idle: { name: '休闲', key: 'idle', action: null },
    walk: { name: '走路', key: 'walk', action: null },
    run: { name: '跑步', key: 'run', action: null }
  };

  // 设置默认动作
  const setDefaultAction = (gltf:GLTF) => {
    mixer = new AnimationMixer(gltf.scene);
    const animations = gltf.animations;
    // 获取指定动作的动画
    animations.forEach(item => {
      const name = item.name;

      if(baseActions[name] && (baseActions[name].action === null)) {
        // console.log(item);
        baseActions[name].action = item;
      }
    });

    // 播放默认动作
    if(baseActions['idle'].action) {
      currentAction = mixer.clipAction( baseActions['idle'].action );
      currentAction.play();
    }

    loop();
  }

  const clock = new Clock();

  function loop() {
    requestAnimationFrame(loop);
    const frameT = clock.getDelta();
    // 更新播放器相关的时间
    mixer.update(frameT);
  }

  return {
    setDefaultAction
  }

})();

// 页面加载
onMounted(() => {
  init3D();
});
</script>

<style scoped>
.animationSkinningAdditiveBlending {
  width: 100%;
  height: 100%;
  border: 1px solid blue;
}
</style>
