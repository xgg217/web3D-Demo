<script setup lang="ts">
import { Textures } from "./utils";
import type { TSetLoadTextCb } from "./types";
import { ElLoading } from "element-plus";
// import type {LoadingInstance } from "element-plus"

const texturesClass = ref<Textures>();
const loading = ref(false);
const loadVal = ref(0); // 当前加载到了第几个
const loadSize = ref(0); // 一共需要加载多少个

// const loadText = computed(() => {
//   return `加载中(${loadVal.value}/${loadSize.value})`;
// });

let loadingInstance = null;

const setLoadText: TSetLoadTextCb = (val: number, size: number) => {
  // const str = `加载中(${val}/${size})`;
  // loadVal.value = val;
  // loadSize.value = size;
  // loadingInstance!.setText(str);
};

onMounted(() => {
  loading.value = true;
  setTimeout(() => {
    // loadingInstance = ElLoading.service({
    //   target: document.querySelector(".box"),
    //   lock: true,
    //   text: "加载中",
    //   background: "rgba(0, 0, 0, 0.7)",
    // });
    Textures.createTextures(setLoadText)
      .then(res => {
        texturesClass.value = res;
      })
      .catch(err => {
        console.error(err);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        // loadingInstance!.close();
        loading.value = false;
        // loadingInstance!.close();
      });
  }, 1000);
});

onBeforeUnmount(() => {
  // console.log("销毁组件");
  texturesClass.value?.destroy();
});
</script>

<template>
  <div class="box3" v-loading="loading"></div>
</template>

<style scoped src="../style.css"></style>
<style scoped></style>
