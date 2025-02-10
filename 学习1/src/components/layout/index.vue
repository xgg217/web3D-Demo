<template>
  <main class="layout">
    <!-- 左侧导航栏 -->
    <nav>
      <h2>{{ title }}</h2>
      <ul>
        <li v-for="item of arr" :key="item.imgSrc">
          <NavItemCmp
            :row="item"
            @click="onPage"
            :is-avc="avcRouteName === item.routeName"
          />
        </li>
      </ul>
    </nav>

    <!-- 内容区 -->
    <aside>
      <router-view v-slot="{ Component }">
        <transition name="fade">
          <component :is="Component" />
        </transition>
      </router-view>
    </aside>
  </main>
</template>

<script setup lang="ts">
import type { ILeftItem } from "./types";
import NavItemCmp from "./NavItemCmp.vue";
import placeholderURl from "@/assets/占位图.svg";

const props = defineProps<{
  pathName: string;
}>();

const router = useRouter();
const route = useRoute();

// 左侧导航栏
const { title, arr, avcRouteName, getRouterArr, onPage } = (() => {
  const title = ref("");

  const avcRouteName = ref(""); // 当前被激活的路由名称

  const arr = shallowRef<ILeftItem[]>([]);

  watch(
    () => route.name,
    val => {
      avcRouteName.value = val as string;
    },
    {
      // deep: true,
      immediate: true,
    },
  );

  // 获取所有路由
  const getRouterArr = () => {
    const list = router.getRoutes(); // 获取所有路由

    const arr = list.filter((item: any) => {
      return item.path === `/${props.pathName}`;
    });

    if (!arr.length) {
      console.error(`未找到${props.pathName}路由`);

      return [];
    }

    return arr[0].children.map((item: any) => {
      const { name, meta } = item;

      let imgSrc = placeholderURl;

      // 图片存在
      if (meta.imgSrc) {
        // 在vite 6.0.5 中才需要这种处理
        const arr = meta.imgSrc.split("/");

        imgSrc = new URL(
          `/src/views/${props.pathName}/${arr[0]}/${arr[1]}`,
          // `/src/views/${props.pathName}/$meta.imgSrc}`,
          import.meta.url,
        ).href;
      }

      const obj: ILeftItem = {
        imgSrc,
        title: meta?.title as string,
        routeName: name as string,
      };
      return obj;
    });
  };

  // 页面跳转
  const onPage = (name: ILeftItem["routeName"]) => {
    if (!name) {
      return;
    }

    const isBool = router.hasRoute(name);

    if (isBool) {
      router.push({ name });
      return;
    }
    console.error("当前路由不存在");
    router.push("/404");
  };
  return {
    title,
    arr,
    avcRouteName,
    getRouterArr,
    onPage,
  };
})();

onMounted(() => {
  // 标题
  if (route.matched.length) {
    title.value = route.matched[0].meta.title as string;
  }

  // 获取所有页面
  arr.value = getRouterArr();
});
</script>

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
