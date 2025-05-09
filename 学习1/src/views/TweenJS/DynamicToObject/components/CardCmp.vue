<template>
  <div class="card">
    <template v-for="(item, index) in props.arr" :key="index">
      <div
        :style="{
          left: `${item.x}px`,
          top: `${item.y}px`,
          backgroundColor: item.bgc,
          zIndex: index,
        }"
      ></div>
    </template>
    <!-- <div class="box1" :style="{ left: `${row1.x}px`, top: `${row1.y}px` }"></div>
    <div class="box2" :style="{ left: `${row2.x}px`, top: `${row2.y}px` }"></div> -->
  </div>
</template>

<script setup lang="ts">
import type { TBox } from "../types";

const props = defineProps<{
  arr: TBox[];
}>();
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
}
</style>
