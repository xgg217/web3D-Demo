<template>
  <nav>
    <ul>
      <template v-for="item of arr" :key="item.imgSrc">
        <li>
          <NavItemCmp :row="item" @click="onPage" :is-avc="avcRouteName === item.routeName" />
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { ILeftItem } from "./types";
import NavItemCmp from "./NavItemCmp.vue";

const props = defineProps<{
  pathName: string;
}>();

const router = useRouter();
const route = useRoute();

const avcRouteName = ref(""); // 当前被激活的路由名称

const arr = shallowRef<ILeftItem[]>([]);

// 获取所有路由
const getRouterArr = () => {
  const list = router.getRoutes(); // 获取所有路由

  const arr = list.filter((item: any) => {
    return item.path === `/${props.pathName}`;
  });

  return arr[0].children.map((item: any) => {
    const { name, meta } = item;

    const imgSrc = new URL(`/src/views/${props.pathName}/${meta?.imgSrc}`, import.meta.url).href;

    const obj: ILeftItem = {
      imgSrc,
      title: meta?.title as string,
      routeName: name as string
    };
    return obj;
  });
};

watch(
  () => route.name,
  val => {
    avcRouteName.value = val as string;
  },
  {
    // deep: true,
    immediate: true
  }
);

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

onMounted(() => {
  arr.value = getRouterArr();
});
</script>

<style scoped>
nav {
  width: 300px;
  height: 100vh;
  overflow-y: scroll;
  padding: 0 16px 16px 16px;
}
ul {
  padding-left: 0;
}

li {
  list-style: none;
  width: 260px;
  /* border: 1px solid red; */
}
</style>
