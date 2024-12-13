<script setup lang="ts">
import { ElButton } from "element-plus";
</script>

<template>
  <div class="remark">
    <ElButton>12</ElButton>
  </div>
</template>

<style scoped>
.remark {
  position: fixed;
  right: 80px;
  bottom: 80px;
  width: 50px;
  height: 50px;
  border: 1px solid red;
  border-radius: 50%;
  cursor: pointer;
}
</style>
