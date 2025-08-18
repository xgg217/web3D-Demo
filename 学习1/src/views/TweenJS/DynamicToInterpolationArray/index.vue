<template>
  <div>
    向移动目标渐变
    <el-card style="width: 520px">
      <template #header>
        <div class="card-header">
          <span>.dynamic(false)</span>
        </div>
      </template>

      <CardCmp :arr="boxFalseArr" />
    </el-card>

    <el-card style="width: 520px">
      <template #header>
        <div class="card-header">
          <span>.dynamic(true)</span>
        </div>
      </template>

      <CardCmp :arr="boxTrueArr" />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import CardCmp from "@/views/TweenJS/DynamicToObject/components/CardCmp.vue";
import { cloneDeep } from "es-toolkit";
import type { TBox } from "@/views/TweenJS/DynamicToObject/types";
import { Tween, Easing, Group, Interpolation } from "@tweenjs/tween.js";

const tempArr: TBox[] = [
  { x: 20, y: 20 },
  { x: 410, y: 20 },
  { x: 410, y: 250 },
];

const dynamicFun = (arr: Ref<TBox[]>, dynamic: boolean) => {
  const group = new Group();

  // 1->3
  // 2->3
  // 3->1

  // 模块3 x2: 0, y2: 230
  new Tween(arr.value[2], group).to(boxFalseArr.value[0], 3000).easing(Easing.Cubic.InOut).start();

  // 模块2 x2: 0, y2: 230
  new Tween(arr.value[1], group).to({ x: 250, y: 250 }, 3000).easing(Easing.Cubic.InOut).start();

  const rabbits = {
    x: [boxFalseArr.value[1].x, boxFalseArr.value[2].x],
    y: [boxFalseArr.value[1].y, boxFalseArr.value[2].y],
  };

  // 模块1
  new Tween(arr.value[0], group)
    .to(
      {
        x: [boxFalseArr.value[1].x, boxFalseArr.value[2].x],
        y: [boxFalseArr.value[1].y, boxFalseArr.value[2].y],
      },
      3000,
    )
    .duration(3000)
    .dynamic(dynamic)
    .interpolation(Interpolation.CatmullRom)
    .start();

  return group;
};

// false
const { boxFalseArr, dynamicFalse } = (() => {
  const boxFalseArr = ref<TBox[]>(cloneDeep(tempArr));

  const dynamicFalse = () => {
    const group = dynamicFun(boxFalseArr, false);
    const animate = (time: number) => {
      requestAnimationFrame(animate);
      group.update(time);
    };
    animate(performance.now());
  };

  return { boxFalseArr, dynamicFalse };
})();

// true
const { boxTrueArr, dynamicTrue } = (() => {
  const boxTrueArr = ref<TBox[]>(cloneDeep(tempArr));
  const dynamicTrue = () => {
    const group = dynamicFun(boxTrueArr, true);
    const animate = (time: number) => {
      // console.log(1);
      requestAnimationFrame(animate);
      group.update(time);
      // stats.update();
    };
    animate(performance.now());
  };

  return { boxTrueArr, dynamicTrue };
})();

onMounted(() => {
  dynamicFalse();
  dynamicTrue();
});
</script>

<style lang="scss" scoped></style>
