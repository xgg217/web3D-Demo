<template>
  <div class="phone"></div>
  <div class="but">
    <button @click="onRotateY">{{ rTitle }}</button>
  </div>

  <!-- 手机背景 -->
  <ul>
    <li>
      <img src="./assets/bgc/幻夜黑.png" alt="幻夜黑" @click="setBgColor(1)" />
    </li>
    <li>
      <img src="./assets/bgc/极光蓝.png" alt="极光蓝" @click="setBgColor(2)" />
    </li>
    <li>
      <img src="./assets/bgc/极光紫.png" alt="极光紫" @click="setBgColor(3)" />
    </li>
    <li>
      <img src="./assets/bgc/珊瑚红.png" alt="珊瑚红" @click="setBgColor(4)" />
    </li>
  </ul>

  <!-- 场景标注 -->
  <div id="message" style="width: 350px; height: 120px; visibility: hidden">
    <div style="padding: 10px 4px; font-size: 18px">双摄像头</div>
    <div style="padding: 10px 24px; font-size: 16px">后置主摄像头——1300万像素(F/1.8光圈)</div>
    <div style="padding: 10px 24px; font-size: 16px">后置副摄像头——200万像素的</div>
    <button style="pointer-events: auto">关闭</button>
  </div>
</template>

<script setup lang="ts" name="Phone">
import init, { setMeshColor, css2Renderer, phoneGroup } from "./twin";
import CreateTwin from "@/utils/twin/createTwin";
import { isCanvas } from "@/utils/isCanvas";

const twinVal = ref<typeof CreateTwin>();

const init3D = () => {
  {
    const isBool = isCanvas(".main .animationSkinningAdditiveBlending");
    if (isBool) {
      // return;
    }
  }

  const twin = init();

  // 相机调整
  twin.camera.position.set(350, 160, 300);
  twin.camera.lookAt(0, 0, 0);

  const p = document.querySelector(".phone");
  p?.appendChild(css2Renderer.domElement);

  twinVal.value = twin;

  render();
};

// 渲染循环
const render = () => {
  if (isRotateY.value) {
    phoneGroup.rotateY(0.005);
  }
  css2Renderer.render(twinVal.value.scene, twinVal.value.camera);

  requestAnimationFrame(render);
};

// 旋转控制
const { rTitle, isRotateY, onRotateY } = (() => {
  const sVal = "开始旋转";
  const eVal = "停止旋转";
  const rTitle = ref("开始旋转");
  const isRotateY = ref(false);

  // 设置 开始/停止 旋转
  const onRotateY = () => {
    // 开始旋转
    if (isRotateY.value) {
      console.log("开始旋转 --> 停止旋转");

      // 开始旋转 --> 停止旋转
      isRotateY.value = false;
      rTitle.value = sVal;
    } else {
      // 停止旋转 --> 开始旋转
      console.log("停止旋转 --> 开始旋转");
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

console.log(isRotateY);

// 修改背景色
const setBgColor = (index: 1 | 2 | 3 | 4) => {
  // console.log(index);

  setMeshColor(index);
};

// 页面加载
onMounted(() => {
  init3D();
});
</script>

<style scoped>
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
  background:
    linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) left top,
    linear-gradient(#00ffff, #00ffff) right bottom,
    linear-gradient(#00ffff, #00ffff) right bottom;
  background-repeat: no-repeat;
  background-size:
    2px 20px,
    36px 2px;
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
