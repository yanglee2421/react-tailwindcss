/**
 * 返回入参的数据类型
 * @param target 任意类型的数据
 * @returns target 的 toStringTag
 */
export function toStringTag(target: unknown) {
  return Object.prototype.toString
    .call(target)
    .replace(/\[object (\w+)\]/, "$1")
    .toLocaleLowerCase();
}
