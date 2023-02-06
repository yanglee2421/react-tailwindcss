import { Skeleton } from "antd";
import React from "react";
/**
 * @function useResize 使用的类型
 */
export namespace Type {
  export type defRC = {
    default: React.ComponentType<any>;
  };
}
/**
 * Hooks for lazy loading of RC
 * @param callback A function that returns an RC Promise
 * @returns React Suspense
 */
export function useLazy(callback: () => Promise<Type.defRC>) {
  const LazyRC = React.lazy(callback);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <LazyRC />
    </React.Suspense>
  );
}
