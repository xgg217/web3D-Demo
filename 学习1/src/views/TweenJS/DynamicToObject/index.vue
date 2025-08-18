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
import CardCmp from "./components/CardCmp.vue";
import type { TBox } from "./types";
import { Tween, Easing, Group } from "@tweenjs/tween.js";
import { cloneDeep } from "es-toolkit";

const tempArr: TBox[] = [
  { x: 20, y: 20 },
  { x: 410, y: 20 },
];

const dynamicFun = (arr: Ref<TBox[]>, dynamic: boolean) => {
  const group = new Group();

  // 模块2 x2: 0, y2: 230
  new Tween(arr.value[1], group)
    .to({ x: 410, y: 250 }, 3000)
    .easing(Easing.Exponential.InOut)
    .onUpdate(obj => {
      // console.log(obj);
    })
    .start();

  // 模块1
  new Tween(arr.value[0], group)
    .to(arr.value[1], 3000)
    .dynamic(dynamic)
    .duration(3000)
    .easing(Easing.Exponential.InOut)
    .start();

  return group;
};

// .dynamic(false)
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

const { boxTrueArr, dynamicTrue } = (() => {
  // const boxTrue1: TBox = reactive({ ...temp, x: 20, y: 20 });
  // const boxTrue2: TBox = reactive({ ...temp, x: 410, y: 20 });

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
