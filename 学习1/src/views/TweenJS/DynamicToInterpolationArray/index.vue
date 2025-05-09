<template>
  <div>
    向移动目标渐变
    <el-card style="width: 520px">
      <template #header>
        <div class="card-header">
          <span>.dynamic(false)</span>
        </div>
      </template>

      <!-- <CardCmp :row1="boxFalse1" :row2="boxFalse2" /> -->
    </el-card>

    <el-card style="width: 520px">
      <template #header>
        <div class="card-header">
          <span>.dynamic(true)</span>
        </div>
      </template>

      <!-- <CardCmp :row1="boxTrue1" :row2="boxTrue2" /> -->
    </el-card>
  </div>
</template>

<script setup lang="ts">
import CardCmp from "@/views/TweenJS/DynamicToObject/components/CardCmp.vue";
</script>

<style lang="scss" scoped></style>
