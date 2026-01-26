import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import webApi from "./webApi";
import { ElLoading } from "element-plus";
import Config from "@/config.json";

// const useMaterial = useMaterialStore();

// useMaterial.setCurrentMatrialCom;

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

    // web api
    ...webApi,

    {
      path: "/404",
      component: () => import("@/views/404.vue"),
      meta: {
        title: "404",
      },
    },
  ],
});

const getTarget = () => {
  return document.querySelector("#app > main > aside") as HTMLElement | null;
};

let loadingInstance: typeof ElLoading.service;

router.beforeEach((to, from, next) => {
  // 设置浏览器标题
  document.title = `${Config.name} - ${to.meta.title}`;

  // 设置加载进度条
  {
    const target = getTarget();
    if (target) {
      // @ts-ignore
      loadingInstance = ElLoading.service({
        target: target!,
      });
    } else {
      // @ts-ignore
      loadingInstance = null;
    }
  }

  next(); // 调用该方法代表放行
});

router.afterEach((to, from, next) => {
  // 关闭进度条
  if (loadingInstance) {
    // @ts-ignore
    loadingInstance.close();
  }
});

export default router;
