import { createRouter, createWebHistory } from "vue-router";
import LayoutCustom from "@/views/custom/layout/index.vue";
import LayoutExamples from "@/views/examples/layout/index.vue";
import HomeView from "@/views/HomeView.vue";

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
      children: [
        {
          path: "index",
          name: "ExamplesIndex",
          component: () => import("@/views/examples/ExamplesIndex.vue"),
          meta: {
            title: "展位图",
            imgSrc: "",
          },
        },
        {
          path: "cameraArray",
          name: "CameraArray",
          component: () => import("@/views/examples/cameraArray/index.vue"),
          meta: {
            title: "camera / array",
            imgSrc: "cameraArray/webglCameraArray.jpg",
          },
        },
        {
          path: "clipping",
          name: "Clipping",
          component: () => import("@/views/examples/clipping/index.vue"),
          meta: {
            title: "clipping",
            imgSrc: "clipping/webglClipping.jpg",
          },
        },
      ],
    },
    {
      path: "/custom",
      name: "Custom",
      component: LayoutCustom,
      meta: {
        title: "自定义",
      },
      redirect: "/custom/index",
      children: [
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
      ],
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
