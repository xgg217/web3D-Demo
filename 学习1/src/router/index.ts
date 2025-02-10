import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import examples from "./examples";
import customs from "./customs";
import studys from "./studys";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    examples,
    customs,
    studys,

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
