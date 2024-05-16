<template>
  <div>
    <el-button >自己开发的demo</el-button>
    <el-button @click="$router.push('/examples')" >Threejs 官方示例</el-button>
  </div>
</template>

<script setup lang="ts">
import { ElButton } from 'element-plus';
</script>

<style lang="scss" scoped></style>
