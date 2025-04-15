<template>
  <div class="box">
    <ul class="tr" v-for="(item, index) in arr" :key="index">
      <li class="td" v-for="key in item" :key="key.id"></li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { Tween, Easing, Group } from "@tweenjs/tween.js";

const { arr, init } = (() => {
  type IItem = {
    id: number;
    bgc: string;
    value: number;
  };

  const arr = ref<IItem[][]>([]);

  const group = new Group();

  const init = () => {
    let index = 0;
    const list: IItem[][] = [];
    const tem: IItem = {
      id: 0,
      value: 0,
      bgc: "#000",
    };
    for (let i = 0; i < 64; i++) {
      const row: IItem[] = [];
      list[i] = row;

      for (let j = 0; j < 64; j++) {
        const obj: IItem = {
          ...tem,
          id: index,
        };

        // const tween = new Tween(obj)
        //   .to({ value: 1 }, 8000)
        //   .delay((0.001 * index + Math.random()) * 500)
        //   .easing(Easing.Elastic.InOut)
        //   .onUpdate(function (object) {
        //     const c = Math.floor(object.value * 0xff);
        //     object.bgc = "rgb(" + c + ", 0, 0)";
        //   });
        // const tweenBack = new Tween(obj)
        //   .to({ value: 0 }, 4000)
        //   .delay((0.001 * index + Math.random()) * 500)
        //   .easing(Easing.Elastic.InOut)
        //   .onUpdate(function (object) {
        //     const c = Math.floor(object.value * 0xff);
        //     object.bgc = "rgb(" + c + ", 0, 0)";
        //   });

        // tween.chain(tweenBack);
        // tweenBack.chain(tween);
        // group.add(tween, tweenBack);

        // tween.start();

        row.push(obj);
        index++;
      }
      // row.push()
    }
    arr.value = list;
  };

  return {
    arr,
    init,
  };
})();

onMounted(() => {
  init();
  console.log(arr.value);
});
</script>

<style scoped>
.box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  /* border: 1px solid red; */
}

.tr {
  display: flex;
  border: 1px solid #000;
}

.td {
  width: 7px;
  height: 7px;
  border: 1px solid #000;
  box-sizing: border-box;
}
</style>
