<template>
  <div class="box">
    <ul>
      <li
        v-for="item of arr"
        :key="item.index"
        :style="{
          transform: `translate(${item.left}px, ${item.index * 4}px)`,
          backgroundColor: item.bgc,
        }"
      ></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { getRandomIntInclusive, getRandomColor } from "@/utils/index";
import { Tween, Easing, Group } from "@tweenjs/tween.js";

type IItem = {
  index: number;
  bgc: string; // 背景颜色
  left: number; // 左边距
  activeArr: [number, number]; // 活动区间
};

const arr = ref<IItem[]>([]);

const { init } = (() => {
  const group = new Group();
  const MAX = 100;
  const ACTIVE_ARR = Object.freeze([20, 100]);

  // 初始化数据
  const initArr = () => {
    let index = 0;
    for (let i = 0; i < MAX; i++) {
      const startValue = getRandomIntInclusive(0, 100);
      const endValue = getRandomIntInclusive(200, 400);
      const obj: IItem = {
        index,
        bgc: getRandomColor(),
        left: startValue,
        activeArr: [startValue, endValue],
      };
      arr.value.push(obj);
      index++;
    }
  };

  // 运动
  const initMove = () => {
    arr.value.forEach(item => {
      const tween = new Tween(item)
        .to({ left: item.activeArr[1] }, 4000)
        .delay(Math.random() * 1000)
        .easing(Easing.Back.Out)
        .onUpdate(item => {
          // item.left = -item.left;
        });

      const tweenBack = new Tween(item)
        .to({ left: item.activeArr[0] }, 4000)
        .delay(Math.random() * 1000)
        .easing(Easing.Elastic.InOut)
        .onUpdate(item => {
          // item.left = -item.left;
        });

      // // const tweenBack = new Tween(item)
      // //   .to({ value: item.activeArr[1] }, 8000)
      // //   // .delay((0.001 * index + Math.random()) * 500)
      // //   .easing(Easing.Elastic.InOut);

      tween.chain(tweenBack);
      tweenBack.chain(tween);
      group.add(tween, tweenBack);
      tween.start();

      //   const { activeArr, left } = item;
      //   const newLeft = left + getRandomIntInclusive(...activeArr);
      //   item.left = newLeft;
    });
  };

  // 循环
  const animate = (time: number) => {
    // console.log(1);

    requestAnimationFrame(animate);

    group.update(time);
    // stats.update();
  };

  const init = () => {
    initArr();
    initMove();
    animate(performance.now());
  };

  return {
    init,
  };
})();

onMounted(() => {
  init();
});
</script>

<style scoped>
.box {
  display: flex;
  align-items: start;
  /* align-items: center; */
  justify-content: center;
  position: relative;
  top: 0;
  left: 0;
  /* border: 1px solid red; */
}
ul {
  width: 500px;
  position: absolute;
  top: 30px;
  height: 100%;
  left: translateX(50%);
  /* border: 1px solid red; */
}

li {
  transform: translate(0, 0);
  width: 200px;
  height: 2px;
  /* border: 1px solid #000; */
  box-sizing: border-box;
}
</style>
