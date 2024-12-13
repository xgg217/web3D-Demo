import type { RouteRecordRaw } from "vue-router";

// 学习
export default [
  {
    path: "index",
    name: "StudyIndex",
    component: () => import("@/views/study/CustomIndex.vue"),
    meta: {
      title: "展位图",
      imgSrc: "",
    },
  },
  {
    path: "sceneSolarSystem",
    name: "SceneSolarSystem",
    component: () => import("@/views/study/SceneSolarSystem/index.vue"),
    meta: {
      title: "场景之太阳系、太阳、地球、月亮",
      imgSrc: "SceneSolarSystem/SceneSolarSystem.png",
    },
  },
  {
    path: "cameraSetScissorTest",
    name: "CameraSetScissorTest",
    component: () => import("@/views/study/CameraSetScissorTest/index.vue"),
    meta: {
      title: "相机之剪函数",
      imgSrc: "CameraSetScissorTest/CameraSetScissorTest.png",
    },
  },
] as RouteRecordRaw[];
