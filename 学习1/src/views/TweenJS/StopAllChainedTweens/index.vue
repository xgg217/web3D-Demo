<template>
  <div class="box">
    <el-button @click="start">开始</el-button>
    <el-button @click="stop">停止</el-button>
    <!-- <el-button @click="restart">重新启动</el-button>
    <el-button @click="stop">停止</el-button>
    <el-button @click="start">开始</el-button>
    <el-button @click="pause">暂停</el-button>
    <el-button @click="resume">重新开始</el-button> -->

    <ul>
      <li :style="{ transform: `translate(${row[0].x}px, 0px) rotate(${row[0].r}deg)` }">
        <div>1</div>
      </li>
      <li :style="{ transform: `translate(${row[1].x}px,0px) rotate(${row[1].r}deg)` }">
        <div>2</div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Tween, Easing, Group } from "@tweenjs/tween.js";

const tem = {
  x: [700, 0],
  r: [720, 720],
};

const row = reactive([
  {
    x: 0,
    r: 0,
  },
  {
    x: 0,
    r: 0,
  },
]);

const group = new Group();

let tween1: null | Tween = null;
let tween2: null | Tween = null;

const init = () => {
  tween1 = new Tween(row[0]).to(tem, 5000).delay(100).easing(Easing.Elastic.InOut);

  tween2 = new Tween(row[1], group).to(tem, 5000).easing(Easing.Elastic.InOut).delay(100);

  tween1.chain(tween2);
  tween2.chain(tween1);

  group.add(tween1, tween2);
};

const animate = (time: number) => {
  requestAnimationFrame(animate);
  group.update(time);
};

const start = () => {
  tween2?.resume();
  tween1?.start();
};

const stop = () => {
  tween1?.stop();
  tween2?.stop();
};

onMounted(() => {
  init();
  animate(performance.now());
});
</script>

<style scoped>
ul {
  border: 1px solid #000;
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 600px;
}

ul li {
  position: absolute;
  left: 0;
  width: 200px;
  height: 200px;
}

ul li:first-child {
  top: 0;
  background-color: red;
}

ul li:last-child {
  top: 300px;
  background-color: yellow;
}
</style>
