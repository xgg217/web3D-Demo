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
      imgSrc: "",
    },
  },
] as RouteRecordRaw[];
