<template>
  <div class="card">
    <div class="box1" :style="{ left: `${row1.x}px`, top: `${row1.y}px` }"></div>
    <div class="box2" :style="{ left: `${row2.x}px`, top: `${row2.y}px` }"></div>
  </div>
</template>

<script setup lang="ts">
import type { TBox } from "./../types";

const props = defineProps<{
  row1: TBox;
  row2: TBox;
}>();

const { row1, row2 } = toRefs(props);
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

.box1,
.box2 {
  position: absolute;
  /* top: 20px; */
  width: 50px;
  height: 50px;
}

.box1 {
  /* left: 20px; */
  background-color: rgb(150, 150, 150);
}

.box2 {
  /* left: 20px; */
  background-color: rgb(200, 80, 80);
  border-radius: 50%;
}
</style>
