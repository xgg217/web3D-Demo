<template>
  <div>
    <ul>
      <li v-for="item of arr" :key="item.content">
        <ItemCmp :row="item" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import ItemCmp from "./components/ItemCmp.vue";
import type { IItem } from "./types";

const arr: IItem[] = [
  { isStart: true, content: "1fsdfsddfs啥地方都舒服111", isEnd: false, isAvc: true },
  { isStart: false, content: "1111水电费地方", isEnd: false, isAvc: true },
  { isStart: false, content: "1111水电费地方", isEnd: false, isAvc: false },
  { isStart: false, content: "1111是的发多少分多少佛挡杀佛", isEnd: true, isAvc: true }
];
</script>

<style scoped>
ul {
  margin: 20px 0 0 20px;
  padding: 0;
  display: flex;
}
li {
  list-style: none;
}
</style>
