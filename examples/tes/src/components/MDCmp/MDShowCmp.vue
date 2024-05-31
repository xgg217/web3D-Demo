<template>
  <div class="box">
    <pre><code v-html="htmlVal"></code></pre>
  </div>
</template>

<script setup lang="ts">
import { marked } from "marked";

const props = defineProps<{
  path: string;
}>();

const htmlVal = ref("");

// 获取文件内容
const getFileContent = () => {
  fetch(props.path)
    .then(response => response.text())
    .then(data => {
      const val = marked.parse(data) as string;
      htmlVal.value = val;
      // console.log(val);
    })
    .catch(error => {
      console.log(error);
    });
};

onMounted(() => {
  getFileContent();
});
</script>

<style scoped>
.box {
  border: 1px solid #000;
  width: 100%;
  height: 100%;
}
</style>
