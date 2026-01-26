<script setup lang="ts">
import CardListCmp from "@/components/CardListCmp.vue";
import type { ICardItem } from "@/types/index";
import routerRow from "@/router/index";
import type { RouteRecordRaw } from "vue-router";

// 要显示的路由
const routeList = shallowRef<ICardItem[]>([]);

onMounted(() => {
  const arr = routerRow.options.routes
    .filter(item => {
      return item.name === "home";
    })
    .map(item => {
      if (Array.isArray(item.children)) {
        return item.children;
      }
      return [];
    })[0]
    .map(item => {
      // console.log(item);

      const { meta, name, path } = item as RouteRecordRaw;
      const obj: ICardItem = {
        title: meta!.title,
        name: name as string,
        remark: (meta?.remark || "") as string,
        path,
      };
      return obj;
    });
  console.log(arr);
  routeList.value = arr;
});
</script>

<template>
  <div class="view">
    <CardListCmp :list="routeList" key="HomeView"></CardListCmp>

    <div class="todo">
      <el-card>
        <template #header>
          <div class="card-header">
            <span>待完成任务</span>
          </div>
        </template>
        <ul>
          <li>任务切片 new Thead() react的schedule库</li>
        </ul>
      </el-card>
    </div>
  </div>
</template>

<style scoped>
.view {
  display: flex;
}
.todo {
  width: 30%;
  border: 1px solid red;

  ul {
    padding-left: 60px;
  }
  li {
    list-style: disc;
  }
}
</style>
