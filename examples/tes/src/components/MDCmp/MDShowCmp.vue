<template>
  <div class="box">
    <pre>
      <code v-html="htmlVal"></code>
    </pre>
    <!-- <highlight-js autodetect code="function() {}" /> -->
  </div>
</template>

<script setup lang="ts">
import hljs from 'highlight.js';

import { marked } from "marked";
// import hljs from 'highlight.js/lib/core';
// import html from 'highlight.js/lib/languages/html';
// hljs.registerLanguage('html', html);
// hljs.registerLanguage('javascript', javascript);

const props = defineProps<{
  path: string
}>();

// console.log(hljsVuePlugin)

const htmlVal = ref("");

// 获取文件内容
const getFileContent = () => {
  fetch(props.path)
  .then((response) => response.text())
  .then((data) => {
    // console.log(marked(data))
    console.log(data);

    const val = marked(data) as string;
    console.log(val);
    // htmlVal.value = val;
    const a = hljs.highlight(val, { language: 'html' });
    // htmlVal.value = hljs.highlight(val, { language: 'html' }).value;

    htmlVal.value = hljs.highlight(val, { language: 'html' }).value;
    console.log(a)

    console.log(htmlVal.value);
  }).catch((error) => {
    console.log(error)
  })
}

onMounted(() => {
  getFileContent();
});

</script>

<style scoped>
.box {
  border: 1px solid #000;
  width: 100%;
  height: 100%
}
</style>