import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Group, Mesh, PlaneGeometry, MeshLambertMaterial, AnimationMixer, Clock } from "three";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";
import type { AnimationAction, AnimationClip } from "three";

const littlestTokyoUrl = new URL("./Xbot.glb", import.meta.url).href;

const group = new Group();

// 投影 平面
const mesh = (() => {
  const mesh = new Mesh(
    new PlaneGeometry(5, 5),
    new MeshLambertMaterial({ color: 0xcbcbcb, depthWrite: false }),
  );
  mesh.rotation.x = -Math.PI / 2;
  // mesh.castShadow = true;
  mesh.receiveShadow = true;
  return mesh;
})();

group.add(mesh);

(() => {
  type IIitemActions = {
    [key: string]: {
      name: string;
      key: string; // 动作的key
      action: AnimationClip | null;
    };
  };

  const gui = new GUI(); //创建GUI对象
  const folder1 = gui.addFolder("动作");
  const folder2 = gui.addFolder("姿态");
  const folder3 = gui.addFolder("分组3");

  const loader = new GLTFLoader();
  let mixer: AnimationMixer; // 动画混合器
  let currentAction: AnimationAction | null = null; // 正在播放的动作

  // 动作
  const { baseActions } = (() => {
    // 对应动作的动画
    const baseActions: IIitemActions = {
      // headShake: { name: '左右摇头', key: 'headShake', action: null },
      // sad_pose: { name: '点头', key: 'sad_pose', action: null },
      // sneak_pose: { name: '紧张', key: 'sneak_pose', action: null },
      idle: { name: "休闲", key: "idle", action: null },
      walk: { name: "走路", key: "walk", action: null },
      run: { name: "跑步", key: "run", action: null },
    };

    // 展示的动作
    const baseActionsStr = {
      // 左右摇头: baseActions['headShake'].key,
      // 点头: baseActions['sad_pose'].key,
      // 紧张: baseActions['sneak_pose'].key,
      休闲: baseActions["idle"].key,
      走路: baseActions["walk"].key,
      跑步: baseActions["run"].key,
    };

    // 点击指定动作的回调
    folder1
      .add(baseActionsStr, "休闲", baseActionsStr)
      .name("动作")
      .onChange(val => {
        let item = null;
        console.log(Object.values(baseActions));

        for (const value of Object.values(baseActions)) {
          if (value.key === val) {
            item = value;
            // console.log(value);
            break;
          }
        }

        if (currentAction && item && item.action) {
          currentAction.stop();
          const action = mixer.clipAction(item.action);
          action.play();
          currentAction = action;
        }
      });

    return {
      baseActions,
    };
  })();

  // 姿态
  // const {} = (() => {
  //   // 对应动作的动作
  //   const attitude = {
  //     headShake: { name: '左右摇头', key: 'headShake', action: null },
  //     sad_pose: { name: '点头', key: 'sad_pose', action: null },
  //     sneak_pose: { name: '紧张', key: 'sneak_pose', action: null },
  //   }

  //   // folder2.add()

  //   // 展示的动作
  //   const baseActionsStr = {
  //     // 左右摇头: baseActions['headShake'].key,
  //     // 点头: baseActions['sad_pose'].key,
  //     // 紧张: baseActions['sneak_pose'].key,
  //   };

  // })();

  loader.load(littlestTokyoUrl, function (gltf) {
    // console.log('控制台查看加载gltf文件返回的对象结构',gltf);
    // console.log('gltf对象场景属性',gltf.scene);
    // 返回的场景对象gltf.scene插入到threejs场景中
    group.add(gltf.scene);

    gltf.scene.traverse(function (object) {
      // @ts-ignore
      if (object.isMesh) {
        object.castShadow = true;
      }
    });

    // 动画
    (() => {
      mixer = new AnimationMixer(gltf.scene);

      const animations = gltf.animations;

      // 获取指定动作的动画
      animations.forEach(item => {
        const name = item.name;

        // @ts-ignore
        if (baseActions[name] && baseActions[name].action === null) {
          // console.log(item);
          baseActions[name].action = item;
        }
      });

      // 播放默认动作
      if (baseActions["idle"].action) {
        currentAction = mixer.clipAction(baseActions["idle"].action);
        currentAction.play();
      }

      // 循环播放动画
      loop();
    })();
  });

  const clock = new Clock();
  function loop() {
    requestAnimationFrame(loop);
    const frameT = clock.getDelta();
    // 更新播放器相关的时间
    mixer.update(frameT);
  }
})();

export default group;
