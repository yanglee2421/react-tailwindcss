import { useReducer } from "react";

type ActFn<TData> = (param: TData) => void;
type Reducer<TData> = (pa: TData, actFn: ActFn<TData>) => TData;

/**
 * Hooks for manipulating Object State
 * @param init initialState
 * @returns A set function that don't need to return a value
 */
export function useStructure<TData>(state: TData) {
  return useReducer<Reducer<TData>, TData>(
    (prev, actFn) => {
      try {
        const next = structuredClone(prev);
        actFn(next);
        return next;
      } catch {
        throw new Error("structuredClone can`t handle this type");
      }
    },
    state,
    (init) => init
  );
}
