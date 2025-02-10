<script setup lang="ts">
import routerObj from "@/router/index";
import type { RouteRecordRaw } from "vue-router";

// 获取所有路由便于展示菜单
const { routerList, getAllRouter } = (() => {
  // 白名单
  const whiteList = ["/", "/404"];

  // 所有路由
  const routerList = shallowRef<RouteRecordRaw[]>([]);

  const getAllRouter = () => {
    // routerObj.getRoutes
    routerList.value = routerObj.options.routes.filter(item => {
      return !whiteList.includes(item.path);
    });
  };

  return { routerList, getAllRouter };
})();

onMounted(() => {
  getAllRouter();
});
</script>

<template>
  <el-menu
    router
    style="width: 200px"
    class="el-menu-vertical-demo"
    active-text-color="#ffd04b"
    background-color="#545c64"
    default-active="2"
    text-color="#fff"
  >
    <template v-for="item of routerList" :key="item.path">
      <el-menu-item :index="item.path">
        <span>{{ item.meta?.title }}</span>
      </el-menu-item>
    </template>
  </el-menu>
</template>
