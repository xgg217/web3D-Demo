<template>
  <div class="box">
    <ul>
      <li :style="{ transform: `rotateX(${val.x}deg)` }">1</li>
      <li :style="{ transform: `rotateY(${val.y}deg)` }">2</li>
      <li :style="{ transform: `rotateZ(${val.z}deg)` }">3</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Tween, Easing, Group } from "@tweenjs/tween.js";

const val = ref({
  x: 0,
  y: 0,
  z: 0,
});

const group = new Group();
const initMove = () => {
  const tween1 = new Tween([0, 0, 0])
    .to(["+180", 360, 540], 2000)
    .delay(100)
    .easing(Easing.Cubic.InOut)
    .onUpdate(function (rotations) {
      console.log(rotations);
      val.value.x = rotations[0];
      val.value.y = rotations[1];
      val.value.z = rotations[2];

      // for (let i = 0; i < rotations.length; i++)
      // document.getElementById('target' + i).style.transform =
      // 	'rotate' + axes[i] + '(' + Math.floor(rotations[i]) + 'deg)'
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
ul {
  display: flex;
  margin-left: 100px;
}
ul li {
  width: 100px;
  height: 100px;
  margin-right: 50px;
}

li:first-child {
  background: #fcc;
}

li:nth-child(2) {
  background: #cfc;
}

li:last-child {
  background: #ccf;
}
</style>
