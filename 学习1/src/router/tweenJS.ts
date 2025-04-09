import type { RouteRecordRaw } from "vue-router";
import Layout from "@/views/TweenJS/layout/index.vue";

// 学习
export default {
  path: "/tweenJS",
  name: "TweenJS",
  component: Layout,
  meta: {
    title: "tween.js 补间动画",
  },
  redirect: "/tweenJS/index",
  children: [
    {
      path: "index",
      name: "TweenJSIndex",
      component: () => import("@/views/TweenJS/CustomIndex.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
    {
      path: "index",
      name: "TweenJSIndex",
      component: () => import("@/views/TweenJS/HelloWorld/index.vue"),
      meta: {
        title: "HelloWorld",
        imgSrc: "HelloWorld/HelloWorld.png",
      },
    },
  ],
} as RouteRecordRaw;
