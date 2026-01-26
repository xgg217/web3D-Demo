<script setup lang="ts">
import type { ICardItem } from "@/types/index";

const props = defineProps<{
  row: ICardItem;
  isAvc: boolean;
}>();

const emit = defineEmits<{
  click: [routeName: string];
}>();
</script>

<template>
  <div class="item" @click="emit('click', props.row.name)" :class="{ avc: props.isAvc }">
    <div class="imgs">
      <img :src="props.row.imgSrc" loading="lazy" :alt="props.row.title" />
    </div>
    <p :class="{ textColor: props.isAvc }">{{ props.row.title }}</p>
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
}

.avc {
  border-color: var(--textColor);
  border-width: 3px;
}

.imgs {
  width: 270px;
  height: 160px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imgs img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

p {
  padding: 8px 12px 4px;
  font-weight: 500;
  color: #444;
}

.item:hover p {
  color: var(--textColor);
}

.textColor {
  color: var(--textColor);
}
</style>
