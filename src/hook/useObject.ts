import { useReducer } from "react";

namespace t {
  type act<T> = (param: T) => void;
  export type reducer<T> = (pa: T, act: act<T>) => T;
}

export function useObject<T>(init: T) {
  if (!init) throw new Error("initialState can not be falsy");
  if (typeof init !== "object")
    throw new Error("useObject can only handle a object");
  return useReducer<t.reducer<T>, T>(
    (state, act) => {
      const target = JSON.parse(JSON.stringify(state)) as T;
      act(target);
      return target;
    },
    init,
    (init) => init
  );
}
