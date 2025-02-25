import type { RouteRecordRaw } from "vue-router";
import Layout from "@/views/Study/layout/index.vue";

// 学习
export default {
  path: "/study",
  name: "Study",
  component: Layout,
  meta: {
    title: "学习",
  },
  redirect: "/study/index",
  children: [
    {
      path: "index",
      name: "StudyIndex",
      component: () => import("@/views/Study/CustomIndex.vue"),
      meta: {
        title: "占位图",
        imgSrc: "",
      },
    },
    {
      path: "sceneSolarSystem",
      name: "SceneSolarSystem",
      component: () => import("@/views/Study/SceneSolarSystem/index.vue"),
      meta: {
        title: "场景之太阳系、太阳、地球、月亮",
        imgSrc: "SceneSolarSystem/SceneSolarSystem.png",
      },
    },
    {
      path: "texture",
      name: "Texture",
      component: () => import("@/views/Study/Texture/index.vue"),
      meta: {
        title: "纹理",
        imgSrc: "Texture/Texture.gif",
      },
    },
    {
      path: "texture2",
      name: "Texture2",
      component: () => import("@/views/Study/Texture2/index.vue"),
      meta: {
        title: "纹理2",
        imgSrc: "Texture2/Texture.gif",
      },
    },
    {
      path: "cameraSetScissorTest",
      name: "CameraSetScissorTest",
      component: () => import("@/views/Study/CameraSetScissorTest/index.vue"),
      meta: {
        title: "相机之局部渲染",
        imgSrc: "CameraSetScissorTest/CameraSetScissorTest.png",
      },
    },
    {
      path: "shadowMapsSimulatedShadow",
      name: "ShadowMapsSimulatedShadow",
      component: () => import("@/views/Study/ShadowMapsSimulatedShadow/index.vue"),
      meta: {
        title: "阴影之假阴影",
        imgSrc: "ShadowMapsSimulatedShadow/ShadowMapsSimulatedShadow.png",
      },
    },
    {
      path: "shadowMapsPointLight",
      name: "ShadowMapsPointLight",
      component: () => import("@/views/Study/ShadowMapsPointLight/index.vue"),
      meta: {
        title: "阴影之聚光灯",
        imgSrc: "ShadowMapsPointLight/ShadowMapsPointLight.png",
      },
    },
    {
      path: "fog",
      name: "Fog",
      component: () => import("@/views/Study/Fog/index.vue"),
      meta: {
        title: "雾",
        imgSrc: "Fog/Fog.gif",
      },
    },
  ],
} as RouteRecordRaw;
