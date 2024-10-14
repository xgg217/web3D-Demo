<template>
  <div class="item" @click="emit('click', props.row.routeName)">
    <div class="imgs">
      <img :src="props.row.imgSrc" alt="" />
    </div>
    <p>{{ props.row.title }}</p>
  </div>
</template>

<script setup lang="ts">
import type { ILeftItem } from "./../types";

const props = defineProps<{
  row: ILeftItem;
}>();

const emit = defineEmits<{
  click: [routeName: string];
}>();
</script>

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
}

.avc {
  border-color: #049ef4;
  border-width: 3px;
}

.imgs {
  width: 254px;
  height: 160px;
  box-sizing: border-box;
}

.imgs img {
  width: 100%;
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
