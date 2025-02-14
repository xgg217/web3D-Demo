<script setup lang="ts">
// 参考
// https://threejs.org/manual/#zh/fog
import { Fog1 } from "./utils";

const Fog1Class = ref<Fog1>();

onMounted(() => {
  setTimeout(() => {
    Fog1Class.value = new Fog1();
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  Fog1Class.value?.destroy();
});
</script>

<template>
  <el-scrollbar height="100vh">
    <ul>
      <!-- 案例1 -->
      <li class="box1">
        <el-button type="danger" class="btn" @click="Fog1Class?.destroy">销毁</el-button>
      </li>

      <!-- 案例2 -->
      <li></li>
    </ul>
  </el-scrollbar>
</template>

<style scoped>
ul li {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 600px;
  border: 1px solid red;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.btn {
  position: absolute;
  top: 20px;
  right: 20px;
}
</style>
