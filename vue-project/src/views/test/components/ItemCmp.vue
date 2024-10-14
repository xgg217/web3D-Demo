<template>
  <div class="box" :class="[props.row.isAvc ? 'avc' : '']" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <!-- 中间左 -->
    <ContentLeftCmp v-if="!props.row.isStart" class="left" :is-avc="props.row.isAvc" :bgc="bgcColor" />

    <p>{{ props.row.content }}</p>

    <!-- 中间右 -->
    <ContentRightCmp v-if="!props.row.isEnd" class="right" :is-avc="props.row.isAvc" :bgc="bgcColor" />

    <!-- 最后一个 -->
    <EndRightCmp v-if="props.row.isEnd" class="right" :is-avc="props.row.isAvc" :bgc="bgcColor" />
  </div>
</template>

<script setup lang="ts">
import type { IItem } from "./../types";
import ContentLeftCmp from "./ContentLeftCmp.vue";
import ContentRightCmp from "./ContentRightCmp.vue";
import EndRightCmp from "./EndRightCmp.vue";
import { bgcColorArr } from "./../utils";

const props = defineProps<{
  row: IItem;
}>();

// const bgcColorArr = ["#fff", "red"];
const bgcColor = ref<string>(bgcColorArr[0]);

const onMouseenter = () => {
  console.log("鼠标移入");

  if (props.row.isAvc) {
    bgcColor.value = bgcColorArr[1];
    return;
  }

  bgcColor.value = bgcColorArr[1];
};

const onMouseleave = () => {
  console.log("鼠标移出");
  if (props.row.isAvc) {
    bgcColor.value = bgcColorArr[1];
    return;
  }

  bgcColor.value = bgcColorArr[0];
};

// const defColor = computed(() => {
//   // 激活
//   if (props.row.isAvc) {
//     return bgcColorArr[1];
//   }

//   return bgcColorArr[0];
// });
</script>

<style scoped>
.box {
  position: relative;
  top: 0;
  left: 0;
  min-width: 100px;
  height: 30px;
  line-height: 1;
  padding: 5px 5px;
  border-top: 1px solid #000;
  border-bottom: 1px solid #000;
  text-align: right;
  margin-right: 30px;
  cursor: pointer;
}

.box:hover,
.avc {
  background-color: red;
  color: #fff;
}

.left,
.right {
  position: absolute;
  top: -1px;
}

.left {
  left: 0;
  transform: translateX(-100%);
}

.right {
  right: 0;

  transform: translateX(100%);
}
</style>
