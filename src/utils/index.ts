// 获取指定元素宽高
export const getElmWidhtAndHeight = (el: HTMLElement) => {
  const style = getComputedStyle(el, null);

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

// 下载辅助
export const download = (filename: string, data: string, mime: string) => {
  const blob = new Blob([data], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};
