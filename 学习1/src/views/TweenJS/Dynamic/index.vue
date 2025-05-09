<template>
  <div>
    向移动目标渐变
    <el-card style="width: 520px">
      <template #header>
        <div class="card-header">
          <span>.dynamic(false)</span>
        </div>
      </template>

      <CardCmp :row1="boxFalse1" :row2="boxFalse2" />
    </el-card>

    <el-card style="width: 520px">
      <template #header>
        <div class="card-header">
          <span>.dynamic(true)</span>
        </div>
      </template>

      <CardCmp :row1="boxTrue1" :row2="boxTrue2" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import CardCmp from "./components/CardCmp.vue";
import type { TBox } from "./types";
import { Tween, Easing, Group } from "@tweenjs/tween.js";

const temp: TBox = {
  x: 0,
  y: 0,
};

const dynamicFun = (row1: TBox, row2: TBox, dynamic: boolean) => {
  const group = new Group();
  // 模块2 x2: 0, y2: 230
  new Tween(row2, group).to({ x: 410, y: 250 }, 3000).easing(Easing.Exponential.InOut).start();

  // 模块1
  new Tween(row1, group)
    .to(row2, 3000)
    .dynamic(dynamic)
    .duration(3000)
    .easing(Easing.Exponential.InOut)
    .start();

  return group;
};

// .dynamic(false)
const { boxFalse1, boxFalse2, dynamicFalse } = (() => {
  const boxFalse1: TBox = reactive({ ...temp, x: 20, y: 20 });
  const boxFalse2: TBox = reactive({ ...temp, x: 410, y: 20 });
  const dynamicFalse = () => {
    const group = dynamicFun(boxFalse1, boxFalse2, false);
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      group.update(time);
    };
    animate(performance.now());
  };

  return { boxFalse1, boxFalse2, dynamicFalse };
})();

const { boxTrue1, boxTrue2, dynamicTrue } = (() => {
  const boxTrue1: TBox = reactive({ ...temp, x: 20, y: 20 });
  const boxTrue2: TBox = reactive({ ...temp, x: 410, y: 20 });
  const dynamicTrue = () => {
    const group = dynamicFun(boxTrue1, boxTrue2, true);
    const animate = (time: number) => {
      // console.log(1);
      requestAnimationFrame(animate);
      group.update(time);
      // stats.update();
    };
    animate(performance.now());
  };

  return { boxTrue1, boxTrue2, dynamicTrue };
})();

onMounted(() => {
  dynamicFalse();
  dynamicTrue();
});
</script>

<style lang="scss" scoped></style>
