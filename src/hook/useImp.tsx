import React from "react";
import { Skeleton } from "antd";
/**
 * useResize 的类型空间
 */
export namespace Type {
  export type defRC = {
    default: React.ComponentType<any>;
  };
}
/**
 * 入参同 React.lazy，
 * 返回 JSX
 */
export function useImp(callback: () => Promise<Type.defRC>) {
  const LazyComp = React.lazy(callback);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <LazyComp />
    </React.Suspense>
  );
}
