import type { RouteRecordRaw } from "vue-router";

// 官方示例
export default [
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
] as  RouteRecordRaw[];
