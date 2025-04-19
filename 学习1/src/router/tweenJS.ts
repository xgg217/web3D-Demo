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
      name: "index",
      component: () => import("@/views/TweenJS/CustomIndex.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
    {
      path: "TweenJSIndex",
      name: "TweenJSIndex",
      component: () => import("@/views/TweenJS/HelloWorld/index.vue"),
      meta: {
        title: "HelloWorld",
        imgSrc: "HelloWorld/HelloWorld.png",
      },
    },
    {
      path: "BlackAndRed",
      name: "BlackAndRed",
      component: () => import("@/views/TweenJS/BlackAndRed/index.vue"),
      meta: {
        title: "黑与红",
        imgSrc: "BlackAndRed/BlackAndRed.png",
      },
    },
    {
      path: "Bars",
      name: "Bars",
      component: () => import("@/views/TweenJS/Bars/index.vue"),
      meta: {
        title: "线条来回移动",
        imgSrc: "Bars/Bars.png",
      },
    },
    {
      path: "Graphs",
      name: "Graphs",
      component: () => import("@/views/TweenJS/Graphs/index.vue"),
      meta: {
        title: "运动轨迹",
        imgSrc: "Graphs/Graphs.png",
      },
    },
  ],
} as RouteRecordRaw;
