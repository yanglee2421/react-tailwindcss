import React from "react";
import { Skeleton } from "antd";
export default (
  callback: () => Promise<{
    default: React.ComponentType<any>;
  }>
) => {
  const LazyComp = React.lazy(callback);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <LazyComp />
    </React.Suspense>
  );
};
