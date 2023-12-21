import * as THREE from "three";
import { player } from './model.js'

// 创建相机
const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 1.6, -5.5); // 玩家角色后面一点
camera.lookAt(0, 1.6, 0);//对着人身上某个点  视线大致沿着人的正前方

const cameraGroup = new THREE.Group();
cameraGroup.add(camera); // // 层级关系：player <—— cameraGroup <—— camera
player.add(cameraGroup); // 第三人称视角：相机作为人的子对象，会跟着人运动

// asdw按键 控制前后左右
const { playerUpdate } = (() => {

  const v = new THREE.Vector3(0, 0, 0);//初始速度设置为0
  const a = 12;//加速度：调节按键加速快慢
  const vMax = 5;//限制玩家角色最大速度
  const damping = -0.04; // 阻尼系数

  // 声明一个对象keyStates用来记录键盘事件状态
  const keyStates = {
    // 使用W、A、S、D按键来控制前、后、左、右运动
    // false表示没有按下，true表示按下状态
    W: false,
    A: false,
    S: false,
    D: false,
  };

  // 当某个键盘按下设置对应属性设置为true
  document.addEventListener('keydown', (event) => {
    // 按下W键
    if (event.code === 'KeyW'  || event.code === 'ArrowUp') {
      keyStates.W = true;
    }

    // 按下A键
    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
      keyStates.A = true;
    }

    // 按下S键
    if (event.code === 'KeyS'  || event.code === 'ArrowDown') {
      keyStates.S = true;
    }

    // 按下D键
    if (event.code === 'KeyD'  || event.code === 'ArrowRight') {
      keyStates.D = true
    };
  });

  // 当某个键盘抬起设置对应属性设置为false
  document.addEventListener('keyup', (event) => {
    // console.log('event.code', event.code);

    // 按下W键
    if (event.code === 'KeyW' || event.code === 'ArrowUp') {
      keyStates.W = false;
    }

    // 按下A键
    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
      keyStates.A = false;
    }

    // 按下S键
    if (event.code === 'KeyS' || event.code === 'ArrowDown') {
      keyStates.S = false;
    }

    // 按下D键
    if (event.code === 'KeyD' || event.code === 'ArrowRight') {
      keyStates.D = false
    };
  });

  // 循环执行的函数中测试W键盘状态值
  function playerUpdate(deltaTime:number) {
    const front = new THREE.Vector3();

    //限制最高速度
    if (v.length() < vMax) {
      // 向前运动
      if(keyStates.W){
        console.log('W键按下');
        //先假设W键对应运动方向为z

        player.getWorldDirection(front);//获取玩家角色(相机)正前方

        // W键按下时候，速度随着时间增加
        // front.multiplyScalar(a * deltaTime) 速度的改变量
        // v（当前速度） + 速度的改变量
        v.add(front.multiplyScalar(a * deltaTime));
      }

      // 向后运动
      if(keyStates.S){
        // 与W按键相反方向
        player.getWorldDirection(front);

        // - a：与W按键反向相反
        v.add(front.multiplyScalar(-a * deltaTime));
      }

      //向左运动
      if (keyStates.A) {
        player.getWorldDirection(front);
        const up = new THREE.Vector3(0, 1, 0);//y方向
        const left = up.clone().cross(front);
        v.add(left.multiplyScalar(a * deltaTime));
      }

      //向右运动
      if (keyStates.D) {
        player.getWorldDirection(front);
        const up = new THREE.Vector3(0, 1, 0);//y方向

        const right = front.clone().cross(up);
        v.add(right.multiplyScalar(a * deltaTime));
      }
    }

    // 阻尼减速
    v.addScaledVector(v, damping);

    const deltaPos = v.clone().multiplyScalar(deltaTime);
    player.position.add(deltaPos);//更新玩家角色的位置
  }

  return {
    playerUpdate
  }
})();

// 按钮操作
const { butControlsInit } = (() => {
  // 上下俯仰角度范围
  const angleMin = THREE.MathUtils.degToRad(-15);//角度转弧度
  const angleMax = THREE.MathUtils.degToRad(15);

  let isLock = false; // 是否进入指针锁定模式
  let isLeftBut = false; // 是否左键按下

  // 第一人称视角 与 第三人称视角切换
  const setThird = () => {
    const thirdDom:HTMLButtonElement = document.querySelector('.third')!;
    let viewBool = true; // 记录是否是第三人称

    // 第一人称视角 与 第三人称视角切换
    thirdDom.addEventListener("click", () => {
      // 切换到第一人称视角
      if(viewBool) {
        camera.position.z  = 1;//第一人称
        // camera.lookAt(0, 1.6, 2);//目标观察点注意在相机位置前面一点

        thirdDom.innerText = '第一人称视角';
        viewBool = false;
      } else {
        camera.position.z  = -5.5;//玩家角色后面一点
        thirdDom.innerText = '第三人称视角';
        viewBool = true;
      }
    })
  };

  // 指针锁定模式切换
  const setLock = () => {
    const lockDom:HTMLButtonElement = document.querySelector('.lock')!;

    // 进入指针锁定模式（因为如果进入了指针锁定后，鼠标无法控制，所以也就不能使用鼠标退出指针锁定了）
    lockDom.addEventListener('click', () => {
      document.body.requestPointerLock();
      // lockDom.innerText = '按ESC键退出';
    });

    // 监听指针是否被锁定
    document.addEventListener('pointerlockchange', () => {
      const isBool = document.pointerLockElement === document.body;

      if(isBool) {
        lockDom.innerText = '按ESC键退出';
        isLock = true;
      }else {
        lockDom.innerText = '进入指针锁定模式';
        isLock = false;
      }
    }, false);
  };

  // 旋转视角
  const setRotation = (event:MouseEvent) => {
    // 左右旋转
    player.rotation.y -= event.movementX / 600;

    // 相机父对象cameraGroup绕着x轴旋转,camera跟着转动
    let x = cameraGroup.rotation.x - event.movementY / 600;

    // 鼠标上下滑动，让相机视线上下转动
    {
      // 上下俯仰角度最小范围
      if (cameraGroup.rotation.x < angleMin) {
        x = angleMin;
      }

      // 上下俯仰角度最大范围
      if (cameraGroup.rotation.x > angleMax) {
        x = angleMax
      };
    }

    cameraGroup.rotation.x = x;
  }

  // 进入指针锁定模式后，鼠标旋转视角（无限旋转）
  document.addEventListener('mousemove', (event) => {
    // if(!isLock) { return }
    // console.log(isLock);


    if(isLock || isLeftBut) {

      setRotation(event);
    }
  });

  // 按下鼠标左键，小幅度旋转视角
  document.addEventListener('mousedown', (event) => {
    // console.log(isLock);


    // 如果当前处于指针锁定模式，则不执行
    if(isLock) { return }

    isLeftBut = true;

    console.log(12);

    console.log(event.movementX);



    setRotation(event);

  });

  // 鼠标左键抬起时候，不再旋转
  document.addEventListener('mouseup', () => {
    console.log(123);
    isLeftBut = false;
  });





  const butControlsInit = () => {
    setThird();
    setLock();
  }

  return {
    butControlsInit
  }
})();

export {
  camera,
  playerUpdate,
  butControlsInit
}
