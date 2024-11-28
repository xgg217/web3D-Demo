import { createRouter, createWebHistory } from "vue-router";
import LayoutCustom from "@/views/custom/layout/index.vue";
import LayoutExamples from "@/views/examples/layout/index.vue";
import HomeView from "@/views/HomeView.vue";
import examples from "./examples";
import customs from "./customs";
import studys from "./studys";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "首页",
      },
    },
    {
      path: "/examples",
      name: "Examples",
      component: LayoutExamples,
      meta: {
        title: "官方示例",
      },
      redirect: "/examples/index",
      children: examples,
    },
    {
      path: "/custom",
      name: "Custom",
      component: LayoutCustom,
      meta: {
        title: "自定义",
      },
      redirect: "/custom/index",
      children: customs,
    },
    {
      path: "/study",
      name: "Study",
      component: LayoutCustom,
      meta: {
        title: "学习",
      },
      redirect: "/study/index",
      children: studys,
    },
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
