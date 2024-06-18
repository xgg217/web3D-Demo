import type { AnimationClip } from "three";

// 所有运动类型
export type IAnimationName = "idle" | "walk" | "run";

// 每个运动的属性
export type IAnimateType = {
  animation: undefined | AnimationClip;
  duration: number; // 动画总时长
  isActive: boolean; // 是否激活
  name: IAnimationName;
};

// 运动动作
export type IAnimateObj = {
  idle: IAnimateType; // 空闲
  walk: IAnimateType; // 走路
  run: IAnimateType; // 跑步
};
