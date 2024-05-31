<template>
  <div>
    <div class="md" @click="onShow">说明</div>

    <ElDrawer
      v-model="drawer"
      title="备注说明"
      size="50%"
    >
      <MDShowCmp :path="props.path" />
    </ElDrawer>
  </div>
</template>

<script setup lang="ts">
import {ElDrawer} from "element-plus";
// import MDShowCmp from "./MDShowCmp.vue";

const MDShowCmp = defineAsyncComponent(() => import('./MDShowCmp.vue'))

const props = defineProps({
  path: String
});

const drawer = ref(true);

const onShow = () => {
  drawer.value = true
}
</script>

<style scoped>
.md {
  position: fixed;
  width: 80px;
  height: 80px;
  right: 8%;
  bottom: 8%;
  border: 1px solid #000;
  border-radius: 50%;
  text-align: center;
  line-height: 80px;
  font-size: 16px;
  cursor: pointer;
}
</style>