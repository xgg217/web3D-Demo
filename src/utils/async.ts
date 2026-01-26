export const asyncApiRes = (t = 1000) => {
  return new Promise(res => {
    setTimeout(() => {
      res(1);
    }, t);
  });
};

export const asyncApiRej = (t = 1000) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      rej(1);
    }, t);
  });
};
