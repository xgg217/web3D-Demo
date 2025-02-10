import type { RouteRecordRaw } from "vue-router";
import Layout from "@/views/Custom/layout/index.vue";


// 自定义
export default {
  path: "/custom",
  name: "Custom",
  component: Layout,
  meta: {
    title: "官方示例",
  },
  redirect: "/examples/index",
  children: [
    {
      path: "index",
      name: "CustomIndex",
      component: () => import("@/views/Custom/CustomIndex.vue"),
      meta: {
        title: "展位图",
        imgSrc: "",
      },
    },
    {
      path: "index2",
      name: "CustomIndex2",
      component: () => import("@/views/Custom/CustomIndex2.vue"),
      meta: {
        title: "展位图",
        imgSrc: "",
      },
    },
  ],
} as RouteRecordRaw;
