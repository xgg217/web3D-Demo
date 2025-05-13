<template>
  <div class="card">
    <template v-for="(item, index) in list" :key="item.bgc">
      <div
        :style="{
          left: `${item.x}px`,
          top: `${item.y}px`,
          backgroundColor: item.bgc,
          borderRadius: item.borderRadius,
        }"
      >
        {{ index }}
      </div>
    </template>
    <!-- <div class="box1" :style="{ left: `${row1.x}px`, top: `${row1.y}px` }"></div>
    <div class="box2" :style="{ left: `${row2.x}px`, top: `${row2.y}px` }"></div> -->
  </div>
</template>

<script setup lang="ts">
import type { TBox } from "../types";

type TCard = TBox & {
  bgc: string;
  borderRadius: string;
};

const props = defineProps<{
  arr: TBox[];
}>();

const list = computed<TCard[]>(() => {
  return props.arr.map((item, index) => {
    const obj: TCard = {
      ...item,
      bgc: `rgb(${100 * index}, ${100 * index}, ${100 * index})`,
      borderRadius: index * 10 + "%",
    };

    return obj;
  });
});
</script>

<style scoped>
.card {
  position: relative;
  top: 0;
  left: 0;
  width: 480px;
  height: 320px;
  background-color: rgb(240, 250, 240);
}

.card > div {
  position: absolute;
  /* top: 20px; */
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: 20px;
  color: red;
}
</style>
