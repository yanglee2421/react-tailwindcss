import { useReducer } from "react";

type ActFn<TData> = (params: TData) => void;
type Reducer<TData> = (state: TData, actFn: ActFn<TData>) => TData;

export function useObject<TData>(state: TData) {
  return useReducer<Reducer<TData>, TData>(
    (prev, actFn) => {
      try {
        const next = { ...prev };
        actFn(next);
        return next;
      } catch {
        throw new Error("state muse be a simple object");
      }
    },
    state,
    (init) => init
  );
}
