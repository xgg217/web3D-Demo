import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/webgl",
      name: "Webgl",
      component: () => import("@/views/webgl/webglIndex.vue"),
    },
    {
      path: "/custom",
      name: "Custom",
      component: () => import("@/views/custom/customIndex.vue"),
    },
  ],
});

export default router;
