import React from "react";
import { Skeleton } from "antd";

type ToLazyParams = Parameters<typeof React.lazy>;

export function toLazy(...toLazyParams: ToLazyParams) {
  const Inner = React.lazy(...toLazyParams);
  return (
    <React.Suspense fallback={<Skeleton active />}>
      <Inner />
    </React.Suspense>
  );
}
