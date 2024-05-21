
// 判断当前有没是否添加了模型
export const isCanvas = (name: string) => {
  // const can = document.querySelector(".main .animationSkinningAdditiveBlending canvas");
  const can = document.querySelector(`${name} canvas`);
  // console.log(can);
  //
  if (can === null) {
    // 当前有没添加
    return false;
  }

  return true;
};