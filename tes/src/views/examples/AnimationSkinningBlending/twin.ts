import CreateTwin from "@/utils/twin/createTwin";
import * as THREE from "three";
import type { IParams } from "@/utils/twin/types";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import Helper from "@/utils/twin/helpers";
import type { IAnimationName, IAnimateObj } from "./types";

class Twin extends CreateTwin {
  mixer?: THREE.AnimationMixer;
  helper: Helper;
  clock: THREE.Clock;
  clipAction?: THREE.AnimationAction;
  model?: THREE.Group<THREE.Object3DEventMap>; // 模型
  skeletonHelper?: THREE.SkeletonHelper; // 骨骼模型
  private animateObj: IAnimateObj; // 所有运动对象
  constructor(query: IParams) {
    super(query);

    // 添加辅助观察的坐标系
    this.helper = new Helper(this.scene, this.directionalLight, { domName: query.domName });
    this.clock = new THREE.Clock();
    this.model = undefined;
    this.skeletonHelper = undefined;

    // 动作
    this.animateObj = {
      idle: {
        animation: undefined,
        duration: 0,
        isActive: false,
        name: "idle"
      },
      walk: {
        animation: undefined,
        duration: 0,
        isActive: false,
        name: "walk"
      },
      run: {
        animation: undefined,
        duration: 0,
        isActive: false,
        name: "run"
      }
    };

    // this.animationArr = [undefined, undefined, undefined];

    this.init();
  }

  // 初始化
  init() {
    // const { domName } = query;

    // 设置场景相关属性
    this.setScene();
    // 添加阴影
    this.addShadow();

    // 相机设置
    this.camera.near = 1;
    this.camera.far = 100;
    this.camera.position.set(2, 2, 4);
    this.camera.lookAt(0, 0, 0);

    // 加载外部gltf
    const url = new URL("./Soldier.glb", import.meta.url).href;
    this.GLTFLoader.load(url, gltf => {
      const model = gltf.scene;
      this.model = model;
      this.scene.add(model);

      model.traverse(object => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (object.isMesh) object.castShadow = true; // 设置产生投影的网格模型
      });

      // 骨骼模型
      this.skeletonHelper = new THREE.SkeletonHelper(model);
      // console.log(gltf);
      this.skeletonHelper.visible = false;
      this.scene.add(this.skeletonHelper);

      model.rotateY(-Math.PI * 0.8); // 旋转180度

      // 动画相关
      {
        this.mixer = new THREE.AnimationMixer(model);
        const idle = gltf.animations[0];
        const walk = gltf.animations[3];
        const run = gltf.animations[1];

        this.animateObj.idle.animation = idle;
        this.animateObj.walk.animation = walk;
        this.animateObj.run.animation = run;

        this.animateObj.idle.duration = idle.duration;
        this.animateObj.walk.duration = walk.duration;
        this.animateObj.run.duration = run.duration;

        this.animateObj.walk.isActive = true; // 正在激活

        // 默认播放 走路动画
        const clipAction = this.mixer.clipAction(walk);
        this.clipAction = clipAction;
        clipAction.play();
        this.animate(); // 循环播放动画
      }
    });

    // 添加控制面板
    this.onControlsChange();
  }

  //#region 设置场景相关属性
  setScene() {
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(this.renderer), 0.04).texture;

    this.scene.background = new THREE.Color(0xa0a0a0);
    this.scene.fog = new THREE.Fog(0xa0a0a0, 10, 50); // 雾化场景
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0x8d8d8d, 3);
    hemiLight.position.set(0, 20, 0);
    this.scene.add(hemiLight);
  }
  //#endregion

  //#region 添加阴影
  addShadow() {
    this.directionalLight.position.set(-3, 10, -10);

    // 1. 设置产生阴影的模型对象 - 已在模型中设置了投射阴影

    // 2. 设置产生阴影的光源对象
    this.directionalLight.castShadow = true;

    // 3. 设置接收阴影效果的模型对象
    const mesh = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 8),
      new THREE.MeshPhongMaterial({ color: 0xcbcbcb, depthWrite: false })
    );
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    this.scene.add(mesh);

    // 4. 允许渲染器渲染阴影 .shadowMap.enabled
    this.renderer.shadowMap.enabled = true;

    // 5. 平行光阴影相机属性
    this.directionalLight.shadow.camera.top = 2;
    this.directionalLight.shadow.camera.bottom = -2;
    this.directionalLight.shadow.camera.left = -2;
    this.directionalLight.shadow.camera.right = 2;
    this.directionalLight.shadow.camera.near = 0.1;
    this.directionalLight.shadow.camera.far = 40;
  }
  //#endregion

  // 动画
  animate() {
    // console.log(this);
    requestAnimationFrame(() => this.animate());
    const frameT = this.clock.getDelta(); // 更新播放器相关的时间
    // console.log(this.mixer);

    this.helper.stats.update();

    this.mixer!.update(frameT);
  }

  //#region 控制面板操作
  onControlsChange() {
    // 添加分组

    const setTools = {
      showModel: true,
      showSkeleton: false,
      clipActionStart: true, // 停止/开始动作
      pauseContinueStart: true, // 播放/暂停动作
      makeSingleStep: false // 单步播放
    };

    // 模型显示隐藏+是否显示骨骼线条
    {
      const folder = this.helper.gui.addFolder("显示隐藏");

      folder
        .add(setTools, "showModel")
        .name("模型显示/关闭")
        .onChange(val => {
          // console.log(val);
          this.model!.visible = val;
        });

      folder
        .add(setTools, "showSkeleton")
        .name("骨骼线条显示/关闭")
        .onChange(val => {
          // console.log(val);
          this.skeletonHelper!.visible = val;
        });
    }

    // 关闭开启动作
    {
      const folder = this.helper.gui.addFolder("动作相关");
      folder
        .add(setTools, "clipActionStart")
        .name("开启/关闭")
        .onChange(val => {
          console.log(val);
          if (val) {
            // 播放
            this.clipAction!.play();
          } else {
            // 停止
            this.clipAction!.stop();
          }
        });

      folder
        .add(setTools, "pauseContinueStart")
        .name("播放/暂停")
        .onChange(val => {
          this.clipAction!.paused = !val;
        });

      const options = {
        button: () => {
          const { duration } = this.getAvcAnimate()!;
          const clipAction = this.clipAction!;
          // 如果正在播放则暂停
          if (setTools.pauseContinueStart) {
            clipAction!.paused = true;
          }
          // 循环播放
          clipAction.clampWhenFinished = true;
          clipAction.loop = THREE.LoopRepeat;
          const time = clipAction!.time + 0.1;
          if (time > duration) {
            clipAction.time = time - duration;
          } else {
            clipAction.time = time;
          }
        }
      };

      folder.add(options, "button").name("单步播放");
    }
  }
  //#endregion

  // 获取当前运动
  getAvcAnimate() {
    return Object.values(this.animateObj).find(item => item.isActive);
  }

  // 设置当前运动
  setAvcAnimate(name: IAnimationName) {
    Object.values(this.animateObj).forEach(item => {
      if (item.name === name) {
        item.isActive = true;
      } else {
        item.isActive = false;
      }
    });
  }
}

export { Twin };
