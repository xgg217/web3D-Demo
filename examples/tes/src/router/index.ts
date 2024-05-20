import { createRouter, createWebHistory } from "vue-router";
import layoutExamples from "@/views/examples/layout/index.vue";
import layoutDemo from "@/views/demo/layout/index.vue";
import Home from "@/views/Home/index.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
      meta: {
        title: "首页"
      }
    },
    {
      path: "/examples",
      component: layoutExamples,
      meta: {
        title: "官方示例"
      },
      redirect: "/examples/animationSkinningAdditiveBlending",

      children: [
        {
          path: "animationSkinningAdditiveBlending",
          name: "AnimationSkinningAdditiveBlending",
          component: () => import("@/views/examples/AnimationSkinningAdditiveBlending/index.vue"),
          meta: {
            title: "animation / skinning / additive / blending",
            imgSrc: "AnimationSkinningAdditiveBlending/AnimationSkinningAdditiveBlending.jpg"
          }
        },
        {
          path: "animationSkinningMorph",
          name: "AnimationSkinningMorph",
          component: () => import("@/views/examples/AnimationSkinningMorph/index.vue"),
          meta: {
            title: "animation / skinning / morph",
            imgSrc: "AnimationSkinningMorph/AnimationSkinningMorph.jpg"
          }
        }
        // {
        //   path: "/test",
        //   name: "Test",
        //   component: () => import("@/views/test/index.vue"),
        //   meta: {
        //     title: "测试",
        //     imgSrc: ""
        //   }
        // }
      ]
    },

    {
      path: "/demo",
      component: layoutDemo,
      meta: {
        title: "demo"
      },
      redirect: "/demo/phone",
      children: [
        {
          path: "phone",
          name: "Phone",
          component: () => import("@/views/demo/Phone/index.vue"),
          meta: {
            title: "手机展示",
            imgSrc: ""
          }
        }
      ]
    },
    {
      path: "/404",
      component: () => import("@/views/404.vue"),
      meta: {
        title: "404"
      }
    }
  ]
});

export default router;
