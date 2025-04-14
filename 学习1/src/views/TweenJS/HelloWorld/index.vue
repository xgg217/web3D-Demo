<template>
  <div class="box">
    <div
      class="box-item"
      :style="{
        transform: `translate3d(${positionObj.x}px, ${positionObj.y}px, 0.0001px) rotateY(${Math.floor(positionObj.rotation)}deg)`,
      }"
    >
      box
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tween, Easing, Group } from "@tweenjs/tween.js";

const positionObj = reactive({ x: 100, y: 100, rotation: 10 });

// const position = { x: 100, y: 100, rotation: 10 };

const tween = new Tween(positionObj)
  .to({ x: 700, y: 200, rotation: 359 }, 2000)
  .delay(1000)
  .easing(Easing.Elastic.InOut)
  .onUpdate(update);

const tweenBack = new Tween(positionObj)
  .to({ x: 100, y: 100, rotation: 10 }, 3000)
  .easing(Easing.Elastic.InOut)
  .onUpdate(update);

tween.chain(tweenBack);

tween.start();

const group = new Group(tween, tweenBack);

function animate(time: number) {
  group.update(time);

  // If the update method returns false, it means all tweens in
  // the group are done playing, so we can stop the loop.
  const keepGoing = !group.allStopped();

  if (keepGoing) requestAnimationFrame(animate);
}

function update() {
  // target.style.transform = `translate3d(${position.x}px, ${position.y}px, 0.0001px) rotateY(${Math.floor(
  //   position.rotation,
  // )}deg)`;
}

onMounted(() => {
  animate(performance.now());
});
</script>

<style scoped>
.box {
  border: 1px solid #000;
  position: relative;
  top: 0;
  left: 0;
}

.box-item {
  position: absolute;
  top: 10px;
  left: 10px;
  width: 100px;
  height: 100px;
  background-color: #000;
  color: #fff;
}
</style>
