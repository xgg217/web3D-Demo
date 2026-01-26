import type { RouteRecordRaw } from "vue-router";
import layout from "@/layout/index.vue";
import HomeView from "@/views/HomeView.vue";

const row: RouteRecordRaw = {
  path: "/",
  name: "home",
  component: HomeView,
  meta: {
    title: "首页",
  },
  children: [
    // #region Three.js 自定义
    {
      path: "Examples",
      name: "WebApiThreeJSExamples",
      // component: aa,
      component: layout,
      meta: {
        title: "ThreeJS 自定义",
        imgSrc: "",
        remark: "平时自己练习的示例",
      },
      redirect: { name: "WebApiThreeJSExamplesIndex" },
      children: [
        {
          path: "index",
          name: "WebApiThreeJSExamplesIndex",
          component: () => import("@/views/WebApi/ThreeJSExamples/index.vue"),
          meta: {
            title: "占位图",
            imgSrc: "",
          },
        },
      ],
    },
    // #endregion

    // #region Three.js 官网例子
    {
      path: "/ThreeJSCustoms",
      name: "WebApiThreeJSCustoms",
      // component: aa,
      component: layout,
      meta: {
        title: "官方示例",
        imgSrc: "",
        remark: "官方+小册 学习",
      },
      redirect: { name: "WebApiThreeJSCustomsIndex" },
      children: [
        {
          path: "index",
          name: "WebApiThreeJSCustomsIndex",
          component: () => import("@/views/WebApi/ThreeJSCustoms/index.vue"),
          meta: {
            title: "占位图",
            imgSrc: "",
          },
        },
        {
          path: "CustomsSceneSolarSystem",
          name: "WebApiThreeJSCustomsCustomsSceneSolarSystem",
          component: () => import("@/views/WebApi/ThreeJSCustoms/SceneSolarSystem/index.vue"),
          meta: {
            title: "场景之太阳系、太阳、地球、月亮",
            imgSrc: "SceneSolarSystem/SceneSolarSystem.png",
          },
        },
        {
          path: "Camera1",
          name: "WebApiThreeJSCustomsCamera1",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Camera1/index.vue"),
          meta: {
            title: "相机之相机属性",
            imgSrc: "Camera1/Camera1.jpg",
          },
        },

        {
          path: "Camera2",
          name: "WebApiThreeJSCustomsCamera2",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Camera2/index.vue"),
          meta: {
            title: "相机之局部渲染",
            imgSrc: "Camera2/Camera2.png",
          },
        },

        {
          path: "Camera3",
          name: "WebApiThreeJSCustomsCamera3",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Camera3/index.vue"),
          meta: {
            title: "待定 双屏渲染 StereoEffect ",
            imgSrc: "Camera3/Camera3.jpg",
          },
        },
        {
          path: "Camera4",
          name: "WebApiThreeJSCustomsCamera4",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Camera4/index.vue"),
          meta: {
            title: "StereoCamera 立方相机",
            imgSrc: "Camera4/Camera4.jpg",
          },
        },
        {
          path: "Camera5",
          name: "WebApiThreeJSCustomsCamera5",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Camera5/index.vue"),
          meta: {
            title: "StereoCamera 之 3D立体影像",
            imgSrc: "Camera5/Camera5.jpg",
          },
        },

        {
          path: "Camera6",
          name: "WebApiThreeJSCustomsCamera6",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Camera6/index.vue"),
          meta: {
            title: "待定",
            imgSrc: "Camera6/Camera6.jpg",
          },
        },

        {
          path: "texture",
          name: "WebApiThreeJSCustomsTexture",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Texture/index.vue"),
          meta: {
            title: "纹理+批量加载",
            imgSrc: "Texture/Texture.gif",
          },
        },
        {
          path: "CubeTextureLoader1",
          name: "WebApiThreeJSCustomsCubeTextureLoader1",
          component: () => import("@/views/WebApi/ThreeJSCustoms/CubeTextureLoader1/index.vue"),
          meta: {
            title: "环境贴图",
            imgSrc: "CubeTextureLoader1/CubeTextureLoader1.png",
          },
        },

        {
          path: "shadowMapsSimulatedShadow",
          name: "WebApiThreeJSCustomsShadowMapsSimulatedShadow",
          component: () =>
            import("@/views/WebApi/ThreeJSCustoms/ShadowMapsSimulatedShadow/index.vue"),
          meta: {
            title: "阴影之假阴影",
            imgSrc: "ShadowMapsSimulatedShadow/ShadowMapsSimulatedShadow.png",
          },
        },

        {
          path: "shadowMapsPointLight",
          name: "WebApiThreeJSCustomsShadowMapsPointLight",
          component: () => import("@/views/WebApi/ThreeJSCustoms/ShadowMapsPointLight/index.vue"),
          meta: {
            title: "阴影之聚光灯",
            imgSrc: "ShadowMapsPointLight/ShadowMapsPointLight.png",
          },
        },
        {
          path: "fog",
          name: "WebApiThreeJSCustomsFog",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Fog/index.vue"),
          meta: {
            title: "雾",
            imgSrc: "Fog/Fog.gif",
          },
        },
        {
          path: "GenerateMountainTerrain",
          name: "WebApiThreeJSCustomsGenerateMountainTerrain",
          component: () =>
            import("@/views/WebApi/ThreeJSCustoms/GenerateMountainTerrain/index.vue"),
          meta: {
            title: "生成山脉地形",
            imgSrc: "GenerateMountainTerrain/生成山脉地形.gif",
          },
        },

        {
          path: "EdgesGeometry",
          name: "WebApiThreeJSCustomsEdgesGeometry",
          component: () => import("@/views/WebApi/ThreeJSCustoms/EdgesGeometry/index.vue"),
          meta: {
            title: "虚线线框几何体",
            imgSrc: "EdgesGeometry/EdgesGeometry.png",
          },
        },
        {
          path: "TunnelShuttle",
          name: "WebApiThreeJSCustomsTunnelShuttle",
          component: () => import("@/views/WebApi/ThreeJSCustoms/TunnelShuttle/index.vue"),
          meta: {
            title: "隧道穿梭",
            imgSrc: "TunnelShuttle/TunnelShuttle.png",
          },
        },
        {
          path: "Box3",
          name: "WebApiThreeJSCustomsBox3",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Box3/index.vue"),
          meta: {
            title: "包围盒 Box3",
            imgSrc: "Box3/Box3.png",
          },
        },

        {
          path: "BufferGeometry1",
          name: "WebApiThreeJSCustomsBufferGeometry1",
          component: () => import("@/views/WebApi/ThreeJSCustoms/BufferGeometry1/index.vue"),
          meta: {
            title: "缓冲模型 BufferGeometry之三角形绘制",
            imgSrc: "BufferGeometry1/BufferGeometry1.png",
          },
        },
        {
          path: "BufferGeometry2",
          name: "WebApiThreeJSCustomsBufferGeometry2",
          component: () => import("@/views/WebApi/ThreeJSCustoms/BufferGeometry2/index.vue"),
          meta: {
            title: "缓冲模型 BufferGeometry之points点绘制",
            // imgSrc: "Box3/Box3.png",
          },
        },
        {
          path: "BufferGeometry3",
          name: "WebApiThreeJSCustomsBufferGeometry3",
          component: () => import("@/views/WebApi/ThreeJSCustoms/BufferGeometry3/index.vue"),
          meta: {
            title: "缓冲模型 BufferGeometry之自定义颜色",
            imgSrc: "BufferGeometry3/BufferGeometry3.png",
          },
        },
        {
          path: "BufferGeometry4",
          name: "WebApiThreeJSCustomsBufferGeometry4",
          component: () => import("@/views/WebApi/ThreeJSCustoms/BufferGeometry4/index.vue"),
          meta: {
            title: "缓冲模型 BufferGeometry之颜色渐变柱状图",
            imgSrc: "BufferGeometry4/BufferGeometry4.png",
          },
        },
        {
          path: "BufferGeometry5",
          name: "BufferGeometry5",
          component: () => import("@/views/WebApi/ThreeJSCustoms/BufferGeometry5/index.vue"),
          meta: {
            title: "缓冲模型 BufferGeometry之索引",
            imgSrc: "BufferGeometry5/BufferGeometry5.jpg",
          },
        },
        {
          path: "BufferGeometry6",
          name: "WebApiThreeJSCustomsBufferGeometry6",
          component: () => import("@/views/WebApi/ThreeJSCustoms/BufferGeometry6/index.vue"),
          meta: {
            title: "缓冲模型 BufferGeometry之线",
            imgSrc: "BufferGeometry6/BufferGeometry6.jpg",
          },
        },
        {
          path: "Normal",
          name: "WebApiThreeJSCustomsNormal",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Normal/index.vue"),
          meta: {
            title: "法向量",
            // imgSrc: "BufferGeometry4/BufferGeometry4.png",
          },
        },
        {
          path: "Ray",
          name: "WebApiThreeJSCustomsRay",
          component: () => import("@/views/WebApi/ThreeJSCustoms/Ray/index.vue"),
          meta: {
            title: "射线 Ray",
            // imgSrc: "Box3/Box3.png",
          },
        },
        {
          path: "OrbitControls",
          name: "WebApiThreeJSCustomsOrbitControls",
          component: () => import("@/views/WebApi/ThreeJSCustoms/OrbitControls/index.vue"),
          meta: {
            title: "OrbitControls轨道控制器",
            imgSrc: "OrbitControls/OrbitControls.jpg",
          },
        },
        {
          path: "DRACOLoader",
          name: "WebApiThreeJSCustomsDRACOLoader",
          component: () => import("@/views/WebApi/ThreeJSCustoms/DRACOLoader/index.vue"),
          meta: {
            title: "加载器之解压加载器 DRACOLoader",
            imgSrc: "DRACOLoader/DRACOLoader.jpg",
          },
        },
      ],
    },
    // #endregion
  ],
};

export default row;
