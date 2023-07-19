// React Imports
import React, { useReducer } from "react";

export function useStructure<TData>(tData: TData) {
  return useReducer<React.Reducer<TData, React.Dispatch<TData>>, TData>(
    (prev, actFn) => {
      try {
        const next = structuredClone(prev);
        actFn(next);
        return next;
      } catch {
        throw new Error("structuredClone can`t handle this type");
      }
    },
    tData,
    (tData) => tData
  );
}
