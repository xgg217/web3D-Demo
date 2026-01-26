<script setup lang="ts">
import type { ICardItem } from "@/types/index";
import { ElMessage } from "element-plus";

const props = defineProps<{
  list: ICardItem[];
}>();

const router = useRouter();

// 路由跳转
const onPage = (name: ICardItem["name"]) => {
  console.log(name);

  // 是否为空
  if (!name) {
    ElMessage({
      message: "路由 name 为空",
      type: "warning",
    });
    return;
  }

  // 路由是否存在
  {
    const isBool = router.hasRoute(name);
    console.log(isBool);

    // return;

    if (!isBool) {
      ElMessage({
        message: `名称为 ${name} 的路由不存在`,
        type: "warning",
      });
      return;
    }
  }

  router.push({ name });
};
</script>

<template>
  <div class="list">
    <template v-for="item of props.list" :key="item.path">
      <el-card class="card">
        <template #header>
          <div class="card-header">
            <span>{{ item.title }}</span>

            <el-button type="primary" @click="() => onPage(item.name)">查看</el-button>
          </div>
        </template>
        {{ item.remark }}
      </el-card>
    </template>
  </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  gap: 20px;
}
.card {
  width: 400px;
  height: 300px;
  cursor: pointer;
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
