import type { RouteRecordRaw } from "vue-router";

// 自定义
export default [
  {
    path: "index",
    name: "CustomIndex",
    component: () => import("@/views/custom/CustomIndex.vue"),
    meta: {
      title: "展位图",
      imgSrc: "",
    },
  },
  {
    path: "index2",
    name: "CustomIndex2",
    component: () => import("@/views/custom/CustomIndex2.vue"),
    meta: {
      title: "展位图",
      imgSrc: "",
    },
  },
] as RouteRecordRaw[];
