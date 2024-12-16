<template>
  <nav>
    <ul>
      <template v-for="item of arr" :key="item.imgSrc">
        <li>
          <NavItemCmp
            :row="item"
            @click="onPage"
            :is-avc="avcRouteName === item.routeName"
          />
        </li>
      </template>
    </ul>
  </nav>
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

const avcRouteName = ref(""); // 当前被激活的路由名称

const arr = shallowRef<ILeftItem[]>([]);

// 默认占位符
// const placeholderURl = new URL("/src/assets/占位图.svg", import.meta.url).href;

// 获取所有路由
const getRouterArr = () => {
  const list = router.getRoutes(); // 获取所有路由

  const arr = list.filter((item: any) => {
    return item.path === `/${props.pathName}`;
  });

  return arr[0].children.map((item: any) => {
    const { name, meta } = item;

    let imgSrc = placeholderURl;
    // 图片存在
    if (meta.imgSrc) {
      imgSrc = new URL(
        `/src/views/${props.pathName}/${meta.imgSrc}`,
        import.meta.url,
      ).href;
    }

    // const imgSrc = new URL(
    //   `/src/views/${props.pathName}/${meta?.imgSrc}`,
    //   import.meta.url,
    // ).href;

    const obj: ILeftItem = {
      imgSrc,
      title: meta?.title as string,
      routeName: name as string,
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
    immediate: true,
  },
);

// 页面跳转
const onPage = (name: ILeftItem["routeName"]) => {
  if (!name) {
    return;
  }

  const isBool = router.hasRoute(name);
  // console.log(name);

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
  flex: 1;
  width: var(--nav);
  height: var(--view-height);
  overflow-y: scroll;
  padding: 0 8px 16px 8px;
  box-sizing: border-box;
}
ul {
  padding-left: 0;
}

li {
  list-style: none;
  box-sizing: border-box;
}
</style>
