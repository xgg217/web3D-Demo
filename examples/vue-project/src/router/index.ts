import { createRouter, createWebHistory } from "vue-router";
import layout from "@/layout/index.vue";
import Home from "@/views/Home/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: layout,
      meta: {
        title: "首页"
      },
      redirect: "/home",

      children: [
        {
          path: "/home",
          name: "Home",
          component: Home
        },
        {
          path: "/animationSkinningMorph",
          name: "AnimationSkinningMorph",
          component: () => import("@/views/AnimationSkinningMorph/index.vue")
        }
      ]
    }
  ]
});

export default router;
