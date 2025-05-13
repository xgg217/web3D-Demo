<template>
  <div class="card">
    <div :style="{ backgroundColor: props.bgc, transform: `rotate(${props.rotation}deg)` }">
      {{ props.text }}
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  text: string;
  bgc: string;
  rotation: number;
}>();
</script>

<style scoped>
.card,
.card > div {
  top: 0;
  left: 0;
  width: 200px;
  height: 200px;
}

.card {
  position: relative;
  /* border: 1px solid #000; */
}

.card > div {
  position: absolute;
}
</style>
