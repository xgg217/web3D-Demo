import type { RouteRecordRaw } from "vue-router";

// 学习
export default [
  {
    path: "index",
    name: "StudyIndex",
    component: () => import("@/views/study/CustomIndex.vue"),
    meta: {
      title: "展位图",
      imgSrc: "",
    },
  },
  {
    path: "index2",
    name: "StudyIndex2",
    component: () => import("@/views/study/CustomIndex2.vue"),
    meta: {
      title: "展位图",
      imgSrc: "",
    },
  },
] as RouteRecordRaw[];
