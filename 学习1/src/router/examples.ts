import type { RouteRecordRaw } from "vue-router";
import Layout from "@/views/Examples/layout/index.vue";

// 官方示例
export default {
  path: "/examples",
  name: "Examples",
  component: Layout,
  meta: {
    title: "自定义",
  },
  redirect: "/examples/index",
  children: [
    {
      path: "index",
      name: "ExamplesIndex",
      component: () => import("@/views/Examples/ExamplesIndex.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
    // {
    //   path: "cameraArray",
    //   name: "CameraArray",
    //   component: () => import("@/views/examples/cameraArray/index.vue"),
    //   meta: {
    //     title: "camera / array",
    //     imgSrc: "cameraArray/webglCameraArray.jpg",
    //   },
    // },
    // {
    //   path: "clipping",
    //   name: "Clipping",
    //   component: () => import("@/views/examples/clipping/index.vue"),
    //   meta: {
    //     title: "clipping",
    //     imgSrc: "clipping/webglClipping.jpg",
    //   },
    // },
  ],
} as RouteRecordRaw;
