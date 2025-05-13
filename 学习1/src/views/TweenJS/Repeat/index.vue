<template>
  <div class="box">
    <CardCmp text="循环1次" bgc="#fcc" :rotation="r1.rotation" />
    <CardCmp text="循环3次" bgc="#cfc" :rotation="r2.rotation" />
    <CardCmp text="无限循环" bgc="#ccf" :rotation="r3.rotation" />
  </div>
</template>

<script setup lang="ts">
import CardCmp from "./components/CardCmp.vue";
import { Tween, Easing, Group } from "@tweenjs/tween.js";

const r1 = ref({
  rotation: 0,
});

const r2 = ref({
  rotation: 0,
});

const r3 = ref({
  rotation: 0,
});

const group = new Group();
const init = () => {
  const tween1 = new Tween(r1.value)
    .to({ rotation: 360 }, 1000)
    .easing(Easing.Exponential.InOut)
    .delay(100)
    .start();

  const tween2 = new Tween(r2.value)
    .to({ rotation: 360 }, 1000)
    .repeat(2)
    .easing(Easing.Exponential.InOut)
    .delay(100)
    .start();

  const tween3 = new Tween(r3.value)
    .to({ rotation: 360 }, 1000)
    .repeat(Infinity)
    .easing(Easing.Exponential.InOut)
    .delay(100)
    .start();

  group.add(tween1, tween2, tween3);
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

<style lang="scss" scoped>
div {
  // display: flex;
  // align-items: center;
  justify-content: space-around;
}
</style>
