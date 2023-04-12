/**
 * Geting the type of the target value
 * @param target target value
 * @returns the type of the target value
 */
export function toStringTag(target: unknown) {
  return Object.prototype.toString
    .call(target)
    .replace(/\[object (\w+)\]/, "$1")
    .toLocaleLowerCase();
}
