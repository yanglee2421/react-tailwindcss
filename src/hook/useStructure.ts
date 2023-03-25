import { useReducer } from "react";

type reducer<T> = (pa: T, act: (param: T) => void) => T;

/**
 * Hooks for manipulating Object State
 * @param init initialState
 * @returns A set function that don't need to return a value
 */
export function useStructure<T>(init: T) {
  return useReducer<reducer<T>, T>(
    (state, act) => {
      try {
        const target = structuredClone(state);
        act(target);
        return target;
      } catch {
        throw new Error("useStructure can`t handle this type");
      }
    },
    init,
    (init) => init
  );
}
