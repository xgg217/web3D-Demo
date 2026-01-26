<!-- 二级页面 -->
<script setup lang="ts">
import CardListCmp from "@/components/CardListCmp.vue";
import type { ICardItem } from "@/types/index";
import { getRoutes } from "@/utils/router";

const { whitePathlist = [], path } = defineProps<{
  whitePathlist?: string[];
  path: string;
}>();

// 要显示的路由
const routeList = shallowRef<ICardItem[]>([]);

onMounted(() => {
  routeList.value = getRoutes(path, whitePathlist);
});
</script>

<template>
  <CardListCmp :list="routeList" key="Two"></CardListCmp>
</template>

<style scoped></style>
