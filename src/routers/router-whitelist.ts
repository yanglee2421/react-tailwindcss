export const whiteList = ["login", "list"];

export const toIsInWl = (path: string) => {
  return whiteList.includes(path);
};
