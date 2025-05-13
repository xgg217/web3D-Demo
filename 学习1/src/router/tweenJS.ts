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
    {
      path: "Simplest",
      name: "Simplest",
      component: () => import("@/views/TweenJS/Simplest/index.vue"),
      meta: {
        title: "补间动画",
        imgSrc: "Simplest/Simplest.png",
      },
    },
    {
      path: "VideoAndTime",
      name: "VideoAndTime",
      component: () => import("@/views/TweenJS/VideoAndTime/index.vue"),
      meta: {
        title: "播放视频，同步渐变",
        imgSrc: "VideoAndTime/VideoAndTime.png",
      },
    },
    {
      path: "DynamicToObject",
      name: "DynamicToObject",
      component: () => import("@/views/TweenJS/DynamicToObject/index.vue"),
      meta: {
        title: "Dynamic to, object",
        imgSrc: "DynamicToObject/DynamicToObject.png",
      },
    },

    {
      path: "DynamicToInterpolationArray",
      name: "DynamicToInterpolationArray",
      component: () => import("@/views/TweenJS/DynamicToInterpolationArray/index.vue"),
      meta: {
        title: "Dynamic to, interpolation array",
        imgSrc: "DynamicToInterpolationArray/DynamicToInterpolationArray.png",
      },
    },
    {
      path: "Repeat",
      name: "Repeat",
      component: () => import("@/views/TweenJS/Repeat/index.vue"),
      meta: {
        title: "重复",
        imgSrc: "Repeat/Repeat.png",
      },
    },
    {
      path: "RelativeValues",
      name: "RelativeValues",
      component: () => import("@/views/TweenJS/RelativeValues/index.vue"),
      meta: {
        title: "渐变到相对值，使用repeat",
        imgSrc: "RelativeValues/RelativeValues.png",
      },
    },
  ],
} as RouteRecordRaw;
