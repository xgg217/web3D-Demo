import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import examples from "./examples";
import customs from "./customs";
import studys from "./studys";
import tweenJS from "./tweenJS";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },

    // 自定义
    examples,

    // 官方示例
    customs,

    // 学习
    studys,

    // tween.js 补间动画
    tweenJS,

    {
      path: "/404",
      component: () => import("@/views/404.vue"),
      meta: {
        title: "404",
      },
    },
  ],
});

export default router;
