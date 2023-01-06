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
 * 类似 React.lazy，实现组件懒加载
 * @param callback 返回 Promise 的函数
 * @returns JSX
 */
export function useImp(callback: () => Promise<Type.defRC>) {
  const LazyComp = React.lazy(callback);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <LazyComp />
    </React.Suspense>
  );
}
