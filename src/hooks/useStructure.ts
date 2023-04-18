import { useReducer } from "react";

type reducer<TData> = (pa: TData, act: (param: TData) => void) => TData;

/**
 * Hooks for manipulating Object State
 * @param init initialState
 * @returns A set function that don't need to return a value
 */
export function useStructure<TData>(init: TData) {
  return useReducer<reducer<TData>, TData>(
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
