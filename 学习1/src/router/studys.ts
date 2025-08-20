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
      path: "texture3",
      name: "Texture3",
      component: () => import("@/views/Study/Texture3/index.vue"),
      meta: {
        title: "纹理之批量加载回调",
        imgSrc: "Texture3/Texture.gif",
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
    {
      path: "GenerateMountainTerrain",
      name: "GenerateMountainTerrain",
      component: () => import("@/views/Study/GenerateMountainTerrain/index.vue"),
      meta: {
        title: "生成山脉地形",
        imgSrc: "GenerateMountainTerrain/生成山脉地形.gif",
      },
    },

    {
      path: "EdgesGeometry",
      name: "EdgesGeometry",
      component: () => import("@/views/Study/EdgesGeometry/index.vue"),
      meta: {
        title: "虚线线框几何体",
        imgSrc: "EdgesGeometry/EdgesGeometry.png",
      },
    },
    {
      path: "TunnelShuttle",
      name: "TunnelShuttle",
      component: () => import("@/views/Study/TunnelShuttle/index.vue"),
      meta: {
        title: "隧道穿梭",
        imgSrc: "TunnelShuttle/TunnelShuttle.png",
      },
    },
    {
      path: "Box3",
      name: "Box3",
      component: () => import("@/views/Study/Box3/index.vue"),
      meta: {
        title: "包围盒 Box3",
        // imgSrc: "TunnelShuttle/TunnelShuttle.png",
      },
    },
  ],
} as RouteRecordRaw;
