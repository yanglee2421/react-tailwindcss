export const whiteList = ["login", "404"];

export function toIsInWl(path: string) {
  return whiteList.includes(path);
}
