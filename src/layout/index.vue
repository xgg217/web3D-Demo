<script setup lang="ts">
import { getCurrentInstance } from "vue";
import { getRoutes } from "@/utils/router";
import type { ICardItem } from "@/types/index";
import placeholderURl from "@/assets/占位图.svg";
import NavItemCmp from "./NavItemCmp.vue";
import routerRow from "@/router/webApi";

const route = useRoute();
const router = useRouter();

// 左侧导航栏
const { title, routeList, avcRouteName, getRouterArr, onPage } = (() => {
  const title = ref("");
  const routeList = shallowRef<ICardItem[]>([]);
  const avcRouteName = ref(""); // 当前被激活的路由名称

  // 获取所有路由
  const getRouterArr = () => {
    const { name } = route.matched[0];

    // console.log(routerRow);
    const row = routerRow.find(item => {
      return item.name === name;
    });
    // console.log(row);
    if (row && row.children && Array.isArray(row.children)) {
      const arr = row.children.map(item => {
        const { meta, name, path } = item;
        let imgSrc = placeholderURl;
        if (meta && meta.imgSrc) {
          const src = `/src/views${row!.path}/${meta.imgSrc}`;
          imgSrc = new URL(src, import.meta.url).href;
        }
        const obj: ICardItem = {
          title: (meta?.title || "") as string,
          name: (name as string) || "",
          remark: (meta?.remark || "") as string,
          imgSrc,
          path,
        };
        return obj;
      });

      return arr;
    }
    return [];
  };

  // 页面跳转
  const onPage = (name: ICardItem["name"]) => {
    if (!name) {
      return;
    }

    const isBool = router.hasRoute(name);

    if (isBool) {
      avcRouteName.value = name;
      router.replace({ name });
      // console.log(globalRow);

      return;
    }

    console.error("当前路由不存在");
    router.push("/404");
  };

  return {
    title,
    routeList,
    avcRouteName,
    getRouterArr,
    onPage,
  };
})();

onMounted(() => {
  routeList.value = getRouterArr();
  // console.log(getRouterArr());

  avcRouteName.value = (route.name as string) || "";
});
</script>

<template>
  <main class="layout">
    <!-- 左侧导航栏 -->
    <nav>
      <h2>{{ title }}</h2>
      <ul>
        <li v-for="item of routeList" :key="item.path">
          <NavItemCmp :row="item" @click="onPage" :is-avc="avcRouteName === item.name" />
        </li>
      </ul>
    </nav>
    <!-- 内容区 -->
    <aside>
      <RouterView v-slot="{ Component }">
        <Transition name="el-zoom-in-center" mode="out-in">
          <component :is="Component" :key="$route.path" />
        </Transition>
      </RouterView>
    </aside>
  </main>
</template>

<style scoped>
main.layout {
  display: flex;
  /* align-items: stretch; */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

nav {
  /* flex: 1; */
  width: var(--nav);
  height: var(--view-height);
  overflow-y: scroll;
  padding: 10px;
  box-sizing: border-box;
  /* border: 1px solid red; */
  border-right: 1px solid #999;
}

nav li {
  box-sizing: border-box;
  /* border: 1px solid red; */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}

aside {
  flex: 1;
  height: 100vh;
  height: var(--view-height);
  box-sizing: border-box;
  margin-left: 10px;
  overflow-y: scroll;
}
</style>
