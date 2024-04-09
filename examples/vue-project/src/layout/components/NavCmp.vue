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

const arr = shallowRef<ILeftItem[]>([
  {
    imgSrc: "@/views/AnimationSkinningMorph/AnimationSkinningMorph.jpg",
    title: "animation / skinning / morph",
    routeName: "AnimationSkinningMorph"
  }
]);
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
  border: 1px solid red;
}
</style>
