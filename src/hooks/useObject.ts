// React Imports
import React, { useReducer } from "react";

export function useObject<TData>(tData: TData) {
  return useReducer<React.Reducer<TData, React.Dispatch<TData>>, TData>(
    (prev, actFn) => {
      try {
        const next = { ...prev };
        actFn(next);
        return next;
      } catch {
        throw new Error("state muse be a simple object");
      }
    },
    tData,
    (tData) => tData
  );
}
