<script setup lang="ts">
import { CameraSetScissorTest } from "./utils";
import RemarkCmp from "@/components/RemarkCmp/index.vue";

const url = new URL("./Tips/README.md", import.meta.url).href;

const CameraSetScissorTestClass = ref<CameraSetScissorTest>();

onMounted(() => {
  // console.log(1111);
  setTimeout(() => {
    CameraSetScissorTestClass.value = new CameraSetScissorTest();
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  CameraSetScissorTestClass.value?.destroy();
});
</script>

<template>
  <div class="box">
    <div class="split">
      <div id="view1" tabindex="1"></div>
      <div id="view2" tabindex="2"></div>
    </div>
    <RemarkCmp :url="url" />
  </div>
</template>

<style scoped>
.box {
  /* height: calc(100vh -50px); */
  position: relative;
  top: 0;
  left: 0;
}

.split {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
}
.split div {
  flex: 1;

  box-sizing: border-box;
  /* width: 50%; */
  /* height: 100%; */
  /* height: calc(100vh -50px); */
}

.split div:first-child {
  border-right: 1px solid red;
}
</style>
