export const whiteList = ["login"];

export const toIsInWl = (path: string) => {
  return whiteList.includes(path);
};
