import React from "react";
import { Skeleton } from "antd";

export namespace Type {
  export type callback = () => Promise<{
    default: React.ComponentType<any>;
  }>;
}

export function useImp(callback: Type.callback) {
  const LazyComp = React.lazy(callback);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <LazyComp />
    </React.Suspense>
  );
}
