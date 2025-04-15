// 获取指定元素宽高
export const getElmWidhtAndHeight = (el: HTMLElement) => {
  const style = getComputedStyle(el, null);
  console.log(style.height);

  return {
    w: parseInt(style.width),
    h: parseInt(style.height),
  } as const;
};

// 获取宽高
export const getWAndH = (className: string) => {
  const main = document.querySelector(`.${className}`)! as HTMLElement;
  const width = main.clientWidth;
  const height = main.clientHeight;
  return { width, height };
};

// 随机颜色 16进制
export const getRandomColor = () => {
  return "#" + Math.random().toString(16).substring(2, 8).padEnd(6, "0");
};

// 得到一个两数之间的随机整数，包括两个数在内
export function getRandomIntInclusive(min: number, max: number) {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal; //含最大值，含最小值
}
