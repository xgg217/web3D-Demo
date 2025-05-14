<template>
  <div class="card">
    <el-button>按钮</el-button>

    <div
      class="row"
      :style="{ transform: `translate(${val.x}px, ${val.y}px)`, opacity: val.opacity.val }"
    >
      7547444545
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tween, Group } from "@tweenjs/tween.js";

const val = ref({
  x: 50,
  y: 50,
  opacity: {
    val: 1,
  },
});

const startRow = {
  x: 350,
  y: 150,
  opacity: {
    val: 0,
  },
};

const group = new Group();
const initMove = () => {
  const tween1 = new Tween(val.value)
    .to(startRow, 4000)
    .yoyo(true)
    .repeat(Infinity)
    .delay(100)
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
.card {
  position: relative;
  top: 0;
  left: 0;
}

.row {
  width: 300px;
  height: 300px;
  border: 5px solid red;
}

.row > div {
  background-color: blue;
  color: brown;
  height: 100%;
  line-height: 5;
  text-align: center;
  width: 100%;

  transform: translate();
}
</style>
