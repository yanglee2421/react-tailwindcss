export function toUniqBy(items: unknown[], ops: Partial<Ops> = {}) {
  const { overwrite = false, key = "id" } = ops;

  const map = new Map();

  items.forEach((item) => {
    // Item must be an object
    if (typeof item !== "object") {
      console.error("Excepted an object");
      return;
    }

    if (!item) {
      console.error("Excepted an object, got a null!");
      return;
    }

    // Get Key
    const mapKey = Reflect.get(item, key);
    if (!mapKey) {
      console.error("Excepted a truth, got a falsy!");
      return;
    }

    // Whether to allow overwriting
    if (overwrite) {
      map.set(mapKey, item);
      return;
    }

    map.get(mapKey) ?? map.set(mapKey, item);
  });

  return [...map.values()];
}

interface Ops {
  key: string | symbol;
  overwrite: boolean;
}
