import { useReducer } from "react";

type Reducer<TData> = (state: TData, act: (params: TData) => unknown) => TData;

export function useObject<TData>(state: TData) {
  return useReducer<Reducer<TData>, TData>(
    (prev, act) => {
      try {
        const next = { ...prev };
        return act(next) === false ? prev : next;
      } catch {
        throw new Error("state muse be a simple object");
      }
    },
    state,
    (init) => init
  );
}
