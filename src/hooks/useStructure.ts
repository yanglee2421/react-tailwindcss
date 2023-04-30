import { useReducer } from "react";

type Reducer<TData> = (pa: TData, act: (param: TData) => unknown) => TData;

/**
 * Hooks for manipulating Object State
 * @param init initialState
 * @returns A set function that don't need to return a value
 */
export function useStructure<TData>(state: TData) {
  return useReducer<Reducer<TData>, TData>(
    (prev, act) => {
      try {
        const next = structuredClone(prev);
        return act(next) === false ? prev : next;
      } catch {
        throw new Error("useStructure can`t handle this type");
      }
    },
    state,
    (init) => init
  );
}
