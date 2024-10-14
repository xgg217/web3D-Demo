// 获取指定元素宽高
export const getElmWidhtAndHeight = (el: HTMLElement) => {
  const style = getComputedStyle(el, null);
  console.log(style.height);


  return {
    w: parseInt(style.width),
    h: parseInt(style.height)
  } as const
}