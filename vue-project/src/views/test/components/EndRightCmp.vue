<template>
  <svg width="30" height="30">
    <path
      d="
      M0 0,
      A14.5 14.5 0 0 1 0 30
      "
      :fill="bgcVal"
      stroke="#00f"
      stroke-width="1"
    />
  </svg>
</template>

<script setup lang="ts">
import { bgcColorArr } from "./../utils";

const props = defineProps<{
  bgc: string;
  isAvc: boolean;
}>();

const bgcVal = computed(() => {
  if (props.isAvc) {
    return bgcColorArr[1];
  }

  return bgcColorArr[0];
});
</script>

<style lang="scss" scoped></style>
