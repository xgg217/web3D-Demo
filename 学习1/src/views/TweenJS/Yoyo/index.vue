<template>
  <div class="boxs">
    <el-button @click="restart">重新启动</el-button>
    <el-button @click="stop">停止</el-button>
    <el-button @click="start">开始</el-button>
    <el-button @click="pause">暂停</el-button>
    <el-button @click="resume">重新开始</el-button>

    <div>
      <CardCmp text="循环1次" bgc="#fcc" :rotation="r1.rotation" :y="r1.y" />
      <CardCmp text="循环" bgc="#cfc" :rotation="r2.rotation" :y="r2.y" />
      <CardCmp text="相对+循环1次" bgc="#ccf" :rotation="r3.rotation" :y="r3.y" />
      <CardCmp text="相对+循环" bgc="red" :rotation="r4.rotation" :y="r4.y" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tween, Easing, Group } from "@tweenjs/tween.js";
import CardCmp from "./components/CardCmp.vue";

const r1 = ref({
  rotation: 0,
  y: 0,
});

const r2 = ref({
  rotation: 0,
  y: 0,
});

const r3 = ref({
  rotation: 0,
  y: 0,
});

const r4 = ref({
  rotation: 0,
  y: 0,
});

const group = new Group();

const endVal = { rotation: 360, y: 400 };

const tweenRow: any = {
  tween1: null,
  tween2: null,
  tween3: null,
  tween4: null,
};

const init = () => {
  const tween1 = new Tween(r1.value)
    .to(endVal, 2000)
    .yoyo(true)
    .repeat(1)
    .easing(Easing.Cubic.InOut)
    .delay(1000)
    .start();

  const tween2 = new Tween(r2.value)
    .to(endVal, 2000)
    .yoyo(true)
    .repeat(Infinity)
    .easing(Easing.Cubic.InOut)
    .delay(1000)
    .start();

  const tween3 = new Tween(r3.value)
    .to({ rotation: "+360", y: "+400" }, 2000)
    .yoyo(true)
    .repeat(1)
    .easing(Easing.Cubic.InOut)
    .delay(1000)
    .start();

  const tween4 = new Tween(r4.value)
    .to({ rotation: "+360", y: "+400" }, 2000)
    .yoyo(true)
    .repeat(Infinity)
    .easing(Easing.Cubic.InOut)
    .delay(1000)
    .start();

  // const tween3 = new Tween(r3.value)
  //   .to({ rotation: 360 }, 1000)
  //   .repeat(Infinity)
  //   .easing(Easing.Exponential.InOut)
  //   .delay(100)
  //   .start();

  tweenRow.tween1 = tween1;
  tweenRow.tween2 = tween2;
  tweenRow.tween3 = tween3;
  tweenRow.tween4 = tween4;

  group.add(tween1, tween2, tween3, tween4);
};

// 重新启动
const restart = () => {
  tweenRow.tween1.stop().start();
  tweenRow.tween2.stop().start();
  tweenRow.tween3.stop().start();
  tweenRow.tween4.stop().start();
};
// 停止
const stop = () => {
  tweenRow.tween1.stop();
  tweenRow.tween2.stop();
  tweenRow.tween3.stop();
  tweenRow.tween4.stop();
};
// 开始
const start = () => {
  tweenRow.tween1.start();
  tweenRow.tween2.start();
  tweenRow.tween3.start();
  tweenRow.tween4.start();
};

// 暂停
const pause = () => {
  tweenRow.tween1.pause();
  tweenRow.tween2.pause();
  tweenRow.tween3.pause();
  tweenRow.tween4.pause();
};

// 重新开始
const resume = () => {
  tweenRow.tween1.resume();
  tweenRow.tween2.resume();
  tweenRow.tween3.resume();
  tweenRow.tween4.resume();
};

const animate = (time: number) => {
  requestAnimationFrame(animate);
  group.update();
};

onMounted(() => {
  init();
  animate(performance.now());
});
</script>

<style scoped>
.boxs > div {
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
