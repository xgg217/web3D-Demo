import { createRouter, createWebHistory } from "vue-router";
import LayoutExamples from "@/components/layout/index.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/examples",
      name: "Examples",
      component: LayoutExamples,
      meta: {
        title: "官方示例"
      },
      redirect: "/examples/index",
      children: [
        {
          path: "index",
          name: "ExamplesIndex",
          component: () => import("@/views/examples/ExamplesIndex.vue"),
          meta: {
            title: "展位图",
            imgSrc: ""
          }
        },
        {
          path: "index2",
          name: "ExamplesIndex2",
          component: () => import("@/views/examples/ExamplesIndex2.vue"),
          meta: {
            title: "展位图",
            imgSrc: ""
          }
        },
      ]
    },
    {
      path: "/custom",
      name: "Custom",
      component: () => import("@/views/custom/customIndex.vue"),
      meta: {
        title: "自定义"
      },
    },
    {
      path: "/404",
      component: () => import("@/views/404.vue"),
      meta: {
        title: "404"
      }
    }
  ],
});

export default router;
