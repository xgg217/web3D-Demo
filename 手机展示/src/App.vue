<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import * as THREE from 'three';
import { camera } from './utils/player';
import { phoneGroup, allGroup, setMeshColor } from './utils/phone';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import Stats from 'three/addons/libs/stats.module.js';

let stopRender = false;

const { warppRef, init } = (() => {
  const scene = new THREE.Scene();
  const warppRef = ref<HTMLDivElement | null>(null);
  let renderer: THREE.WebGLRenderer | null = null;
  let controls: OrbitControls;
  let stats = new Stats();
  // const clock = new THREE.Clock();

  // 设置光源
  const setLight = () => {
    // 平行光1
    const directionLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionLight.position.set(100, 200, 300);
    scene.add(directionLight);

    // 平行光2
    const directionLight2 = new THREE.DirectionalLight(0xffffff, 0.8);
    directionLight2.position.set(-400, -200, -300);
    scene.add(directionLight2);

    // 环境光
    const ambient = new THREE.AmbientLight(0xffffff, 3);
    scene.add(ambient);

    // DirectionalLightHelper：可视化平行光
    // var helper1 = new THREE.DirectionalLightHelper(directionLight, 5);
    // scene.add(helper1);
    // var helper2 = new THREE.DirectionalLightHelper(directionLight2, 5);
    // scene.add(helper2);
  };

  // 设置渲染器
  const setRenderer = () => {
    // 初始化渲染器
    renderer = new THREE.WebGLRenderer({
      antialias: true //开启锯齿
    });

    // 设置设备像素比率,防止Canvas画布输出模糊
    renderer.setPixelRatio(window.devicePixelRatio);
    // 设置渲染的尺寸大小
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 将webgl渲染的canvas内容添加到body
    warppRef.value?.appendChild(renderer.domElement);
  };

  // 辅助工具
  const setAuxiliaryTool = () => {
    // 辅助箭头
    const axesHelper = new THREE.AxesHelper(100);
    scene.add(axesHelper);

    // 帧率渲染
    // @ts-ignore
    document.body.appendChild(stats.domElement);


    // 添加一个辅助网格地面
    // const gridHelper = new THREE.GridHelper(300, 25, 0x004444, 0x004444);
    // scene.add(gridHelper);

    // gui
    // {
    //   const gui = new GUI();
    //   gui.add(camera.position, 'x', 0, 500);
    //   gui.add(camera.position, 'y', 0, 500);
    //   gui.add(camera.position, 'z', 0, 600);
    //   // scene.add(gui);
    // }
  };

  // 设置窗口大小
  const setWindowResize = () => {
    window.addEventListener('resize', () => {
      // 重置渲染器输出画布canvas尺寸
      const width = window.innerWidth;
      const height = window.innerHeight;
      renderer?.setSize(width, height);

      // HTML标签css2Renderer.domElement尺寸重新设置
      css2Renderer.setSize(width, height);

      // 全屏情况下：设置观察范围长宽比aspect为窗口宽高比
      camera.aspect = width / height;

      camera.updateProjectionMatrix();
    });
  };

  // CSS2渲染器CSS2DRenderer
  const css2Renderer = (() => {
    // 创建一个CSS2渲染器CSS2DRenderer
    const css2Renderer = new CSS2DRenderer();
    css2Renderer.setSize(window.innerWidth, window.innerHeight);
    // HTML标签<div id="tag"></div>外面父元素叠加到canvas画布上且重合
    css2Renderer.domElement.style.position = 'absolute';
    css2Renderer.domElement.style.top = '0px';
    //设置.pointerEvents=none，解决HTML元素标签对threejs canvas画布鼠标事件的遮挡
    css2Renderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(css2Renderer.domElement);

    return css2Renderer;
  })();

  // 渲染循环
  const render = () => {
    if (!stopRender) {
      // phoneGroup.rotateY(0.005); // 每次渲染的时候旋转
      if (isRotateY.value) {
        phoneGroup.rotateY(0.005);
      }
      css2Renderer.render(scene, camera);

      stats.update(); // 帧率渲染

      // const deltaTime = clock.getDelta();

      // playerUpdate(deltaTime); // 更新任务
      // mixer.update(deltaTime); // 更新播放器相关的时间

      renderer!.render(scene, camera);
      requestAnimationFrame(render);
      // console.log(camera.position);
    }
  };

  // 相机控制器
  const initOrbitControls = () => {
    controls = new OrbitControls(camera, renderer!.domElement);
    controls.addEventListener('change', function () {
      renderer!.render(scene, camera); //执行渲染操作
    }); //监听鼠标、键盘事件

    //相机位置与观察目标点最小值
    controls.minDistance = 200;

    //相机位置与观察目标点最大值
    controls.maxDistance = 500;
  };

  // 初始化
  const init = () => {
    scene.add(allGroup);

    // 设置光源
    setLight();

    // 渲染器
    setRenderer();

    // 辅助工具
    setAuxiliaryTool();

    // 自适应窗口被调整大小时发生的事件
    setWindowResize();

    // 渲染循环
    render();

    // 相机控制器
    initOrbitControls();
  };

  return {
    warppRef,
    init
  };
})();

