export const whiteList = ["login", "404"];

export const toIsInWl = (path: string) => {
  return whiteList.includes(path);
};
