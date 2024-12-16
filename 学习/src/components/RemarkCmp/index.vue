<script setup lang="ts">
import { ElDrawer } from "element-plus";
import markdownit from "markdown-it";

const {
  bgc = "#fff",
  textColor = "#000",
  url,
} = defineProps<{
  bgc?: string;
  textColor?: string;
  url: string;
}>();

// 抽屉
const { drawer, loading, txtVal } = (() => {
  const loading = ref(false);
  const drawer = ref(false);

  const md = markdownit();
  const txtVal = ref("");

  fetch(url)
    .then(res => {
      return res.text();
    })
    .then(text => {
      console.log(text);

      txtVal.value = md.render(text);
    })
    .catch(err => {
      console.error(err);
    });

  return { drawer, loading, txtVal };
})();
</script>

<template>
  <div class="remark" :style="{ backgroundColor: bgc }">
    <p :style="{ color: textColor }" @click="drawer = true">1</p>
  </div>

  <!-- 抽屉 -->
  <ElDrawer v-model="drawer" title="备注">
    <div class="drawer" v-loading="loading" v-html="txtVal"></div>
  </ElDrawer>
</template>

<style scoped>
.remark {
  --height: 50px;
  position: fixed;
  right: 80px;
  bottom: 80px;
  /* width: var(--height);
  height: var(--height); */
  /* border: 1px solid red; */
  border-radius: 50%;
  cursor: pointer;
}

.remark p {
  margin: 0;
  line-height: var(--height);
  width: var(--height);
  height: var(--height);
  text-align: center;
}

.drawer {
  height: calc(100vh - 120px);
  overflow-y: auto;
  /* border: 1px solid #000; */
}
</style>
