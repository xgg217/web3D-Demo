<template>
  <nav>
    <ul>
      <template v-for="item of arr" :key="item.imgSrc">
        <li>
          <NavItemCmp :row="item" />
        </li>
      </template>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { ILeftItem } from "./../types";
import NavItemCmp from "./NavItemCmp.vue";
// import routerList from "@/router/index";
const router = useRouter();

const arr = shallowRef<ILeftItem[]>([
  // {
  //   imgSrc: "@/views/AnimationSkinningMorph/AnimationSkinningMorph.jpg",
  //   title: "animation / skinning / morph",
  //   routeName: "AnimationSkinningMorph"
  // }
]);

onMounted(() => {
  const list = router.options?.routes[0]?.children ?? [];
  console.log(import.meta.glob, import.meta.url);
  // console.log(list);
  arr.value = list
    .filter(item => {
      return item.path !== "/home";
    })
    .map(item => {
      const { name, meta } = item;
      const imgSrc = new URL(`/src/views/${meta?.imgSrc}`, import.meta.url).href;
      // const a = import.meta.glob(`@/views/${meta?.imgSrc || ""}`);
      console.log(imgSrc);

      const obj: ILeftItem = {
        imgSrc,
        title: meta?.title as string,
        routeName: name as string
      };
      return obj;
    });

  console.log(arr.value);
});
</script>

<style scoped>
nav {
  width: 300px;
  border: 1px solid blue;
  height: 100vh;
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
