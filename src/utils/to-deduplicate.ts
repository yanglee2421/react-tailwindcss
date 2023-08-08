export function toDeduplicate(items: unknown[], ops: Partial<Ops> = {}) {
  const { isCover = false, keyProp = "id" } = ops;

  const map = new Map();

  items.forEach((item) => {
    if (!item) throw new Error("invalid item");
    if (typeof item !== "object") throw new Error("Item must be an object!");

    const key = Reflect.get(item, keyProp);
    if (!key) throw new Error("invalid key");

    if (isCover) return map.set(key, item);
    map.get(key) ?? map.set(key, item);
  });

  return [...map.values()];
}

interface Ops {
  isCover: boolean;
  keyProp: string | symbol;
}
