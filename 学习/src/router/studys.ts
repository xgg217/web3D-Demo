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
      title: "相机之局部渲染",
      imgSrc: "CameraSetScissorTest/CameraSetScissorTest.png",
    },
  },
  {
    path: "shadowMapsSimulatedShadow",
    name: "ShadowMapsSimulatedShadow",
    component: () =>
      import("@/views/study/ShadowMapsSimulatedShadow/index.vue"),
    meta: {
      title: "阴影之假阴影",
      imgSrc: "ShadowMapsSimulatedShadow/ShadowMapsSimulatedShadow.png",
    },
  },
  {
    path: "shadowMapsPointLight",
    name: "ShadowMapsPointLight",
    component: () => import("@/views/study/ShadowMapsPointLight/index.vue"),
    meta: {
      title: "阴影之聚光灯",
      imgSrc: "ShadowMapsPointLight/ShadowMapsPointLight.png",
    },
  },
] as RouteRecordRaw[];
