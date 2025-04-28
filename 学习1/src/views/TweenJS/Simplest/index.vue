<template>
  <!-- :style="{ transform: `translate(${val})px` }" -->
  <div class="box">
    <p :style="{ left: left + 'px' }">x == {{ val }}</p>
  </div>
</template>

<script setup lang="ts">
import { Tween, Easing, Group } from "@tweenjs/tween.js";

const val = ref(50);
const left = ref(0);

const group = new Group();

const initMove = () => {
  const tween1 = new Tween({ x: val.value, left: left.value })
    .to({ x: 200, left: 400 }, 2000)
    .easing(Easing.Elastic.InOut)
    .onUpdate(obj => {
      console.log(obj);

      val.value = Math.trunc(obj.x);
      left.value = Math.trunc(obj.left);
    })
    .start();
  group.add(tween1);
};

const animate = (time: number) => {
  requestAnimationFrame(animate);
  group.update(time);
};

onMounted(() => {
  initMove();
  animate(performance.now());
});
</script>

<style scoped>
.box {
  position: relative;
  top: 0;
  left: 0;
  /* border: 1px solid #000; */
}

p {
  position: absolute;
  top: 10%;
  left: 10%;
  font-size: 100px;
  /* translatex: 20px; */
  /* transform: translateX(-50%); */
}
</style>