// 旋转控制
const { rTitle, isRotateY, onRotateY } = (() => {
  const sVal = '开始旋转';
  const eVal = '停止旋转';
  const rTitle = ref('开始旋转');
  const isRotateY = ref(false);

  // 设置 开始/停止 旋转
  const onRotateY = () => {
    // 开始旋转
    if (isRotateY.value) {
      console.log('开始旋转 --> 停止旋转');

      // 开始旋转 --> 停止旋转
      isRotateY.value = false;
      rTitle.value = sVal;
    } else {
      // 停止旋转 --> 开始旋转
      console.log('停止旋转 --> 开始旋转');
      isRotateY.value = true;
      rTitle.value = eVal;
    }
  };

  //

  return {
    rTitle,
    isRotateY,
    onRotateY
  };
})();

// 修改背景色
const setBgColor = (index: 1 | 2 | 3 | 4) => {
  // console.log(index);

  setMeshColor(index);
};

onMounted(() => {
  init();
});

onUnmounted(() => {
  stopRender = true;
});
</script>

<template>
  <div ref="warppRef" class="warpp"></div>

  <div class="but">
    <button @click="onRotateY">{{ rTitle }}</button>
  </div>

  <!-- 手机背景 -->
  <ul>
    <li>
      <img src="/bgc/幻夜黑.png" alt="幻夜黑" @click="setBgColor(1)" />
    </li>
    <li>
      <img src="/bgc/极光蓝.png" alt="极光蓝" @click="setBgColor(2)" />
    </li>
    <li>
      <img src="/bgc/极光紫.png" alt="极光紫" @click="setBgColor(3)" />
    </li>
    <li>
      <img src="/bgc/珊瑚红.png" alt="珊瑚红" @click="setBgColor(4)" />
    </li>
  </ul>

  <!-- 场景标注 -->
  <div id="message" style="width:350px;height:120px;visibility: hidden;">
    <div style="padding: 10px 4px;font-size:18px;">双摄像头</div>
    <div style="padding: 10px 24px;font-size:16px;">后置主摄像头——1300万像素(F/1.8光圈)</div>
    <div style="padding: 10px 24px;font-size:16px;">后置副摄像头——200万像素的</div>
    <button style="pointer-events: auto;">关闭</button>
  </div>
</template>

<style scoped>
.warpp {
  width: 100%;
  height: 100%;
}

.but {
  position: fixed;
  right: 10%;
  bottom: 10%;
}

ul {
  position: fixed;
  right: 15%;
  bottom: 10%;
  display: flex;
  list-style: none;
}

ul li {
  border-radius: 50%;
  /* border: 1px solid red; */
  margin-left: 5px;
}

ul li img {
  width: 60px;
  height: 100%;
  cursor: pointer;
}

#message {
  position: absolute;
  /* top: 0;
  left: 252px; */
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
  padding: 0px;
  /* 边框 */
  background: linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) right bottom,
    linear-gradient(#00ffff, #00ffff) right bottom;
  background-repeat: no-repeat;
  background-size: 2px 20px, 36px 2px;
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  font-size: 18px;
  padding: 8px 12px;
}

#message button {
  position: absolute;
  top: 0;
  right: 0px;
  cursor: pointer;
}

</style>
