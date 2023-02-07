import { Skeleton } from "antd";
import React from "react";

namespace t {
  type defRC = {
    default: React.ComponentType<any>;
  };
  export type cb = () => Promise<defRC>;
}

/**
 * Hooks for lazy loading of RC
 * @param callback A function that returns an RC Promise
 * @returns React Suspense
 */
export function useLazy(callback: t.cb) {
  const LazyRC = React.lazy(callback);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <LazyRC />
    </React.Suspense>
  );
}
