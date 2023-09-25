// 得到一个两数之间的随机整数，包括两个数在内
export const getRandomIntInclusive = function getRandomIntInclusive(min, max) {
  const minVal = Math.ceil(min);
  const maxVal = Math.floor(max);
  return Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal; //含最大值，含最小值
}

// for(let i = 0; i <= 10; i++) {
//   const val = getRandomIntInclusive(-100, 100);
//   console.log(val)
// }