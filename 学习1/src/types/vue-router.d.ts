import "vue-router";

// 扩展 RouteMeta 接口以添加自定义 meta 属性
declare module "vue-router" {
  interface RouteMeta {
    // 在此添加你的自定义 meta 属性
    imgSrc?: string; // 示意图，图片路径
    title: string; // 标题
    routeName?: string; // 路由名称
  }
}
