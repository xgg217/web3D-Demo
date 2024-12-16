<script setup lang="ts">
import type { ILeftItem } from "./types";

const props = defineProps<{
  row: ILeftItem;
  isAvc: boolean;
}>();

const emit = defineEmits<{
  click: [routeName: string];
}>();

// const placeholderURl = new URL("@/assets/占位图.svg", import.meta.url).href;

// const url = computed(() => {
//   console.log();

//   if (props.row.imgSrc) {
//     return props.row.imgSrc;
//   }
//   return placeholderURl;
// });
</script>

<template>
  <div
    class="item"
    @click="emit('click', props.row.routeName)"
    :class="{ avc: props.isAvc }"
  >
    <div class="imgs">
      <img :src="props.row.imgSrc" loading="lazy" :alt="props.row.title" />
    </div>
    <p>{{ props.row.title }}</p>
  </div>
</template>

<style scoped>
.item {
  border: 1px solid transparent;
  border-radius: 3px;
  background-color: #f7f7f7;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  box-sizing: border-box;
  margin-bottom: 16px;
  /* border: 1px solid blue; */
}

.avc {
  border-color: #049ef4;
  border-width: 3px;
}

.imgs {
  /* border: 1px solid blue; */
  width: 100%;
  height: 160px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imgs img {
  max-width: 100%;
  max-height: 100%;
}

p {
  padding: 8px 12px 4px;
  font-weight: 500;
  color: #444;
}

.item:hover p {
  color: #049ef4;
}
</style>
