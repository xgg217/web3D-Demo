<script setup lang="ts">
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
</script>

<template>
  <ElConfigProvider :locale="zhCn">
    <RouterView v-slot="{ Component }">
      <Transition name="el-zoom-in-center" mode="out-in">
        <component :is="Component" />
      </Transition>
    </RouterView>
  </ElConfigProvider>
</template>

<style scoped></style>
