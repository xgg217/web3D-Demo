<template>
  <svg width="20" height="30">
    <path
      d="
      M0 0,
      L19 15,
      L0 30
      "
      :fill="bgcVal"
      stroke="#00f"
      stroke-linejoin="round"
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
