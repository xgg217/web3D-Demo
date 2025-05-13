<template>
  <div class="box">
    <div class="item" :style="{ transform: `translate(${r1.x}px, ${r1.y}px)` }"></div>
  </div>
</template>

<script setup lang="ts">
import { Tween, Easing, Group } from "@tweenjs/tween.js";

const r1 = ref({
  x: 0,
  y: 0,
});

const group = new Group();

const init = () => {
  const tween1 = new Tween(r1.value)
    .to({ x: "-20", y: "+20" }, 500)
    .easing(Easing.Exponential.In)
    .repeat(10)
    .delay(500)
    .start();
  group.add(tween1);
};

const animate = (time: number) => {
  requestAnimationFrame(animate);
  group.update(time);
};

onMounted(() => {
  init();
  animate(performance.now());
});
</script>

<style scoped>
.box {
  position: relative;
  top: 0;
  left: 0;
  justify-content: center;
  align-items: center;
}

.item {
  position: relative;
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
  background-color: red;

  /* transform: translate(); */
}
</style>
