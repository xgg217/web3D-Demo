<template>
  <div>
    <el-button>按钮</el-button>

    <div class="row">
      <div :style="{ width: `${val}%` }">{{ val }}%</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Tween, Group } from "@tweenjs/tween.js";

const val = ref(0);
const group = new Group();
const initMove = () => {
  const tween1 = new Tween({ width: 0 })
    .to({ width: 100 }, 4000)
    .yoyo(true)
    .repeat(Infinity)
    .delay(100)
    .onUpdate(obj => {
      val.value = Math.floor(obj.width);
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
.row {
  width: 700px;
  height: 100px;
  border: 5px solid red;
}

.row > div {
  background-color: blue;
  color: brown;
  height: 100%;
  line-height: 5;
  text-align: center;
  width: 100%;
}
</style>
