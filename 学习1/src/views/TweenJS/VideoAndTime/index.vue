<template>
  <div class="box">
    <el-button type="primary" @click="onPlay">播放</el-button>
    <el-button type="" @click="onStop">暂停</el-button>

    <div :style="{ transform: `translateX(${val}px)` }">
      <video src="./sintel.webm" ref="videoRef" width="320" height="138" preload="metadata"></video>
      <h2>x={{ val }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tween, Easing, Group } from "@tweenjs/tween.js";

const val = ref(0);
const isPlay = ref(false);
const videoRef = ref<InstanceType<typeof HTMLVideoElement>>();
const tween1 = ref<Tween>();
let one = 0;
const durationVal = ref(0); // 动画时长

const initMove = () => {
  tween1.value = new Tween({ x: val.value })
    .to({ x: 400 }, durationVal.value)
    .easing(Easing.Linear.None)
    .onUpdate(obj => {
      console.log(obj);

      val.value = Math.trunc(obj.x);
      // left.value = Math.trunc(obj.left);
    });
  // group.add(tween1);
};

const animate = (time: number) => {
  if (!isPlay.value) return;
  requestAnimationFrame(animate);
  tween1.value!.update(time);
};

// 播放
const onPlay = () => {
  isPlay.value = true;

  if (one === 0) {
    tween1.value!.start();
    one = 1;
  } else {
    tween1.value!.resume();
  }
  animate(performance.now());
  videoRef.value?.play();
};

// 暂停
const onStop = () => {
  isPlay.value = false;
  tween1.value!.pause();
  videoRef.value?.pause();
};

onMounted(() => {
  // console.log(videoRef.value?.duration);
  // animate(performance.now());

  // videoRef.value
  // console.log(videoRef.value);

  videoRef.value!.addEventListener("loadedmetadata", () => {
    durationVal.value = videoRef.value!.duration * 1000;

    // console.log(videoRef.value!.duration);

    initMove();
  });
});
</script>

<style scoped>
.box {
  border: 1px solid #000;
  flex-direction: column;
  align-items: start;
  position: relative;
  top: 0;
  left: 0;
}

.box > div {
  position: absolute;
  top: 100px;
  left: 0;
}
</style>
