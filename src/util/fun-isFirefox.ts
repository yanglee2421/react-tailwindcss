/**
 * 判断是否为 Firefox
 * @returns Firefox 为 true，反之 false
 */
export function isFirefox() {
  return navigator.userAgent.includes("Firefox");
}
