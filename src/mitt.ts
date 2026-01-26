import mitt from "mitt";

// 类型
type Events = {
  "WENG_JUAN:UPDATE_ROUTER": string; // 问卷 更新路由
};

const emitter = mitt<Events>();
export default emitter;
